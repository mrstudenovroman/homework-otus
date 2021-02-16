const fs = require('fs');
const { PATH_TO_MAIN_FILE, PATH_TO_END_FILE, PATH_TO_CHUNK_FILE } = require('./constants');

// Проверяем входящий файл, если есть удаляем
if (fs.existsSync(PATH_TO_MAIN_FILE)) {
  fs.unlinkSync(PATH_TO_MAIN_FILE);
}

// Проверяем директорию с чанками, если есть удаляем
if (fs.existsSync(PATH_TO_CHUNK_FILE)) {
  fs.rmdirSync(PATH_TO_CHUNK_FILE, { recursive: true });
}

// Проверяем выходящий файл, если есть удаляем
if (fs.existsSync(PATH_TO_END_FILE)) {
  fs.unlinkSync(PATH_TO_END_FILE);
}

console.log('Все файлы были удалены!');
