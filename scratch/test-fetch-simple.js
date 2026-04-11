fetch("https://pokeapi.co/api/v2/pokemon/ditto").then(r => r.json()).then(d => console.log("Success")).catch(e => console.error(e));
