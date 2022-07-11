
const hourElement = document.querySelector('.hour')
const minuteElement = document.querySelector('.minute')
const secondElement = document.querySelector('.second')
const milisecondElement = document.querySelector('.milisecond')
const newButton = document.querySelector('.new')

let hour = 00,
  minute = 00,
  second = 00,
  milisecond = 00,
  interval


function startTimer() {
  milisecond++
  if (milisecond < 9) {
    milisecondElement.innerText = "0" + milisecond
  }
  if (milisecond > 9) {
    milisecondElement.innerText = milisecond
  }
  if (milisecond > 99) {
    second++
    secondElement.innerText = "0" + second
    milisecond = 0
    milisecondElement.innerText = "0" + milisecond
  }

  if (second < 9) {
    secondElement.innerText = "0" + second
  }

  if (second > 9) {
    secondElement.innerText = second
  }

  if (second > 60) {
    minute++
    minuteElement.innerText = "0" + minute
    second = 0
    secondElement.innerText = "0" + second
  }

  if (minute < 9) {
    minuteElement.innerText = "0" + minute
  }

  if (minute > 9) {
    minuteElement.innerText = minute
  }

  if (minute > 60) {
    hour++
  }
}

function clearFilds() {
  hour = 00
  minute = 00
  second = 00
  milisecond = 00

  milisecondElement.textContent = "00"
  minuteElement.textContent = "00"
  secondElement.textContent = "00"
  hourElement.textContent = "00"
}


