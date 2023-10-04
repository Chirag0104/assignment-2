let questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Paris", "London", "Madrid"],
    answer: 1,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 1,
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "Charles Dickens",
      "Jane Austen",
      "William Shakespeare",
      "J.K. Rowling",
    ],
    answer: 2,
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: 1,
  },
  {
    question: "Which metal is liquid at room temperature?",
    options: ["Gold", "Silver", "Mercury", "Brass"],
    answer: 2,
  },
];

let currentQuestion = 0;
let score = 0;
let timer;
let timerDuration = 10;
let currentTime = timerDuration;

document.querySelectorAll(".option-btn").forEach((btn, index) => {
  btn.addEventListener("click", function () {
    clearSelections();
    btn.classList.add("selected");

    let currentQ = questions[currentQuestion];

    if (currentQ.answer === Number(btn.dataset.index)) {
      btn.classList.add("correct");
      score++;
    } else {
      btn.classList.add("wrong");
      let correctBtn = document.querySelector(
        `.option-btn[data-index="${currentQ.answer}"]`
      );
      correctBtn.classList.add("correct-answer");
    }

    disableOptions();
  });
});

document.querySelector(".submit-btn").addEventListener("click", function () {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion(currentQuestion);
    resetTimer();
  } else {
    document.querySelector(".submit-btn").style.display = "none";
    displayScore();
  }
});

document.querySelector(".restart-btn").addEventListener("click", function () {
  currentQuestion = 0;
  score = 0; 

  // Hide the score display
  let scoreDisplay = document.querySelector(".score-display");
  if (scoreDisplay) {
    scoreDisplay.style.display = "none";
  }

  let nextButton = document.querySelector(".submit-btn");
  if (nextButton) {
    nextButton.style.display = "block";
  }

  loadQuestion(0); 
  resetTimer(); 
  clearFeedback(); 
});

function loadQuestion(qIndex) {
  let q = questions[qIndex];
  document.querySelector(".question").innerText = q.question;
  let buttons = document.querySelectorAll(".option-btn");
  clearSelections();
  buttons.forEach((btn, index) => {
    btn.innerText = q.options[index];
    btn.classList.remove("selected", "correct", "wrong");
    btn.disabled = false;
  });
}

function disableOptions() {
  document.querySelectorAll(".option-btn").forEach((btn) => {
    btn.disabled = true;
  });
}

function clearSelections() {
  document.querySelectorAll(".option-btn").forEach((btn) => {
    btn.classList.remove("selected", "correct", "wrong", "correct-answer"); 
    btn.disabled = false;
  });
}

function clearFeedback() {
  document.querySelector(".feedback").innerText = "";
}

function startTimer() {
  currentTime = timerDuration;
  timer = setInterval(function () {
    currentTime--;
    document.querySelector(".timer").textContent =
      "Time remaining: " + currentTime + "s";

    if (currentTime <= 0) {
      clearInterval(timer); 
      disableOptions(); 

      if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion(currentQuestion);
        resetTimer();
      } else {
        document.querySelector(".submit-btn").style.display = "none";
        displayScore();
      }
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  startTimer();
}

function displayScore() {
  clearInterval(timer);

  let scoreDisplay = document.querySelector(".score-display");
  let scoreValue = document.querySelector(".score-value");

  scoreValue.innerText = score;
  scoreDisplay.style.display = "block";
}

loadQuestion(0);
startTimer();
