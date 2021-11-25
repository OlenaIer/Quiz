"use strict";

const DATA = [
  {
    question:
      "<b>Question 1:</b><p> Salsa is a Latin dance associated with the music genre of the same name</p>",
    answers: [
      {
        id: "1",
        value: "True",
        correctAnswer: true,
      },
      {
        id: "2",
        value: "False",
        correctAnswer: false,
      },
    ],
  },

  {
    question:
      "<b>Question 2:</b><p> Salsa was first popularized in the Sweden in the 1960s in Malmö City</p>",
    answers: [
      {
        id: "3",
        value: "True",
        correctAnswer: false,
      },
      {
        id: "4",
        value: "False",
        correctAnswer: true,
      },
    ],
  },

  // {
  //   question:
  //     "<b>Question 3:</b><p> Salsa's tempo ranges from about 150 bpm (beats per minute) to around 250 bpm</p>",
  //   answers: [
  //     {
  //       id: "5",
  //       value: "True",
  //       correctAnswer: true,
  //     },
  //     {
  //       id: "6",
  //       value: "False",
  //       correctAnswer: false,
  //     },
  //   ],
  // },
  // {
  //   question:
  //     "<b>Question 4:</b><p> The basic Salsa dance rhythm consists of taking _____ steps for every four beats of music</p>",
  //   answers: [
  //     {
  //       id: "7",
  //       value: "four",
  //       correctAnswer: false,
  //     },
  //     {
  //       id: "8",
  //       value: "three",
  //       correctAnswer: true,
  //     },
  //     {
  //       id: "9",
  //       value: "two",
  //       correctAnswer: false,
  //     },
  //   ],
  // },

  // {
  //   question:
  //     "<b>Question 5:</b><p> One of the early influential instructors in salsa was ______. </p>",
  //   answers: [
  //     {
  //       id: "10",
  //       value: "Bil Gates",
  //       correctAnswer: false,
  //     },
  //     {
  //       id: "11",
  //       value: "Elon Musk",
  //       correctAnswer: false,
  //     },
  //     {
  //       id: "12",
  //       value: "Eddie Torres",
  //       correctAnswer: true,
  //     },
  //   ],
  // },

  // {
  //   question:
  //     "<b>Question 6:</b><p> Salsa is an effective and fun form of _______. </p>",
  //   answers: [
  //     {
  //       id: "13",
  //       value: "cardio",
  //       correctAnswer: true,
  //     },
  //     {
  //       id: "14",
  //       value: "yoga",
  //       correctAnswer: false,
  //     },
  //     {
  //       id: "15",
  //       value: "weight training",
  //       correctAnswer: false,
  //     },
  //   ],
  // },
];

let localResults = {};

const quiz = document.querySelector("#quiz");
const questions = document.querySelector("#questions");
const indicator = document.querySelector("#indicator");
const results = document.querySelector("#results");
const btnNext = document.querySelector("#btn-next");
const btnRestart = document.querySelector("#btn-restart");

const renderQuestions = (index) => {
  renderIndicator(index + 1);
  //здесь мы прописываем значение шага для того, чтобы понимать на каком шаге мы сейчас находимся
  questions.dataset.currentStep = index;
  //renders answers to a particical question. Index for question. По этому индексу из наших данных мы будем брать определенные элементы
  //мы переходим по каждому элементу из нашего массива
  const renderAnswers = () =>
    DATA[index].answers
      .map(
        (answer) => `
      <li>
        <label>
          <input class="answer-input" type="radio" name=${index} value=${answer.id} />
        ${answer.value}
        </label>
      </li>
    `
      )
      .join("");

  // <h1>True or false?</h1>
  questions.innerHTML = `
    <div class="quiz-questions-item"> 
      <div class="quiz-questions-item-question">${DATA[index].question} </div>
      <ul class="quiz-questions-item-answers">${renderAnswers()}</ul>
    </div>`;
};

let counterRightAnswers = 0;

const renderResults = () => {
  let content = "";

  const getClassname = (answer, questionIndex) => {
    let classname = "";

    //если ответ неправильный и пользователь выбрал его то
    if (!answer.correctAnswer && answer.id === localResults[questionIndex]) {
      classname = "answer--invalid";
    } else if (answer.correctAnswer) {
      counterRightAnswers++;
      classname = "answer--valid";
    }
    return classname;
  };

  const getAnswers = (questionIndex) => {
    return DATA[questionIndex].answers
      .map((answer) => {
        return `<li class=${getClassname(answer, questionIndex)}>${
          answer.value
        }</li>`;
      })
      .join("");
  };

  DATA.forEach((question, index) => {
    content += `
    <div class="quiz-result-item">
          <div class="quiz-result-item-question">${question.question}</div>
          <ul class="quiz-result-item-answer"> ${getAnswers(index)}</ul>   
        </div>`;
  });
  results.innerHTML = content;
};

const renderIndicator = (currentStep) => {
  indicator.innerHTML = `${currentStep}/${DATA.length}`;
};

quiz.addEventListener("change", (event) => {
  //logic for answers
  if (event.target.classList.contains("answer-input")) {
    console.log("input");
    localResults[event.target.name] = event.target.value; //в рамках вот этого обьекта, запиши в качестве ключа наш event.target.name . То есть мы сюда записываем name=${index} из <input class="answer-input" type="radio" name=${index} value=${answer.id}/> , А вот в качестве значения мы берем наш [event.target.value].То есть мы берем value=${answer.id} из <input class="answer-input" type="radio" name=${index} value=${answer.id}/>

    //Поскольку мы понимаем, что здесь человек уже выбрал какой-то вариант ответа, то нам нужно включить кнопку next
    btnNext.disabled = false;

    console.log(localResults);
  }
});
let paraResultMessage = document.querySelector(".paraResultMessage");
let selectAction = document.querySelector(".selectAction");

quiz.addEventListener("click", (event) => {
  //next or again
  // console.log(event);

  if (event.target.classList.contains("btn-next")) {
    console.log("Next");
    //берем начальное значение шага и + 1
    const nextQuestionIndex = Number(questions.dataset.currentStep) + 1;

    if (DATA.length === nextQuestionIndex) {
      //здесть мы переходим к результатам

      const newHeading = document.querySelector("h1");
      newHeading.textContent = "Here is your result:";

      // paraResultMessage.textContent = `You got ${counterRightAnswers} correct answers out of ${DATA.length} questions!`;
      // selectAction.textContent = `Well, not quite all the way... Look at your answers and try again! 😉`;
      console.log(counterRightAnswers);

      questions.classList.add("questions--hidden");
      indicator.classList.add("indicator--hidden");
      results.classList.add("indicator--visible");
      btnNext.classList.add("btn-next--hidden");
      btnRestart.classList.add("btn-restart--visible");
      renderResults();
    } else if (DATA.length - 1 === nextQuestionIndex) {
      btnNext.innerHTML = "Get results!";

      renderQuestions(nextQuestionIndex);
    } else {
      //здесть мы переходим к следующему вопросу
      renderQuestions(nextQuestionIndex);
    }

    //когда мы переходим к другому вопросу нам нужно снова выключить кнопку next
    btnNext.disabled = true;
  }

  if (event.target.classList.contains("btn-restart")) {
    localResults = {}; //сбросили все старые ответы
    results.innerHTML = ""; // очистили результаты

    // убрали все классы, которые мы добавили
    questions.classList.remove("questions--hidden");
    indicator.classList.remove("indicator--hidden");
    results.classList.remove("indicator--visible");
    btnNext.classList.remove("btn-next--hidden");
    btnRestart.classList.remove("btn-restart--visible");
    console.log("Start again");

    //переходим к рендеру первого вопроса
    renderQuestions(0);
  }
});

renderQuestions(0);
