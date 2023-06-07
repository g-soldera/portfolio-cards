function toggleMode() {
  const html = document.documentElement
  html.classList.toggle("light")
}

function checkColorScheme() {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
  const html = document.documentElement

  if (isDarkMode) {
    html.classList.remove("light")
  } else {
    html.classList.add("light")
  }
}
window.addEventListener("load", checkColorScheme)

var menuToggle = document.querySelector(".menu-toggle")
var overlay = document.querySelector(".overlay")
var sideBlock = document.querySelector(".sideblock")

menuToggle.addEventListener("click", function () {
  sideBlock.classList.toggle("open")
  menuToggle.classList.toggle("hide")
  overlay.classList.toggle("show")
})

document.addEventListener("mouseup", function (e) {
  var container = sideBlock

  // Se o clique for fora do side block, feche-o
  if (!container.contains(e.target) && container.classList.contains("open")) {
    container.classList.remove("open")
    menuToggle.classList.remove("hide")
    overlay.classList.remove("show")
  }
})
