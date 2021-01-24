const fs = require('fs');
const { PATH_TO_MAIN_FILE, PATH_TO_CHUNK_FILE, HIGH_WATER_MARK } = require('./constants');
const { MergeSort } = require('./utils');

// Проверяем существует ли основной файл, если нет выкидываем ошибку
if (!fs.existsSync(PATH_TO_MAIN_FILE)) {
  return console.error('🤯🤯🤯', '\x1b[31m', 'Файл не обнаружен! Пожалуйста запустите скрипт npm run sort:create чтобы создать файл!');
}

const dirChunk = fs.existsSync(PATH_TO_CHUNK_FILE);

// Проверяем существует ли директория для чанков, если нет создаем ее
if (!dirChunk) {
  fs.mkdirSync(PATH_TO_CHUNK_FILE);
}

function PromiseChunk(resolve, reject) {
  // Проверяем существует ли чанки в директории, если да, то ничего не делаем
  if (dirChunk && fs.readdirSync(PATH_TO_CHUNK_FILE, { encoding: 'utf-8' }).length !== 0) {
    console.log('Чанки уже существуют!');
    resolve();
  }

  let counter = 0;
  // Создаем стрим для чтения из входящего файла
  const readStream = fs.createReadStream(PATH_TO_MAIN_FILE, { encoding: 'utf8', highWaterMark: HIGH_WATER_MARK });

  // Читаем чанки из файла и распихиваем по файлам, предварительно отсортировав
  readStream.on('data', (chunk) => {
    const numbersArr = chunk.split(' ');
    const sortedChunk = MergeSort(numbersArr).join(' ');
    const writeStream = fs.createWriteStream(`${PATH_TO_CHUNK_FILE}/chunk-${counter}.txt`);
    writeStream.write(sortedChunk);
    counter += 1;
    writeStream.end();
  });

  readStream.on('close', () => {
    console.log('Чанки созданы!');
    resolve();
  });

  readStream.on('error', (err) => {
    console.log('Ошибка при создании чанков!');
    reject(err);
  });
}

function CreateChunk() {
  const promise = new Promise(PromiseChunk);
  return promise;
}

module.exports = {
  CreateChunk,
};
