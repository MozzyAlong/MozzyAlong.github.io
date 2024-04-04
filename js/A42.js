//	Name: Emidio Guidotti
//	File: A42
//	Date: 22 March 2024
//	Image Gallery script


const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageArray = ["../A4Photos/pic1.jpg", "../A4Photos/pic2.jpg", "../A4Photos/pic3.jpg", "../A4Photos/pic4.jpg", "../A4Photos/pic5.jpg"]

/* Declaring the alternative text for each image file */
const textArray = ["The sight", "The Waves", "The Flower", "The Story", "The Butterfly"]



/* Looping through images */
for (let iter = 0; iter < imageArray.length; iter++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', imageArray[iter]);
    newImage.setAttribute('alt', textArray[iter]);
    newImage.addEventListener("click", displayMe)
    thumbBar.appendChild(newImage);
}

function displayMe() {
    displayedImage.setAttribute('src', this.getAttribute('src'));
    displayedImage.setAttribute('alt', this.getAttribute('alt'));
    }

/* Wiring up the Darken/Lighten button */

btn.addEventListener('click', darken);

function darken() {
    if (this.getAttribute('class') == 'dark') {
        this.setAttribute('class', 'bright');
        this.textContent = 'Brighten';
        overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
    } else {
        this.setAttribute('class', 'dark');
        this.textContent = 'Darken';
        overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";
    }
}