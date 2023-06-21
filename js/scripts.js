
let pokemonRepository = (function () {

let pokemonList = [
    {
        name: 'Bulbasaur', 
        height: 7, 
        types:['grass', 'poison']
    },
    {
        name: 'Ivysaur', 
        height: 1, 
        types:['grass', 'poison']
    },
    {
        name: 'Venusaur', 
        height: 2, 
        types:['grass', 'poison']
    },
    {
        name: 'Charmander', 
        height: 0.6, 
        types:['fire']
    },
    {
        name: 'Charmeleon', 
        height: 1.1, 
        types: ['fire']
    },
    {
        name: 'Charizard', 
        height: 1.7, 
        types:['flying', 'fire']
    },
    {
        name: 'Squirtle', 
        height: 0.5, 
        types: ['water']
    }
]
function getAll () {
    return pokemonList;
}
function add (pokemon) {
    pokemonList.push(pokemon);
}

return {
    getAll: getAll,
    add: add, 
    addListItem: addListItem,
    showDetails: showDetails
};


function addListItem(pokemon) {
    let ul = document.querySelector('ul');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listItem.appendChild(button);
    ul.appendChild(listItem);
        //adding event listener to interact with function showDetails (line 68)
    //button.addEventListener('click', showDetails => {
      //  console.log(pokemon.name)
    //})
    button.addEventListener('click', showDetails);

    function showDetails(){
        console.log(pokemon.name);

    }
        
    };
    
    function showDetails(pokemon) {
        console.log(pokemon);
       }
    
     
    

})();


//console.log(pokemonRepository.getAll());
pokemonRepository.add({name: 'Pikachu', height: 0.4, types: 'electric' });
//console.log(pokemonRepository.getAll());
   // for (i=0; i<pokemonList.length; i++) {
    //   document.write(pokemonList[i].name + ', ');
  //  }

    //for (i=0; i<pokemonList.length; i++) {
      //  if (pokemonList[i].height > 6){
        //  document.write('<p>' + pokemonList[i].name + ' (' + 'height: ' + pokemonList[i].height + ') - Wow, that is big!</p>');
     //   } else {
        //  document.write('<p>' + pokemonList[i].name + ' (' + 'height: ' + pokemonList[i].height + ') </p>');
     //   }
  //  }

 

pokemonRepository.getAll().forEach(pokemon => {
     //if (pokemon.height > 6) {
//console.log(pokemon);
pokemonRepository.addListItem(pokemon)
    //document.write('<p>' + pokemon.name + ' (' + 'height: ' + pokemon.height + ') - Wow, that is big!</p>');
 // }else{
   // document.write('<p>' + pokemon.name + ' (' + 'height: ' + pokemon.height + ')</p>')
  
  
  
});