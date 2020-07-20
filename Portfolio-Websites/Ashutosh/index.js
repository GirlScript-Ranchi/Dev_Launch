//Need to make a function to get rid of the preloader

window.addEventListener("load", () => {
  const preload = document.querySelector(".preload");
  preload.classList.add("preload-finish");
  const universe = document.querySelector(".universe-start");
  universe.classList.add("universe");
  universe.classList.remove("universe-start");
});

const navSlide = function () {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const social = document.querySelector(".social");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    navLinks.forEach((links, index) => {
      if (links.style.animation) {
        links.style.animation = "";
      } else {
        links.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.5
        }s`;
      }
    });
    burger.classList.toggle("toggle");
  });
};
navSlide();

let check = 0;
let audio = new Audio("bella_ciao_guitar.mp3");
audio.loop = true;
async function playAudio() {
  check++;
  if (check === 1) {
    document
      .getElementById("audio_play")
      .removeEventListener("click", playAudio);
    document.getElementById("audio_play").addEventListener("click", play_pause);
  }
  try {
    await audio.play();
  } catch (err) {
    console.log(err);
  }
}

function play_pause() {
  if (audio.paused) {
    playAudio();
  } else {
    audio.pause();
  }
}

document
  .getElementById("audio_play")
  .addEventListener("click", playAudio, false);

const TypeWriter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

// Type Method

TypeWriter.prototype.type = function () {
  // Current Index of Word
  const current = this.wordIndex % this.words.length;
  // Get Full text of current word
  const fulltxt = this.words[current];
  // Check if deleting
  if (this.isDeleting) {
    //Remove a character
    this.txt = fulltxt.substring(0, this.txt.length - 1);
  } else {
    // Add char
    this.txt = fulltxt.substring(0, this.txt.length + 1);
  }

  // insert txt element into p
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  // Initial Type speed
  let typeSpeed = 300;
  if (this.isDeleting) {
    typeSpeed /= 2;
  }
  // Check word is complete
  if (!this.isDeleting && this.txt === fulltxt) {
    // Pause at end
    typeSpeed = this.wait;
    //Set this.isDeleting to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    // Move to next word
    this.wordIndex++;
    // pause before typing
    typeSpeed = 500;
  }
  setTimeout(() => this.type(), typeSpeed);
};

// Init On Dom Load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
  const txtElement = document.querySelector(".profession");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  //Init typewriter
  new TypeWriter(txtElement, words, wait);

  // adding Codeforces rating
  let rating = document.getElementById("codeforces");
  let prev_rating = 900;
  fetch("https://codeforces.com/api/user.rating?handle=ashutosh1729")
    .then((response) => {
      if (!response.ok) {
        rating.innerText += ` ${prev_rating}`;
      }
      return response.json();
    })
    .then((data) => {
      if (data.status !== "OK") {
        rating.innerText += ` ${prev_rating}`;
      }
      prev_rating = data.result[data.result.length - 1].newRating;
      rating.innerText += ` ${prev_rating}`;
    })
    .catch((err) => {
      console.log(prev_rating);
    });
}

const canvas = document.getElementById("canv");
const ctx = canvas.getContext("2d");
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);
  const cols = Math.floor(w / 20) + 1;
  const ypos = Array(cols).fill(90);
}
let w = (canvas.width = window.innerWidth);
let h = (canvas.height = window.innerHeight);
ctx.fillStyle = "#000";
ctx.fillRect(0, 0, w, h);
const cols = Math.floor(w / 20) + 1;
const ypos = Array(cols).fill(90);

function matrix() {
  // Draw a semitransparent black rectangle on top of previous drawing
  ctx.fillStyle = "#0001";
  ctx.fillRect(0, 0, w, h);

  // Set color to green and font to 15pt monospace in the drawing context #0f0
  ctx.fillStyle = "rgb(139,0,0)";
  ctx.font = "15pt monospace";

  // for each column put a random character at the end
  ypos.forEach((y, ind) => {
    // generate a random character
    const text = String.fromCharCode(Math.random() * 128);

    // x coordinate of the column, y coordinate is already given
    const x = ind * 20 + 0;
    // render the character at (x, y)
    ctx.fillText(text, x, y);

    // randomly reset the end of the column if it's at least 100px high
    if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
    // otherwise just move the y coordinate for the column 20px down,
    else ypos[ind] = y + 20;
  });
}

window.addEventListener("resize", resize);
// render the animation at 20 FPS.
setInterval(matrix, 50);
