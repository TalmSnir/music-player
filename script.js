const musicContainer = document.querySelector(".music-container");
const playButton = document.querySelector("#play");
const backButton = document.querySelector("#backward");
const forwardButton = document.querySelector("#forward");
const progressBar = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const songTitle = document.querySelector("#song-title");
const albumCover = document.querySelector("#album-cover");
const audio = document.querySelector("#audio");

const songs = [
  {
    songTitle: "Watermelon Sugar",
    songMp3: "Harry Styles - Watermelon Sugar (Official Video).mp3",
    artwork: "watermelon.jpg",
  },
  {
    songTitle: "Golden",
    songMp3: "Harry Styles - Golden (Official Video).mp3",
    artwork: "golden.jpg",
  },
  {
    songTitle: "Adore You",
    songMp3: "Harry Styles - Adore You (Official Video).mp3",
    artwork: "adoreyou.jpg",
  },
];

let i = 0;

loadSong(songs[i]);

function loadSong(song) {
  songTitle.innerText = song["songTitle"];
  audio.src = song["songMp3"];
  albumCover.src = song["artwork"];
}

function playSong() {
  if (!musicContainer.classList.contains("play")) {
    musicContainer.classList.add("play");
  }
  const icon = playButton.querySelector("i.fas");
  icon.classList.remove("fa-play");
  icon.classList.add("fa-pause");
  audio.play();
}
function pauseSong() {
  if (musicContainer.classList.contains("play")) {
    musicContainer.classList.remove("play");
  }
  const icon = playButton.querySelector("i.fas");
  icon.classList.remove("fa-pause");
  icon.classList.add("fa-play");
  audio.pause();
}

function previousSong() {
  if (i == 0) {
    i = songs.length - 1;
  } else {
    i--;
  }
  loadSong(songs[i]);
  playSong();
}
function nextSong() {
  if (i == songs.length - 1) {
    i = 0;
  } else {
    i++;
  }
  loadSong(songs[i]);
  playSong();
}

function setSongTime(e) {
  const pos = e.offsetX;
  const width = this.clientWidth;
  audio.currentTime = (pos / width) * audio.duration;
}

function fillProgressBar() {
  const progPercent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${progPercent}%`;
}

playButton.addEventListener("click", () => {
  if (musicContainer.classList.contains("play")) {
    pauseSong();
  } else {
    playSong();
  }
});

backButton.addEventListener("click", previousSong);
forwardButton.addEventListener("click", nextSong);
progressContainer.addEventListener("click", setSongTime);
audio.addEventListener("timeupdate", fillProgressBar);
audio.addEventListener("ended", nextSong);
