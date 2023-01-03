let getJoke = document.getElementById('button')
const jokeText = document.getElementById('joke-text')
const jokeTitle = document.getElementById('joke-main')
let jokeDiv = document.getElementById('display-joke')
let altJokes = document.getElementById('alt-jokes')

getJoke.addEventListener('click', (e) => {
    fetch("https://v2.jokeapi.dev/joke/Any?amount=5")
    .then((res) => res.json())
    .then(data => {
        console.log(data.jokes)
        displayJoke(data.jokes[0])
        extraJoke(data.jokes)
    })
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
    h3.textContent = joke.category
    
    let btn = document.createElement("button")
    btn.id = "favorite"
    btn.textContent = "Favorite"

    btn.addEventListener('click', () => {
        addToFavorites(joke)
    })
    
    jokeDiv.append(h1, h3, btn)
        
}

function twoPartJoke(joke) {
    jokeDiv.innerHTML = ''
    let h1 = document.createElement('h1')
    h1.textContent = joke.setup;

    let h2 = document.createElement('h2')
    h2.textContent = joke.delivery

    let h3 = document.createElement('h3')
    h3.textContent = joke.category

    let btn = document.createElement("button")
    btn.id = "favorite"
    btn.textContent = "Favorite"

    btn.addEventListener('click', () => {
        addToFavorites(joke)
    })

    jokeDiv.append(h1, h2, h3, btn)
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


    




