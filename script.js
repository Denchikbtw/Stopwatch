const clock = document.querySelector('.clock span'),
  leftBtn = document.querySelector('#left-button'),
  rightBtn = document.querySelector('#right-button'),
  lapList = document.querySelector('#lap-list')

let minute = 0,
  second = 0,
  milisecond = 0
let interval
let min = '00',
  sec = '00',
  milisec = 0
let isStart = false,
  isLap = true
let laps = []

function startClock() {
  milisecond++
  milisecond < 10 ? milisec = '0' + milisecond : milisec = milisecond
  if (milisecond >= 99) {
    second++
    milisecond = 0
    if (second < 10) {
      sec = '0' + second
    }
    else {
      sec = second
    }
  }
  else if (second >= 59) {
    minute++
    second = 0
    if (minute < 10) {
      min = '0' + minute
    }
    else {
      min = minute
    }
  }
  clock.innerText = min + ':' + sec + ',' + milisec
}

function updateLi() {
  lapList.innerHTML = ''
  laps.unshift(min + ':' + sec + ',' + milisec)
  laps.forEach((item, i) => {
    lapList.innerHTML += `<li>
                              <span>Lap ${laps.length - i}</span>
                              <span>${item}</span>
                            </li>`
  })
}

rightBtn.addEventListener('click', () => {
  if (isStart === false) {
    clearInterval(interval)
    interval = setInterval(startClock, 10)
    isStart = true
    isLap = true

    rightBtn.classList.replace('start', 'stop')
    rightBtn.innerText = 'Stop'
    leftBtn.innerText = 'Lap'
  }
  else {
    clearInterval(interval)
    isStart = false
    isLap = false

    rightBtn.classList.replace('stop', 'start')
    rightBtn.innerText = 'Start'
    leftBtn.innerText = 'Reset'
  }
})

leftBtn.addEventListener('click', () => {
  if (isLap === false) {
    minute = 0
    second = 0
    milisecond = 0
    min = '00'
    sec = '00'
    milisec = 0
    clock.innerText = '00:00,00'
    isLap = true
    leftBtn.innerText = 'Lap'
    laps = []
    lapList.innerHTML = ''
  }
  else {
    updateLi()
  }
})