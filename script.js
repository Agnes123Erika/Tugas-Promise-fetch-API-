const apiKey = "YOUR_API_KEY"; // Ganti dengan API key Anda
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
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
  const url = `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${apiKey}`;
  axios
    .get(url)
    .then((response) => {
      displayNews(response.data.articles);
    })
    .catch((error) => console.error(error));
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