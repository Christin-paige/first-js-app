
let pokemonRepository = (function () {
  let pokemonList = [
  
  ];//deleted array of pokemon

//this loads the list of pokemon
let url = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

function getAll () {
    return pokemonList;
}
function add(pokemon) {
    if (
        typeof pokemon === 'object' &&
        'name' in pokemon 
 ) {
    pokemonList.push(pokemon);
 }else{
    console.log('pokemon is not correct');
   }
}


//loading the list of pokemon and their individual url
   function loadList() {
     return fetch(url).then(function (response) {
        return response.json();
    }).then(function (json) {
        json.results.forEach(function (item) {//forEach takes 
            //json result (all data from url)
            let pokemon = {//turning pokemon object into a variable
                name: item.name,
                detailsUrl: item.url
            };
            add(pokemon);
        });
    }).catch(function (e) {
        console.error(e);
    })
   }
   //loadDetails takes a pokemon item as an argument.  
   //this function will add details other than name to the list
   function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (details) {
        //here are the details
        item.imgUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
    }).catch(function (e) {
        console.error(e);
    });
   }

    //adding pokemon details when clicked
    function showDetails(item){
        loadDetails(item).then(function (){
       console.log(item);
      }); 
    }

return {
    getAll: getAll,
    add: add, 
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails:showDetails
   
};

function addListItem(pokemon) {
    let ul = document.querySelector('ul');
    //let pokemonList = document.querySelector('pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    ul.appendChild(button);
    ul.appendChild(listItem);
        //adding event listener to interact with function showDetails (line 68)
    button.addEventListener('click', function(event) {
        showDetails(pokemon);
    

    });
}

})();

 
pokemonRepository.loadList().then(function() {
    //data is fetched from API
  pokemonRepository.getAll().forEach(pokemon => {
    pokemonRepository.addListItem(pokemon);//API data will be
    //added to the pokemonList with the add (from earlier return) function
  });
});