import os
from flask import Flask, render_template, request, jsonify
from newspaper import Article
from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
client = Anthropic()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/summarize', methods=['POST'])
def summarize():
    url = request.json.get('url')

    try:
        article = Article(url)
        article.download()
        article.parse()
        text = article.text

        if not text or len(text) < 100:
            return jsonify({'error': 'Could not read that page. Try a different article.'}), 400

    except Exception as e:
        return jsonify({'error': 'Could not fetch that URL. Make sure it is a public article.'}), 400

    message = client.messages.create(
        model='claude-opus-4-6',
        max_tokens=1024,
        messages=[{
            'role': 'user',
            'content': f'''Summarize this article in exactly 3 bullet points.
Then give a one-line verdict: is it worth reading?
Format your response exactly like this:
- [point 1]
- [point 2]
- [point 3]
VERDICT: [your verdict]

Article: {text[:4000]}'''
        }]
    )

    response_text = message.content[0].text
    lines = response_text.strip().split('\n')
    bullets = [l.lstrip('•-0123456789.) ').strip() for l in lines if l.strip() and 'VERDICT' not in l]
    verdict = next((l.replace('VERDICT:', '').strip() for l in lines if 'VERDICT:' in l), '')

    return jsonify({'bullets': bullets, 'verdict': verdict})

if __name__ == '__main__':
    app.run(debug=True, port=8080)