import { podcasts, genres } from './data.js'

const cardSection = document.getElementById("card-section");

console.log(podcasts)

podcasts.map(podcast => {

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

    // Difference in milliseconds
    const differenceInMs = new Date() - new Date (podcast.updated);

    // Milliseconds in days
    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

    const lastUpdated = document.createElement("p");
    lastUpdated.classList.add("updated-status");
    lastUpdated.textContent = `Updated ${differenceInDays} days ago`;

    article.append(imageContainer,podcastTitle,seasonsSection,genreSection,lastUpdated)
    cardSection.append(article)
})