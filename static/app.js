const btn = document.getElementById('submit-btn');
const input = document.getElementById('url-input');
const result = document.getElementById('result');
const bullets = document.getElementById('bullets');
const verdict = document.getElementById('verdict-text');
const error = document.getElementById('error');

btn.addEventListener('click', async () => {
  const url = input.value.trim();
  if (!url) return;

  btn.innerHTML = '<span class="spinner"></span>Checking...';
  btn.disabled = true;
  result.classList.add('hidden');
  error.classList.add('hidden');

  try {
    const response = await fetch('/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });

    const data = await response.json();

    if (!response.ok) {
      error.textContent = data.error || 'Something went wrong. Try a different URL.';
      error.classList.remove('hidden');
    } else {
      bullets.innerHTML = data.bullets.map(b => `<li>${b}</li>`).join('');
      verdict.textContent = '✓ ' + data.verdict;
      result.classList.remove('hidden');
    }

  } catch (e) {
    error.textContent = 'Could not connect to the server. Try again.';
    error.classList.remove('hidden');
  }

  btn.innerHTML = 'Check it';
  btn.disabled = false;
});