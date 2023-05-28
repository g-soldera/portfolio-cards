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
