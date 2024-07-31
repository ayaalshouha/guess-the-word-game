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
let number_of_hints = 2;
let message_area = document.querySelector(".message");
let guessBtn = document.querySelector(".check");
let hintBtn = document.querySelector(".hint");
hintBtn.children[0].innerHTML = number_of_hints;
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

hintBtn.addEventListener("click", getHint);
function getHint() {
  if (number_of_hints > 0) {
    number_of_hints--;
    hintBtn.children[0].innerHTML = number_of_hints;

    if (number_of_hints == 0) {
      hintBtn.disabled = true;
    }

    const enabled_inputs = document.querySelectorAll(
      ".inputs > div:not(.disabled) input"
    );

    const empty_inputs = Array.from(enabled_inputs).filter(
      (e) => e.value === ""
    );
    
    for (let i = 0; i < empty_inputs; i++) {

    }
  }
}

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
  //result

  if (success) {
    message_area.innerHTML = `Congrates! You Win The Word is <span>${word_to_guess}</span>`;

    // add disabled class to all try divs
    let all_try_divs = document.querySelectorAll(".inputs > div");
    all_try_divs.forEach((try_div) => try_div.classList.add("disabled"));
    //disable buttons after finish game
    guessBtn.disabled = true;
    hintBtn.disabled = true;
  } else {
    document
      .querySelector(`.inputs .try-${current_try}`)
      .classList.add("disabled");

    let curr_try_inputs = document.querySelectorAll(`try-${current_try} input`);
    curr_try_inputs.forEach((e) => (e.disabled = true));
    current_try++;

    let next_try = document.querySelector(`.inputs .try-${current_try}`);

    if (next_try) {
      next_try.classList.remove("disabled");
      next_try_inputs = document.querySelectorAll(`.try-${current_try} input`);
      next_try_inputs.forEach((input) => (input.disabled = false));
      next_try_inputs[0].focus();
    } else {
      message_area.innerHTML = `Game Over :-( ! The Word is <span>${word_to_guess}</span>`;
      //disable buttons after finish game
      guessBtn.disabled = true;
      hintBtn.disabled = true;
    }
  }
}

window.onload = function () {
  generateInputs();
};
