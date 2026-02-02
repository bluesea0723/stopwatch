const time = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

//開始時刻
let startTime;
//停止時刻
let stopTime = 0;
//タイムアウトID
let timeoutID;

//時間を表示する関数
function displayTime() {
    //現在時刻 - スタート時刻 + 以前の経過時間
    const elapsed = Date.now() - startTime + stopTime;

    const h = String(Math.floor(elapsed / (1000 * 60 * 60))).padStart(2,"0");
    const m = String(Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
    const s = String(Math.floor((elapsed % (1000 * 60)) /1000)).padStart(2, "0");
    const ms = String(elapsed % 1000).padStart(3, "0");

    time.textContent = `${h}:${m}:${s}.${ms}`;
    timeoutID = setTimeout(displayTime, 10);
}

//スタートボタンがクリックされたら時間を進める
startButton.addEventListener("click", () => {
    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = true;
    startTime = Date.now();
    displayTime();
});

//ストップボタンがクリックされたら時間を止める
stopButton.addEventListener("click", function() {
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = false;
    clearTimeout(timeoutID);
    stopTime += (Date.now() - startTime);
});

//リセットボタンがクリックされたら時間を0に戻す
resetButton.addEventListener("click", function() {
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
    time.textContent = "00:00:00.000";
    stopTime = 0;
});

