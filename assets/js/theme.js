/*=============== THEME TOGGLE ===============*/
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

const savedTheme = localStorage.getItem("theme") || "dark";

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
  themeIcon.classList.replace("ri-moon-line", "ri-sun-line");
}

themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light-theme");

  if (isLight) {
    themeIcon.classList.replace("ri-moon-line", "ri-sun-line");
    localStorage.setItem("theme", "light");
  } else {
    themeIcon.classList.replace("ri-sun-line", "ri-moon-line");
    localStorage.setItem("theme", "dark");
  }
});
