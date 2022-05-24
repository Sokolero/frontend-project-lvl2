import { readFileSync } from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';

function readFile(filepath) {
  const resolvedPath = path.resolve(cwd(), filepath);
  const dataString = readFileSync(resolvedPath, 'utf-8');
  return dataString;
}

function getParser(filepath) {
  const extname = path.extname(filepath)
  switch (extname) {
    case 'json':
      return {
        parse: (data) => JSON.parse(data)
      }
    default:
      return null;
  }
}

// main parse function
export default function parse(filepath) {
  // get data of file
  const dataString = readFile(filepath);

  // get needed parser
  const parser = getParser(filepath);

  //get js Object
  return parser.parse(dataString);
}
