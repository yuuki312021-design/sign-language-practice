(() => {
  const root = document.getElementById('viewRoot');
  const notice = document.getElementById('languageNotice');
  const navButtons = [...document.querySelectorAll('.nav-link')];
  const language = 'jsl';
  let currentView = 'dictionary';
  let data = window.LOCAL_DATA;
  let examData = window.LOCAL_DATA.exam;
  let fingerData = window.LOCAL_DATA.fingerspelling;
  let searchText = '';
  let categoryFilter = 'all';
  let lessonCategory = '';
  let lessonIndex = 0;
  let quizState = null;
  let examState = null;
  let fsView = 'list';
  let fsFlash = null;
  let fsQuiz = null;
  let fsSpell = null;
  let fsName = null;
  let fsVideo = null;
  let spText = '';
  let spTokens = null;
  let spIndex = null;

  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const shuffle = list => [...list].sort(() => Math.random() - .5);
  const activeData = () => data[language];
  const imageBlock = (entry, className='word-image') => entry.image
    ? `<div class="${className} zoomable" data-zoom-src="${esc(entry.image)}" data-zoom-alt="${esc(entry.word)}" data-zoom-caption="${esc(entry.description || '')}" data-zoom-emoji="${esc(entry.emoji || '🤟')}"><img src="${esc(entry.image)}" alt="${esc(entry.word)}の手話イラスト" onerror="var p=this.parentElement;this.remove();p.insertAdjacentHTML('beforeend','<span class=\\'emoji\\'>${esc(entry.emoji || '🤟')}</span>')"><span class="category-tag">${esc(entry.category)}</span><span class="zoom-hint">🔍</span></div>`
    : `<div class="${className}"><span class="emoji" role="img" aria-label="${esc(entry.word)}の視覚アイコン">${esc(entry.emoji || '🤟')}</span><span class="category-tag">${esc(entry.category)}</span></div>`;

  // ---- zoom modal (shared by dictionary/lessons/fingerspelling images) ----
  const zoomModal = document.createElement('div');
  zoomModal.className = 'zoom-modal';
  zoomModal.innerHTML = '<div class="zoom-box"><button class="zoom-close" aria-label="閉じる">×</button><img alt=""><p class="zoom-caption"></p></div>';
  document.body.appendChild(zoomModal);
  zoomModal.addEventListener('click', event => { if (event.target === zoomModal || event.target.classList.contains('zoom-close')) closeZoom(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeZoom(); });
  function openZoom(src, alt, caption, fallbackEmoji) {
    if (!src) return;
    const image = zoomModal.querySelector('img');
    const box = zoomModal.querySelector('.zoom-box');
    const oldFallback = box.querySelector('.zoom-fallback');
    if (oldFallback) oldFallback.remove();
    image.style.display = '';
    image.onerror = () => {
      image.style.display = 'none';
      const fallback = document.createElement('div');
      fallback.className = 'zoom-fallback';
      fallback.textContent = fallbackEmoji || '🤟';
      box.insertBefore(fallback, zoomModal.querySelector('.zoom-caption'));
    };
    image.src = src;
    image.alt = alt || '';
    zoomModal.querySelector('.zoom-caption').textContent = caption || '';
    zoomModal.classList.add('open');
  }
  function closeZoom() { zoomModal.classList.remove('open'); }
  document.addEventListener('click', event => {
    const target = event.target.closest('[data-zoom-src]');
    if (target) openZoom(target.dataset.zoomSrc, target.dataset.zoomAlt, target.dataset.zoomCaption, target.dataset.zoomEmoji);
  });

  async function loadJson(path, fallback) {
    if (location.protocol === 'file:') return fallback;
    try {
      const response = await fetch(path, {cache:'no-store'});
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return await response.json();
    } catch (error) {
      console.warn(`Could not load ${path}; using bundled fallback.`, error);
      return fallback;
    }
  }

  async function initialize() {
    const [jsl, exam, fingerspelling] = await Promise.all([
      loadJson('data/jsl.json', window.LOCAL_DATA.jsl),
      loadJson('data/exam.json', window.LOCAL_DATA.exam),
      loadJson('data/fingerspelling-jsl.json', window.LOCAL_DATA.fingerspelling)
    ]);
    data = {jsl};
    examData = exam;
    fingerData = fingerspelling;
    render();
  }

  function updateLanguageChrome() {
    const current = activeData();
    document.getElementById('heroLanguage').textContent = current.languageName;
    notice.textContent = current.notice;
  }

  function render() {
    fsAnimCleanup();
    updateLanguageChrome();
    navButtons.forEach(button => button.classList.toggle('active', button.dataset.view === currentView));
    if (currentView === 'dictionary') renderDictionary();
    if (currentView === 'lessons') renderLessons();
    if (currentView === 'quiz') renderQuiz();
    if (currentView === 'fingerspelling') renderFingerspelling();
    if (currentView === 'sentence') renderSentence();
    if (currentView === 'exam') renderExam();
  }

  const normalizeText = value => String(value ?? '').normalize('NFKC').toLowerCase()
    .replace(/[\u30a1-\u30f6]/g, char => String.fromCharCode(char.charCodeAt(0) - 0x60))
    .replace(/\s+/g, ' ').trim();
  const searchTokens = query => normalizeText(query).split(' ').filter(Boolean);
  const entryHaystack = entry => normalizeText([entry.word, entry.reading, entry.description].join(' '));

  function renderDictionary() {
    const current = activeData();
    root.innerHTML = `<div class="section-head"><div><h2>手話辞書 <span class="badge">${esc(current.language)}</span></h2><p>単語を探して、手の形や動きを確認しよう。</p></div><span class="count" id="dictCount"></span></div>
      <div class="toolbar"><label class="search-wrap"><span class="sr-only">辞書を検索</span><input id="searchInput" type="search" placeholder="単語・読み・説明で検索" value="${esc(searchText)}"></label><label><span class="sr-only">カテゴリで絞り込む</span><select class="select-filter" id="categorySelect"><option value="all">すべてのカテゴリ</option>${current.categories.map(category => `<option value="${esc(category)}" ${categoryFilter === category ? 'selected' : ''}>${esc(category)}</option>`).join('')}</select></label></div>
      <div id="dictResults"></div>`;
    updateDictionaryResults();
    const input = root.querySelector('#searchInput');
    let composing = false;
    input.addEventListener('compositionstart', () => { composing = true; });
    input.addEventListener('compositionend', event => { composing = false; searchText = event.target.value; updateDictionaryResults(); });
    input.addEventListener('input', event => {
      if (composing || event.isComposing) return;
      searchText = event.target.value;
      updateDictionaryResults();
    });
    root.querySelector('#categorySelect').addEventListener('change', event => { categoryFilter = event.target.value; updateDictionaryResults(); });
  }

  function updateDictionaryResults() {
    const current = activeData();
    const tokens = searchTokens(searchText);
    const items = current.entries.filter(entry => {
      const haystack = entryHaystack(entry);
      return tokens.every(token => haystack.includes(token)) && (categoryFilter === 'all' || entry.category === categoryFilter);
    });
    root.querySelector('#dictCount').textContent = `${items.length} / ${current.entries.length} 語`;
    const select = root.querySelector('#categorySelect');
    if (select) select.value = categoryFilter;
    root.querySelector('#dictResults').innerHTML = `<div class="chips"><button class="chip ${categoryFilter === 'all' ? 'selected' : ''}" data-category="all">すべて</button>${current.categories.map(category => `<button class="chip ${categoryFilter === category ? 'selected' : ''}" data-category="${esc(category)}">${esc(category)}</button>`).join('')}</div>
      ${items.length ? `<div class="card-grid">${items.map(entry => `<article class="word-card">${imageBlock(entry)}<div class="word-body"><h3>${esc(entry.word)}</h3><p>${esc(entry.description)}</p>${entry.videoUrl ? `<a class="video-link" href="${esc(entry.videoUrl)}" target="_blank" rel="noopener">動画を見る ↗</a>` : ''}</div></article>`).join('')}</div>` : '<div class="empty-state">見つかりませんでした。検索語やカテゴリを変えてみてください。</div>'}`;
    root.querySelectorAll('[data-category]').forEach(button => button.addEventListener('click', () => { categoryFilter = button.dataset.category; updateDictionaryResults(); }));
  }

  function renderLessons() {
    const current = activeData();
    const categories = current.categories.filter(category => current.entries.some(entry => entry.category === category));
    if (!categories.includes(lessonCategory)) lessonCategory = categories[0];
    const items = current.entries.filter(entry => entry.category === lessonCategory);
    lessonIndex = Math.min(lessonIndex, Math.max(0, items.length - 1));
    const selected = items[lessonIndex];
    root.innerHTML = `<div class="section-head"><div><h2>テーマ別レッスン</h2><p>テーマを選んで、単語を順番に学ぼう。</p></div><span class="count">${esc(current.languageName)}</span></div>
      <div class="lesson-theme-row">${categories.map(category => `<button class="lesson-theme ${category === lessonCategory ? 'active' : ''}" data-lesson-category="${esc(category)}">${esc(category)} <span>${current.entries.filter(entry => entry.category === category).length}</span></button>`).join('')}</div>
      <div class="lesson-layout"><aside class="panel lesson-list">${items.map((entry,index) => `<button class="lesson-item ${index === lessonIndex ? 'active' : ''}" data-lesson-index="${index}"><span class="lesson-number">${String(index+1).padStart(2,'0')}</span>${esc(entry.word)}</button>`).join('')}</aside>
      <div><article class="lesson-card"><div>${selected.image ? `<img src="${esc(selected.image)}" alt="${esc(selected.word)}のイラスト" onerror="var p=this.parentElement;this.remove();p.insertAdjacentHTML('beforeend','<div class=\\'lesson-emoji\\'>${esc(selected.emoji || '🤟')}</div>')">` : `<div class="lesson-emoji" role="img" aria-label="${esc(selected.word)}">${esc(selected.emoji || '🤟')}</div>`}</div><div><span class="badge">${esc(lessonCategory)} · ${lessonIndex+1} / ${items.length}</span><h3>${esc(selected.word)}</h3><p>${esc(selected.description)}</p>${selected.videoUrl ? `<a class="video-link" href="${esc(selected.videoUrl)}" target="_blank" rel="noopener">動画を見る ↗</a>` : ''}</div></article><div class="step-nav"><button class="button secondary" id="lessonPrev" ${lessonIndex === 0 ? 'disabled' : ''}>← 前へ</button><button class="button" id="lessonNext" ${lessonIndex === items.length-1 ? 'disabled' : ''}>次へ →</button></div></div></div>`;
    root.querySelectorAll('[data-lesson-category]').forEach(button => button.addEventListener('click', () => { lessonCategory = button.dataset.lessonCategory; lessonIndex = 0; renderLessons(); }));
    root.querySelectorAll('[data-lesson-index]').forEach(button => button.addEventListener('click', () => { lessonIndex = Number(button.dataset.lessonIndex); renderLessons(); }));
    root.querySelector('#lessonPrev').addEventListener('click', () => { lessonIndex--; renderLessons(); });
    root.querySelector('#lessonNext').addEventListener('click', () => { lessonIndex++; renderLessons(); });
  }

  function beginQuiz(category) {
    const pool = activeData().entries.filter(entry => category === 'all' || entry.category === category);
    quizState = {category, questions:shuffle(pool), index:0, score:0, answered:false};
    renderQuiz();
  }

  function renderQuiz() {
    const current = activeData();
    if (!quizState) {
      const categories = ['all', ...current.categories];
      root.innerHTML = `<div class="section-head"><div><h2>テーマ別クイズ</h2><p>説明やイラストを見て、正しい単語を選ぼう。</p></div></div><div class="quiz-layout"><div class="panel" style="padding:22px"><p style="margin-top:0;color:var(--muted)">出題テーマ</p><div class="quiz-controls"><select class="select-filter" id="quizCategory">${categories.map(category => `<option value="${esc(category)}">${category === 'all' ? 'すべてのテーマ' : esc(category)}</option>`).join('')}</select><button class="button" id="startQuiz">シャッフルして開始</button></div></div></div>`;
      root.querySelector('#startQuiz').addEventListener('click', () => beginQuiz(root.querySelector('#quizCategory').value));
      return;
    }
    if (quizState.index >= quizState.questions.length) {
      const percentage = Math.round(quizState.score / quizState.questions.length * 100);
      root.innerHTML = `<div class="quiz-layout result panel"><span class="badge">${esc(quizState.category === 'all' ? 'すべてのテーマ' : quizState.category)}</span><h2>クイズ完了</h2><div class="score-big">${quizState.score} / ${quizState.questions.length}</div><p>${percentage}% 正解 · くり返し練習してみよう</p><button class="button" id="retryQuiz">もう一度シャッフル</button> <button class="button secondary" id="quizHome">テーマ選択へ</button></div>`;
      root.querySelector('#retryQuiz').addEventListener('click', () => beginQuiz(quizState.category));
      root.querySelector('#quizHome').addEventListener('click', () => { quizState = null; renderQuiz(); });
      return;
    }
    const question = quizState.questions[quizState.index];
    const distractors = shuffle(current.entries.filter(entry => entry.id !== question.id)).slice(0,3);
    const options = shuffle([question, ...distractors]);
    quizState.currentOptions = options;
    root.innerHTML = `<div class="section-head"><div><h2>クイズ</h2><p>${esc(quizState.category === 'all' ? 'すべてのテーマ' : quizState.category)}</p></div></div><div class="quiz-layout"><article class="quiz-card"><div class="quiz-progress"><span>問題 ${quizState.index+1} / ${quizState.questions.length}</span><span>正解 ${quizState.score}</span></div><p class="quiz-prompt">この説明に合う単語はどれ？</p>${question.image ? `<img class="quiz-visual" src="${esc(question.image)}" alt="${esc(question.word)}の手話イラスト" onerror="this.remove()">` : ''}<p style="color:var(--muted);line-height:1.7">${esc(question.description)}</p><div class="quiz-options">${options.map((entry,index) => `<button class="quiz-option" data-answer="${index}">${String.fromCharCode(65+index)}. ${esc(entry.word)}</button>`).join('')}</div><div id="quizFeedback"></div></article></div>`;
    root.querySelectorAll('[data-answer]').forEach(button => button.addEventListener('click', () => {
      if (quizState.answered) return;
      quizState.answered = true;
      const chosen = options[Number(button.dataset.answer)];
      const correct = chosen.id === question.id;
      if (correct) quizState.score++;
      root.querySelectorAll('[data-answer]').forEach(option => {
        option.disabled = true;
        if (options[Number(option.dataset.answer)].id === question.id) option.classList.add('correct');
        else if (option === button) option.classList.add('wrong');
      });
      root.querySelector('#quizFeedback').innerHTML = `<div class="feedback ${correct ? 'good' : 'bad'}">${correct ? '正解！' : `不正解。正解は「${esc(question.word)}」です。`}<br>${esc(question.description)}</div><div style="text-align:right;margin-top:14px"><button class="button" id="quizContinue">${quizState.index === quizState.questions.length-1 ? '結果を見る' : '次の問題へ'} →</button></div>`;
      root.querySelector('#quizContinue').addEventListener('click', () => { quizState.index++; quizState.answered = false; renderQuiz(); });
    }));
  }

  function examAreaLabel(areaId) {
    const area = (examData.areas || []).find(item => item.id === areaId);
    return area ? area.label : areaId;
  }

  function openDictionarySearch(term) {
    currentView = 'dictionary';
    searchText = term;
    categoryFilter = 'all';
    render();
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function startExamMode(mode) {
    if (mode === 'practical') examState = {mode:'practical', items:shuffle(examData.practicals), index:0, done:[], revealed:false};
    else examState = {mode:'mock', questions:shuffle(examData.questions), index:0, answers:[], score:0, answered:false};
    renderExam();
  }

  function renderExam() {
    if (!examState) { renderExamMenu(); return; }
    if (examState.mode === 'practical') {
      if (examState.index >= examState.items.length) renderPracticalResult();
      else renderPractical();
    } else {
      if (examState.index >= examState.questions.length) renderMockResult();
      else renderMockQuestion();
    }
  }

  function renderExamMenu() {
    root.innerHTML = `<div class="section-head"><div><h2>資格対策 <span class="badge">練習コンテンツ</span></h2><p>手話通訳士試験を意識したオリジナル問題で対策しよう。</p></div></div>
      <p class="exam-intro">${esc(examData.notice)}</p>
      <div class="mode-grid"><button class="mode-card" id="startMock"><strong>模擬試験モード(学科系)</strong><span>${examData.questions.length}問 · 4択 · 一問ずつ採点</span><p>手話通訳の倫理・原則、聴覚障害者文化・聴文化、通訳場面の対応、手話言語学的基礎の4分野から出題します。回答のたびに正誤と解説を表示し、最後にスコアと分野別正答率を確認できます。</p></button><button class="mode-card" id="startPractical"><strong>実技セルフ練習モード</strong><span>${examData.practicals.length}お題 · 日本語→手話 · 自己採点</span><p>日本語のお題文を見て自分で手話表現を組み立てたら、模範表現の解説と辞書リンクで確認し、自己採点します。</p></button></div>
      <div class="notice-box" style="max-width:790px;margin:18px auto 0">本コンテンツは非公式の練習教材であり、実際の試験問題ではありません。試験の出題範囲・形式・最新情報は公式発表で必ず確認してください。</div>`;
    root.querySelector('#startMock').addEventListener('click', () => startExamMode('mock'));
    root.querySelector('#startPractical').addEventListener('click', () => startExamMode('practical'));
  }

  function renderMockQuestion() {
    const question = examState.questions[examState.index];
    root.innerHTML = `<div class="section-head"><div><h2>模擬試験</h2><p>${esc(examData.title)}</p></div><span class="count">${examState.index+1} / ${examState.questions.length}</span></div>
      <p class="exam-intro">${esc(examData.notice)}</p>
      <article class="exam-card"><span class="exam-area">${esc(examAreaLabel(question.area))}</span><p class="exam-question">${esc(question.question)}</p><div class="quiz-options">${question.options.map((option,index) => `<button class="quiz-option" data-exam-answer="${index}">${String.fromCharCode(65+index)}. ${esc(option)}</button>`).join('')}</div><div id="examFeedback"></div></article>`;
    root.querySelectorAll('[data-exam-answer]').forEach(button => button.addEventListener('click', () => {
      if (examState.answered) return;
      examState.answered = true;
      const chosen = Number(button.dataset.examAnswer);
      const correct = chosen === question.answer;
      examState.answers.push(chosen);
      if (correct) examState.score++;
      root.querySelectorAll('[data-exam-answer]').forEach(option => {
        option.disabled = true;
        if (Number(option.dataset.examAnswer) === question.answer) option.classList.add('correct');
        else if (option === button) option.classList.add('wrong');
      });
      root.querySelector('#examFeedback').innerHTML = `<div class="feedback ${correct ? 'good' : 'bad'}">${correct ? '正解！' : `不正解。正解: ${esc(question.options[question.answer])}`}</div><p class="exam-explanation">${esc(question.explanation)}</p><div style="text-align:right;margin-top:14px"><button class="button" id="examNext">${examState.index === examState.questions.length-1 ? '結果を見る' : '次の問題へ'} →</button></div>`;
      root.querySelector('#examNext').addEventListener('click', () => { examState.index++; examState.answered = false; renderExam(); });
    }));
  }

  function renderMockResult() {
    const stats = (examData.areas || []).map(area => {
      const indices = examState.questions.map((question, index) => question.area === area.id ? index : -1).filter(index => index >= 0);
      const correct = indices.filter(index => examState.answers[index] === examState.questions[index].answer).length;
      return {label: area.label, correct, total: indices.length};
    });
    root.innerHTML = `<div class="exam-result"><div class="quiz-card result"><span class="badge">模擬試験 · 結果</span><h2>おつかれさまでした</h2><div class="score-big">${examState.score} / ${examState.questions.length}</div><p>${Math.round(examState.score/examState.questions.length*100)}% 正解 · 分野別正答率で弱点を確認しましょう</p><div class="area-stats">${stats.map(stat => `<div class="area-stat"><span>${esc(stat.label)}</span><div class="area-bar"><i style="width:${stat.total ? Math.round(stat.correct/stat.total*100) : 0}%"></i></div><b>${stat.correct} / ${stat.total}</b></div>`).join('')}</div><div style="margin-top:16px"><button class="button" id="examRetry">もう一度挑戦</button> <button class="button secondary" id="examHome">モード選択へ</button></div></div>
      <h3 style="margin:24px 0 12px">解答と解説</h3><div class="panel">${examState.questions.map((question, index) => `<div class="exam-review"><strong>${index+1}. ${esc(examAreaLabel(question.area))} — ${esc(question.question)}</strong><span>${examState.answers[index] === question.answer ? '✓ 正解' : `✗ あなたの回答: ${esc(question.options[examState.answers[index]])}`} · 正解: ${esc(question.options[question.answer])}</span><div style="color:var(--muted);margin-top:5px">${esc(question.explanation)}</div></div>`).join('')}</div><p class="exam-intro" style="margin-top:18px">${esc(examData.notice)}</p></div>`;
    root.querySelector('#examRetry').addEventListener('click', () => startExamMode('mock'));
    root.querySelector('#examHome').addEventListener('click', () => { examState = null; renderExam(); });
  }

  function renderPractical() {
    const item = examState.items[examState.index];
    const refs = (item.refs || []).filter(term => data.jsl.entries.some(entry => entry.word === term));
    root.innerHTML = `<div class="section-head"><div><h2>実技セルフ練習</h2><p>お題文を手話で表現したら、模範表現と見比べて自己採点しよう。</p></div><span class="count">${examState.index+1} / ${examState.items.length}</span></div>
      <article class="exam-card"><span class="exam-area">お題 ${examState.index+1} / ${examState.items.length}</span><p class="exam-question">「${esc(item.prompt)}」</p><p style="color:var(--muted);line-height:1.7">まず自分で手話表現を組み立てます。手の形・動き・表情を意識して、一度まとまった形で表現してみましょう。</p>
      ${examState.revealed ? `<div class="model-box"><strong>模範表現の解説</strong><p>${esc(item.model)}</p>${refs.length ? `<div class="ref-links">${refs.map(term => `<button class="ref-link" data-dict-ref="${esc(term)}">📖 辞書で「${esc(term)}」を確認</button>`).join('')}</div>` : ''}</div><p style="color:var(--muted);font-size:13px;margin:16px 0 8px">自己採点: 自分の表現と比べてどうでしたか？</p><div class="quiz-options"><button class="quiz-option" data-self="1">できた</button><button class="quiz-option" data-self="0">もう一度練習したい</button></div>` : `<div style="text-align:center;margin-top:20px"><button class="button" id="revealModel">模範表現の解説を見る</button></div><p class="hint-text">ヒント: ${esc(item.hint)}</p>`}
      </article>`;
    if (examState.revealed) {
      root.querySelectorAll('[data-self]').forEach(button => button.addEventListener('click', () => {
        examState.done.push(Number(button.dataset.self));
        examState.index++;
        examState.revealed = false;
        renderExam();
      }));
      root.querySelectorAll('[data-dict-ref]').forEach(button => button.addEventListener('click', () => openDictionarySearch(button.dataset.dictRef)));
    } else {
      root.querySelector('#revealModel').addEventListener('click', () => { examState.revealed = true; renderPractical(); });
    }
  }

  function renderPracticalResult() {
    const done = examState.done.filter(Boolean).length;
    root.innerHTML = `<div class="exam-result"><div class="quiz-card result"><span class="badge">実技セルフ練習 · 結果</span><h2>おつかれさまでした</h2><div class="score-big">${done} / ${examState.items.length}</div><p>「できた」と自己採点したお題の数です。模範表現の解説と辞書で、くり返し練習しましょう。</p><div style="margin-top:16px"><button class="button" id="practicalRetry">もう一度練習</button> <button class="button secondary" id="practicalHome">モード選択へ</button></div></div><p class="exam-intro" style="margin-top:18px">${esc(examData.notice)}</p></div>`;
    root.querySelector('#practicalRetry').addEventListener('click', () => startExamMode('practical'));
    root.querySelector('#practicalHome').addEventListener('click', () => { examState = null; renderExam(); });
  }

  // ---- Fingerspelling (指文字) --------------------------------------------
  const ROW_ORDER = [
    ['あ行',['a','i','u','e','o']],['か行',['ka','ki','ku','ke','ko']],['さ行',['sa','shi','su','se','so']],
    ['た行',['ta','chi','tsu','te','to']],['な行',['na','ni','nu','ne','no']],['は行',['ha','hi','fu','he','ho']],
    ['ま行',['ma','mi','mu','me','mo']],['や行',['ya','yu','yo']],['ら行',['ra','ri','ru','re','ro']],
    ['わ行',['wa','wo','n']],
  ];
  const fsById = id => fingerData.entries.find(e => e.id === id);
  const fsSeion = () => fingerData.entries.filter(e => e.type === 'seion');
  const fsByType = type => fingerData.entries.filter(e => e.type === type);

  function fsImageBlock(entry, big) {
    return `<div class="fs-tile zoomable" data-zoom-src="${esc(entry.image)}" data-zoom-alt="${esc(entry.char)}" data-zoom-caption="${esc(entry.description)}"><img src="${esc(entry.image)}" alt="指文字「${esc(entry.char)}」" loading="lazy"><span class="fs-char${big ? ' big' : ''}">${esc(entry.char)}</span></div>`;
  }

  function renderFingerspelling() {
    root.innerHTML = `<div class="section-head"><div><h2>指文字 <span class="badge">JSL</span></h2><p>五十音・濁音/半濁音・拗音/促音/長音まで、${fingerData.entries.length}文字を練習できます。</p></div></div>
      <p class="exam-intro">${esc(fingerData.notice)}</p>
      <div class="lesson-theme-row">
        <button class="lesson-theme ${fsView === 'list' ? 'active' : ''}" data-fs-view="list">一覧</button>
        <button class="lesson-theme ${fsView === 'flash' ? 'active' : ''}" data-fs-view="flash">フラッシュカード</button>
        <button class="lesson-theme ${fsView === 'quiz' ? 'active' : ''}" data-fs-view="quiz">クイズ</button>
        <button class="lesson-theme ${fsView === 'spell' ? 'active' : ''}" data-fs-view="spell">綴り練習</button>
        <button class="lesson-theme ${fsView === 'name' ? 'active' : ''}" data-fs-view="name">名前で練習</button>
        <button class="lesson-theme ${fsView === 'video' ? 'active' : ''}" data-fs-view="video">動画で練習</button>
      </div>
      <div id="fsBody"></div>`;
    root.querySelectorAll('[data-fs-view]').forEach(button => button.addEventListener('click', () => { fsView = button.dataset.fsView; fsFlash = null; fsQuiz = null; fsSpell = null; fsName = null; fsVideo = null; fsAnimCleanup(); renderFingerspelling(); }));
    if (fsView === 'list') renderFsList();
    else if (fsView === 'flash') renderFsFlash();
    else if (fsView === 'quiz') renderFsQuiz();
    else if (fsView === 'name') renderFsName();
    else if (fsView === 'video') renderFsVideo();
    else renderFsSpell();
  }

  function renderFsList() {
    const groups = ROW_ORDER.map(([label, ids]) => `<div class="fs-row"><span class="fs-row-label">${esc(label)}</span><div class="fs-grid">${ids.map(id => fsImageBlock(fsById(id))).join('')}</div></div>`).join('');
    const variants = (label, type) => `<div class="fs-row"><span class="fs-row-label">${esc(label)}</span><div class="fs-grid">${fsByType(type).map(entry => fsImageBlock(entry)).join('')}</div></div>`;
    root.querySelector('#fsBody').innerHTML = `${groups}
      ${variants('濁音','dakuon')}${variants('半濁音','handakuon')}${variants('拗音','youon')}${variants('促音','sokuon')}${variants('長音','chouon')}`;
  }

  // ---- 動画で練習 (Step 4f): YouTube埋め込み + 擬似動画アニメーション ----
  const FS_ANIM_SCENES = [
    { label: '① 手形を確認', cls: 's0' },
    { label: '② 拡大して確認', cls: 's1' },
    { label: '③ 文字とセットで覚える', cls: 's2' },
  ];
  const FS_ANIM_STEP_MS = 1500;

  function fsAnimCleanup() {
    if (fsVideo && fsVideo.anim && fsVideo.anim.timer) { clearTimeout(fsVideo.anim.timer); fsVideo.anim.timer = null; }
  }

  function fsEmbedUrl(video) {
    return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.videoId)}?rel=0&start=${Number(video.start) || 0}`;
  }

  function fsVideoPickerTiles(ids) {
    return ids.map(id => {
      const entry = fsById(id);
      if (!entry) return '';
      const hasVideo = !!entry.video;
      return `<button class="fsv-tile${fsVideo && fsVideo.id === id ? ' active' : ''}" data-fsv-char="${esc(id)}" title="${esc(entry.char)}"><span class="fsv-tile-char">${esc(entry.char)}</span><span class="fsv-tile-kind" aria-label="${hasVideo ? 'YouTube動画あり' : 'アニメのみ'}">${hasVideo ? '▶' : '✦'}</span></button>`;
    }).join('');
  }

  function renderFsVideo() {
    if (!fsVideo) fsVideo = { id: 'a', mode: 'video', loaded: false, anim: { playing: false, speed: 1, scene: 0, timer: null } };
    const entry = fsById(fsVideo.id) || fingerData.entries[0];
    fsVideo.id = entry.id;
    const hasVideo = !!entry.video;
    const mode = hasVideo ? fsVideo.mode : 'anim';
    fsVideo.mode = mode;
    const groups = ROW_ORDER.map(([label, ids]) => `<div class="fs-row"><span class="fs-row-label">${esc(label)}</span><div class="fs-grid fsv-grid">${fsVideoPickerTiles(ids)}</div></div>`).join('');
    const variants = (label, type) => `<div class="fs-row"><span class="fs-row-label">${esc(label)}</span><div class="fs-grid fsv-grid">${fingerData.entries.filter(e => e.type === type).map(e => fsVideoPickerTiles([e.id])).join('')}</div></div>`;
    root.querySelector('#fsBody').innerHTML = `<div class="fsv-layout">
      <section class="fsv-player" aria-live="polite">${fsVideoPlayerHtml(entry, mode)}</section>
      <section class="fsv-picker">
        <p class="fsv-legend"><span><b>▶</b> YouTube動画(要インターネット)</span><span><b>✦</b> アニメのみ(擬似動画)</span></p>
        ${groups}${variants('濁音','dakuon')}${variants('半濁音','handakuon')}${variants('拗音','youon')}${variants('促音','sokuon')}${variants('長音','chouon')}
      </section>
    </div>`;
    root.querySelectorAll('[data-fsv-char]').forEach(button => button.addEventListener('click', () => {
      fsAnimCleanup();
      fsVideo = { id: button.dataset.fsvChar, mode: fsVideo.mode, loaded: false, anim: { playing: false, speed: fsVideo.anim.speed, scene: 0, timer: null } };
      renderFsVideo();
    }));
    root.querySelectorAll('[data-fsv-mode]').forEach(button => button.addEventListener('click', () => {
      fsAnimCleanup();
      fsVideo.mode = button.dataset.fsvMode;
      fsVideo.anim = { playing: false, speed: fsVideo.anim.speed, scene: 0, timer: null };
      renderFsVideo();
    }));
    const loadButton = root.querySelector('[data-fsv-load]');
    if (loadButton) loadButton.addEventListener('click', () => { fsVideo.loaded = true; renderFsVideo(); });
    if (mode === 'anim') fsWireAnimControls(entry);
  }

  function fsVideoPlayerHtml(entry, mode) {
    const video = entry.video;
    const head = `<div class="fsv-head"><div class="fsv-title"><span class="fsv-char-big">${esc(entry.char)}</span><div><h4>${esc(entry.char)} <small>${esc(entry.romaji)}</small></h4><p>${esc(entry.description)}</p></div></div>
      <div class="fsv-modes">
        <button class="lesson-theme${mode === 'video' ? ' active' : ''}" data-fsv-mode="video" ${video ? '' : 'disabled title="この文字は動画なし(アニメで練習)"'}>▶ 動画</button>
        <button class="lesson-theme${mode === 'anim' ? ' active' : ''}" data-fsv-mode="anim">✦ アニメ</button>
      </div></div>`;
    if (mode === 'video' && video) {
      const credit = `<p class="fsv-credit">出典: <a href="${esc(video.creditUrl)}" target="_blank" rel="noopener noreferrer">${esc(video.credit)}</a>「${esc(video.title)}」<span class="fsv-credit-note">(YouTube埋め込みのみ・ダウンロード/再配布はしていません)</span></p>`;
      const player = fsVideo.loaded
        ? `<div class="fsv-frame"><iframe class="fsv-iframe" src="${esc(fsEmbedUrl(video))}" title="${esc(video.title)}" loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>`
        : `<div class="fsv-frame fsv-poster"><img src="${esc(entry.image)}" alt="指文字「${esc(entry.char)}」のイラスト(動画のサムネイル代替)"><button class="button fsv-load" data-fsv-load>▶ 動画を見る</button></div>`;
      return `<article class="fsv-card">${head}${player}${credit}</article>`;
    }
    const scene = FS_ANIM_SCENES[fsVideo.anim.scene];
    return `<article class="fsv-card fsv-anim-card">${head}
      <div class="fsv-frame fsv-anim-stage ${scene.cls}">
        <img src="${esc(entry.image)}" alt="指文字「${esc(entry.char)}」のイラスト">
        <span class="fsv-anim-char">${esc(entry.char)}</span>
        <span class="fsv-anim-label">${esc(scene.label)}</span>
      </div>
      <div class="fsv-anim-controls">
        <button class="button" data-fsv-anim-toggle>${fsVideo.anim.playing ? '⏸ 一時停止' : '▶ 再生'}</button>
        <label class="fsv-speed"><span class="sr-only">再生速度</span>
          <select class="select-filter" data-fsv-anim-speed>
            <option value="0.6"${fsVideo.anim.speed === 0.6 ? ' selected' : ''}>ゆっくり</option>
            <option value="1"${fsVideo.anim.speed === 1 ? ' selected' : ''}>ふつう</option>
            <option value="1.6"${fsVideo.anim.speed === 1.6 ? ' selected' : ''}>はやい</option>
          </select>
        </label>
        <span class="fsv-anim-dots" role="status">${FS_ANIM_SCENES.map((s, i) => `<i class="${i === fsVideo.anim.scene ? 'on' : ''}" aria-label="シーン${i + 1}"></i>`).join('')}</span>
      </div>
      <p class="fsv-credit fsv-anim-note">※アニメは既存イラストを使った擬似動画(オフラインでも動作)。正確な動きは動画や講師で確認してください。</p>
    </article>`;
  }

  function fsWireAnimControls(entry) {
    const body = root.querySelector('#fsBody');
    const stage = body.querySelector('.fsv-anim-stage');
    const toggle = body.querySelector('[data-fsv-anim-toggle]');
    const speed = body.querySelector('[data-fsv-anim-speed]');
    if (!stage || !toggle) return;
    const paint = () => {
      const anim = fsVideo.anim;
      stage.className = `fsv-frame fsv-anim-stage ${FS_ANIM_SCENES[anim.scene].cls}`;
      stage.querySelector('.fsv-anim-label').textContent = FS_ANIM_SCENES[anim.scene].label;
      body.querySelectorAll('.fsv-anim-dots i').forEach((dot, i) => dot.classList.toggle('on', i === anim.scene));
      toggle.textContent = anim.playing ? '⏸ 一時停止' : '▶ 再生';
    };
    const schedule = () => {
      fsAnimCleanup();
      if (!fsVideo.anim.playing) return;
      fsVideo.anim.timer = setTimeout(() => {
        fsVideo.anim.scene = (fsVideo.anim.scene + 1) % FS_ANIM_SCENES.length;
        paint();
        schedule();
      }, FS_ANIM_STEP_MS / fsVideo.anim.speed);
    };
    fsVideo.paint = paint;
    fsVideo.schedule = schedule;
    toggle.addEventListener('click', () => { fsVideo.anim.playing = !fsVideo.anim.playing; paint(); schedule(); });
    if (speed) speed.addEventListener('change', () => {
      fsVideo.anim.speed = Number(speed.value) || 1;
      if (fsVideo.anim.playing) schedule();
    });
    if (fsVideo.anim.playing) schedule();
  }


  function fsDeckFor(mode) {
    return mode === 'all' ? fingerData.entries : fingerData.entries.filter(e => e.type === mode);
  }

  function renderFsFlash() {
    if (!fsFlash) fsFlash = { deck: shuffle(fsSeion()), index: 0, dir: 'c2i', revealed: false };
    const body = root.querySelector('#fsBody');
    const entry = fsFlash.deck[fsFlash.index];
    if (!entry) { body.innerHTML = '<div class="empty-state">文字がありません。</div>'; return; }
    body.innerHTML = `<div class="quiz-layout"><div class="quiz-controls" style="margin-bottom:14px">
        <select class="select-filter" id="fsFlashDir"><option value="c2i" ${fsFlash.dir==='c2i'?'selected':''}>文字 → 画像</option><option value="i2c" ${fsFlash.dir==='i2c'?'selected':''}>画像 → 文字</option></select>
        <button class="button secondary" id="fsFlashShuffle">シャッフル</button>
      </div>
      <article class="quiz-card" style="text-align:center">
        <div class="quiz-progress"><span>${fsFlash.index+1} / ${fsFlash.deck.length}</span><span>${fsFlash.dir==='c2i' ? '文字を見て手の形を思い浮かべよう' : '画像を見て文字を思い浮かべよう'}</span></div>
        ${fsFlash.dir === 'c2i'
          ? `<div class="fs-flash-char">${esc(entry.char)}</div>${fsFlash.revealed ? fsImageBlock(entry, true) : '<button class="button" id="fsReveal">画像を見る</button>'}`
          : `${fsImageBlock(entry, true)}${fsFlash.revealed ? `<div class="fs-flash-char">${esc(entry.char)}</div>` : '<button class="button" id="fsReveal">文字を見る</button>'}`}
        ${fsFlash.revealed ? `<p style="color:var(--muted);line-height:1.7;max-width:480px;margin:14px auto 0">${esc(entry.description)}</p>` : ''}
        <div class="step-nav"><button class="button secondary" id="fsPrev" ${fsFlash.index===0?'disabled':''}>← 前へ</button><button class="button" id="fsNext">${fsFlash.revealed ? '次へ →' : 'わかった(次へ)'}</button></div>
      </article></div>`;
    root.querySelector('#fsFlashDir').addEventListener('change', event => { fsFlash.dir = event.target.value; fsFlash.revealed = false; renderFsFlash(); });
    root.querySelector('#fsFlashShuffle').addEventListener('click', () => { fsFlash.deck = shuffle(fsSeion()); fsFlash.index = 0; fsFlash.revealed = false; renderFsFlash(); });
    const revealBtn = root.querySelector('#fsReveal');
    if (revealBtn) revealBtn.addEventListener('click', () => { fsFlash.revealed = true; renderFsFlash(); });
    root.querySelector('#fsPrev').addEventListener('click', () => { fsFlash.index = Math.max(0, fsFlash.index-1); fsFlash.revealed = false; renderFsFlash(); });
    root.querySelector('#fsNext').addEventListener('click', () => { fsFlash.index = Math.min(fsFlash.deck.length-1, fsFlash.index+1); fsFlash.revealed = false; renderFsFlash(); });
  }

  function fsBeginQuiz() {
    fsQuiz = { questions: shuffle(fsSeion()), index: 0, score: 0, answered: false };
  }

  function renderFsQuiz() {
    const body = root.querySelector('#fsBody');
    if (!fsQuiz) {
      body.innerHTML = `<div class="panel" style="padding:22px;max-width:520px;margin:0 auto;text-align:center"><p style="margin-top:0;color:var(--muted)">画像を見て、正しい指文字(読み)を4択で選びます。</p><button class="button" id="fsStartQuiz">クイズを始める</button></div>`;
      root.querySelector('#fsStartQuiz').addEventListener('click', () => { fsBeginQuiz(); renderFsQuiz(); });
      return;
    }
    if (fsQuiz.index >= fsQuiz.questions.length) {
      const pct = Math.round(fsQuiz.score / fsQuiz.questions.length * 100);
      body.innerHTML = `<div class="quiz-layout result panel"><h2>指文字クイズ完了</h2><div class="score-big">${fsQuiz.score} / ${fsQuiz.questions.length}</div><p>正答率 ${pct}%</p><button class="button" id="fsQuizRetry">もう一度</button></div>`;
      root.querySelector('#fsQuizRetry').addEventListener('click', () => { fsBeginQuiz(); renderFsQuiz(); });
      return;
    }
    const question = fsQuiz.questions[fsQuiz.index];
    const distractors = shuffle(fsSeion().filter(e => e.id !== question.id)).slice(0, 3);
    const options = shuffle([question, ...distractors]);
    body.innerHTML = `<div class="quiz-layout"><article class="quiz-card" style="text-align:center">
      <div class="quiz-progress"><span>問題 ${fsQuiz.index+1} / ${fsQuiz.questions.length}</span><span>正解 ${fsQuiz.score}</span></div>
      <p class="quiz-prompt">この指文字はどの文字？</p>
      ${fsImageBlock(question, true)}
      <div class="quiz-options" style="margin-top:14px">${options.map((entry,index) => `<button class="quiz-option" data-fs-answer="${index}">${esc(entry.char)}</button>`).join('')}</div>
      <div id="fsQuizFeedback"></div>
    </article></div>`;
    root.querySelectorAll('[data-fs-answer]').forEach(button => button.addEventListener('click', () => {
      if (fsQuiz.answered) return;
      fsQuiz.answered = true;
      const chosen = options[Number(button.dataset.fsAnswer)];
      const correct = chosen.id === question.id;
      if (correct) fsQuiz.score++;
      root.querySelectorAll('[data-fs-answer]').forEach(option => {
        option.disabled = true;
        if (options[Number(option.dataset.fsAnswer)].id === question.id) option.classList.add('correct');
        else if (option === button) option.classList.add('wrong');
      });
      root.querySelector('#fsQuizFeedback').innerHTML = `<div class="feedback ${correct?'good':'bad'}">${correct ? '正解！' : `不正解。正解は「${esc(question.char)}」です。`}</div><div style="text-align:right;margin-top:14px"><button class="button" id="fsQuizNext">${fsQuiz.index===fsQuiz.questions.length-1?'結果を見る':'次へ'} →</button></div>`;
      root.querySelector('#fsQuizNext').addEventListener('click', () => { fsQuiz.index++; fsQuiz.answered = false; renderFsQuiz(); });
    }));
  }

  function kanaKey(ch) {
    const norm = String(ch).normalize('NFKC'); // 半角カナ等も正規化
    const code = norm.codePointAt(0);
    if (code >= 0x30A1 && code <= 0x30F6) return String.fromCharCode(code - 0x60); // カタカナ→ひらがな
    return norm;
  }

  function kanaToFsEntries(reading) {
    const chars = [...String(reading || '')];
    const out = [];
    for (const ch of chars) {
      if (ch === ' ' || ch === '　') continue;
      const entry = fingerData.entries.find(e => e.char === kanaKey(ch));
      if (entry) out.push(entry);
    }
    return out;
  }

  // 名前練習用: 未対応の文字(漢字・記号など)もプレースホルダーとして並べる
  function kanaToNameSeq(text) {
    const chars = [...String(text || '')];
    const out = [];
    for (const ch of chars) {
      if (ch === ' ' || ch === '　') continue;
      const entry = fingerData.entries.find(e => e.char === kanaKey(ch));
      out.push(entry || { char: ch, missing: true });
    }
    return out;
  }

  function renderFsName() {
    const body = root.querySelector('#fsBody');
    if (!fsName) fsName = { text: '', index: 0, mode: 'step', quiz: null, order: null };
    // 入力行はモード切替やゲーム中に再描画しない(IME入力が壊れないようにするため)
    body.innerHTML = `<div class="quiz-layout"><article class="quiz-card" style="text-align:center">
      <p class="quiz-prompt">自分の名前を指文字で練習しよう</p>
      <p style="color:var(--muted);margin:6px 0 14px">名前の読みをひらがな・カタカナで入力してください(漢字は使えません。カタカナと半角カナはひらがなに変換されます)。入力した名前は保存されません。</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">
        <input type="text" id="fsNameInput" value="${esc(fsName.text)}" placeholder="例: たなか、サトウ ユウキ" autocomplete="off" style="flex:1;min-width:220px;max-width:360px;padding:10px 14px;border:1px solid var(--line);border-radius:10px;font-size:16px">
        <button class="button" id="fsNameShow">指文字で表示</button>
      </div>
      <div id="fsNameMissing"></div>
      <div class="lesson-theme-row" style="justify-content:center;margin-top:14px">
        <button class="lesson-theme ${fsName.mode === 'step' ? 'active' : ''}" data-fs-name-mode="step">順に見る</button>
        <button class="lesson-theme ${fsName.mode === 'quiz' ? 'active' : ''}" data-fs-name-mode="quiz">見て当てる</button>
        <button class="lesson-theme ${fsName.mode === 'order' ? 'active' : ''}" data-fs-name-mode="order">並べ替え</button>
      </div>
      <div id="fsNameBody"></div>
    </article></div>`;
    const show = () => {
      const value = root.querySelector('#fsNameInput').value;
      if (value === fsName.text) return;
      fsName.text = value;
      fsName.index = 0;
      fsName.mode = 'step';
      fsName.quiz = null;
      fsName.order = null;
      root.querySelectorAll('[data-fs-name-mode]').forEach(b => b.classList.toggle('active', b.dataset.fsNameMode === 'step'));
      renderFsNameMode();
    };
    root.querySelector('#fsNameShow').addEventListener('click', show);
    root.querySelector('#fsNameInput').addEventListener('keydown', event => {
      if (event.key === 'Enter' && !event.isComposing) show();
    });
    root.querySelectorAll('[data-fs-name-mode]').forEach(button => button.addEventListener('click', () => {
      fsName.mode = button.dataset.fsNameMode;
      fsName.quiz = null;
      fsName.order = null;
      root.querySelectorAll('[data-fs-name-mode]').forEach(b => b.classList.toggle('active', b.dataset.fsNameMode === fsName.mode));
      renderFsNameMode();
    }));
    renderFsNameMode();
  }

  function fsNameSeq() {
    return kanaToNameSeq(fsName.text);
  }

  function renderFsNameMode() {
    const seq = fsNameSeq();
    const missing = seq.filter(s => s.missing);
    const note = root.querySelector('#fsNameMissing');
    if (note) note.innerHTML = missing.length
      ? `<p style="color:#c0392b;margin:10px 0 0">※ 指文字がない文字(${missing.map(s => esc(s.char)).join(' ')})は灰色で表示されます。漢字は読みをかなで入力してください。</p>`
      : '';
    if (fsName.mode === 'quiz') renderFsNameQuiz();
    else if (fsName.mode === 'order') renderFsNameOrder();
    else renderFsNameStep();
  }

  function renderFsNameStep() {
    const container = root.querySelector('#fsNameBody');
    const seq = fsNameSeq();
    if (fsName.index > seq.length - 1) fsName.index = Math.max(0, seq.length - 1);
    const current = seq[fsName.index];
    if (!seq.length) {
      container.innerHTML = '<div class="empty-state" style="margin-top:16px">入力すると、ここに指文字が並んで表示されます。</div>';
      return;
    }
    container.innerHTML = `
      ${current ? (current.missing
        ? `<div class="fs-tile missing" style="margin:0 auto;max-width:120px"><span class="fs-char" style="font-size:34px;line-height:1.5;color:var(--muted)">?</span><span class="fs-char">${esc(current.char)}</span></div>`
        : fsImageBlock(current, true)) : ''}
      ${current ? `<p style="color:var(--muted);margin-top:14px">${fsName.index + 1} / ${seq.length} 文字目:「${esc(current.char)}」${current.description ? ' — ' + esc(current.description) : ' — 指文字がありません。'}</p>` : ''}
      <div class="step-nav"><button class="button secondary" id="fsNamePrev" ${fsName.index === 0 ? 'disabled' : ''}>← 前の文字</button><button class="button" id="fsNameNext" ${fsName.index >= seq.length - 1 ? 'disabled' : ''}>次の文字 →</button></div>
      <div class="fs-grid" style="justify-content:center;margin-top:16px">${seq.map((s, index) => s.missing
        ? `<div class="fs-tile missing ${index === fsName.index ? 'active' : ''}"><span class="fs-char" style="font-size:34px;line-height:1.5;color:var(--muted)">?</span><span class="fs-char">${esc(s.char)}</span></div>`
        : `<div class="fs-tile ${index === fsName.index ? 'active' : ''}" data-fs-name-step="${index}"><img src="${esc(s.image)}" alt="指文字「${esc(s.char)}」"><span class="fs-char">${esc(s.char)}</span></div>`).join('')}</div>`;
    root.querySelectorAll('[data-fs-name-step]').forEach(tile => tile.addEventListener('click', () => { fsName.index = Number(tile.dataset.fsNameStep); renderFsNameStep(); }));
    const prev = root.querySelector('#fsNamePrev'), next = root.querySelector('#fsNameNext');
    if (prev) prev.addEventListener('click', () => { fsName.index--; renderFsNameStep(); });
    if (next) next.addEventListener('click', () => { fsName.index++; renderFsNameStep(); });
  }

  function renderFsNameQuiz() {
    const container = root.querySelector('#fsNameBody');
    const seq = fsNameSeq().filter(s => !s.missing);
    if (!seq.length) {
      container.innerHTML = '<div class="empty-state" style="margin-top:16px">先に名前を入力すると、指文字を見て当てるクイズができます。</div>';
      return;
    }
    if (!fsName.quiz) fsName.quiz = { questions: seq, index: 0, score: 0, answered: false };
    const quiz = fsName.quiz;
    if (quiz.index >= quiz.questions.length) {
      const pct = Math.round(quiz.score / quiz.questions.length * 100);
      container.innerHTML = `<h3>名前クイズ完了</h3><div class="score-big">${quiz.score} / ${quiz.questions.length}</div><p>正答率 ${pct}%</p><div class="step-nav" style="justify-content:center"><button class="button" id="fsNameQuizRetry">もう一度</button></div>`;
      root.querySelector('#fsNameQuizRetry').addEventListener('click', () => { fsName.quiz = null; renderFsNameQuiz(); });
      return;
    }
    const question = quiz.questions[quiz.index];
    const pool = fingerData.entries.filter(e => e.char !== question.char);
    const options = shuffle([question, ...shuffle(pool).slice(0, 3)]);
    container.innerHTML = `
      <div class="quiz-progress"><span>問題 ${quiz.index + 1} / ${quiz.questions.length}</span><span>正解 ${quiz.score}</span></div>
      <p class="quiz-prompt">この指文字はどの文字？</p>
      ${fsImageBlock(question, true)}
      <div class="quiz-options" style="margin-top:14px">${options.map((entry, index) => `<button class="quiz-option" data-fs-nq-answer="${index}">${esc(entry.char)}</button>`).join('')}</div>
      <div id="fsNameQuizFeedback"></div>`;
    root.querySelectorAll('[data-fs-nq-answer]').forEach(button => button.addEventListener('click', () => {
      if (quiz.answered) return;
      quiz.answered = true;
      const chosen = options[Number(button.dataset.fsNqAnswer)];
      const correct = chosen.char === question.char;
      if (correct) quiz.score++;
      root.querySelectorAll('[data-fs-nq-answer]').forEach(option => {
        option.disabled = true;
        if (options[Number(option.dataset.fsNqAnswer)].char === question.char) option.classList.add('correct');
        else if (option === button) option.classList.add('wrong');
      });
      root.querySelector('#fsNameQuizFeedback').innerHTML = `<div class="feedback ${correct ? 'good' : 'bad'}">${correct ? '正解！' : `不正解。正解は「${esc(question.char)}」です。`}</div><div style="text-align:right;margin-top:14px"><button class="button" id="fsNameQuizNext">${quiz.index === quiz.questions.length - 1 ? '結果を見る' : '次へ'} →</button></div>`;
      root.querySelector('#fsNameQuizNext').addEventListener('click', () => { quiz.index++; quiz.answered = false; renderFsNameQuiz(); });
    }));
  }

  function renderFsNameOrder() {
    const container = root.querySelector('#fsNameBody');
    const seq = fsNameSeq().filter(s => !s.missing);
    if (seq.length < 2) {
      container.innerHTML = '<div class="empty-state" style="margin-top:16px">指文字2文字以上の名前を入力すると、並べ替え練習ができます。</div>';
      return;
    }
    if (!fsName.order) fsName.order = { tiles: shuffle(seq.map((_, i) => i)).map(j => ({ j, placed: 0 })), progress: 0, wrong: null };
    const state = fsName.order;
    const done = state.progress >= seq.length;
    container.innerHTML = `
      <p class="quiz-prompt">${done ? '並べ替え完了！' : '指文字を名前の順にタップしよう'}</p>
      ${state.wrong != null && !done ? `<div class="feedback bad" style="margin-top:10px">まだ違うよ。次は${state.progress + 1}文字目の指文字を探そう。</div>` : ''}
      ${done ? `<div class="feedback good" style="margin-top:10px">すべて正しい順番に並びました！「${esc(fsNameSeq().map(s => s.char).join(''))}」の指文字の並び順をもう一度確かめてみよう。</div>` : ''}
      <div class="fs-grid" style="justify-content:center;margin-top:14px">${state.tiles.map((t, k) => `
        <div class="fs-tile ${t.placed ? 'active' : ''}" data-fs-name-order="${k}" style="position:relative;${t.placed ? '' : 'cursor:pointer'}">
          <img src="${esc(seq[t.j].image)}" alt="指文字">
          ${t.placed ? `<span class="fs-char">${esc(seq[t.j].char)}</span><span style="position:absolute;top:4px;left:6px;font-weight:800;color:var(--green-dark)">${t.placed}</span>` : '<span class="fs-char" style="color:var(--muted)">?</span>'}
        </div>`).join('')}</div>
      ${done ? '<div class="step-nav" style="justify-content:center"><button class="button" id="fsNameOrderRetry">もう一度</button></div>' : ''}`;
    if (done) {
      root.querySelector('#fsNameOrderRetry').addEventListener('click', () => { fsName.order = null; renderFsNameOrder(); });
      return;
    }
    root.querySelectorAll('[data-fs-name-order]').forEach(tile => tile.addEventListener('click', () => {
      const t = state.tiles[Number(tile.dataset.fsNameOrder)];
      if (t.placed) return;
      if (seq[t.j].char === seq[state.progress].char) { state.progress++; t.placed = state.progress; state.wrong = null; }
      else state.wrong = Number(tile.dataset.fsNameOrder);
      renderFsNameOrder();
    }));
  }

  function renderFsSpell() {
    const body = root.querySelector('#fsBody');
    const words = data.jsl.entries.filter(entry => kanaToFsEntries(entry.reading).length > 1);
    if (!fsSpell) fsSpell = { wordId: words[0] && words[0].id, index: 0 };
    const word = words.find(entry => entry.id === fsSpell.wordId) || words[0];
    if (!word) { body.innerHTML = '<div class="empty-state">練習できる単語がありません。</div>'; return; }
    const seq = kanaToFsEntries(word.reading);
    fsSpell.index = Math.min(fsSpell.index, seq.length - 1);
    const current = seq[fsSpell.index];
    body.innerHTML = `<div class="quiz-layout"><div class="quiz-controls" style="margin-bottom:14px"><select class="select-filter" id="fsSpellWord">${words.map(entry => `<option value="${esc(entry.id)}" ${entry.id===word.id?'selected':''}>${esc(entry.word)} (${esc(entry.reading)})</option>`).join('')}</select></div>
      <article class="quiz-card" style="text-align:center">
        <p class="quiz-prompt">「${esc(word.word)}」(${esc(word.reading)}) を指文字で順番に表してみましょう</p>
        <div class="fs-grid" style="justify-content:center">${seq.map((entry,index) => `<div class="fs-tile ${index===fsSpell.index?'active':''}" data-fs-spell-step="${index}"><img src="${esc(entry.image)}" alt="${esc(entry.char)}"><span class="fs-char">${esc(entry.char)}</span></div>`).join('')}</div>
        <p style="color:var(--muted);margin-top:14px">${fsSpell.index+1} / ${seq.length} 文字目:「${esc(current.char)}」 — ${esc(current.description)}</p>
        <div class="step-nav"><button class="button secondary" id="fsSpellPrev" ${fsSpell.index===0?'disabled':''}>← 前の文字</button><button class="button" id="fsSpellNext" ${fsSpell.index===seq.length-1?'disabled':''}>次の文字 →</button></div>
      </article></div>`;
    root.querySelector('#fsSpellWord').addEventListener('change', event => { fsSpell.wordId = event.target.value; fsSpell.index = 0; renderFsSpell(); });
    root.querySelectorAll('[data-fs-spell-step]').forEach(tile => tile.addEventListener('click', () => { fsSpell.index = Number(tile.dataset.fsSpellStep); renderFsSpell(); }));
    const prev = root.querySelector('#fsSpellPrev'), next = root.querySelector('#fsSpellNext');
    if (prev) prev.addEventListener('click', () => { fsSpell.index--; renderFsSpell(); });
    if (next) next.addEventListener('click', () => { fsSpell.index++; renderFsSpell(); });
  }

  // ---- Sentence practice (文章練習) -----------------------------------------
  // 入力文章を辞書エントリ(word/reading)の最長一致で手話に変換し、辞書にない
  // かなは指文字に、指文字でも表せない文字(漢字・記号など)はグレーの
  // プレースホルダに分解して、語順どおりのカード列で表示する。
  const sentenceKey = value => String(value ?? '').normalize('NFKC').toLowerCase()
    .replace(/[\u30a1-\u30f6]/g, char => String.fromCharCode(char.charCodeAt(0) - 0x60));

  function sentenceLookup() {
    if (!spIndex) {
      const items = [];
      for (const entry of activeData().entries) {
        const seen = new Set();
        for (const source of [entry.word, entry.reading]) {
          const key = sentenceKey(source).replace(/\s+/g, '');
          if (!key || seen.has(key)) continue;
          seen.add(key);
          items.push({key, entry, isWord: source === entry.word});
        }
      }
      items.sort((a, b) => b.key.length - a.key.length || (b.isWord ? 1 : 0) - (a.isWord ? 1 : 0));
      spIndex = items;
    }
    return spIndex;
  }

  function tokenizeSentence(text) {
    const lookup = sentenceLookup();
    const flat = [];
    for (const chunk of String(text || '').split(/[\s\u3000]+/).filter(Boolean)) {
      const chars = [...chunk];
      const keys = chars.map(ch => sentenceKey(ch));
      let i = 0;
      while (i < chars.length) {
        let matched = null;
        for (const item of lookup) {
          if (item.key.length > chars.length - i) continue;
          if (item.key === keys.slice(i, i + item.key.length).join('')) { matched = item; break; }
        }
        if (matched) {
          flat.push({type: 'dict', text: chars.slice(i, i + matched.key.length).join(''), entry: matched.entry});
          i += matched.key.length;
          continue;
        }
        const fsEntry = fingerData.entries.find(e => e.char === keys[i]);
        flat.push({type: fsEntry ? 'fs' : 'none', text: chars[i], entry: fsEntry});
        i++;
      }
    }
    const tokens = [];
    for (const token of flat) {
      if (token.type !== 'fs' && token.type !== 'none') { tokens.push(token); continue; }
      const prev = tokens[tokens.length - 1];
      if (prev && prev.type === token.type) {
        prev.text += token.text;
        prev.run.push({char: token.text, entry: token.entry});
      } else {
        tokens.push({type: token.type, text: token.text, run: [{char: token.text, entry: token.entry}]});
      }
    }
    return tokens;
  }

  function spDictCard(token) {
    const entry = token.entry;
    const visual = entry.image
      ? `<div class="sp-visual zoomable" data-zoom-src="${esc(entry.image)}" data-zoom-alt="${esc(entry.word)}" data-zoom-caption="${esc(entry.description || '')}" data-zoom-emoji="${esc(entry.emoji || '🤟')}"><img src="${esc(entry.image)}" alt="${esc(entry.word)}の手話イラスト" loading="lazy" onerror="var p=this.parentElement;this.remove();p.insertAdjacentHTML('beforeend','<span class=\\'emoji\\'>${esc(entry.emoji || '🤟')}</span>')"><span class="zoom-hint">🔍</span></div>`
      : `<div class="sp-visual"><span class="emoji">${esc(entry.emoji || '🤟')}</span></div>`;
    const sameAsWord = sentenceKey(token.text) === sentenceKey(entry.word);
    return `<article class="sp-card">${visual}<div class="sp-body"><span class="sp-kind dict">辞書</span><h4>${esc(token.text)}</h4>${sameAsWord ? '' : `<span class="sp-note">辞書語: ${esc(entry.word)}(${esc(entry.reading)})</span>`}<p>${esc(entry.description)}</p></div></article>`;
  }

  function spRunCard(token) {
    const tiles = token.type === 'fs'
      ? token.run.map(unit => fsImageBlock(unit.entry)).join('')
      : token.run.map(unit => `<div class="fs-tile missing"><span class="fs-char">?</span><span class="fs-char">${esc(unit.char)}</span></div>`).join('');
    return `<article class="sp-card${token.type === 'none' ? ' kind-none' : ''}"><div class="sp-visual"><div class="sp-fs-run">${tiles}</div></div><div class="sp-body"><span class="sp-kind ${token.type}">${token.type === 'fs' ? '指文字' : '表現不可'}</span><h4>${esc(token.text)}</h4></div></article>`;
  }

  function renderSentence() {
    root.innerHTML = `<div class="section-head"><div><h2>文章練習 <span class="badge">自由入力</span></h2><p>日本語の文章を手話と指文字に分解して、カードで確認できます。</p></div></div>
      <div class="sp-input-card">
        <label class="sr-only" for="spInput">日本語の文章</label>
        <textarea id="spInput" class="sp-textarea" placeholder="例: 今日 は 晴れ です" autocomplete="off">${esc(spText)}</textarea>
        <div class="sp-input-row">
          <button class="button" id="spConvert">手話にする</button>
          <span class="sp-legend">
            <span><i class="sp-dot dict"></i>辞書にあった語</span>
            <span><i class="sp-dot fs"></i>指文字で綴った部分</span>
            <span><i class="sp-dot none"></i>表現できない部分(漢字・記号など)</span>
          </span>
        </div>
        <div class="sp-examples"><span class="sp-examples-label">例文:</span>${['今日 は 晴れ です', '水 を 飲みたい', 'だれ が 来る?', 'きょう は あめ です'].map(example => `<button class="sp-example" data-sp-example="${esc(example)}">${esc(example)}</button>`).join('')}</div>
      </div>
      <div id="spResult"></div>`;
    // IME入力を壊さないため、入力中は再描画しない(renderFsName と同じ方式:
    // 入力イベントを監視せず、値はボタン押下時にだけ読み取る)
    const input = root.querySelector('#spInput');
    let composing = false;
    input.addEventListener('compositionstart', () => { composing = true; });
    input.addEventListener('compositionend', () => { composing = false; });
    const convert = () => {
      spText = input.value;
      spTokens = tokenizeSentence(spText);
      renderSentenceResult();
    };
    root.querySelector('#spConvert').addEventListener('click', convert);
    input.addEventListener('keydown', event => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter' && !composing && !event.isComposing) convert();
    });
    root.querySelectorAll('[data-sp-example]').forEach(button => button.addEventListener('click', () => {
      input.value = button.dataset.spExample;
      convert();
    }));
    renderSentenceResult();
  }

  function renderSentenceResult() {
    const container = root.querySelector('#spResult');
    if (!container) return;
    if (spTokens == null) {
      container.innerHTML = '<div class="empty-state">文章を入力して「手話にする」を押すと、ここに手話のカードが並びます。</div>';
      return;
    }
    if (!spTokens.length) {
      container.innerHTML = '<div class="empty-state">変換できる部分がありません。日本語の文章を入力してください。</div>';
      return;
    }
    const dictCount = spTokens.filter(token => token.type === 'dict').length;
    const fsCount = spTokens.filter(token => token.type === 'fs').reduce((sum, token) => sum + token.run.length, 0);
    const noneCount = spTokens.filter(token => token.type === 'none').reduce((sum, token) => sum + token.run.length, 0);
    container.innerHTML = `<div class="sp-summary">辞書の手話 <b>${dictCount}</b> 語 · 指文字 <b>${fsCount}</b> 文字 · 表現できない部分 <b>${noneCount}</b> 文字</div>
      <div class="sp-cards">${spTokens.map(token => token.type === 'dict' ? spDictCard(token) : spRunCard(token)).join('')}</div>`;
  }

  navButtons.forEach(button => button.addEventListener('click', () => { currentView = button.dataset.view; render(); window.scrollTo({top:0,behavior:'smooth'}); }));
  initialize();
})();
