const movieSearchBox = document.getElementById('movie-search-box')
const searchList = document.getElementById('search-list')
const resultGrid = document.getElementById('result-grid')

async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`
    const res = await fetch(`${URL}`)
    const data = await res.json()
    //console.log(data.Search)
    if(data.Response == "True") 
        displayMovieList(data.Search)
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim()
    if(searchTerm.length>0){
        searchList.classList.remove('hide-search-list')
        loadMovies(searchTerm)
    }else{
        searchList.classList.add('hide-search-list')
    }
}

function displayMovieList(movies){

    //console.log(movies)
    searchList.innerHTML = ""

    for(let idx=0; idx<movies.length; idx++){
        let movieListItem = document.createElement('div')
        movieListItem.dataset.id = movies[idx].imdbID
        movieListItem.classList.add('search-list-item')

        if(movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster
        else
            moviePoster = "assets/image_not_found.png"

        movieListItem.innerHTML = `
        <div class="search-item-thumbnail">
            <img src ="${moviePoster}">
        </div>
        <div class="search-item-info">
            <h3>${movies[idx].Title}</h3>
            <h3>${movies[idx].Year}</h3>
        </div>`
        searchList.appendChild(movieListItem)
    }
    loadMovieDetails()
}

function loadMovieDetails(){

    const searchListMovies = searchList.querySelectorAll('.search-list-item')
    searchListMovies.forEach(movie => {
        movie.addEventListener('Click', async() => {
            console.log(movie.dataset.id)

            searchList.classList.add('hide-search-list')
            movieSearchBox.value =""
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`)
            const movieDetails = await result.json()

            console.log(movieDetails)
            displayMovieDetails(movieDetails)
        })
    })
}


function displayMovieDetails(details){
    console.log(details)
    resultGrid.innerHTML = `
    <div class="movie-poster">
        <img src="${(details.Poster != "N/A") ? details.Poster : "assets/image_not_found.png"}" alt="movie poster">
    </div>

    <div class="movie-info">
        <h3 class="movie-title">${details.Title}</h3>
        <ul class="movie-misc-info">
            <li class="year"> Year: ${details.Year}</li>
            <li class="rated"> Rated: ${details.Rated}</li>
            <li class="released"> Released: ${details.Released}</li>
        </ul>
        <p class="genre">Genre: ${details.Genre}</p>
        <p class="language">Genre: ${details.Language}</p>
        <p class="writer">Genre: ${details.Writer}</p>
        <p class="actors">Genre: ${details.Actors}</p>
        <p class="plot">Genre: ${details.Plot}</p>
        <p class="awards">Genre: ${details.Awards}</p>
    </div>`
}

window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list')
    }
})