var $_ = function(selector, node = document) {
    return node.querySelector(selector);
}
var $$_ = function(selector, node = document) {
    return node.querySelectorAll(selector);
}

var createElementFunc = function(tagName, className, text){
    var element = document.createElement(tagName);
    element.setAttribute('class', className);
    if (text) {
        element.textContent = text;
    }

    return element;
}

var getYouTubeVideoLink = function(movieId) {
    return `https://www.youtube.com/watch?v=${movieId}`;
}

var getYouTubeBigImgPoster = function(movieId) {
    return `http://i3.ytimg.com/vi/${movieId}/maxresdefault.jpg`;
}

var getYouTubeSmallImgPoster = function(movieId) {
    return `http://i3.ytimg.com/vi/${movieId}/hqdefault.jpg`;
}