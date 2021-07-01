const API_KEY = '563492ad6f91700001000001c0180a0862484e578c7f00b54e29c6b0';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
const more = document.querySelector('.more');
let searchValue;
let page = 1;
let fetchLink;
let currentSearch;

//Event listeners
searchInput.addEventListener('input',updateInput);
console.log(searchInput.value);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
});

more.addEventListener('click', loadMore);

function updateInput(e) {
    searchValue = e.target.value;
}

async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: API_KEY
        }
    });

    const data = await dataFetch.json();
    return data;

}

function generatePictures(data) {
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `
        <div class="gallery-info">
            <p>${photo.photographer}</p>
            <a href=${photo.src.original}>Download</a>
        </div>

        <img src=${photo.src.large}></img>
        `;

        gallery.appendChild(galleryImg);

    });

}


async function curatedPhoto() {
    fetchLink = "https://api.pexels.com/v1/curated/?page=1&per_page=16&page=1";

    const data = await fetchApi(fetchLink);
    console.log(data);
    generatePictures(data);
}

async function searchPhotos(query) {
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=16&page=1`;
    const data = await fetchApi(fetchLink);

    // console.log(data.photos);
    generatePictures(data);

    
    //  "https://api.pexels.com/v1/search?query=nature&per_page=1"

}

function clear() {
    gallery.innerHTML = '';
    searchInput.value = '';
}

async function loadMore() {
    page++;
    if (currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=16&page=${page}`
    } else {
        fetchLink = `https://api.pexels.com/v1/curated/?page=1&per_page=16&page=${page}`
    }

    const data = await fetchApi(fetchLink);
    generatePictures(data);

}

curatedPhoto();
