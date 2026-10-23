const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const playlistItems = document.getElementById('playlist-items');
const addBtn = document.getElementById('add-btn');
const trackUrlInput = document.getElementById('track-url');
const trackNameInput = document.getElementById('track-name');
const trackArtistInput = document.getElementById('track-artist-input');

let playlist = [
    {
        title: 'Пример трека 1',
        artist: 'Исполнитель 1',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    },
    {
        title: 'Пример трека 2',
        artist: 'Исполнитель 2',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    }
];

let currentTrackIndex = 0;
let isPlaying = false;

function loadTrack(index) {
    if (index < 0 || index >= playlist.length) return;
    
    currentTrackIndex = index;
    const track = playlist[index];
    
    audio.src = track.url;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    
    updatePlaylistUI();
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playBtn.textContent = '▶️';
    } else {
        audio.play();
        playBtn.textContent = '⏸️';
    }
    isPlaying = !isPlaying;
}

function playNext() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playBtn.textContent = '⏸️';
    isPlaying = true;
}

function playPrev() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playBtn.textContent = '⏸️';
    isPlaying = true;
}

function updateProgress() {
    if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        durationEl.textContent = formatTime(audio.duration);
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function seekTrack() {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
}

function setVolume() {
    audio.volume = volumeBar.value / 100;
}

function updatePlaylistUI() {
    playlistItems.innerHTML = '';
    playlist.forEach((track, index) => {
        const li = document.createElement('li');
        li.className = index === currentTrackIndex ? 'active' : '';
        li.innerHTML = `
            <div class="track-title">${track.title}</div>
            <div class="track-artist">${track.artist}</div>
        `;
        li.onclick = () => {
            loadTrack(index);
            togglePlay();
        };
        playlistItems.appendChild(li);
    });
}

function addTrack() {
    const url = trackUrlInput.value.trim();
    const name = trackNameInput.value.trim();
    const artist = trackArtistInput.value.trim();
    
    if (url && name) {
        playlist.push({
            title: name,
            artist: artist || 'Неизвестный исполнитель',
            url: url
        });
        
        trackUrlInput.value = '';
        trackNameInput.value = '';
        trackArtistInput.value = '';
        
        updatePlaylistUI();
        
        tg.showAlert('Трек добавлен!');
    } else {
        tg.showAlert('Заполните URL и название трека');
    }
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', playPrev);
nextBtn.addEventListener('click', playNext);
audio.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('input', seekTrack);
volumeBar.addEventListener('input', setVolume);
addBtn.addEventListener('click', addTrack);

audio.addEventListener('ended', playNext);

loadTrack(0);
updatePlaylistUI();
setVolume();
