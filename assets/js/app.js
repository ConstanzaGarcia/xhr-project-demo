const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContaier = document.getElementById('response-container');
let searchedForText;

form.addEventListener('submit', function (e) {
    e.preventDefault();
    responseContaier.innerHTML = '';
    searchedForText= searchField.value;
    getNews();
}); 

function getNews() {
    const articleRequest = new XMLHttpRequest();
    articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=9b43afe372db49228c026a250a165de6`);
    articleRequest.onload = addNews;
    articleRequest.onerror = handleError;
    articleRequest.send();
}

function handleError() {
    console.log('Se ha presentado un error')
}

function addNews(){
    const data = JSON.parse(this.responseText);
    console.log(data);
    const article = data.response.docs [0];
    const title = article.headline.main;
    const snippet = article.snippet;

    let li = document.createElement('li');
    li.className = 'articleClass';
    li.innerHTML = snippet;

    responseContaier.appendChild(li);
}