const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';
const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos?albumId={{id}}';

const ALBUM_ITEM_CLASS = 'album-item';

const albumsEl = document.querySelector('#album');
const photosEl = document.querySelector('#photo');

const albumItemTemplate = document.querySelector('#albumItem').innerHTML;
const photoItemTemplate = document.querySelector('#photoItem').innerHTML;

albumsEl.addEventListener('click', onClick);

init();

function init() {
    getAlbums().then(getFirstPhotos);
}

function getAlbums() {
    return fetch(ALBUMS_URL)
        .then((res) => res.json())
        .then((albumsList) => {
            renderAlbums(albumsList);
            return albumsList;
        });
}

function renderAlbums(data) {
    albumsEl.innerHTML = data
        .map((album) => createAlbum(album))
        .join('\n');
}

function createAlbum(album) {
    return albumItemTemplate
        .replace('{{id}}', album.id)
        .replace('{{title}}', album.title);
}

function getFirstPhotos(data) {
    if (data.length) {
        getPhotos(data[0].id);
    }
}

function getPhotos(albumId) {
    return fetch(getPhotoUrl(albumId))
        .then((resp) => resp.json())
        .then(renderPhotos);
}

function getPhotoUrl(albumId) {
    return PHOTOS_URL.replace('{{id}}', albumId);
}

function renderPhotos(data) {
    photosEl.innerHTML = data
        .map((photo) => createPhoto(photo))
        .join('\n');
}

function createPhoto(photo) {
    return photoItemTemplate
        .replace('{{url}}', photo.thumbnailUrl)
        .replace('{{title}}', photo.title);
}

function onClick(e) {
    if (e.target.classList.contains(ALBUM_ITEM_CLASS)) {
        getPhotos(e.target.dataset.id);
    }
}