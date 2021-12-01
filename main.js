let localResults = {};

const quiz = document.querySelector("#quiz");
const btnCheck = document.querySelector("#check");

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

  quiz.innerHTML += `<p>Right : ${counterRightAnswers}</p>`;
});
