
let pokemonRepository = (function () { //wrapped list inside IIFE
let pokemonList = [];//deleted array of pokemon
  //loads list of pokemon
  let modalContainer = document.querySelector('#modal-container');
let apiUrl = 
  'https://pokeapi.co/api/v2/pokemon/?limit=150';


function add(pokemon) {
    if (
        typeof pokemon === "object" &&
        "name" in pokemon &&
        "detailsUrl" in pokemon
 ) {
    pokemonList.push(pokemon);
 }else{
    console.log('pokemon is not correct');
   }
}
function getAll () {
    return pokemonList;
}

    function addListItem(pokemon) {
       
        let ul = document.querySelector('ul');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');

        listItem.appendChild(button);
        ul.appendChild(listItem);

        button.addEventListener('click', function() {
            showDetails(pokemon);
        });   
}


//loading the list of pokemon and their individual url
   function loadList() {
     return fetch(apiUrl).then(function (response) {
        return response.json();
    }).then(function (json) {
        json.results.forEach(function (item) {//forEach takes 
            //json result (all data from url)
            let pokemon = {//turning pokemon object into a variable
                name: item.name,
                detailsUrl: item.url
            };
            add(pokemon);
            console.log(pokemon);
        });
    }).catch(function (e) {
        console.error(e);
    })
}


   //this function will add details other than name to each pokemon
   function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (details) {
        //here are the details
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        item.weight = details.weight;
    }).catch(function (e) {
        console.error(e);
    });
   }
 
       // adding pokemon details when clicked and adding the modal container
    function showDetails(pokemon){
       loadDetails(pokemon).then(function () {
        showModal(pokemon);
       });
       document.querySelector('#show-modal').addEventListener('click', () => {
        showModal();
     });
     
    }
    function showModal(pokemon) {
       //emptying modal container         
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
          modal.classList.add('modal');
        
          //adding the close button on modal
        let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.innerText = 'Close';
            closeButtonElement.addEventListener('click', hideModal);
       
            //creating elements that will be inside of modal
        let titleElement = document.createElement('h1');
            titleElement.innerText = (pokemon.name);
        
        let contentElement = document.createElement('p');
            contentElement.innerText = ('Height = ' + pokemon.height + ' Weight = ' + pokemon.weight);
        

      let imageElement = document.createElement('img');
          imageElement.src = pokemon.imageUrl;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);
        modalContainer.classList.add('is-visible');
      };
            
             
             
        function hideModal() {
            modalContainer.classList.remove('is-visible');
        }
       
        modalContainer.addEventListener('click', function(e) {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
          });
         

          window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && 
            modalContainer.classList.contains('is-visible')) {
                hideModal();
            }
          });
       
         


   return {
    getAll: getAll,
    add: add, 
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails:showDetails
};
})();



pokemonRepository.loadList().then(function() {
    //data is fetched from API
  pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);//API data will be
    //added to the pokemonList with the add (from earlier return) function
    
  });
});


