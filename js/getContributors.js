/**
 * @fileoverview This file contains the functions to get the contributors of the project for the
 *               contributors page
 */

const githubApiUrl = `https://api.github.com`
const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 hr

/**
 * @name getContributorExtraInfo
 * @description This function gets the extra information of a contributor from the GitHub API
 * @param {string} user Username of the contributor
 * @returns {Promise<JSON>} The extra information of the contributor
 */

async function getContributorExtraInfo(user, repo) {
    const url = `${githubApiUrl}/users/${user}`
    const response = await fetch(url)
    const data = await response.json()
    data.repo = repo;
    return await data;
}

/**
 * @name getContributors
 * @description This function gets the contributors of the project from the GitHub API
 * @param {string} org Parent organization of the repository
 * @param {string} repo Repository name
 * @returns {Promise<JSON>} The contributors of the project
 */

async function getContributors(org, repo) {
    const url = `${githubApiUrl}/repos/${org}/${repo}/contributors`
    const response = await fetch(url)
    const data = await response.json()

    try {
        if (data.message.startsWith(`API rate limit exceeded`)) {
            console.error(`Rate limit exceeded!`)
            return []
        }
    } catch (e) {
        console.error(`Error while checking rate limit: ${e}`)
    }

    for (let i = 0; i < data.length; i++) data[i].repo = repo;
    return data;
}

/**
 * @name populateContributors
 * @description This function populates the contributors page with the contributors of the project.
 *              Note that the client may be rate limited by the GitHub API.
 * @returns {Promise<void>}
 */

async function populateContributors() {

    const organisation = `amog-os`;
    const repos = [`AmogOS`, `AmogOStopPat`, `AmogOS-Wallpapers`, `Amog-OS.github.io`];

    let contributors = [];

    for (let i = 0; i < repos.length; i++) {
        const repo = repos[i];
        const repoContributors = await getContributors(organisation, repo);
        contributors = contributors.concat(repoContributors);
    }

    const contributorsContainer = document.getElementById(`contributorsContainer`);

    for (let i = 0; i < contributors.length; i++) {
        const contributorLogin = contributors[i].login;
        if (contributorLogin === undefined) continue;
        let contributor = getCachedContributor(contributorLogin);

        if (!contributor) {
            contributor = await getContributorExtraInfo(contributorLogin);
            cacheContributor(contributorLogin, contributor);
        }

        const coolBoi = document.createElement(`div`);
        coolBoi.classList.add(`coolboi`);

        const img = document.createElement(`img`);
        img.src = contributor.avatar_url;

        const h1 = document.createElement(`h1`);
        h1.innerText = contributor.login;

        const card = document.createElement(`div`);
        card.classList.add(`role`);
        card.innerText = contributor.type === `User` ? `Contributor` : contributor.type;

        // Add a role for repo the contributor has contributed to
        const repo = document.createElement(`div`);
        repo.classList.add(`role`);
        repo.innerText = contributor.repo;
        card.appendChild(repo);


        const h3 = document.createElement(`p`);
        h3.innerHTML = `<span>"</span>${contributor.bio || `No bio provided`}<span>"</span>`;

        const links = document.createElement(`div`);
        links.classList.add(`links`);

        const ghLink = document.createElement(`a`);
        ghLink.href = contributor.html_url;

        const githubIcon = document.createElement(`i`);
        githubIcon.classList.add(`nf-fa-github`);
        githubIcon.classList.add(`nf`);
        ghLink.appendChild(githubIcon);

        const websiteLink = document.createElement(`a`);
        if (contributor.blog) websiteLink.href = contributor.blog.includes(`http`) ? contributor.blog : `https://${contributor.blog}`;

        const websiteIcon = document.createElement(`i`);
        websiteIcon.classList.add(`nf-fa-link`);
        websiteIcon.classList.add(`nf`);
        websiteLink.appendChild(websiteIcon);

        links.appendChild(ghLink);
        if (contributor.blog) links.appendChild(websiteLink);

        coolBoi.appendChild(img);
        coolBoi.appendChild(h1);
        coolBoi.appendChild(card);
        coolBoi.appendChild(h3);
        coolBoi.appendChild(links);

        // Append the coolBoi element after a delay of 150ms
        await delay(250);
        contributorsContainer.appendChild(coolBoi);
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function cacheContributor(login, data) {
    const cacheData = {
        data,
        timestamp: Date.now()
    };

    localStorage.setItem(`contributor_${login}`, JSON.stringify(cacheData));
}

function getCachedContributor(login) {
    const cachedData = localStorage.getItem(`contributor_${login}`);

    if (cachedData) {
        const {data, timestamp} = JSON.parse(cachedData);
        const currentTime = Date.now();

        if (currentTime - timestamp < CACHE_EXPIRATION_MS) return data;
        else localStorage.removeItem(`contributor_${login}`);
    }

    return null;
}

populateContributors().then(r =>
    console.log(`Contributors populated!`)
).catch(e =>
    console.error(`Error while populating contributors: ${e}`)
)