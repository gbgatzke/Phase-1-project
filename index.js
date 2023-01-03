const getJoke = document.getElementById('button')
const jokeText = document.getElementById('joke-text')
const jokeTitle = document.getElementById('joke-main')
const jokeDiv = document.getElementById('display-joke')
const altJokes = document.getElementById('alt-jokes')
const form = document.querySelector('#form')

getJoke.addEventListener('click', () => {
    fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=racist,sexist&amount=5")
    .then((res) => res.json())
    .then(data => {
        displayJoke(data.jokes[0])
        extraJoke(data.jokes)
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let input = document.getElementById('search-input')
    searchJoke(input.value)
})

function displayJoke(joke) {
    if (joke.setup) {
        twoPartJoke(joke)
    }   else {singleLineJoke(joke)}
}

function extraJoke(jokes) { 
    altJokes.innerHTML = ''
    jokes.forEach(joke => {
        if (joke.type === 'single') {
            let p = document.createElement('p')
            p.textContent = joke.joke
            altJokes.appendChild(p)
        } else {
            let p = document.createElement('p')
            p.textContent = `${joke.setup} -- ${joke.delivery}`
            altJokes.appendChild(p)
        }
    })
}

function singleLineJoke(joke) {
    jokeDiv.innerHTML = ''
    let h1 = document.createElement('h1')
    h1.textContent = joke.joke;

    let h3 = document.createElement('h3')
    if (joke.safe === true) {
        h3.textContent = "This is a vanilla joke!"
    } else {
        h3.textContent = "This joke might be offensive!"
    }

    let h4 = document.createElement('h4')
    h4.textContent = `Category: ${joke.category}`
    
    let btn = document.createElement("button")
    btn.id = "favorite"
    btn.textContent = "Favorite"
    btn.disabled = false

    

    btn.addEventListener('click', (e) => {
        addToFavorites(joke)
        btn.disabled = true
    })
    
    jokeDiv.append(h1, h3, h4, btn)
        
}

function twoPartJoke(joke) {
    jokeDiv.innerHTML = ''
    let h1 = document.createElement('h1')
    h1.textContent = joke.setup;

    let h2 = document.createElement('h2')
    h2.textContent = joke.delivery

    let h3 = document.createElement('h3')
    let flags = joke.flags
    if (joke.safe === true) {
        h3.textContent = "This is a vanilla joke!"
    } else {
        h3.textContent = "This joke might be offensive!"
    }

    let h4 = document.createElement('h4')
    h4.textContent = `Category: ${joke.category}`

    let btn = document.createElement("button")
    btn.id = "favorite"
    btn.textContent = "Favorite"
    btn.disabled = false

    btn.addEventListener('click', () => {
        addToFavorites(joke)
        btn.disabled = true
    })

    jokeDiv.append(h1, h2, h3, h4, btn)
}

function addToFavorites(joke) {
    let savedJokes = document.getElementById('saved-jokes')
    let p = document.createElement('p')
    if (joke.joke) {
        p.textContent = joke.joke
        savedJokes.appendChild(p)
    }   else {
        p.textContent = `${joke.setup} -- ${joke.delivery}`
        savedJokes.appendChild(p)
    }
}

function searchJoke(search) {
    fetch(`https://v2.jokeapi.dev/joke/Any?contains=${search}`)
    .then((res) => res.json())
    .then(joke => displayJoke(joke))
}

//let programBox = document.querySelector('#programming')
//let miscBox = document.querySelector('#misc')
//let darkBox = document.querySelector('#dark')
//let punBox = document.querySelector('#pun')
//let spookyBox = document.querySelector('#spooky')
//
//if (programBox.checked === true) {}







    




