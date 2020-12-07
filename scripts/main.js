const lista = document.querySelector('#lista');
const form = document.querySelector('form');
const searchTerm = document.querySelector('#search');

form.addEventListener('submit', e => {
    e.preventDefault();
    console.log(searchTerm.value);
    getData(searchTerm.value);
});

async function getData(query) {
    const response = await fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=98746df8b69aebd564ca78276cf9743a&tags${query}=&per_page=20&format=json&nojsoncallback=1&auth_token=72157717194793906-7090d4f99e8c3917&api_sig=f886214faa6c49c91aa0a3cc9711f243`, {
        /*
        headers: {
            'authorization': 'Bearer 0bb26a5efd3efd8ac8ec80df9dd93a89'
        }*/
    });
    const data = await response.json();
    console.log(data.photos.photo[0]);
    //let dataShort = data.photos.photo[0];
    //let getImage = `https://farm${dataShort.farm}.staticflickr.com/${dataShort.server}/${dataShort.id}_${dataShort.secret}.jpg`;
    console.log(getImage);

   //let showThepic = photoInfo.'https://farm'+ photoInfo.farm + '.staticflickr.com/' + photoInfo.server+ '/' +photoInfo.id+ '_' +photoInfo.secret+ '.jpg';
    //showPhotos(data.photos.photo);

};
/*
function showPhotos(pic) {
    let 
    let getIt= pic.'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
    return (
        <img alt"pic.title" src=(getIt)></img>
    )
   
}
*/


/*
function showPhotos(array) {
    //console.log(array)
    lista.innerHTML ='';
    array.forEach(value => {
        const item = document.createElement('li');
        item.classList.add('bilder');
        item.innerHTML = `<img src="${value.url}" alt="${value.title}"></img>`;
        lista.appendChild(item);
    });
};
*/

