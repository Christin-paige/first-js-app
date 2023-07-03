
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
       pokemonRepository.loadDetails(pokemon)
       .then(function(){
        var $row = $(".row");
        var $card = $('<div class="card" style="width:400px"></div>');
        var $image = $(
            '<img class="card-img-top" alt="Card image" style="width:20%"/>');
        $image.attr("src", pokemon.imageUrlFront);
        var $cardBody = $('<div class="card-body"></div>');

        var $cardTitle = $("<h4 class='card-title' >" + 
        pokemon.name + "</h4>")
        var $seeProfile = $('<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">See Profile</button>'
        );

        $row.append($card);
        $card.append($image);
        $card.append($cardBody);
        $card.body.append($cardTitle);
        $cardBody.append($seeProfile);

        $seeProfile.on("click", function(event) {
            showDetails(pokemon);
         });
      });
   }

    
        function showDetails(item) {

            pokemonRepository.loadDetails(item).then(function () {
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
        item.weight = details.weight;
        item.abilities = [];
        for (var i = 0; i < details.abilities.length; i++) {
        item.abilities.push(details.abilities[i].ability.name);
        }
    })

    // item.types = details.types.map(function (type) {
      //   return type.type.name;
    //}).join(',');
        
        
       
    
    .catch(function (e) {
        console.error(e);
    });
   }
 
      
     
 //  $('[data-toggle="modal"]').on('click', function(){
   // let targetSelector = $(this).attr('data-target');
    //$(targetSelector).modal('show'); // Bootstrap’s own function to make the modal appear
  //});
  
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



var $search = $('filter-search');
var cache = [];

$('.card-title').each(function() {
    cache.push({
        element: this,
        text: this.innerText.trim().toLowerCase()
    });
});
function filter() {
    var query = this.value.trim().toLowerCase();


    cache.forEach(function(card) {
        var index = 0;
        if (query) {
            index = card.text.indexOf(query);
        }
    card.element.closest('.card')[index === -1 ? 'hide' : 'show']()
})
    }

    if ('oninput' in $search[0]) {
        $search.on('input', filter);
    }else {
        $search.on('keyup', filter);
    }
});