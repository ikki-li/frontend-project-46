import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import generateDiff from '../src/compare-json-files.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('get difference between two YAML files', () => {
  expect(
    generateDiff(getFixturePath('file1.json'), getFixturePath('file2.json')),
  ).toEqual(
    '{\n - follow: false\n   host: hexlet.io\n - proxy: 123.234.53.22\n - timeout: 50\n + timeout: 20\n + verbose: true\n}',
  );
  expect(() => {
    generateDiff(
      getFixturePath('empty-file1.json'),
      getFixturePath('file2.json'),
    );
  }).toThrow('empty-file1.json is empty');
  expect(() => {
    generateDiff(
      getFixturePath('non-existent-file.json'),
      getFixturePath('file2.json'),
    );
  }).toThrow("File doesn't exist");
});
