const btn = document.getElementById('submit-btn');
const input = document.getElementById('url-input');
const result = document.getElementById('result');
const bullets = document.getElementById('bullets');
const verdict = document.getElementById('verdict-text');

btn.addEventListener('click', () => {
  const url = input.value.trim();
  if (!url) return;

  btn.textContent = 'Checking...';

  setTimeout(() => {
    bullets.innerHTML = `
      <li>This is where your first key point will appear</li>
      <li>The second important takeaway from the content</li>
      <li>The third point — and whether it's worth your time</li>
    `;
    verdict.textContent = '✓ Worth your time.';
    result.classList.remove('hidden');
    btn.textContent = 'Check it';
  }, 1500);
});