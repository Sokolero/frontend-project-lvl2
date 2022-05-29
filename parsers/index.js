import { readFileSync } from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import yaml from 'js-yaml';

//---------------------
function readFile(filepath) {
  const resolvedPath = path.resolve(cwd(), filepath);
  const dataString = readFileSync(resolvedPath, 'utf-8');
  return dataString;
}

// -------------------
function getParser(filepath) {
  const extname = path.extname(filepath)
  switch (extname) {
    case '.json':
      return {
        parse: (data) => JSON.parse(data)
      }
    case '.yml':
    case '.yaml':
      return {
        parse: (data) => yaml.load(data)
      }
    default:
      throw new Error(`Unexpected file format: ${extname}`);
  }
}

// ==== main parsing function =========================
export default (filepath) => {
  // get data of file
  const dataString = readFile(filepath);

  // get needed parser
  const parser = getParser(filepath);

  //get js Object
  return parser.parse(dataString);
}
