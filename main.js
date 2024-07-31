// setting game name
let game_name = "Guess The Word";
document.title = game_name;
document.querySelector("h1").innerHTML = game_name;
document.querySelector(
  "footer"
).innerHTML = `${game_name} Game created by Aya AlShouha`;

let number_of_trials = 6;
let number_of_letters = 6;
let current_try = 1;
let message_area = document.querySelector(".message");

let words = [
  "create",
  "delete",
  "master",
  "branch",
  "mainly",
  "elzero",
  "school",
];

let word_to_guess =
  words[Math.floor(Math.random() * words.length)].toLowerCase();
//setting game options

function generateInputs() {
  const input_container = document.querySelector(".inputs");

  // Create main try div with numbers for each trial
  for (let i = 1; i <= number_of_trials; i++) {
    const try_div = document.createElement("div");
    try_div.classList.add(`try-${i}`);
    try_div.innerHTML = `<span >Try ${i}</span>`;

    if (i !== 1) {
      try_div.classList.add("disabled");
    }

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

  //disable all inputs except first one
  const disabled_inputs = document.querySelectorAll(".disabled input");
  disabled_inputs.forEach((E) => (E.disabled = true));

  //uppercase input value
  const inputs = document.querySelectorAll("input");
  inputs.forEach((e, index) => {
    e.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
    });

    //move to the next input
    e.addEventListener("keydown", function (event) {
      if (event.key === "ArrowRight") {
        const next_input = index + 1;
        if (next_input < inputs.length) inputs[next_input].focus();
      }

      if (event.key === "ArrowLeft") {
        const prev_input = index - 1;
        if (prev_input >= 0) inputs[prev_input].focus();
      }
    });
  });
}

let guessBtn = document.querySelector("Button");
guessBtn.addEventListener("click", checkGuess);

console.log(word_to_guess);

function checkGuess() {
  let success = true;
  for (let i = 1; i <= number_of_letters; i++) {
    const input_field = document.querySelector(
      `#try-${current_try}-letter-${i}`
    );
    const curr_letter = input_field.value.toLowerCase();
    const acutal_letter = word_to_guess[i - 1];

    //check process
    if (curr_letter.value !== null) {
      if (curr_letter === acutal_letter) {
        input_field.classList.add("in-place");
      } else if (word_to_guess.includes(curr_letter) && curr_letter !== "") {
        input_field.classList.add("not-in-place");
        success = false;
      } else {
        input_field.classList.add("wrong");
        success = false;
      }
    }
  }
  if (success) {
    message_area.innerHTML = `Congrates! You Win The Word is <span>${word_to_guess}</span>`;
  } else {
    console.log("you lose");
  }
}
window.onload = function () {
  generateInputs();
};
