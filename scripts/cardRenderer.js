import { podcasts, genres } from './data.js';
import { openModal, closeModal } from './modal.js';

/**
 * Renders podcast cards into the DOM
 * Attaches event listeners for opening and closing modals.
 */
export function renderCards() {
  const cardSection = document.getElementById('card-section');

  // Clear existing cards
  cardSection.innerHTML = '';

  podcasts.forEach(podcast => {
    const card = createPodcastCard(podcast);
    cardSection.append(card);
  });

  attachModalListeners();
}

/**
 * Creates a podcast card DOM element.
 * @param {Object} podcast - The podcast data.
 * @returns {HTMLElement} The podcast card element.
 */
function createPodcastCard(podcast) {
  const article = document.createElement('article');
  article.classList.add('podcast-container');

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('image-container');

  const image = document.createElement('img');
  image.classList.add('podcast-image');
  image.src = podcast.image;
  image.alt = podcast.description;
  image.dataset.podcastId = podcast.id;

  const imageText = document.createElement('p');
  imageText.classList.add('podcast-cover-title');
  imageText.textContent = podcast.title;

  imageContainer.append(image, imageText);

  const podcastTitle = document.createElement('h3');
  podcastTitle.textContent = podcast.title;
  podcastTitle.classList.add('podcast-title');

  const seasonsSection = createSeasonsSection(podcast.seasons);

  const genreSection = createGenreSection(podcast.genres);

  const lastUpdated = createLastUpdatedElement(podcast.updated);

  article.append(imageContainer, podcastTitle, seasonsSection, genreSection, lastUpdated);

  return article;
}

/**
 * Creates the seasons section element for a podcast card.
 * @param {number} numberOfSeasons - Number of seasons for the podcast.
 * @returns {HTMLElement} The seasons section element.
 */
function createSeasonsSection(numberOfSeasons) {
  const seasonsSection = document.createElement('div');
  seasonsSection.classList.add('seasons-section');

  const seasonIcon = document.createElement('img');
  seasonIcon.classList.add('icon', 'seasons-icon');
  seasonIcon.src = './images/seasons-icon.svg';
  seasonIcon.alt = 'Seasons icon';

  const numberSeasons = document.createElement('p');
  numberSeasons.classList.add('num-seasons');
  numberSeasons.textContent = `${numberOfSeasons} seasons`;

  seasonsSection.append(seasonIcon, numberSeasons);

  return seasonsSection;
}

/**
 * Creates the genre section element for a podcast card.
 * @param {Array<number>} genreIds - Array of genre IDs for the podcast.
 * @returns {HTMLElement} The genre section element.
 */
function createGenreSection(genreIds) {
  const genreSection = document.createElement('div');
  genreSection.classList.add('genre-section');

  // Create a map of genre IDs to their titles for lookup
  const genreMap = new Map();
  for (let i = 0; i < genres.length; i++) {
    const genre = genres[i];
    // Set key and value in map
    genreMap.set(genre.id, genre.title);
  }

  genreIds.forEach(id => {
    const titleRelatedToId = genreMap.get(id);
    const genreName = document.createElement('span');
    genreName.classList.add('genre-name');
    genreName.textContent = titleRelatedToId;
    genreSection.append(genreName);
  })

  return genreSection;
};

/**
 * Creates the "last updated" element showing days since last update.
 * @param {string} updatedDate - The last updated date string.
 * @returns {HTMLElement} The last updated element.
 */
function createLastUpdatedElement(updatedDate) {
  const differenceInMs = new Date() - new Date(updatedDate);
  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

  const lastUpdated = document.createElement('p');
  lastUpdated.classList.add('updated-status');
  lastUpdated.textContent = `Updated ${differenceInDays} days ago`;

  return lastUpdated;
}

/**
 * Attaches event listeners for opening and closing the modal.
 */
function attachModalListeners() {
  const cardSection = document.getElementById('card-section');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const overlay = document.getElementById('overlay');

  // When a podcast image is clicked, find the related podcast and open the modal
  cardSection.addEventListener('click', event => {
    if (event.target.classList.contains('podcast-image')) {
      const podcastId = Number(event.target.dataset.podcastId);
      const podcast = podcasts.find(podcast => podcast.id === podcastId);
      if (podcast) {
        openModal(podcast);
      }
    }
  });

  modalCloseBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
}