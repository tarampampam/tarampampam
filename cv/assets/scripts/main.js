// This script should be optional, and critical parts of the page should work without it

const onLoad = () => {
  document.body.classList.remove('loading');
}

window.addEventListener('load', onLoad);
window.setTimeout(onLoad, 3500); // fallback
