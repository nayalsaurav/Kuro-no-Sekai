const musicPlayer = document.querySelector('.music-player');
const queue = document.querySelector('#queue');
const closeBtn = document.querySelector('#close');
const musicListArea = document.querySelector('.music-list-section');
const image = document.querySelector('.image');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');
const music = document.querySelector('#music');
const playPauseBtn = document.querySelector('#playPause');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-bar");
const musicList = document.querySelector('.ul-list');

let index = 0;

window.addEventListener('load', () => {
    loadMusic(index);
    loadMusicList();
    music.addEventListener('loadeddata', updateDuration);
});

function loadMusic(index) {
    const currentMusic = allMusic[index];
    title.textContent = currentMusic.title;
    artist.textContent = currentMusic.artist;
    image.src = `assets/images/${currentMusic.image}`;
    music.src = `assets/music/${currentMusic.src}`;
}

function loadMusicList() {
    allMusic.forEach(musicItem => {
        const container = document.createElement('div');

        const li = document.createElement('li');
        li.classList.add('music-info');
        li.innerHTML = `
            <div class="music-desc">
                <div class="title">${musicItem.title}</div>
                <div class="artist">${musicItem.artist}</div>
            </div>
            <div class="status">Loading...</div> <!-- Initial loading status -->
        `;
        const audioTag = document.createElement('audio');
        audioTag.src = `assets/music/${musicItem.src}`;
        audioTag.addEventListener('loadedmetadata', () => {
            const duration = formatTime(audioTag.duration);
            li.querySelector('.status').textContent = duration;
        });
        container.appendChild(li);
        container.appendChild(document.createElement('hr'));
        musicList.appendChild(container);
    });
}

let list = document.querySelectorAll('li');
list.forEach(item => {
    if(item.title==)
});



playPauseBtn.addEventListener('click', togglePlayPause);

function togglePlayPause() {
    if (musicPlayer.classList.toggle('paused')) {
        music.play();
        playPauseBtn.textContent = "pause";
    } else {
        music.pause();
        playPauseBtn.textContent = "play_arrow";
    }
}

previous.addEventListener('click', () => changeTrack(-1));
next.addEventListener('click', () => changeTrack(1));

function changeTrack(direction) {
    index = (index + direction + allMusic.length) % allMusic.length;
    loadMusic(index);
    music.play();
    playPauseBtn.textContent = "pause"; // Update button to show pause
}

music.addEventListener('timeupdate', () => {
    const currentTime = music.currentTime;
    const duration = music.duration;
    progressBar.style.width = `${(currentTime / duration) * 100}%`;
    updateCurrentTime(currentTime);
});

function updateDuration() {
    document.querySelector('.end').textContent = formatTime(music.duration);
}

function updateCurrentTime(currentTime) {
    document.querySelector('.start').textContent = formatTime(currentTime);
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = String(Math.floor(seconds % 60)).padStart(2, '0');
    return `${min}:${sec}`;
}

progress.addEventListener('click', (e) => {
    const duration = music.duration;
    music.currentTime = (e.offsetX / progress.clientWidth) * duration;
    music.play();
    playPauseBtn.textContent = "pause"; // Update button to show pause
});

queue.addEventListener('click', () => musicListArea.classList.add('active'));
closeBtn.addEventListener('click', () => musicListArea.classList.remove('active'));
