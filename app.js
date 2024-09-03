// Function to display content on the page
function displayContent(content, elementId) {
    const element = document.getElementById(elementId);
    element.textContent = content;
  }
  
  // Useless Facts API
  async function getRandomFact() {
    try {
      const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
      const data = await response.json();
      displayContent(data.text, 'fact');
    } catch (error) {
      console.error('Error fetching fact:', error);
      displayContent('Failed to fetch a fact. Please try again.', 'fact');
    }
  }
  
  // Life Hacks API
  async function getLifeHack() {
    try {
      const response = await fetch('https://us-central1-tiapiborger.cloudfunctions.net/tiApiBorger?type=lifehacks&mode=random');
      const data = await response.json();
      displayContent(data.text, 'lifeHack');
    } catch (error) {
      console.error('Error fetching life hack:', error);
      displayContent('Failed to fetch a life hack. Please try again.', 'lifeHack');
    }
  }
  
  
  // Horoscopes API
  async function getHoroscope() {
    try {
      //const response = await fetch('https://viewbits.com/api/v1/horoscopes?mode=today&sign=aries');
      const response = await fetch('https://us-central1-tiapiborger.cloudfunctions.net/tiApiBorger?type=horoscopes&mode=today&aries');
      const data = await response.json();
      displayContent(data[0].horoscope, 'horoscope');
    } catch (error) {
      console.error('Error fetching horoscope:', error);
      displayContent('Failed to fetch horoscope. Please try again.', 'horoscope');
    }
  }
  
  async function getOnThisDay() {
    try {
      const response = await fetch('https://us-central1-tiapiborger.cloudfunctions.net/tiApiBorger?type=onthisday&mode=today');
      const data = await response.json();
  
      const displayEvents = (events, limit = 5) => {
          const limitedEvents = events.slice(0, limit); // Display only the first 5 events
          limitedEvents.forEach(event => {
              document.getElementById('onThisDay').innerHTML += `<p>${event.html}</p>`;
          });
      };
  
      displayEvents(data.data.Events);
  
    } catch (error) {
      console.error('Error fetching On This Day:', error);
      displayContent('Failed to fetch On This Day. Please try again.', 'onThisDay');
    }
  }
  

async function getRandomFact2() {
    const url = 'https://facts-by-api-ninjas.p.rapidapi.com/v1/facts';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '1150be4b2bmsh374989d75d0191ep1237a1jsn41abcbb4d7a8',
            'x-rapidapi-host': 'facts-by-api-ninjas.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        displayContent(result[0].fact, 'ninjaFact');
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

// Add event listeners for the buttons
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('getFact').addEventListener('click', getRandomFact);
    document.getElementById('getLifeHack').addEventListener('click', getLifeHack);
    document.getElementById('getHoroscope').addEventListener('click', getHoroscope);
    document.getElementById('getOnThisDay').addEventListener('click', getOnThisDay);
    document.getElementById('getFact2').addEventListener('click', getRandomFact2);
});