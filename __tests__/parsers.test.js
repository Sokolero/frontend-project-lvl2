import parse from '../parsers';
import { fileURLToPath } from 'url';
import { dirname, path } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>  path.join(__dirname, '..', filename);

let filepath = null;
let targetObj = {
  common: {
    setting1: "Value 1",
    setting2: 200,
    setting3: true,
    setting6: {
      key: "value",
      doge: {
        wow: ""
      }
    }
  },
  group1: {
    baz: "bas",
    foo: "bar",
    nest: {
      key: "value"
    }
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45
    }
  }
}

beforeAll(() => {
  filepath = getFixturePath('file1.json');
});

test('parse file json by parse function', () => {
  // read and parse file
  expect(parse(filepath)).toEqual(targetObj);
})
