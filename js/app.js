// Theme Toggle
const themeToggle = () => {
  document.body.classList.toggle('dark');
};
document.querySelectorAll('#themeToggle').forEach(btn => btn.onclick = themeToggle);

// Load Home
function loadHome() {
  fetch('data/contents.json')
    .then(res => res.json())
    .then(contents => {
      const container = document.getElementById('contentBoxes');
      container.innerHTML = '';
      contents.forEach(c => {
        const div = document.createElement('div');
        div.className = 'box';
        div.innerText = c.title;
        div.onclick = () => window.location = `content.html?id=${c.id}`;
        container.appendChild(div);
      });
      const search = document.getElementById('search');
      search.oninput = () => {
        const term = search.value.toLowerCase();
        container.innerHTML = '';
        contents.filter(c => c.title.toLowerCase().includes(term))
                .forEach(c => {
                  const div = document.createElement('div');
                  div.className = 'box';
                  div.innerText = c.title;
                  div.onclick = () => window.location = `content.html?id=${c.id}`;
                  container.appendChild(div);
                });
      };
    });
}
// Add Home button to all pages except index
document.querySelectorAll('header').forEach(header => {
  if (!window.location.href.includes('index.html')) {
    const homeBtn = document.createElement('button');
    homeBtn.className = 'nav-btn';
    homeBtn.innerText = '🏠 Home';
    homeBtn.onclick = () => window.location='index.html';
    header.prepend(homeBtn);
  }
});

// Load Chapters
function loadChapters() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  fetch('data/contents.json')
    .then(res => res.json())
    .then(contents => {
      const content = contents.find(c => c.id == id);
      document.getElementById('contentTitle').innerText = content.title;
      fetch(content.chapters_url)
        .then(res => res.json())
        .then(chapters => {
          const container = document.getElementById('chapterBoxes');
          chapters.forEach(ch => {
            const div = document.createElement('div');
            div.className = 'box';
            div.innerText = ch.title;
            div.onclick = () => window.location = `chapter.html?url=${encodeURIComponent(ch.content_url)}`;
            container.appendChild(div);
          });
        });
    });
}

// Load Chapter Content
function loadChapterContent() {
  const params = new URLSearchParams(window.location.search);
  const url = params.get('url');
  fetch(url)
    .then(res => res.json())
    .then(chapter => {
      document.getElementById('chapterTitle').innerText = chapter.title;
      const container = document.getElementById('chapterContent');
      chapter.sections.forEach(sec => {
        const div = document.createElement('div');
        div.className = 'chapter-section';
        div.innerHTML = `<h3>${sec.heading}</h3><p>${sec.text}</p>`;
        container.appendChild(div);
      });
    });
}

// Load Quiz
function loadQuiz() {
  fetch('data/quiz.json')
    .then(res => res.json())
    .then(quiz => {
      const container = document.getElementById('quizContainer');
      quiz.forEach(q => {
        const div = document.createElement('div');
        div.className = 'chapter-section';
        div.innerHTML = `<h3>${q.question}</h3><ul>${q.options.map(o => `<li>${o}</li>`).join('')}</ul><p><b>Answer:</b> ${q.answer}</p>`;
        container.appendChild(div);
      });
    });
}
