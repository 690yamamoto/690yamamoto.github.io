document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workItems = document.querySelectorAll('.work-item');
  const modal = document.getElementById('modal');
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');
  const closeBtn = document.querySelector('.modal-close');
  const overlay = document.querySelector('.modal-overlay');

  // --- 1. 絞り込み機能 ---
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.dataset.filter;

      workItems.forEach(item => {
        if (filterValue === 'all' || item.dataset.category === filterValue) {
          item.classList.remove('is-hidden');
        } else {
          item.classList.add('is-hidden');
        }
      });
    });
  });

  // --- 2. モーダル表示 ---
  workItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();

      // HTMLのデータ属性から情報を取得
      const title = item.dataset.title;
      const desc = item.dataset.desc;
      const images = item.dataset.img ? item.dataset.img.split(",") : [];
      
      // Memo用のデータ
      const memoCat = item.dataset.memoCat;
      const memoTime = item.dataset.memoTime;
      const memoTool = item.dataset.memoTool;

      // モーダル内をリセット
      modalBody.innerHTML = "";
      modalTitle.textContent = title;

      // ① 画像エリアの構築
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("modal-images");
      images.forEach(src => {
        const img = document.createElement("img");
        img.src = src.trim();
        img.classList.add("modal-img");
        imageWrapper.appendChild(img);
      });
      modalBody.appendChild(imageWrapper);

      // ② 説明文とMemo表の構築
      const textWrapper = document.createElement("div");
      textWrapper.classList.add("modal-text");
      
      // ここでテンプレートリテラルを使ってHTMLを組み立てる
      textWrapper.innerHTML = `
        <p class="work-desc">${desc}</p>
        <div class="memo">
          <p class="memo-title font-en">Memo</p>
          <div class="memo-info">
            <dl class="flex-box">
              <dt class="memo_dt">カテゴリー</dt>
              <dd class="memo_dd">${memoCat}</dd>
            </dl>
            <dl class="flex-box">
              <dt class="memo_dt">制作時間</dt>
              <dd class="memo_dd">${memoTime}</dd>
            </dl>
            <dl class="flex-box">
              <dt class="memo_dt">使用ソフト</dt>
              <dd class="memo_dd">${memoTool}</dd>
            </dl>
          </div>
        </div>
      `;
      modalBody.appendChild(textWrapper);

      modal.classList.add('is-open');
      requestAnimationFrame(() => { modalBody.scrollTop = 0; });
    });
  });

  // --- 3. 閉じる処理 ---
  const closeModal = () => modal.classList.remove('is-open');
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
});

window.addEventListener('scroll', () => {
  const scrollAmount = window.scrollY; // 現在のスクロール量を取得

  if (scrollAmount > 200) {
    document.body.classList.add('is-scrolled');
  } else {
    document.body.classList.remove('is-scrolled');
  }
});