document.querySelector('video').playbackRate = .5;
document.querySelector('video').play();


// Resize Video Wrap




window.addEventListener('resize', resizeVideo());

function resizeVideo() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const videoWrap = document.querySelector(".fullscreen-video-wrap");

    videoWrap.width = w;
    videoWrap.height = w;
}


