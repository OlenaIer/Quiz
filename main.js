// let localResults = {};

const quiz = document.querySelector("#quiz");
const btnCheck = document.querySelector("#check");
const darkMode = document.querySelector("#darkMode");

//CREATE QUESTIONS
const createListItems = (element, elementIndex) => {
  let listItemsString = "";
  let inputType = "radio";
  if (element.multiple) {
    inputType = "checkbox";
  }

  for (let answer = 0; answer < element.answers.length; answer++) {
    listItemsString += `
      <li>
        <label>
        
          <input id="selectBox" name=${elementIndex} type= ${inputType} value=${element.answers[answer].correctAnswer} />
          ${element.answers[answer].value}
        </label>
      </li>
      `;
  }

  return listItemsString;
};

const createAnswers = () => {
  for (let questionIndex = 0; questionIndex < DATA.length; questionIndex++) {
    let element = DATA[questionIndex];

    quiz.innerHTML += `<div id="question" > <h2> ${
      element.question
    } </h2> <ul> ${createListItems(element, questionIndex)} </ul> </div>`;
  }
};

createAnswers();
//
let isDarkMode = false;
darkMode.addEventListener("click", () => {
  if (!isDarkMode) {
    // darkMode.textContent = "Light";
    document.querySelector("body").style.backgroundColor = "#303133";
    document.querySelector("body").style.color = "#efefef";
    darkMode.innerHTML = '<i class="fas fa-sun"></i> ' + "Light";
    isDarkMode = true;
  } else {
    // <i class="fas fa-moon"></i>;
    isDarkMode = false;

    document.querySelector("body").style.backgroundColor = "#e4e4e7";
    document.querySelector("body").style.color = "#27272a";
    darkMode.innerHTML = '<i class="fas fa-moon"></i> ' + "Dark";
  }
});

btnCheck.addEventListener("click", () => {
  // quiz.innerHTML += "";
  let questions = quiz.querySelectorAll("[id='question']");

  let counterRightAnswers = 0;
  questions.forEach((qstn) => {
    let inputElements = qstn.querySelectorAll("[id='selectBox']");

    let correctAnswer = true;
    for (let i = 0; i < inputElements.length; i++) {
      let isValueTrue = Number(inputElements[i].value) === 1;
      if (inputElements[i].checked !== isValueTrue) {
        correctAnswer = false;
      }
    }

    if (correctAnswer) counterRightAnswers++;
  });

  let uppdateResult = () => {
    let result = document.querySelector("#result");
    result.textContent = `Right answers: ${counterRightAnswers}`;
    let countQuestions = DATA.length;
    if (counterRightAnswers <= countQuestions / 3) {
      result.style.backgroundColor = "red";
    } else if (counterRightAnswers <= countQuestions - 2) {
      result.style.backgroundColor = "grey";
    } else {
      result.style.backgroundColor = "green";
    }
  };
  uppdateResult();
});
