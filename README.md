# BeatGram - Музыкальный плеер для Telegram Mini App

Простой музыкальный плеер для Telegram Mini Apps.

## Возможности

- ✅ Воспроизведение музыки
- ✅ Плейлист
- ✅ Управление: play/pause, перемотка, громкость
- ✅ Добавление треков по URL
- ✅ Переключение между треками
- ✅ Адаптивный дизайн для мобильных устройств

## Технологии

- HTML/CSS/JavaScript (vanilla)
- Telegram Web App SDK

## Как запустить

### Шаг 1: Загрузить на GitHub Pages

1. Создайте репозиторий на GitHub (например, `beatgram`)
2. Загрузите все файлы проекта в репозиторий:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/ВАШ_USERNAME/beatgram.git
   git push -u origin main
   ```
3. Перейдите в Settings → Pages
4. В разделе "Source" выберите `main` branch
5. Нажмите Save
6. Через 1-2 минуты сайт будет доступен по адресу:
   `https://ВАШ_USERNAME.github.io/beatgram/`

### Шаг 2: Создать Mini App в Telegram

1. Откройте [@BotFather](https://t.me/BotFather) в Telegram
2. Создайте нового бота:
   - Отправьте `/newbot`
   - Введите имя бота (например, `BeatGram Player`)
   - Введите username (например, `beatgram_player_bot`)
3. Создайте Mini App:
   - Отправьте `/newapp`
   - Выберите вашего бота
   - Введите название (например, `BeatGram`)
   - Введите описание
   - Загрузите иконку 640x360 (необязательно)
   - Загрузите GIF демо (необязательно, можно Skip)
   - **Введите URL:** `https://ВАШ_USERNAME.github.io/beatgram/`
   - Введите Short name (например, `beatgram`)
4. Готово! Откройте приложение через бота

## Как добавить треки

Можно добавлять треки через форму "Добавить трек":
- Укажите URL mp3 файла
- Введите название и исполнителя
- Нажмите "Добавить"

## Примеры URL для тестирования

В коде уже есть примеры треков от SoundHelix для демонстрации.
