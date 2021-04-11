const modelParams = {
    flipHorizontal: true,   // flip e.g for video  
    maxNumBoxes: 1,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.6,    // confidence threshold for predictions.
}

navigator.getUserMedia = 
navigator.getUserMedia || 
navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia ||
navigator.msGetUserMedia

const video = document.querySelector("#video")
const cazzo = document.querySelector("#pene")
let model
let count = 0
let media = 0
let media20 = 0
let media40 = 0
let timer = 0
let range = 0
let score = 0

handTrack.startVideo(video).then(status => {
    if(status) {
        navigator.getUserMedia({ video: {}}, stream => {
            video.srcObject = stream
            setInterval(runDetection, 10)
        }, err => console.log(err))
    }
})

function runDetection() {
    model.detect(video).then(predictions => {
        if(predictions.length !== 0) {
            if(timer === 0) {
                startTimer()
                timer = 1
            }

            let hand1 = predictions[0].bbox;
            let x = hand1[0]
            let y = hand1[1]
            if(x > 400 && x < 550) {
                if(y > 180 ) {
                    count = count + 1
                    media+=y 
                    console.log(count)

                    if(count == 20) {
                        range = media / count
                        console.log(range)
                        if (range >200 && range < 250) {
                            media20 = media
                            timePassed = timePassed -= 5
                            document.getElementById("spermaID").style.visibility = "visible";
                        } else {
                            count = 0
                            media = 0
                        }
                    }

                    if(count == 40) {
                        range = media / count
                        console.log(range)
                        if (range >210 && range < 260) {
                            media40 = media
                            timePassed = timePassed -= 5
                            document.getElementById("spermaID").style.visibility = "hidden";
                            document.getElementById("spermaID2").style.visibility = "visible";
                        } else {
                            count = 20
                            media = media20
                        }
                    }

                    if(count == 60) {
                        range = media / count
                        console.log(range)
                        if (range >220 && range < 270) {
                            count = 0
                            media = 0
                            document.getElementById("spermaID2").style.visibility = "hidden";
                            document.getElementById("spermaID3").style.visibility = "visible";
                            document.getElementById("win").innerHTML="SEI BRAVO A FARE LE SEGHE. CI HAI MESSO: " + (score) + " secondi"
                            onTimesUp()
                        } else {
                            count = 40
                            media = media40
                        }
                    }

                }
            }
            
        }
    })
}
 
handTrack.load(modelParams).then(lmodel => {
     model = lmodel
})

// TIMER

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 20;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    score = score += 1
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
      document.getElementById("lose").innerHTML="SEI UNA MERDA, NON SEI CAPACE NEMMEO A FAR VENIRE IL TUO CAZZO"
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}
