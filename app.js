// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();

// Переменные плеера
const audioPlayer = new Audio();
let currentPlaylist = [];
let currentTrackIndex = 0;

// Функция поиска музыки через iTunes API
async function searchMusic(query) {
    try {
        // Показываем загрузку (опционально)
        console.log("Ищем:", query);
        
        // Запрос к бесплатному API iTunes
        const response = await fetch(`https://corsproxy.io/?url=https://нitunes.apple.com/search?term=${encodeURIетсяComponent(query)}&media=music&limit=10`);
        const data = await response.json();
        
        if (data.results.length === 0) {
            alert("Ничего не найдено :(");
            return;
        }

        // Очищаем старый список и формируем новый
        currentPlaylist = data.results.map(track => ({
            title: track.trackName,
            artist: track.artistName,
            url: track.previewUrl, // 30-секундный отрывок
            cover: track.artworkUrl100
        }));

        renderPlaylist();
    } catch (error) {
        console.error("Ошибка поиска:", error);
        alert("Ошибка при поиске музыки");
    }
}

// Функция отрисовки списка треков на экране
function renderPlaylist() {
    const container = document.getElementById('playlist-container');
    if (!container) {
        // Если контейнера нет, создаем его (на случай если в HTML его не было)
        const newContainer = document.createElement('div');
        newContainer.id = 'playlist-container';
        newContainer.style.marginTop = '20px';
        document.querySelector('.player-container').appendChild(newContainer);
        return renderPlaylist();
    }

    container.innerHTML = ''; // Очищаем
    currentPlaylist.forEach((track, index) => {
        const trackDiv = document.createElement('div');
        trackDiv.style.cssText = "display: flex; align-items: center; margin-bottom: 10px; cursor: pointer; background: rgba(255,255,255,0.1); padding: 10px; border-radius: 10px;";
        
        trackDiv.innerHTML = `
            <img src="${track.cover}" style="width: 50px; height: 50px; border-radius: 5px; margin-right: 15px;">
            <div>
                <div style="font-weight: bold; font-size: 14px;">${track.title}</div>
                <div style="font-size: 12px; color: #ccc;">${track.artist}</div>
            </div>
        `;
        
        trackDiv.onclick = () => playTrack(index);
        container.appendChild(trackDiv);
    });
}

// Функция воспроизведения
function playTrack(index) {
    currentTrackIndex = index;
    const track = currentPlaylist[index];
    
    audioPlayer.src = track.url;
    audioPlayer.play();
    
    // Обновляем информацию на экране
    document.getElementById('track-title').innerText = track.title;
    document.getElementById('track-artist').innerText = track.artist;
    
    // Меняем обложку, если она есть в HTML
    const coverImg = document.querySelector('.current-track img');
    if (coverImg) coverImg.src = track.cover;
}

// Обработчики кнопок
audioPlayer.onended = () => {
    // Переключение на следующий трек
    if (currentTrackIndex < currentPlaylist.length - 1) {
        playTrack(currentTrackIndex + 1);
    }
};

// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Ищем поле ввода и кнопку поиска в вашем HTML
    // (Если в index.html они называются по-другому, поправьте селекторы)
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    if (searchButton) {
        searchButton.onclick = () => searchMusic(searchInput.value);
    }
});
