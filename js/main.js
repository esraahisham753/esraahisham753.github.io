const navbar = document.querySelector("nav");
const toggleBtn = document.querySelector(".navbar-toggler");

toggleBtn.addEventListener("click", (event) => {
  const currentClasses = navbar.classList;
  console.log(currentClasses);
  if (currentClasses.contains("fixed-top")) {
    navbar.classList.remove("fixed-top");
  } else {
    navbar.classList.add("fixed-top");
  }
});
