const hamburger = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.sidebuttonsnavigator');
const navItems = document.querySelectorAll('.nav-item');

function toggle() {
    navMenu.classList.toggle('activate');
}

hamburger.addEventListener('click', toggle);

Array.from(navItems).forEach(function (item) {
    item.addEventListener('click', toggle);
}); 
