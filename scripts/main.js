//Const Variabler
const lista = document.querySelector('#search-wrapper_pic_list');   //lista som generar av bilder
const form = document.querySelector('.search-wrapper_form');        //form fältet
const searchTerm = document.querySelector('#search');               //search knappen
const key = '41adb0f120121d62ff61549e85feab86';                     //API nyckeln från flickr
const perPage = document.querySelector('#per-page');                //option väljaren för hur många bilder som skall visas på en sida  
const chooseSide = document.querySelectorAll('#links');             //länkar för att välja sida 
const overLay = document.getElementById('search-wrapper_overlay');  //Overlay elementet      
let pageSide= 1;                                                    //Genererar vald sida


//Form function för att skriva och söka ord
form.addEventListener('submit', e => {
    e.preventDefault();
    console.log(searchTerm.value);      //consolar värdet av det som skrivs in i input
    getData(searchTerm.value);
})

//function för hur många bilder som skall visas
let picsShown = perPage.value;  //Default värdet på 20 bilder som visas per sida
console.log(picsShown);         //consolar default värde på antal bilder som visas
perPage.addEventListener('change', num => {
    picsShown = num.target.value;
    console.log(picsShown);            //consolar valt nummer
    return picsShown
});

//Fetch function som hämtar data från Flickr API
async function getData(query) {
    const response = await fetch(`https://www.flickr.com/services/rest/?api_key=${key}&method=flickr.photos.search&text=${query}&per_page=${picsShown}&page=${pageSide}&format=json&nojsoncallback=1`);
    const data = await response.json();
    console.log(data);

    chooseSide.forEach((link) => {
        pageSide= '';
        link.addEventListener('click', ()=> {
            pageSide = link.innerHTML;
            getData(query);
            console.log(pageSide);
            return pageSide
            })
    });

    console.log(data.photos.page)
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
        //listUrlBig=`https://farm${value.farm}.staticflickr.com/${value.server}/${value.id}_${value.secret}_b.jpg`;

        const item = document.createElement('li'); //skapar ny list element

        item.addEventListener('click', ()=> { //kalla lightbox funktionen
            lightBox(`https://farm${value.farm}.staticflickr.com/${value.server}/${value.id}_${value.secret}_b.jpg`, value.title);

        })

        item.classList.add('pictures'); //skapar classer på listelementen
        item.innerHTML = `<img src="${listUrl}" alt="${value.title}"></img>`; //skapar img taggar<p>${value.title}</p>
        lista.appendChild(item); //lägger till img items på listan
        //console.log(value.title);
    });
};
//overlay lightbox

let lightBox = (value, title)=> {
    console.log(value);
    overLay.innerHTML = `<img src="${value}" alt="${title}"></img>`; //skapar lightbox image
    overLay.classList.toggle('search-wrapper_overlay-hide');
}
