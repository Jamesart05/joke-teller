const button = document.getElementById('button')
const audioElement = document.getElementById('audio')

// Disable/enable button
function toggleButton(){
      button.disabled = !button.disabled
}

// Paassing our joke to voiceRSS API
function tellMe(joke){
      VoiceRSS.speech({
            key: '3cd54b96e8214450978735d136088137',
            src: joke,
            hl: 'en-us',
            v: 'Linda',
            r: 0,
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
    
        })
}

// get jokes from api
async function getJokes() {
      let joke = '';
      const apiUrl = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=racist,sexist";
      try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            if(data.setup){
                  joke = `${data.setup} ... ${data.delivery} `
            }else{
                  joke = data.joke
            }
            // Text-to-speech
            tellMe(joke)
            // Disable button
            toggleButton()
      }catch (error) {
            console.log(error.message);
      }
}

button.addEventListener('click', getJokes)
audioElement.addEventListener('ended', toggleButton)