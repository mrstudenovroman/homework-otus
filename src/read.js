const fs = require('fs');
const path = require('path');
const { Command } = require('commander');

function myParseInt(value) {
  return parseInt(value);
}

/* Обязательный аргумент передается просто ссылкой, например /home/roman/Документы/Git/Homework/ */
/* Глубина передается, через опциональный флаг --depth или -d */

const program = new Command();
program.version('1.0.0').option('-d, --depth <depth>', 'глубина отображения дерева', myParseInt, 3);
program.parse(process.argv);

if (!program.args[0]) {
  return console.error('🤯🤯🤯', '\x1b[31m', 'Не указан обязательный аргумент "путь до директории"');
}

const currentPath = path.resolve(program.args[0]);

function IterateTree(pathTree, number) {
  let iterate = number;
  fs.readdirSync(pathTree).forEach((elem) => {
    fs.stat(path.resolve(pathTree, elem), (error, stats) => {
      if (stats.isFile()) {
        console.log('-'.repeat(iterate), elem);
      }
      if (stats.isDirectory() && iterate <= program.depth) {
        console.log('-'.repeat(iterate), '/', elem);
        iterate = iterate + 1;
        const localPath = path.resolve(pathTree, elem);
        IterateTree(localPath, iterate);
      } else if (iterate > program.depth) {
        console.log('-'.repeat(iterate), '/', elem);
      }
    });
  });
}

IterateTree(currentPath, 0);
