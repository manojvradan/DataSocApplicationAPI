// NASA API key and endpoint
const API_KEY = '2naW8efKGaUPpN61Mi78POXBbYW783Fgffursrtp';
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

// DOM Elements
const contentElement = document.getElementById('content');
const loadingElement = document.getElementById('loading');

// Fetch NASA APOD Data
fetch(API_URL)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    loadingElement.style.display = 'none'; // Hide the loading text
    displayAPOD(data);
  })
  .catch(error => {
    loadingElement.style.display = 'none';
    displayError(error.message);
  });

// Function to Display APOD
function displayAPOD(data) {
  const { title, explanation, url, media_type, date } = data;

  // Create HTML content
  let html = `
    <h2>${title}</h2>
    <p><strong>Date:</strong> ${date}</p>
  `;

  if (media_type === 'image') {
    html += `<img src="${url}" alt="${title}">`;
  } else if (media_type === 'video') {
    html += `<iframe src="${url}" frameborder="0" allowfullscreen style="width:100%; height:500px;"></iframe>`;
  }

  html += `
    <p>${explanation}</p>
  `;

  contentElement.innerHTML = html;
}

// Function to Display Error
function displayError(errorMessage) {
  contentElement.innerHTML = `s
    <p class="error">Error: ${errorMessage}</p>
  `;
}