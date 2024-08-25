/**
 * @fileoverview Main JS file.
 */

/**
 * @description Navbar goes out of the screen when scrolling down and comes back when scrolling up.
 * @param {HTMLElement} navbar - Navbar element.
 */

function navbarScroll(navbar) {

    let prevScrollPos = window.pageYOffset;

    window.onscroll = function() {
        const currentScrollPos = window.pageYOffset;
        if (prevScrollPos > currentScrollPos) navbar.style.top = "0";
        else navbar.style.top = "-69px";
        prevScrollPos = currentScrollPos;
    }

}

document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.querySelector("nav");
    navbarScroll(navbar);
});



const header = document.querySelector('header');

// As the user scrolls, keep the header background image in the same place
window.addEventListener('scroll', () => {
    header.style.backgroundPositionY = window.scrollY / 4 + 'px';
    header.style.filter = 'blur(' + (1 - window.scrollY / 1000) + ')';
});