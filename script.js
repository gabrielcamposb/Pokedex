const pokeName = document.querySelector('.pokemon-name')
const pokeNumber = document.querySelector('.pokemon-number')
const pokeImage = document.querySelector('.pokemon')
const form = document.querySelector('.form')
const input = document.querySelector('.input')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')

let defaultPokemon = 1

const searchPokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (apiResponse.status === 200) {
        const data = await apiResponse.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {
    pokeName.innerHTML = 'Loading...'
    pokeNumber.innerHTML = ''
    const data = await searchPokemon(pokemon)
    
    if (data) {
        pokeImage.style.display = 'block'
        pokeName.innerHTML = data.name
        pokeNumber.innerHTML = data.id
        pokeImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value = ''
        defaultPokemon = data.id
    } else {
        pokeImage.style.display = 'none'
        pokeName.innerHTML = 'Not Found'
        pokeNumber.innerHTML = ''
        input.value = ''
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

nextBtn.addEventListener('click', () => {
    defaultPokemon += 1
    renderPokemon(defaultPokemon)
})

prevBtn.addEventListener('click', () => {
    if (defaultPokemon > 1) {
        defaultPokemon -= 1
        renderPokemon(defaultPokemon)
    }
})

renderPokemon(defaultPokemon)