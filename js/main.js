
let questionArr
async function getQuestion() {
  const response = await fetch('https://myjson.dit.upm.es/api/bins/97jv')
  questionArr = await response.json()
}

getQuestion()

let fiveAnswers = document.querySelector('#five-answers')
let tenAnswers = document.querySelector('#ten-answers')
let fiveteenAnswers = document.querySelector('#fiveteen-answers')
let questionLenght = 5
let i = 0
let result = document.querySelector('.results')
const resultWrapper = document.querySelector('.result__wrapper')
const start = document.querySelector('#start')
const startInner = document.querySelector('.start__inner')
const question = document.querySelector('.question')

const questionInner = document.querySelector('.questions__inner')
const answer = document.querySelectorAll('.answer')
const answerInput = document.querySelectorAll('.answer__input')
const answerNext = document.querySelector('.answer-next')
const answerBack = document.querySelector('.answer-back')
const resultsRestart = document.querySelector('.results__restart')
const counter = document.querySelector('.counter')
const endBtn = document.querySelector('.end-test')
const resultRightAnswer = document.querySelector('.results__right-answer')

let textCont = document.querySelectorAll('.answer__text')
function renderQustions() {
  let questionItem = `
<h4 class="question__title"> Вопрос ${i+1}</h4>
    <p class="question__text">
      ${questionArr[i].questionText}
    </p>
`
    for (let j = 0;  j< 4; j++) {
      textCont[j].textContent = questionArr[i].answers[j].text
    }
  
  counter.innerHTML = `
  ${i + 1}/${questionLenght}
  `
  question.innerHTML = questionItem
}

start.addEventListener('click', () => {
  if (fiveAnswers.checked == true){
    questionLenght = 5
  }

  if (tenAnswers.checked == true) {
    questionLenght = 10
  }

  if (fiveteenAnswers.checked == true) {
    questionLenght = 15
  }

  answerBack.disabled = true
  answerNext.disabled = false
  endBtn.classList.remove('active')
  questionInner.classList.add('active')
  startInner.classList.add('active')
  document.querySelector('.timer').classList.add('active')
  interval = setInterval(startTimer, 10)
  renderQustions()
})

let rightAnswerArr = []

answerNext.addEventListener('click', () =>{
  answerInput.forEach((answerInput) => {
    answerInput.checked = false
    if (answerInput.classList.contains('click') && questionArr[i].answers[answerInput.id].type == true) {
      rightAnswerArr[i] = 1
    } 
    if (answerInput.classList.contains('click') && !questionArr[i].answers[answerInput.id].type == true) {
      rightAnswerArr[i] = 0
    }
  });
  i++
  
  answer.forEach((answer) => {
    answer.classList.remove('active')
  });

  if (i > 0) {
    answerBack.disabled = false
  } else {
    answerBack.disabled = true
  }

  if (i + 1 == questionLenght){
    endBtn.classList.add('active')
    answerNext.disabled = true 
  }
  renderQustions()
  
})

answerBack.addEventListener('click', () => {
  i--
  answerInput.forEach((answerInput) => {
    answerInput.checked = false
  });
  answer.forEach((answer) => {
    answer.classList.remove('active')
  });

  if (i == 0) {
    answerBack.disabled = true
  }

  if (i + 1 < questionArr.length) {
    
    answerNext.disabled = false
  }
  renderQustions()
  
})


endBtn.addEventListener('click', () => {
  answerInput.forEach((answerInput) => {
    answerInput.checked = false
    if (answerInput.classList.contains('click') && questionArr[i].answers[answerInput.id].type == true) {
      rightAnswerArr[i] = 1
    }
    if (answerInput.classList.contains('click') && !questionArr[i].answers[answerInput.id].type == true) {
      rightAnswerArr[i] = 0
    }
  });

  let rightAnswers = 0;
  for (let j = 0; j < rightAnswerArr.length; j++) {
    if (rightAnswerArr[j] == 1) {
      rightAnswers++
    }
  }

  clearInterval(interval)

  if (second < 10) {
    second = '0' + second
  }

  if (minute < 10) {
    minute = '0' + minute
  }

  if (hour < 10) {
    hour = '0' + hour
  }

  document.querySelector('.results__time').innerHTML = hour + ':' + minute + ':' + second
  resultRightAnswer.innerHTML = `${rightAnswers}/${questionLenght}`
  questionInner.classList.remove('active')
  resultWrapper.classList.add('active')
})

let resultInner= [];

answerInput.forEach((answerInput) => {
  answerInput.addEventListener('click', ()=>{
    
    let answerInput2 = document.querySelectorAll('.answer__input')
    answerInput2.forEach((answerInput2) => {
      answerInput2.classList.remove('click')
    });

    answer.forEach((answer) => {
      answer.classList.remove('active')
    });
    answerInput.classList.add('click') 

    answerInput.closest('.answer').classList.add('active')
    let item = []
    for (let j = 0; j < answerInput2.length; j++) {
      item.push(answerInput2[j].classList)
    }
    resultInner[i] = item
    renderResults()
  })
});

let content = []
const renderResults = () => {
  content[i] = `
    <div class="results__inner">
    <p class="results__text">
          ${i + 1}. ${questionArr[i].questionText}
        </p>

        <div class="result__answers">
          <div class="${resultInner[i][0]} ${questionArr[i].answers[0].type}">
           ${questionArr[i].answers[0].text}
          </div>
          <div class="${resultInner[i][1]} ${questionArr[i].answers[1].type}">
            ${questionArr[i].answers[1].text}
          </div>
          <div class="${resultInner[i][2]} ${questionArr[i].answers[2].type}">
            ${questionArr[i].answers[2].text}
          </div>
          <div class="${resultInner[i][3]}  ${questionArr[i].answers[3].type} ">
           ${questionArr[i].answers[3].text}
          </div>
        </div>
        </div>
    `
  result.innerHTML = content.join('')
}


resultsRestart.addEventListener('click', () =>{  
  clearFilds()
  i = 0
  answerInput.forEach((answerInput) => {
    answerInput.checked = false
  });
  answer.forEach((answer) => {
    answer.classList.remove('active')
  });

  resultWrapper.classList.remove('active')
  startInner.classList.remove('active')
})