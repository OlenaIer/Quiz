let localResults = {};

const quiz = document.querySelector("#quiz");
const btnCheck = document.querySelector("#check");

//CREATE QUESTIONS
const createListItems = (element) => {
  let listItemsString = "";
  let inputType = "radio";
  if (element.multiple) {
    inputType = "checkbox";
  }

  for (let answer = 0; answer < element.answers.length; answer++) {
    listItemsString += `
      <li>
        <label>
        
          <input id="selectBox" name=${element.answers[answer]} type= ${inputType} value=${element.answers[answer].correctAnswer} />
          ${element.answers[answer].value}
        </label>
      </li>
      `;
  }
  console.log(listItemsString);
  return listItemsString;
};

const createAnswers = () => {
  for (let questionIndex = 0; questionIndex < DATA.length; questionIndex++) {
    let element = DATA[questionIndex];

    quiz.innerHTML += `<div id="question" data-multi = ${element.multiple}
   
    > <h2> ${element.question} </h2> <ul> ${createListItems(
      element
    )} </ul> </div>`;
  }
};

createAnswers();
// quiz.innerHTML = "";

let counterRightAnswers = 0;
let questions = quiz.querySelectorAll("[id='question']");

btnCheck.addEventListener("click", () => {
  counterRightAnswers = 0;
  questions.forEach((qstn) => {
    // let inputElement = document.getElementsByTagName("input");
    // let counter = 0;
    // for (let i = 0; i < inputElement.length; i++) {
    //   if (inputElement[i].type === "checkbox") {
    //     if (
    //       inputElement[i].checked === true &&
    //       inputElement[i].correctAnswer === true
    //     ) {
    //       counter++;
    //       console.log(counter);
    //       console.log("Salute");
    //     }
    //   }
    //   if (counter === 3) {
    //     counterRightAnswers++;
    //     console.log("Hej");
    //   }
    // }
    // console.log(counter);

    // if (qstn.multiple) {
    if (qstn.type === "checkbox") {
      let correct = false;
      // let selectBox = document.querySelectorAll("#selectBox");

      qstn.querySelectorAll("#selectBox").forEach((input) => {
        // .querySelectorAll("#selectBox")
        console.log((input.checked != input.value) === true);
        console.log("Shit!");
        if (input.checked != input.value) {
          correct = false;
          console.log("Shit 2!");
        }
      });
      if (correct) {
        counterRightAnswers++;
        console.log("multiple correct");
      }
    } else {
      qstn.querySelectorAll("#selectBox").forEach((input) => {
        //console.log(input.value);
        if (input.checked && input.value) {
          counterRightAnswers++;
          console.log("ggggg");
        }
      });
    }
  });
  quiz.innerHTML += `<p>Right : ${counterRightAnswers}</p>`;
});

// let checkboxes = () => {
//   let inputElement = document.getElementsByTagName("input");
//   let counter = 0;
//   for (let i = 0; i < inputElement.length; i++) {
//     if (
//       inputElement[i].type === "checkbox" &&
//       inputElement[i].checked == true
//     ) {
//       counter++;
//       console.log(counter);
//     }
//   }
//   if (counter === 3) {
//     counterRightAnswers++;
//   }
// };
