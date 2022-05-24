import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';

const program = new Command();


function readFile(filepath) {
  const resolvedPath = path.resolve(cwd(), filepath);
  const dataString = readFileSync(resolvedPath, 'utf-8');
  return dataString;
}

function union(arr1, arr2) {
  return arr1.concat(arr2.filter((item) => arr1.indexOf(item) < 0));
}

export default function genDiff() {
  let diffResult = null;

  program
    .name('gendiff')
    .description('CLI to compares two configuration files and shows a difference.')
    .version('1.0.0')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format <type>', 'output format')
    .action((filepath1, filepath2) => {
      const data1 = JSON.parse(readFile(filepath1));
      const data2 = JSON.parse(readFile(filepath2));

      const keys1 = Object.keys(data1); // [[key, value], [key, value], ...]
      const keys2 = Object.keys(data2);
      const uniqKeys = union(keys1, keys2).sort(); // get concated with uniqs keys

      const diffList = uniqKeys.map((key) => {
        if (!data2[key]) {
          return `  - ${key}: ${data1[key]}\n`;
        }
        if (!data1[key]) {
          return `  + ${key}: ${data2[key]}\n`;
        }
        if (data1[key] !== data2[key]) {
          return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}\n`;
        }
        return `    ${key}: ${data1[key]}\n`;
      });
      diffResult = `{\n${diffList.join('')}}`;
    });

  program.parse();
  return diffResult;
}
