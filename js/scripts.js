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
];

   // for (i=0; i<pokemonList.length; i++) {
    //   document.write(pokemonList[i].name + ', ');
  //  }

    for (i=0; i<pokemonList.length; i++) {
        if (pokemonList[i].height > 1){
            //document.write(pokemonList[i].name + pokemonList[i].height + ' - Wow, that is big! ');
        
       document.write(pokemonList[i].name + ' (' + 'height: ' + pokemonList[i].height + '), - Wow, that is big! ');
        }
    }
    