function fitGrid(grid, availH, availW, paddingV) {
  if (!grid) return;
  grid.style.transform = '';
  grid.style.transformOrigin = 'top center';

  requestAnimationFrame(() => {
    const naturalH = grid.scrollHeight;
    const naturalW = grid.scrollWidth;
    const scaleH   = (availH - paddingV) / naturalH;
    const scaleW   = availW / naturalW;
    const scale    = Math.min(scaleH, scaleW, 1);
    grid.style.transform = scale < 1 ? `scale(${scale})` : '';
  });
}

function fitScreens() {
  const gameScreen   = document.querySelector('.game-screen');
  if (!gameScreen) return;
  const availH = gameScreen.clientHeight;
  const availW = gameScreen.clientWidth;

  fitGrid(document.querySelector('.projects-grid'), availH, availW, 80);
  fitGrid(document.querySelector('.skills-grid'),   availH, availW, 60);
}

// Aguarda TUDO carregar (imagens inclusive) antes de calcular
window.addEventListener('load', () => {
  fitScreens();
  window.addEventListener('resize', fitScreens);
});
