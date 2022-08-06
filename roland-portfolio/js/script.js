/**********
NOTE: I don't think you really need any of this code.
It just overcomplicates something that can easily be done in CSS.

window.onscroll = function () {
  myFunction();
};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}
**********/

const spans = document.querySelectorAll("h1 span");
spans.forEach((span) =>
  span.addEventListener("mouseover", function (e) {
    span.classList.add("animated", "rubberBand");
  })
);
spans.forEach((span) =>
  span.addEventListener("mouseout", function (e) {
    // Added a timeout here that makes the animation smoother
    // by removing the class only after the animation is finished
    // and the user moves away from the element.

    // Also fixed a typo here which was causing the rubberBand
    // to stay attached to the element. Class names are tricky that way
    // because there is no way to lint them properly.
    setTimeout(() => {
      span.classList.remove("animated", "rubberBand");
    }, 1000);
  })
);

const htmlBar = document.querySelector(".bar-html");
const cssBar = document.querySelector(".bar-css");
const jsBar = document.querySelector(".bar-javascript");
const reactBar = document.querySelector(".bar-react");

// Fix for making sure the timeline animates when you
// either click the navigation item or scroll yourself.
// The animation also no longer animates in and out if you
// continue to scroll around. I think think this is a less
// distracting user experience.

// Also, we're now pulling gsap from the CDN at the bottom of the index page.
var t1 = gsap.timeline({
  scrollTrigger: { trigger: ".skills", start: "-=32px top" },
});

t1.fromTo(
  htmlBar,
  0.75,
  { width: `calc(0% - 6px)` },
  { width: `calc(90% - 6px)`, ease: Power4.easeOut }
)
  .fromTo(
    cssBar,
    0.75,
    { width: `calc(0% - 6px)` },
    { width: `calc(90% - 6px)`, ease: Power4.easeOut }
  )
  .fromTo(
    jsBar,
    0.75,
    { width: `calc(0% - 6px)` },
    { width: `calc(75% - 6px)`, ease: Power4.easeOut }
  )
  .fromTo(
    reactBar,
    0.75,
    { width: `calc(0% - 6px)` },
    { width: `calc(78% - 6px)`, ease: Power4.easeOut }
  );

// Updated your version of gsap and now this can be done in the timeline itself.

// const controller = gsap.ScrollMagic.Controller();
// const scene = new ScrollMagic.Scene({
//   triggerElement: ".skills",
//   triggerHook: 0,
// })

//   .setTween(t1)
//   .addTo(controller);

const showRequiredCategory = (event) => {
  const getId = event.id;
  const links = document.querySelectorAll(".work-category button");
  for (i = 0; i < links.length; i++) {
    if (links[i].hasAttribute("class")) {
      links[i].classList.remove("active");
    }
  }

  event.classList.add("active");
  const getCategory = document.querySelector(`.category-${getId}`);
  // Replaced the regex with a simple class to make it easier to read and less brittle.
  // If you were to place a class in front of category- everything would break.
  // Order of class names shouldn't matter in the HTML. They do matter in CSS however.
  const categories = document.querySelectorAll(".card-list");
  for (i = 0; i < categories.length; i++) {
    console.log(categories);
    if (categories[i].hasAttribute("class")) {
      categories[i].classList.remove("show-category");
      categories[i].classList.add("hide-category");
    }
  }

  getCategory.classList.remove("hide-category");
  getCategory.classList.add("show-category");
};
