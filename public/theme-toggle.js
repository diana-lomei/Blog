const toggleBtn = document.getElementById("theme-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

let theme = localStorage.getItem("theme") || (prefersDark ? "dark" : "light");
applyTheme(theme);

toggleBtn.addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  applyTheme(theme);
  localStorage.setItem("theme", theme);
});

function applyTheme(mode) {
  document.body.classList.toggle("dark", mode === "dark");
  toggleBtn.textContent = mode === "dark" ? "☀️" : "🌙";
}
