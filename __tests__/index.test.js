// import { jest } from '@jest/globals';
import genDiff from '../_index.js';
import { fileURLToPath } from 'url';
import { dirname, path } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>  path.join(__dirname, '..', filename);


let rightDiff = null;
let filepath1 = null;
let filepath2 = null;

beforeAll(() => {
  rightDiff = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow:
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}` // right diff for stylish output
});

beforeEach(() => {
  filepath1 = getFixturePath('file1.json');
  filepath2 = getFixturePath('file2.json');
})

test('valid diff of the json files, output format string', () => {

  expect(genDiff(filepath1, filepath2)).toBe(rightDiff);
})
