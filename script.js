import { podcasts, genres } from './data.js'

const cardSection = document.getElementById("card-section");

console.log(podcasts)

podcasts.forEach(podcast => {

    const article = document.createElement("article");
    article.classList.add("podcast-container");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    
    const image = document.createElement("img");
    image.classList.add("podcast-image");
    image.src = podcast.image;
    image.alt = podcast.description;
    
    const imageText = document.createElement("p");
    imageText.classList.add("podcast-cover-title");
    imageText.textContent = podcast.title;

    imageContainer.append(image, imageText)

    const podcastTitle = document.createElement("h3");
    podcastTitle.textContent = podcast.title;
    podcastTitle.classList.add("podcast-title")

    const seasonsSection = document.createElement("div");
    seasonsSection.classList.add("seasons-section")

    const seasonIcon = document.createElement("img");
    seasonIcon.classList.add("icon", "seasons-icon");
    seasonIcon.src = "./images/seasons-icon.svg"
    seasonIcon.alt = "Seasons icon"

    const numberSeasons = document.createElement("p");
    numberSeasons.classList.add("num-seasons");
    numberSeasons.textContent = `${podcast.seasons} seasons`;

    seasonsSection.append(seasonIcon,numberSeasons)

    const genreSection = document.createElement("div");
    genreSection.classList.add("genre-section");

    for (let j = 0; j < podcast.genres.length; j++) {
        for (let i = 0; i < genres.length; i++) {
            if (genres[i].id === podcast.genres[j]) {
                const genreName = document.createElement("span");
                genreName.classList.add("genre-name");
                genreName.textContent = genres[i].title;
                genreSection.append(genreName);
            }
        }
    }

    const differenceInMs = new Date() - new Date (podcast.updated);
    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

    const lastUpdated = document.createElement("p");
    lastUpdated.classList.add("updated-status");
    lastUpdated.textContent = `Updated ${differenceInDays} days ago`;

    article.append(imageContainer,podcastTitle,seasonsSection,genreSection,lastUpdated)
    cardSection.append(article)

    // Open and close modal
    const modalCloseBtn = document.getElementById("modal-close-btn");
    image.addEventListener("click", () => openModal(podcast));
    modalCloseBtn.addEventListener("click",  () => closeModal(podcast));
    overlay.addEventListener("click", () => closeModal(podcast));
})

// Open Modal
function openModal (podcast) {

    // Open modal and overlay
    const overlay = document.getElementById("overlay");
    const modal = document.getElementById("modal");
    overlay.style.display = "block";
    modal.style.display = "block"

    // Populate modal
    const modalHeadingTitle = document.getElementById("modal-heading-title");
    modalHeadingTitle.textContent = podcast.title;

    const modalImage = document.getElementById("modal-image");
    modalImage.src = podcast.image;

    const modalDescription = document.getElementById("modal-description");
    modalDescription.textContent = podcast.description;

    const modalGenreContainer = document.getElementById("modal-genre-container");
    modalGenreContainer.innerHTML = "";
    for (let j = 0; j < podcast.genres.length; j++) {
        for (let i = 0; i < genres.length; i++) {
            if (genres[i].id === podcast.genres[j]) {
                const ModalGenreName = document.createElement("span");
                ModalGenreName.classList.add("genre-name");
                ModalGenreName.textContent = genres[i].title;
                modalGenreContainer.append(ModalGenreName);
            }
        }
    }

    const modalLastUpdated = document.getElementById("modal-last-updated");
    // Format the date to JS date object
    const date = new Date(podcast.updated);
    // Define formatting options
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // // Format the date using the South African locale
    const formattedDate = date.toLocaleDateString('en-ZA', options);
    // Display date in correct format
    modalLastUpdated.textContent = `Last updated: ${formattedDate}`;
}

// Close Modal
function closeModal () {
    overlay.style.display = "none";
    modal.style.display = "none"
}