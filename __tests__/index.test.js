import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import * as fs from 'node:fs';
import runDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('diff between two nested structure', () => {
  const content = fs.readFileSync(getFixturePath('tree-view-of-difference.txt'), 'utf-8');
  expect(
    runDiff(getFixturePath('file1.json'), getFixturePath('file2.json')),
  ).toEqual(content);
  expect(
    runDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml')),
  ).toEqual(content);
  expect(
    runDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml')),
  ).toEqual(content);
  expect(() => {
    runDiff(
      getFixturePath('empty-file1.json'),
      getFixturePath('file2.json'),
    );
  }).toThrow('empty-file1.json is empty');
  expect(() => {
    runDiff(
      getFixturePath('non-existent-file.json'),
      getFixturePath('file2.json'),
    );
  }).toThrow("File doesn't exist");
});

test('diff in plain format', () => {
  const content = fs.readFileSync(getFixturePath('flat-difference.txt'), 'utf-8');
  expect(
    runDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain'),
  ).toEqual(content);
  expect(
    runDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain'),
  ).toEqual(content);
});
