import fs from 'fs';
import { PATH_TO_MAIN_FILE, NUMBER_OF_DIGITS } from './constants';

// Проверяем существует ли файл, если да, то ничего не делаем
if (fs.existsSync(PATH_TO_MAIN_FILE)) {
  throw console.log('Данный файл уже существует!');
}

const arr = [];

// Создаем рандомный массив из чисел от 100 до 999
for (let i = 0; i < NUMBER_OF_DIGITS; i++) {
  const number = Math.floor(Math.random() * (1000 - 100)) + 100; // Создаем число от 100 до 999
  arr.push(number); // Добавляем в массив созданное число
}

const buffer = arr.join(' '); // Создаем из массива строку

// Создаем файл и закидываем туда нашу строку в формате utf-8
fs.appendFile(PATH_TO_MAIN_FILE, buffer, { encoding: 'utf-8' }, (err) => {
  if (err) {
    throw err.message;
  }
  console.log('Файл был создан!');
});
