// This script fetches a list of movies from a server and displays them on the page.
// When a movie is clicked, its details are fetched from the server and displayed in a modal.
let url = "http://localhost:3000/films";

const listHolder = document.getElementById("films");

document.addEventListener("DOMContentLoaded", () => {
  // Remove the first film item from the page
  document.getElementsByClassName("film item")[0].remove();
  // Fetch and display the list of movies
  fetchMovies(url);
});
//create fetch function
function fetchMovies(url) {
  fetch(url)
    .then((response) => response.json())
    .then((movies) => {
      movies.forEach((movie) => {
        // Display each movie in the list
        displayMovie(movie);
      });
    });
}

function displayMovie(movie) {
  const li = document.createElement("li");
  li.style.cursor = "pointer";
  li.textContent = movie.title.toUpperCase();
  listHolder.appendChild(li);
  // Add a click event listener to each movie in the list
  addClickEvent();
}

function addClickEvent() {
  let children = listHolder.children;
  // console.log(children)

  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    // console.log(child)

    child.addEventListener("click", () => {
      // Fetch the details for the clicked movie
      fetch(`${url}/${i + 1}`)
        .then((res) => res.json())
        .then((movie) => {
          document.getElementById("buy-ticket").textContent = "Buy Ticket";
          // Set up the details for the clicked movie in the modal
          setUpMovieDetails(movie);
        });
    });
  }
}
// Function to set the movie details on the page
function setUpMovieDetails(childMovie) {
  // Select the elements on the HTML page that will be updated with movie details
  const preview = document.getElementById("poster");
  const movieTitle = document.querySelector("#title");
  const movieTime = document.querySelector("#runtime");
  const movieDescription = document.querySelector("#film-info");
  const showTime = document.querySelector("#showtime");
  const tickets = document.querySelector("#ticket-num");
  // Set the src attribute of the poster to the movie's poster
  preview.src = childMovie.poster;
  // Set the text content of the title element to the movie's title
  movieTitle.textContent = childMovie.title;
  // Set the text content of the runtime element to the movie's runtime
  movieTime.textContent = `${childMovie.runtime} minutes`;
  // Set the text content of the film info element to the movie's description
  movieDescription.textContent = childMovie.description;
  // Set the text content of the showtime element to the movie's showtime
  showTime.textContent = childMovie.showtime;
  // Set the text content of the ticket number element to the number of available tickets
  tickets.textContent = childMovie.capacity - childMovie.tickets_sold;
}
const btn =document.getElementById('buy-ticket');

btn.addEventListener("click", function (event) {
  // Select the element with the ID "ticket-num"
  let remTickets = document.querySelector("#ticket-num").textContent;

  // Prevent the default action of the event
  event.preventDefault();

  // If there are remaining tickets
  if (remTickets > 0) {
    // Decrement the number of remaining tickets
    document.querySelector("#ticket-num").textContent = remTickets-1;
  }
  // If there are no remaining tickets
  else if (parseInt(remTickets, 10) === 0) {
    // Change the text of the button to "Sold Out"
    btn.textContent = "Sold Out";
  }
});
