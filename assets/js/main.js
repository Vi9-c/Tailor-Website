// This message will appear in your browser's Console (F12 -> Console tab)
console.log("JavaScript is connected and ready to go!");

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const track = document.getElementById("track");
let currentSlide = 0;

// 1. Function to update Slide and Dots
function updateCarousel(index) {
  // Reset all
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  // Set active
  slides[index].classList.add("active");
  dots[index].classList.add("active");
}

// 2. Button Logic
document.querySelector(".next-btn").addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel(currentSlide);
});

document.querySelector(".prev-btn").addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateCarousel(currentSlide);
});

// 3. Dot Click Logic
dots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    const index = parseInt(e.target.getAttribute("data-index"));
    currentSlide = index;
    updateCarousel(currentSlide);
  });
});

// 4. Swipe Logic (Touch Events)
let touchStartX = 0;
let touchEndX = 0;

track.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

track.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const threshold = 50; // Min distance to count as swipe
  if (touchEndX < touchStartX - threshold) {
    // Swiped Left -> Next Slide
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel(currentSlide);
  }
  if (touchEndX > touchStartX + threshold) {
    // Swiped Right -> Prev Slide
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel(currentSlide);
  }
}

// Hamburger Menu Logic
const hamburger = document.querySelector(".hamburger-menu");
const navMenu = document.querySelector("nav ul.nav-menu"); // Target the specific nav menu

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

  // Block scope to prevent variable conflicts
  {
    const reviewTrack = document.getElementById('reviewTrack');
    const reviewSlides = document.querySelectorAll('.review-slide');
    // Select the dots from the master container
    const dots = document.querySelectorAll('#masterDots .dot');
    let reviewIndex = 0;

    function nextReview() {
      // Safety check
      if (!reviewTrack || reviewSlides.length === 0) return;

      reviewIndex++;
      
      // Loop back to start
      if (reviewIndex >= reviewSlides.length) {
        reviewIndex = 0;
      }

      // 1. Move the track
      reviewTrack.style.transform = `translateX(-${reviewIndex * 100}%)`;
      
      // 2. Update the dots
      updateDots();
    }

    function updateDots() {
      // Remove 'active' from ALL dots
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Add 'active' to the CURRENT dot
      // (The ? checks if the dot exists to prevent errors)
      if (dots[reviewIndex]) {
        dots[reviewIndex].classList.add('active');
      }
    }

    // Auto-slide every 4 seconds
    setInterval(nextReview, 4000);
  }