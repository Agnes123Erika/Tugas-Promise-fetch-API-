const apiKey = "b9f2db9b3f2f4578b91bae609e09d7ca";
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=b9f2db9b3f2f4578b91bae609e09d7ca`;
const newsContainer = document.getElementById("newsContainer");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value;
  if (searchTerm.length > 2) {
    fetchNews(searchTerm);
  } else {
    alert("Masukkan setidaknya 3 karakter untuk pencarian.");
  }
});

function fetchNews(searchTerm) {
  const url = `https://newsapi.org/v2/top-headlines?q=${searchTerm}&apiKey=${apiKey}`;
  axios
    .get(url)
    .then((response) => {
      displayNews(response.data.articles);
    })
    .catch((error) => {
      console.error(error);
      if (error.response && error.response.status === 401) {
        alert("Authentication failed. Please check your API key or contact the administrator.");
      } else {
        alert("An error occurred while fetching the news. Please try again later.");
      }
    });
}


function displayNews(articles) {
  newsContainer.innerHTML = "";
  articles.forEach((article) => {
    const newsCard = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${
                      article.urlToImage
                        ? article.urlToImage
                        : "https://via.placeholder.com/150"
                    }" class="card-img-top" alt="${article.title}">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${
                          article.description ? article.description : ""
                        }</p>
                        <a href="${
                          article.url
                        }" target="_blank" class="btn btn-primary">Baca Selengkapnya</a>
                    </div>
                </div>
            </div>
        `;
    newsContainer.innerHTML += newsCard;
  });
}
