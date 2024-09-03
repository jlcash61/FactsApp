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
        const response = await fetch('https://us-central1-tiapiborger.cloudfunctions.net/tiScope');

        // Get the content type
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("text/html")) {
            const text = await response.text(); // Get the raw HTML text
            console.log('Received HTML response:', text); // Log it for reference
            displayContent(text, 'horoscope'); // Display the text in the horoscope element
        } else if (contentType && contentType.includes("text/plain")) {
            const text = await response.text(); // Get the plain text response
            displayContent(text, 'horoscope'); // Display the text in the horoscope element
        } else {
            console.error('Unexpected response format:', contentType);
            displayContent('Failed to fetch horoscope. Unexpected response format.', 'horoscope');
        }
    } catch (error) {
        console.error('Error fetching Horoscope:', error);
        displayContent('Failed to fetch Horoscope. Please try again.', 'horoscope');
    }
}



  
async function getOnThisDay() {
  try {
      const response = await fetch('https://us-central1-tiapiborger.cloudfunctions.net/tiApiBorger?type=onthisday&mode=today');
      const data = await response.json();

      const displayEvents = (events) => {
          events.forEach(event => {
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
    getHoroscope();
    getLifeHack();
    //getOnThisDay();
    getRandomFact();
    getRandomFact2();
});