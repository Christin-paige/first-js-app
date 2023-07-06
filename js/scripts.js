
var pokemonRepository = (function () { //wrapped list inside IIFE
var pokemonList = [];//deleted array of pokemon
  //loads list of pokemon
var apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=150`;



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

    function addListItem (pokemon) {
       loadDetails(pokemon).then(function(){
        var $row = $(".row");
        var $card = $('<div class="card" style="width:400px"></div>');
        var $image = $(
            '<img class="card-img-top" alt="Card image" style="width:20%"/>');
        $image.attr("src", pokemon.imageUrlFront);
        var $cardBody = $('<div class="card-body"></div>');

        var $cardTitle = $("<h4 class='card-title' >" + 
        pokemon.name + "</h4>");
        var $seeProfile = $('<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#pokemonModal">See Profile</button>'
        );

        $row.append($card);
        $card.append($image);
        $card.append($cardBody);
        $cardBody.append($cardTitle);
        $cardBody.append($seeProfile);

        $seeProfile.on("click", function(event) {
            showDetails(pokemon);
         });
         
      });
     
   }
//this is to make the search bar interactive
   var userInput = $('#input');

   //using 'keyup' in the event listener for when the user typesn a pokemon name in the 
   //search bar
$(userInput).on('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

//filtering through the pokemon list based on the user input
   var filteredPokemon = pokemonList.filter((pokemon)  =>{
        return pokemon.name.toLowerCase().includes(searchString);
    
    });

    //everything works up until here.  I can't figure out 
    //the correct function to call the filtered pokemon variable
  // showDetails(filteredPokemon);
  getElementsByClassName('row').innerHTML = 'you did a search'

 
} );
  
        function showDetails(item) {

            loadDetails(item).then(function () {
                console.log(item);
                showModal(item);
            });
        }

        function loadList() {
            return $.ajax(apiUrl)
            .then(function (json) {
                json.results.forEach(function (item) {
                    var pokemon = {
                        name: item.name,
                        detailsUrl: item.url,
                    };
                    add(pokemon);
                    console.log(pokemon);
                });
            })
            .catch(function (e) {
                console.error(e);
            });
        }
   
   


   //this function will add details other than name to each pokemon
   function loadDetails(item) {
    var url = item.detailsUrl;
    return $.ajax(url)
    .then(function (details) {
    
        //here are the details
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;

        item.types = [];
        for (var i = 0; i < details.types.length; i++) {
            item.types.push(details.types[i].type.name);
        }
       
        item.abilities = [];
        for (var i = 0; i < details.abilities.length; i++) {
        item.abilities.push(details.abilities[i].ability.name);
        }
        item.weight = details.weight;
    })
   .catch(function (e) {
    console.error(e);
   })
}
  

    function showModal(item) {
     
       let modalTitle = $(".modal-title");
       let modalBody = $(".modal-body");  
      
       
       modalTitle.empty();
       modalBody.empty();
     
      
      
    //creating element for name
    let nameElement = $("<h1>" + item.name + "</h1>");
    //creating img in modal content
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">')
    imageElementBack.attr("src", item.imageUrlBack);
    //creating element for height
    let heightElement = $("<p>" + "height : " + item.height + "m" + "</p>");
    //creating element for weight in modal
    let weightElement = $("<p>" + "weight : " + item.weight + " lbs" + "</p>");
    //creating element for types in modal
    let typesElement = $("<p>" + "types : " + item.types + "</p>");
    //creating element for abilities in modal
    let abilitiesElement = $("<p>" + "abilities: " + item.abilities + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
    }
  
    return {
        getAll: getAll,
        add: add, 
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showModal: showModal,
    };


       
})();


pokemonRepository.loadList().then(function() {
    //data is fetched from API
  pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);//API data will be
    //added to the pokemonList with the add (from earlier return) function
    
  });


});