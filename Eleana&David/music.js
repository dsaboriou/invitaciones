document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-control');
    let isPlaying = false;

    // Try to autoplay (will likely fail due to browser policies, but worth a shot)
    const playPromise = music.play();
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            isPlaying = true;
            musicBtn.innerHTML = 'Pausar música';
            musicBtn.classList.add('playing');
        }).catch(error => {
            // Auto-play was prevented
            isPlaying = false;
            musicBtn.innerHTML = 'Escucha nuestra canción';
        });
    }

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            isPlaying = false;
            musicBtn.innerHTML = 'Escucha nuestra canción';
            musicBtn.classList.remove('playing');
        } else {
            music.play();
            isPlaying = true;
            musicBtn.innerHTML = 'Pausar música';
            musicBtn.classList.add('playing');
        }
    });
});
