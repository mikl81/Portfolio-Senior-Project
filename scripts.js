const hero = document.querySelector('.hero');            // change if your hero uses a different selector
const buttons = document.querySelectorAll('.hero-button');
const articles = document.querySelectorAll('.article');

let activeArticle = null;
let lastTrigger = null;

// One-time setup: accessibility attributes and a close button per article
articles.forEach((article) => {
  const heading = article.querySelector('h1');
  if (heading) {
    heading.id = `${article.id}-title`;
    article.setAttribute('aria-labelledby', heading.id);
  }
  article.setAttribute('role', 'dialog');
  article.setAttribute('aria-modal', 'true');
  article.setAttribute('tabindex', '-1');

  const closeBtn = document.createElement('button');
  closeBtn.className = 'article-close';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('click', closeArticle);
  article.prepend(closeBtn);

  // Clicking the empty space beside the content closes the modal
  article.addEventListener('click', (e) => {
    if (e.target === article) closeArticle();
  });
});

function openArticle(id, trigger) {
  const article = document.getElementById(id);
  if (!article || activeArticle) return;

  activeArticle = article;
  lastTrigger = trigger;

  hero.classList.add('is-fading');
  article.classList.add('is-open');
  document.body.classList.add('modal-open');
  article.scrollTop = 0;
  article.focus({ preventScroll: true });
}

function closeArticle() {
  if (!activeArticle) return;

  activeArticle.classList.remove('is-open');
  hero.classList.remove('is-fading');
  document.body.classList.remove('modal-open');

  if (lastTrigger) lastTrigger.focus();
  activeArticle = null;
  lastTrigger = null;
}

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const id = button.getAttribute('href').slice(1);
    openArticle(id, button);
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeArticle();
});