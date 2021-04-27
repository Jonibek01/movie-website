// taking DOM elements
var elSearchForm = $_('.js-search-form');
var elSearchTitleInput = $_('.js-search-form__title-input', elSearchForm);
var elRatingInput = $_('.js-search-form__rating-input', elSearchForm);
var elGenreSelect = $_('.js-search-form__genre-select', elSearchForm);
var elSortSelect = $_('.js-search-form__sort-select', elSearchForm);

var elSearchResult = $_('.js-search-results');

var elMovieTemplate = $_('#movie-template').content;

//== we don't need the normalized function after copying it to the js file

// normalizing the movies array with useable keynames 
// var normalizedMovies = movies.map(function(movie){
//     return {
//         title: movie.Title.toString(),
//         year: movie.movie_year,
//         categories: movie.Categories.split('|'),
//         summary: movie.summary,
//         rating: movie.imdb_rating,
//         runtime: movie.runtime,
//         language: movie.language,
//         link: getYouTubeVideoLink(movie.ytid),
//         youtubeBigImgPoster: getYouTubeBigImgPoster(movie.ytid),
//         youtubeSmallImgPoster: getYouTubeSmallImgPoster(movie.ytid)
//     }
// });


var renderResults = function(elResults) {
    var elResultsFragment = document.createDocumentFragment();

    elResults.forEach((movie) => {
        var elMovie = elMovieTemplate.cloneNode(true);
        $_('.movie__poster', elMovie).src = movie.youtubeSmallImgPoster;
        $_('.movie__title', elMovie).textContent = movie.title;
        $_('.movie__year', elMovie).textContent = movie.year;
        $_('.movie__rating', elMovie).textContent = movie.rating;
        $_('.movie__runtime', elMovie).textContent = `${movie.runtime} min`;
        $_('.movie__language', elMovie).textContent = movie.language;
        $_('.movie__trailer-link', elMovie).href = movie.link;
        


        elResultsFragment.appendChild(elMovie)
    })
    
    elSearchResult.appendChild(elResultsFragment);
}


// finding the movie by title 
elSearchForm.addEventListener('submit', (evt)=> {
    evt.preventDefault();

    var movieTitle = elSearchTitleInput.value.trim()
    var movieRegexTitle = new RegExp(movieTitle, 'gi')

    var elResults = normalizedMovies.filter((movie) =>{
        return movie.title.match(movieRegexTitle);
    })

    renderResults(elResults);
})





var createGenreSelectOption = function () {

    var movieCategories = [];

// finding the all categories and pushing to the array
    normalizedMovies.forEach(function(movie){
        movie.categories.forEach(function(category){
            if(!movieCategories.includes(category)){
                movieCategories.push(category)
            }
        })
    })

// sorting the all categorized categories by alphabitical order 
    movieCategories.sort();

// creating fragment element to collect all option categories in one fragment
    var elOptionsFragment = document.createDocumentFragment();

// for each category of array, creating option, giving the category value and textContent
    movieCategories.forEach(function(category){
        var optionsElement = createElementFunc('option', '', category)
        optionsElement.value = category.toLowerCase();
        // appending all options to fragment once 
        elOptionsFragment.appendChild(optionsElement);
    })
    // adding the fragment element to select 
    elGenreSelect.appendChild(elOptionsFragment);
}

// in order to work the func we need to call it outside of func
createGenreSelectOption()

