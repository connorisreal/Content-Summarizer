const btn = document.getElementById('submit-btn');
const input = document.getElementById('url-input');
const result = document.getElementById('result');
const bullets = document.getElementById('bullets');
const verdict = document.getElementById('verdict-text');

btn.addEventListener('click', async () => {
  const url = input.value.trim();
  if (!url) return;

  btn.textContent = 'Checking...';
  result.classList.add('hidden');

  const response = await fetch('/summarize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  });

  const data = await response.json();

  bullets.innerHTML = data.bullets.map(b => `<li>${b}</li>`).join('');
  verdict.textContent = '✓ ' + data.verdict;
  result.classList.remove('hidden');
  btn.textContent = 'Check it';
});