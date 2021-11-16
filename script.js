const audioElement = document.querySelector('audio');
const button = document.querySelector('button');

const voiceRssApiKey = '71071117b4064f6e8a6ecfc599ef6166'

function tellAJoke(joke) {
    VoiceRSS.speech({
        key: voiceRssApiKey,
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


async function fetchJoke() {
    try {
        toggleButtonText('Fetching a joke for you....');
        const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

        const response = await fetch(apiUrl);
        const data = await response.json();
        let joke = data.joke || `${data.setup} .${data.delivery}`;
        joke = joke.trim().replace(/ /g, '%20')
        tellAJoke(joke)
        toggleButton() // Disable button until speech finishes
        toggleButtonText('Transpiling joke into speech...')
    } catch (error) {
        console.error('whoops', error);
    }

}

function toggleButton() {
    button.disabled = !button.disabled
}

function toggleButtonText(text) {
    button.innerHTML = text
}

button.addEventListener('click', (event) => {
    fetchJoke();
    event.preventDefault();
})

audioElement.addEventListener('ended', (event) => {
    toggleButton();
    toggleButtonText('Tell Me a Joke');
    event.preventDefault();
})

audioElement.addEventListener('play', (event) => {
    toggleButtonText('Playing joke...');
    event.preventDefault();
})