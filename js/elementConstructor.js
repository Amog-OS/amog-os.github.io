/**
 * @fileOverview Constructs repeated elements such as the header and footer.
 */

const links = [
    {href: `./index.html`, name: `Home`, id: `home`, icon: "nf-md-home"},
    {href: `./download.html`, name: `Download`, id: `downloads`, icon: "nf-md-download"},
    {href: `./help.html`, name: `Help`, id: `help`, icon: "nf-md-help"},
    {href: `./credits.html`, name: `Credits`, id: `credits`, icon: "nf-md-crowd"},
    {href: `https://opencollective.com/amogos`, name: `Donate`, id: `donate`, icon: "nf-md-hand_heart"},
];

const socialLinks = [
    {href: `https://discord.gg/z86muknm9y`, name: `Discord`, id: `discord`, icon: "nf-md-discord"},
    {href: `https://github.com/amog-os/`, name: `GitHub`, id: `github`, icon: "nf-md-github"},
    {href: `https://www.reddit.com/r/amogOS/`, name: `Reddit`, id: `reddit`, icon: "nf-md-reddit"}
];

/**
 * @name navConstructor
 */

function navConstructor() {

    const nav = document.createElement(`nav`);
    nav.id = `navbar`;
    nav.classList.add(`navbar`);

    const logo = document.createElement(`a`);
    logo.href = `./index.html`;
    logo.classList.add(`logo`);
    logo.innerText = `AmogOS`;
    nav.appendChild(logo);

    for (const link of links) {
        if (link.id === `home`) continue;
        const a = document.createElement(`a`);
        a.href = link.href;
        a.innerText = link.name;
        a.id = link.id;
        a.classList.add(`nav__link`);

        const icon = document.createElement(`i`);
        icon.classList.add(`nf`, link.icon);
        a.prepend(icon);

        nav.appendChild(a);
    }

    const menu = document.createElement(`a`);
    menu.id = `menu`;
    menu.href = `javascript:void(0);`;
    menu.onclick = () => {
        if (nav.className === 'navbar') nav.className += ' responsive';
        else nav.className = 'navbar';
    };

    const menuIcon = document.createElement(`i`);
    menuIcon.classList.add(`nf`, `nf-fa-bars`);
    menu.appendChild(menuIcon);


    nav.append(menu);
    document.body.prepend(nav);

}

function createElement(tag, classes = [], content = '') {
    const element = document.createElement(tag);
    if (classes.length > 0) element.classList.add(...classes);
    if (content) element.innerHTML = content;
    return element;
}

function createLink(link) {
    const a = createElement('a', ['footer__link']);
    a.href = link.href;
    a.innerText = link.name;
    a.id = link.id;
    return a;
}

function footerConstructor() {
    const footer = createElement('footer');

    // noinspection HtmlUnknownTarget
    footer.appendChild(createElement('div', ['logo'], '<img src="img/toppat-banner-light.png" alt="Logo" class="logo__image">'));

    // noinspection HtmlUnknownTarget
    const textContent = `
        <h2>AmogOS <span id="toppat"><img src="img/toppat.png" alt="Top Hat" id="topHatImage" class="topHatImage">Toppat</span></h2>
        <p>The sus OS for sus computers is back, with more <span>sus</span> than ever before.</p>
        <p><strong>© AmogOS Project</strong> All suspiciousness reserved.</p>
    `;
    const text = createElement('div', ['footer__text', 'footer__subsection'], textContent);

    const linksContainer = createElement('div', ['footer__links', 'footer__subsection']);
    linksContainer.appendChild(createElement('h2', [], 'Links'));
    links.forEach(link => linksContainer.appendChild(createLink(link)));

    const social = createElement('div', ['footer__social', 'footer__subsection']);
    social.appendChild(createElement('h2', [], 'Social'));

    socialLinks.forEach(link => social.appendChild(createLink(link)));


    footer.append(text, linksContainer, social);
    document.body.appendChild(footer);
}

navConstructor();
footerConstructor();