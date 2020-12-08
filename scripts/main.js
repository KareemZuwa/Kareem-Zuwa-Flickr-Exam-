//Const Variabler
const lista = document.querySelector('#search-wrapper_pic_list');
const form = document.querySelector('.search-wrapper_form');
const searchTerm = document.querySelector('#search');
const key = '41adb0f120121d62ff61549e85feab86';

//Form function för att skriva och söka ord
form.addEventListener('submit', e => {
    e.preventDefault();
    console.log(searchTerm.value);      //consolar värdet av det som skrivs in i input
    getData(searchTerm.value);
});

//Fetch function som hämtar data från Flickr API
async function getData(query) {
    const response = await fetch(`https://www.flickr.com/services/rest/?api_key=${key}&method=flickr.photos.search&text=${query}&per_page=20&page=6&format=json&nojsoncallback=1`);
    const data = await response.json();
    console.log(data);

    //console.log(data.photos.photo);   //consolar data från API

    //Skickar argument i form av json data till functionen showPhotos
    showPhotos(data.photos.photo);
};

//Function för att visa bilderna
function showPhotos(array) {
    console.log(array)
    
    lista.innerHTML ='';            //rensar listan inför varje sökning

    //itererar genom array av json.data.photos.photo[0],[1],[2] osv...
    array.forEach(value => {
        
        listUrl= `https://farm${value.farm}.staticflickr.com/${value.server}/${value.id}_${value.secret}_m.jpg`;
        console.log(listUrl); //Sparar och consolar Url som skall generera bilder på webbappen.skrivs över med value värden från loopen

        const item = document.createElement('li'); //skapar ny list element
        item.classList.add('pictures'); //skapar classer på listelementen
        item.innerHTML = `<img src="${listUrl}" alt="${value.title}"></img>`; //skapar img taggar
        lista.appendChild(item); //lägger till img items på listan
    });
};
