const lista = document.querySelector('#lista');
const form = document.querySelector('form');
const searchTerm = document.querySelector('#search');

form.addEventListener('submit', e => {
    e.preventDefault();
    console.log(searchTerm.value);
    getData(searchTerm.value);
});

async function getData(query) {
    const response = await fetch(`https://www.flickr.com/services/rest/?api_key=41adb0f120121d62ff61549e85feab86&method=flickr.photos.search&text=${query}&per_page=20&format=json&nojsoncallback=1`);
    const data = await response.json();
    console.log(data.photos.photo);

    
    //let dataShort = data.photos.photo[0];
    //let getImage = `https://farm${dataShort.farm}.staticflickr.com/${dataShort.server}/${dataShort.id}_${dataShort.secret}.jpg`;
    //console.log(getImage);

   //let showThepic = photoInfo.'https://farm'+ photoInfo.farm + '.staticflickr.com/' + photoInfo.server+ '/' +photoInfo.id+ '_' +photoInfo.secret+ '.jpg';
    showPhotos(data.photos.photo);

};


function showPhotos(array) {
    console.log(array)

    lista.innerHTML ='';
    array.forEach(value => {
        listUrl= `https://farm${value.farm}.staticflickr.com/${value.server}/${value.id}_${value.secret}.jpg`;
        console.log(listUrl);
        const item = document.createElement('li');
        //item.classList.add('bilder');
        item.innerHTML = `<img src="${value.listUrl}" alt="${value.title}"></img>`;
        lista.appendChild(item);
    });
};
