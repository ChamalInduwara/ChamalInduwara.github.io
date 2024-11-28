window.onload = function() {
  const topButton = document.getElementById("top");

  window.onscroll = function() {
   if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    topButton.style.display = "block";
    } else {
    topButton.style.display = "none";
    }
  };
}

function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

async function getAllPokemonNames() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=1010';

  try {
    const response = await fetch(url);
    const data = await response.json();
    const pokemonNames = data.results.map(pokemon => pokemon.name);

    const container = document.getElementById('container');

    pokemonNames.forEach(name => {
      const div = document.createElement('div');
      div.className = 'poke-div';

      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Pokemon not found');
          }
          return response.json();
        })
        .then(data => {
          const img = data.sprites.other["official-artwork"].front_default;
          const types = data.types.map(typeInfo => typeInfo.type.name);

          const image = document.createElement('img');
          image.src = img;
          image.className = 'div-img';
          const p = document.createElement('p');
          p.textContent = name;
          p.className = 'div-p';
          div.className += ` ${types[0]}`;

          div.appendChild(image);
          div.appendChild(p);
          container.appendChild(div);
        })
        .catch(error => {
          alert(error.message);
      });

      div.addEventListener('click', () => {
        window.location.href = `details.html?pokemon=${encodeURIComponent(name)}`;
      });
    });

    const button = document.getElementById('button');
    button.addEventListener('click', function() {
      const pokename = document.getElementById('pokename').value.toLowerCase();
      if (pokename != ""){
        if (pokemonNames.indexOf(pokename) !== -1) {
          window.location.href = `details.html?pokemon=${encodeURIComponent(pokename)}`;
        } else {
          document.getElementById('pokename').value = "";
        }
      } 
    });


  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
  }
}

getAllPokemonNames();