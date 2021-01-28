function init() {
  Promise.all(generatePokemonPromises())
  .then(renderCard).then(insertPokemonsHTML)
}

const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
  fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const insertPokemonsHTML = pokemons => {
  document.querySelector('[data-cards="pokedex"]').insertAdjacentHTML('afterbegin', pokemons)
}

const renderCard = (pokemons) => {
  return pokemons.reduce((acc, pokemon) => {
    const { name, id, types } = pokemon
    const elementTypes = types.map(typeInfo => typeInfo.type.name)
    return acc += `
      <li class="card ${elementTypes[0]}">
        <img class="card-image " alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png">
        <h2 class="card-title">${id}. ${name}</h2>
        <p class="card-subtitle">${elementTypes.join(' | ')}</p>
      </li>`
  },'')
 }




window.addEventListener('load', init)