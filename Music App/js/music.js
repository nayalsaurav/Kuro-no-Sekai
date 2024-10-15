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

let index = 0;
window.addEventListener('load',()=>{
    loadMusic(index);
});
function loadMusic(index) {
    title.innerHTML = allMusic[index].title;
    artist.innerHTML=allMusic[index].artist;
    image.src = `assets/images/${allMusic[index].image}`;
    music.src = `assets/music/${allMusic[index].src}`;
}

playPauseBtn.addEventListener('click',()=>{
    let isPaused = musicPlayer.classList.contains('paused');
    if(isPaused) pauseAudio();
    else playAudio(); 
})

function playAudio() {
    playPauseBtn.innerHTML="pause";
    musicPlayer.classList.add('paused');
    music.play();
}
function pauseAudio() {
    playPauseBtn.innerHTML="play_arrow";
    musicPlayer.classList.remove('paused');
    music.pause();
}

previous.addEventListener('click',()=>{
    index--;
    if(index<0) index = allMusic.length -1;
    // console.log(allMusic[index]);
    loadMusic(index);
    playAudio();
});
next.addEventListener('click',()=>{
    index++;
    if(index>=allMusic.length) index = 0;
    // console.log(allMusic[index]);
    loadMusic(index);
    playAudio();
});


music.addEventListener('timeupdate',(e)=>{
    console.log(e);
    let currentTime = e.target.currentTime;
    let duration = e.target.duration;
    let progressWidth = (currentTime/duration)*100;
    progressBar.style.width = `${progressWidth}%`;
    let start = document.querySelector('.start');
    music.addEventListener('loadeddata',()=>{
        let end = document.querySelector('.end');
        let dur = music.duration;
        let min =Math.floor(dur/60);
        let sec = Math.floor(dur%60);
        sec = (sec<10)?`0${sec}`:sec;
        end.innerHTML = `${min} : ${sec}`;    
    });
    let curr = currentTime;
    let currMin =Math.floor(curr/60);
    let currSec = Math.floor(curr%60);
    currSec = (currSec<10)?`0${currSec}`:currSec;
    start.innerHTML = `${currMin} : ${currSec}`;

});

progress.addEventListener('click',(e)=>{
    let progressWidth = progress.clientWidth;
    let offsetX = e.offsetX;
    let duration = music.duration;
    music.currentTime = (offsetX/progressWidth)*duration;
    playAudio();
});

queue.addEventListener('click',()=>{
    musicListArea.classList.add('active'); 
    console.log(queue);
});
closeBtn.addEventListener('click',()=>{
    musicListArea.classList.remove('active'); 
    console.log(closeBtn);
});

