// import { jest } from '@jest/globals';
import genDiff from '../index.js';
import parse from '../parsers';
import createDiff from '../createDiff'
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>  path.join(__dirname, '..', '__fixtures__', filename);

let expectedString = null;
let filepath1 = null;
let filepath2 = null;
let expectedPath = null;


beforeEach(() => {
  expectedPath = getFixturePath('expected.txt');
  expectedString = readFileSync(expectedPath, 'utf-8');
})

// ========================================
describe('tests for json format', () => {
  beforeEach(() => {
    filepath1 = getFixturePath('file1.json');
    filepath2 = getFixturePath('file2.json');
  });

  afterEach(() => {
    filepath1 = null;
    filepath2 = null;
  })

  test('valid diff of the nested json files, output format - stylish', () => {
    // console.log(genDiff(filepath1, filepath2))
    expect(genDiff(filepath1, filepath2)).toBe(expectedString);
  })
});

// ========================================
describe('tests for yaml format', () => {

  beforeEach(() => {
    filepath1 = getFixturePath('file1.yml');
    filepath2 = getFixturePath('file2.yml');
  });

  afterEach(() => {
    filepath1 = null;
    filepath2 = null;
  })

  test('valid diff of the nested json files, output format - stylish', () => {
    // console.log(genDiff(filepath1, filepath2))
    expect(genDiff(filepath1, filepath2)).toBe(expectedString);
  })
})

// ========================================
describe('tests for plain format output', () => {

  beforeEach(() => {
    filepath1 = getFixturePath('file1.json');
    filepath2 = getFixturePath('file2.json');
    expectedPath = getFixturePath('expectedPlain.txt');
    expectedString = readFileSync(expectedPath, 'utf-8');
  });

  afterEach(() => {
    filepath1 = null;
    filepath2 = null;
    expectedPath = null;
    expectedString = null;
  })

  test('valid diff of the nested json files, output format - plain', () => {
    // console.log(genDiff(filepath1, filepath2))
    expect(genDiff(filepath1, filepath2, 'plain')).toBe(expectedString);
  })
})
