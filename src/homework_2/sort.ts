import fs from 'fs';
import { PATH_TO_CHUNK_FILE, PATH_TO_END_FILE, LENGHT_NUMBER_AND_SPACE } from './constants';
import { CreateChunk } from './createChunk';

// Проверяем есть ли выходящий файл, если есть удаляем его
if (fs.existsSync(PATH_TO_END_FILE)) {
  fs.unlinkSync(PATH_TO_END_FILE);
}

// Создаем выходящий файл
fs.appendFileSync(PATH_TO_END_FILE, '', { encoding: 'utf-8' });
// Создаем стрим для записи в файл
const write = fs.createWriteStream(PATH_TO_END_FILE, { encoding: 'utf-8' });

// Массив с числами из чанков
const values: Array<number> = [];
// Массив со стримами чанков
const streams: Array<fs.ReadStream> = [];

write.on('finish', () => {
  console.log('Файл result.txt успешно создан!');
});

// Метод для поиска и записи числа в файл
function WriteNumberToFile() {
  // Проверяем все ли стримы в паузе или закончены
  if (streams.every((elem) => elem.destroyed || elem.isPaused())) {
    const min = Math.min(...values);
    const index = values.findIndex((e) => e === min);
    if (values[index] === Infinity) {
      write.end();
    } else {
      write.write(`${values[index]} `);
    }

    // Запускаем только тот стрим из которого было выбрано число
    streams[index].resume();
  }
}

function StreamCallback(path: string, streamIndex: number, reject: (error: string) => void) {
  // Считываем текущий чанк
  const stream = fs.createReadStream(PATH_TO_CHUNK_FILE + '/' + path, {
    highWaterMark: LENGHT_NUMBER_AND_SPACE,
    encoding: 'utf-8',
  });

  // Закидываем в массив стримов текущий стрим
  streams[streamIndex] = stream;

  stream.on('data', (chunk: string) => {
    // Закидываем в массив значений, число из чанка
    values[streamIndex] = Number(chunk.trim());
    stream.pause();
  });

  stream.on('pause', WriteNumberToFile);

  stream.on('close', WriteNumberToFile);

  stream.on('end', () => {
    // Если чанк полностью прочитан, закидываем туда значение Infinity
    values[streamIndex] = Infinity;
    stream.destroy();
  });

  stream.on('error', () => {
    reject(`Упал стрим: ${streamIndex}`);
  });
}

function PromiseResult(resolve: () => void, reject: (error: string) => void): void {
  // Ищем директорию с чанками
  const files = fs.readdirSync(PATH_TO_CHUNK_FILE, { encoding: 'utf-8' });
  if (files.length === 0) {
    reject('В директории нет чанков!');
  }

  files.forEach((file, streamIndex) => StreamCallback(file, streamIndex, reject));

  resolve();
}

function Result() {
  const promise = new Promise<void>(PromiseResult);
  return promise;
}

const chunks = CreateChunk();

Promise.all([chunks])
  .then(() => Result())
  .catch((error) => {
    if (typeof error === 'string') {
      return console.error('🤯🤯🤯', '\x1b[31m', 'Ошибка при отрабатывания скрипта!', error);
    }
    return console.error('🤯🤯🤯', '\x1b[31m', 'Ошибка при отрабатывания скрипта!', error?.message || '');
  });
