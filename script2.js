const arrowsUp = document.querySelectorAll('.time-up')
const arrowsDown = document.querySelectorAll('.time-down')
const rightBtn = document.querySelector('#right-button')
const leftBtn = document.querySelector('#left-button')
const endTime = document.querySelector('#end-time')

let hours = 0,
  minutes = 0,
  seconds = 0
let interval

function updateTimer() {
  document.querySelector('#hours').innerText = hours
  document.querySelector('#minutes').innerText = minutes
  document.querySelector('#seconds').innerText = seconds
}

function displayButtons(a) {
  if (a === true) {
    arrowsUp.forEach(item => item.style.opacity = 1)
    arrowsDown.forEach(item => item.style.opacity = 1)
  }
  else {
    arrowsUp.forEach(item => item.style.opacity = 0)
    arrowsDown.forEach(item => item.style.opacity = 0)
  }
}

arrowsUp.forEach(item => {
  item.addEventListener('click', e => {
    if (item.classList.contains('time-up-hour')) {
      hours++
      updateTimer()
    }
    else if (item.classList.contains('time-up-minute')) {
      minutes++
      if (minutes >= 59) {
        minutes = 0
        hours++
      }
      updateTimer()
    }
    else if (item.classList.contains('time-up-second')) {
      seconds++
      if (seconds >= 59) {
        seconds = 0
        minutes++
      }
      updateTimer()
    }
  })
})

arrowsDown.forEach(item => {
  item.addEventListener('click', e => {
    if (item.classList.contains('time-down-hour')) {
      hours === 0 ? 1 : hours--
      updateTimer()
    }
    else if (item.classList.contains('time-down-minute')) {
      minutes === 0 ? minutes = 59 : minutes--
      updateTimer()
    }
    else if (item.classList.contains('time-down-second')) {
      seconds === 0 ? seconds = 59 : seconds--
      updateTimer()
    }
  })
})

function startTimer(a) {
  if (a === true) {
    interval = setInterval(() => {
      if (hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(interval)
        rightBtn.classList.replace('stop', 'start')
        rightBtn.innerText = 'Start'
        displayButtons(true)
      }
      else {
        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
        }
        if (minutes < 0) {
          minutes = 59
          hours--
        }
      }
      updateTimer()
      console.log(hours, minutes, seconds)
    }, 1000);
  }
  else {
    clearInterval(interval)
  }
}

function updateEndTime() {
  let left = moment().add(hours, 'hours').add(minutes, 'minutes').add(seconds, 'seconds').format('HH:mm:ss')
  endTime.innerText = left
}

rightBtn.addEventListener('click', e => {
  if (rightBtn.classList.contains('start')) {
    rightBtn.classList.replace('start', 'stop')
    rightBtn.innerText = 'Stop'
    displayButtons(false)
    startTimer(true)
    updateEndTime()
    endTime.style.textDecoration = 'none'
  }
  else if (rightBtn.classList.contains('stop')) {
    rightBtn.classList.replace('stop', 'start')
    rightBtn.innerText = 'Resume'
    displayButtons(true)
    startTimer(false)
    endTime.style.textDecoration = 'line-through 1px'
  }
})

leftBtn.addEventListener('click', e => {
  hours = 0
  minutes = 0
  seconds = 0
  updateTimer()
  rightBtn.classList.replace('stop', 'start')
  rightBtn.innerText = 'Start'
  displayButtons(true)
})