const path = require('path');

// Текущая директория
const root = path.join(__dirname);

const PATH_TO_MAIN_FILE = `${root}/mockNumber.txt`;
const PATH_TO_CHUNK_FILE = `${root}/chunk`;
const PATH_TO_END_FILE = `${root}/resultNumber.txt`;
/** Размер одного считываемого чанка за итерацию, при сортировке */
const LENGHT_NUMBER_AND_SPACE = 4;
/** Количество чисел в файле */
const NUMBER_OF_DIGITS = 25000000;
/** Количество чанков */
const COUNT_CHUNKS = 200;
/** Размер чанка */
const HIGH_WATER_MARK = (NUMBER_OF_DIGITS * LENGHT_NUMBER_AND_SPACE) / COUNT_CHUNKS;

module.exports = {
  PATH_TO_MAIN_FILE,
  PATH_TO_CHUNK_FILE,
  PATH_TO_END_FILE,
  HIGH_WATER_MARK,
  LENGHT_NUMBER_AND_SPACE,
  NUMBER_OF_DIGITS,
};
