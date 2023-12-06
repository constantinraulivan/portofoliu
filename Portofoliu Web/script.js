const hamburgerMenu = document.getElementsByClassName("hamburger_menu")[0];
const navbarLinks = document.getElementsByClassName("navbar_links")[0];
const nav = document.querySelector(".navbar");
const sectionOne = document.getElementById("#section--1");

const tabs = document.querySelectorAll(".studies__tab");
const tabsContainer = document.querySelector(".studies__tab--container");
const tabsContent = document.querySelectorAll(".studies__content");

//////////// Încalc Principiul DRY!!!//////////////////
const circularProgressHtml = document.querySelector(".circular_progress_html");
const progressValueHtml = document.querySelector(".progress_value_html");
const circularProgressCss = document.querySelector(".circular_progress_css");
const progressValueCss = document.querySelector(".progress_value_css");
const circularProgressJs = document.querySelector(".circular_progress_js");
const progressValueJs = document.querySelector(".progress_value_js");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const footerText = document.querySelector(".sec__text");

// <-- /////////////////////////     HAMBURGER MENU START     /////////////////////////// --> //

hamburgerMenu.addEventListener("click", () => {
  hamburgerMenu.classList.toggle("active");
  navbarLinks.classList.toggle("active");
});

document.querySelectorAll(".navbar_links").forEach((links) =>
  links.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("active");
    navbarLinks.classList.toggle("active");
  })
);

// <-- /////////////////////////     HAMBURGER MENU END    /////////////////////////// --> //

// <-- /////////////////////////     STICKY NAVBAR START     /////////////////////////// --> //

const header = document.querySelector(".header_container");
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// <-- /////////////////////////     STICKY NAVBAR END     /////////////////////////// --> //

function startProgressAnimation(
  startValue,
  endValue,
  progressValueElement,
  circularProgressElement,
  animationSpeed
) {
  let currentValue = 0;
  let progressInterval = setInterval(() => {
    currentValue++;
    progressValueElement.textContent = `${currentValue}%`;
    circularProgressElement.style.background = `conic-gradient(#009fe3 ${
      currentValue * 3.6
    }deg, #ededed 0deg)`;

    if (currentValue === endValue) {
      clearInterval(progressInterval);
    }
  }, animationSpeed);
}
let speed = 20;
// Exemplu de utilizare:

startProgressAnimation(0, 90, progressValueHtml, circularProgressHtml, speed);
startProgressAnimation(0, 60, progressValueCss, circularProgressCss, speed);
startProgressAnimation(0, 40, progressValueJs, circularProgressJs, speed);

//////////// Încalc Principiul DRY!!!//////////////////

// <-- /////////////////////////     MODAL WINDOW START     /////////////////////////// --> //

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// <-- /////////////////////////     MODAL WINDOW END     /////////////////////////// --> //

// <-- /////////////////////////     STUDIES TAB START     /////////////////////////// --> //

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".studies__tab");
  // Guard clause
  if (!clicked) return;
  tabs.forEach((t) => t.classList.remove("studies__tab--active"));
  clicked.classList.add("studies__tab--active");
  tabsContent.forEach((c) => c.classList.remove("studies__content--active"));

  // Activate content area
  document
    .querySelector(`.studies__content--${clicked.dataset.tab}`)
    .classList.add("studies__content--active");
});

// <-- /////////////////////////     STUDIES TAB END     /////////////////////////// --> //

// <-- /////////////////////////     TESTIMONIAL SLIDER START     /////////////////////////// --> //

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// <-- /////////////////////////     TESTIMONIAL SLIDER START     /////////////////////////// --> //

// <-- /////////////////////////     FOOTER ANIMATION START     /////////////////////////// --> //

const textLoad = function () {
  setTimeout(() => {
    footerText.textContent = "Portofolio";
  }, 0);
};

textLoad();

// <-- /////////////////////////     FOOTER ANIMATION END     /////////////////////////// --> //

// <-- /////////////////////////     SCROLL BTN START     /////////////////////////// --> //

const calcScrollValue = () => {
  const scrollProgress = document.querySelector(".progress__scroll");
  const pos = document.documentElement.scrollTop;
  const calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrollValue = Math.round((pos * 100) / calcHeight);
  if (pos > 100) {
    scrollProgress.style.display = "flex";
  } else {
    scrollProgress.style.display = "none";
  }

  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });

  scrollProgress.style.background = `conic-gradient(#009fe3 ${scrollValue}%, #ffffff ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

// <-- /////////////////////////     SCROLL BTN DARK MODE  END     /////////////////////////// --> //

// <-- /////////////////////////     TOGGLE BTN DARK MODE START     /////////////////////////// --> //

const body = document.querySelector("body");
const toggleBtn = document.querySelector(".toggle_btn");
const theme = localStorage.getItem("theme");

theme && body.classList.add(theme);

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark-mode");
  } else {
    localStorage.removeItem("theme");
  }
});

toggleBtn.addEventListener("click", () =>
  toggleBtn.classList.toggle("toggle_active")
);

// <-- /////////////////////////     TOGGLE BTN END     /////////////////////////// --> //

// <-- /////////////////////////     TEST    /////////////////////////// --> //

document.querySelectorAll("navbarLinks").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// <-- /////////////////////////     TEST     /////////////////////////// --> //
