import { genres, seasons } from './data.js';

/**
 * Opens the modal for a given podcast and populates its content.
 * @param {Object} podcast - The podcast data to display in the modal.
 */
export function openModal(podcast) {
  // Create and open modal and overlay
  showModal();

  // Populate modal with content
  populateHeader(podcast);
  populateGenres(podcast.genres);
  populateLastUpdated(podcast.updated);
  populateSeasons(podcast.id);
}

/**
 * Displays the modal and the overlay.
 */
function showModal() {
  const overlay = document.getElementById('overlay');
  const modal = document.getElementById('modal');
  overlay.style.display = 'block';
  modal.style.display = 'block';
}

/**
 * Populates the modal header with podcast title, image and description.
 * @param {Object} podcast - The podcast data.
 */
function populateHeader(podcast) {
  const modalHeadingTitle = document.getElementById('modal-heading-title');
  modalHeadingTitle.textContent = podcast.title;

  const modalImage = document.getElementById('modal-image');
  modalImage.src = podcast.image;

  const modalDescription = document.getElementById('modal-description');
  modalDescription.textContent = podcast.description;
}

/**
 * Populates the genre section in the modal.
 * @param {Array<number>} genreIds - Array of genre IDs related to the podcast.
 */
function populateGenres(genreIds) {
  const modalGenreContainer = document.getElementById('modal-genre-container');
  modalGenreContainer.innerHTML = '';

  for (let j = 0; j < genreIds.length; j++) {
    for (let i = 0; i < genres.length; i++) {
      if (genres[i].id === genreIds[j]) {
        const modalGenreName = document.createElement('span');
        modalGenreName.classList.add('genre-name');
        modalGenreName.textContent = genres[i].title;
        modalGenreContainer.append(modalGenreName);
      }
    }
  }
}

/**
 * Formats and displays the last updated date in the modal.
 * @param {string} updatedDate - A standard date string that JavaScript can parse.
 */
function populateLastUpdated(updatedDate) {
  const modalLastUpdated = document.getElementById('modal-last-updated');

  // Format the date to JS date object
  const date = new Date(updatedDate);

  // Define formatting options
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  // Format the date using South African locale
  const formattedDate = date.toLocaleDateString('en-ZA', options);

  // Display date in correct format
  modalLastUpdated.textContent = `Last updated: ${formattedDate}`;
}

/**
 * Populates the modal with season information for the given podcast.
 * @param {number} podcastId - The ID of the podcast.
 */
function populateSeasons(podcastId) {
  
  const modalBottom = document.getElementById('modal-bottom');
  modalBottom.innerHTML = '';

  const matchingSeason = seasons.find(season => season.id === podcastId);
  if (matchingSeason) {
    let numberSeasons = 1;
    matchingSeason.seasonDetails.forEach(season => {
      const seasonElement = createSeasonElement(season, numberSeasons++);
      modalBottom.append(seasonElement);
    });
  }
}

/**
 * Creates and returns a DOM element representing a season's data.
 * @param {Object} season - The season detail object.
 * @param {number} seasonNumber - The number of the season.
 * @returns {HTMLElement} The DOM element for the season.
 */
function createSeasonElement(season, seasonNumber) {
  const seasonsDiv = document.createElement('div');
  seasonsDiv.classList.add('modal-season-container');

  const modalSeasonLeft = document.createElement('div');
  modalSeasonLeft.classList.add('modal-season-left');

  const modalSeasonHeading = document.createElement('h4');
  modalSeasonHeading.classList.add('modal-season-heading');
  modalSeasonHeading.textContent = `Season ${seasonNumber}`;

  const modalSeasonDescription = document.createElement('p');
  modalSeasonDescription.classList.add('modal-season-description');
  modalSeasonDescription.textContent =
    modalSeasonHeading.textContent !== season.title ? season.title : '-';

  modalSeasonLeft.append(modalSeasonHeading, modalSeasonDescription);

  const modalSeasonRight = document.createElement('div');
  modalSeasonRight.classList.add('modal-season-right');

  const modalSeasonNumber = document.createElement('p');
  modalSeasonNumber.classList.add('modal-season-number');
  modalSeasonNumber.textContent = `${season.episodes} episodes`;

  modalSeasonRight.append(modalSeasonNumber);

  seasonsDiv.append(modalSeasonLeft, modalSeasonRight);

  return seasonsDiv;
}

/**
 * Closes the modal and hide hide overlay.
 */
export function closeModal() {
  const overlay = document.getElementById('overlay');
  const modal = document.getElementById('modal');
  overlay.style.display = 'none';
  modal.style.display = 'none';
}
