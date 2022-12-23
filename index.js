//const jokeUrl = 'https://v2.jokeapi.dev/joke/random'

let btn = document.getElementById('button')

btn.addEventListener('click', () => {
    fetch("https://v2.jokeapi.dev/joke/Any?type=single")
    .then((res) => res.json())
    .then(data => {
        let joke = document.querySelector("#joke")
        joke.textContent = data.joke
    })
})

