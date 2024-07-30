// setting game name
let game_name = "Guess The Word";
document.title = game_name;
document.querySelector("h1").innerHTML = game_name;
document.querySelector(
  "footer"
).innerHTML = `${game_name} Game created by Aya AlShouha`;

//setting game options
let number_of_trials = 5;
let number_of_letters = 6;
let current_try = 1;

function generateInputs() {
  const input_container = document.querySelector(".inputs");

  // Create main try div with numbers for each trial

  for (let i = 1; i <= number_of_trials; i++) {
    const try_div = document.createElement("div");
    try_div.classList.add(`try-${i}`);
    try_div.innerHTML = `<span >Try ${i}</span>`;

    if (i !== 1) try_div.classList.add = "disabled";

    //create inputs for each trial
    for (let j = 1; j <= number_of_letters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `try-${i}-letter-${j}`;
      input.maxLength = 1;
      try_div.appendChild(input);
    }

    input_container.appendChild(try_div);
  }
  
  input_container.children[0].children[1].focus();
}

window.onload = function () {
  generateInputs();
};
