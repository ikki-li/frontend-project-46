import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => {
  const fixturePath = getFixturePath(filename);
  return fs.readFileSync(fixturePath, 'utf-8');
};
const expectedStylish = readFixture('stylish-difference.txt');
const expectedPlain = readFixture('plain-difference.txt');
const expectedJSON = readFixture('json-difference.txt');

test('should be work with json', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  expect(genDiff(filepath1, filepath2)).toBe(expectedStylish);
  expect(genDiff(filepath1, filepath2, 'stylish')).toBe(expectedStylish);
  expect(genDiff(filepath1, filepath2, 'plain')).toBe(expectedPlain);
  expect(genDiff(filepath1, filepath2, 'json')).toBe(expectedJSON);
});
test('should be work with yml', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  expect(genDiff(filepath1, filepath2)).toBe(expectedStylish);
  expect(genDiff(filepath1, filepath2, 'stylish')).toBe(expectedStylish);
  expect(genDiff(filepath1, filepath2, 'plain')).toBe(expectedPlain);
  expect(genDiff(filepath1, filepath2, 'json')).toBe(expectedJSON);
});
test('should be throw: empty file', () => {
  const filepath1 = getFixturePath('empty-file1.json');
  const filepath2 = getFixturePath('file1.json');
  const throwMessage = 'empty-file1.json is empty';
  expect(() => {
    genDiff(filepath1, filepath2);
  }).toThrow(throwMessage);
});
test('should be throw: non-existent file', () => {
  const filepath1 = getFixturePath('non-existent-file.json');
  const filepath2 = getFixturePath('file1.json');
  const throwMessage = "non-existent-file.json doesn't exist";
  expect(() => {
    genDiff(filepath1, filepath2);
  }).toThrow(throwMessage);
});
