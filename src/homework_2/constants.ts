import path from 'path';

// Текущая директория
const root = path.join(__dirname);

export const PATH_TO_MAIN_FILE = `${root}/mockNumber.txt`;
export const PATH_TO_CHUNK_FILE = `${root}/chunk`;
export const PATH_TO_END_FILE = `${root}/resultNumber.txt`;
/** Размер одного считываемого чанка за итерацию, при сортировке */
export const LENGHT_NUMBER_AND_SPACE = 4;
/** Количество чисел в файле */
export const NUMBER_OF_DIGITS = 25000000;
/** Количество чанков */
export const COUNT_CHUNKS = 200;
/** Размер чанка */
export const HIGH_WATER_MARK = (NUMBER_OF_DIGITS * LENGHT_NUMBER_AND_SPACE) / COUNT_CHUNKS;
