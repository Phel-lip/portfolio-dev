lucide.createIcons({ color: "#06B6D4" });

let currentIndex = 0;
let container;
let cards;
let total;

let startX = 0;
let endX = 0;

window.onload = () => {

  container = document.getElementById('carousel');
  cards = container.querySelectorAll('.project-card');
  total = cards.length / 2;

  const startCard = cards[total];
  const containerWidth = container.offsetWidth;

  container.scrollLeft = startCard.offsetLeft - (containerWidth / 2) + (startCard.offsetWidth / 2);

  currentIndex = total;

  container.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; });

  container.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

};

function scrollProjects(direction) {

  const containerWidth = container.offsetWidth;

  currentIndex += direction;

  const card = cards[currentIndex];

  container.scrollTo({
    left: card.offsetLeft - (containerWidth / 2) + (card.offsetWidth / 2),
    behavior: "smooth"
  });

  setTimeout(() => {

    if (currentIndex >= total * 2 - 1) {

      currentIndex = total;

      const resetCard = cards[currentIndex];

      container.scrollLeft = resetCard.offsetLeft - (containerWidth / 2) + (resetCard.offsetWidth / 2);

    }

    if (currentIndex <= 0) {

      currentIndex = total;

      const resetCard = cards[currentIndex];

      container.scrollLeft = resetCard.offsetLeft - (containerWidth / 2) + (resetCard.offsetWidth / 2);

    }

  }, 300);

}

function handleSwipe() {

  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) scrollProjects(1);
    else scrollProjects(-1);
  }
  
}