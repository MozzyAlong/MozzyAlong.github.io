//	Name: Emidio Guidotti
//	File: A4
//	Date: 22 March 2024
//	Silly Story Script

console.log("Script Running...")

// pasted code
const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}
// pasted code end

// story variables
let storyText = "It was 94 Fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 Pounds, and it was a hot day.";
let insertX = ["Willy the Goblin", "Big Daddy","Father Christmas"];
let insertY = ["the soup kitchen", "Disneyland", "the White House"];
let insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"];

// pasted code start
randomize.addEventListener('click', result);

// result function for filling in the story
function result() {

    let newStory = storyText;
    let xItem = randomValueFromArray(insertX);
    let yItem = randomValueFromArray(insertY);
    let zItem = randomValueFromArray(insertZ);

    newStory = newStory.replaceAll(":insertx:", xItem);
    newStory = newStory.replaceAll(":inserty:", yItem);
    newStory = newStory.replaceAll(":insertz:", zItem);

    if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replaceAll(xItem, name);
    }

    // if to change to uk version
    if(document.getElementById("uk").checked) {
        const weight = Math.round(300);
        const temperature =  Math.round(94);
        let tItem = String(Math.round(((32*temperature) - 32) * (5/9)));
        let wItem = String(Math.round(weight/14));
        tItem = tItem.concat(" ", "Centigrade");
        wItem = wItem.concat(" ", "Stones");
        newStory = newStory.replaceAll("94 Fahrenheit", tItem);
        newStory = newStory.replaceAll("300 Pounds", wItem);
    }

    // fill in the blank slot in the html
    story.textContent = newStory;
    story.style.visibility = 'visible';
}
// pasted code end