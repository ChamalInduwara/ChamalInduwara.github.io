window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);
  const pokemonName = urlParams.get('pokemon');

  let name = pokemonName[0];
  let secname = pokemonName.slice(1);
  name = name.toUpperCase();

  const pokeName = name + secname

  document.getElementById('pokemonName').textContent = pokeName;
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Pokemon not found');
    }
    return response.json();
   })
   .then(data => {
     const types = data.types.map(typeInfo => typeInfo.type.name);
     const height = data.height / 10;
     const weight = data.weight / 10;
     const number = data.id;
     const hdImageNorm = data.sprites.other["official-artwork"].front_default;
     const hdImageShiny = data.sprites.other["official-artwork"].front_shiny;
     const moves = data.moves.map(moveInfo => moveInfo.move.name).slice(0, 5);

     document.getElementById('pokemonImage').className += types[0]
     
     const stats = data.stats.map(stat => ({
       name: stat.stat.name,
       value: stat.base_stat
     }));

     let hp = '';

     stats.forEach(stat =>{
       if (stat.name === 'hp') {
         hp = stat.value;       
       }
     })

     moves.forEach(move =>{
       li = document.createElement('li');
       li.textContent = move;
       document.getElementById('pokemonMoves').appendChild(li)
     })

     types.forEach(type =>{
       li = document.createElement('li');
       li.textContent = type;
       li.className += type;
       document.getElementById('pokemonType').appendChild(li)
     })

     document.getElementById('pokemonID').textContent = `#${number}`;
     document.getElementById('pokemonHP').textContent = `${hp} HP`;
     document.getElementById('pokemonHeight').textContent = `${height} m`;
     document.getElementById('pokemonWeight').textContent = `${weight} kg`;

     document.getElementById('pokemonImg').src = hdImageNorm;

     document.getElementById('left').addEventListener('click', function() {
       document.getElementById('pokemonImg').src = hdImageNorm;
     });
     document.getElementById('right').addEventListener('click', function() {
       document.getElementById('pokemonImg').src = hdImageShiny;
     });

   })
   .catch(error => {
     alert(error.message);
   });
}