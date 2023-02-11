import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import * as fs from 'node:fs';
import runDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('main flow', () => {
  const differencePath = getFixturePath('tree-difference.txt');
  const expectedValue = fs.readFileSync(differencePath, 'utf-8');
  const format = 'stylish';
  let fixturePath1 = getFixturePath('file1.json');
  let fixturePath2 = getFixturePath('file2.json');
  let actualValue = runDiff(fixturePath1, fixturePath2, format);
  expect(actualValue).toEqual(expectedValue);

  fixturePath1 = getFixturePath('file1.yml');
  fixturePath2 = getFixturePath('file2.yaml');
  actualValue = runDiff(fixturePath1, fixturePath2, format);
  expect(actualValue).toEqual(expectedValue);

  fixturePath1 = getFixturePath('empty-file1.json');
  let throwMessage = 'empty-file1.json is empty';
  expect(() => {
    runDiff(fixturePath1, fixturePath2, format);
  }).toThrow(throwMessage);

  fixturePath1 = getFixturePath('non-existent-file.json');
  throwMessage = "File doesn't exist";
  expect(() => {
    runDiff(fixturePath1, fixturePath2, format);
  }).toThrow(throwMessage);
});

test('plain format', () => {
  const format = 'plain';
  const differencePath = getFixturePath('flat-difference.txt');
  const expectedValue = fs.readFileSync(differencePath, 'utf-8');
  let fixturePath1 = getFixturePath('file1.json');
  let fixturePath2 = getFixturePath('file2.json');
  let actualValue = runDiff(fixturePath1, fixturePath2, format);
  expect(actualValue).toEqual(expectedValue);

  fixturePath1 = getFixturePath('file1.yaml');
  fixturePath2 = getFixturePath('file2.yaml');
  actualValue = runDiff(fixturePath1, fixturePath2, format);
  expect(actualValue).toEqual(expectedValue);
});

test('json format', () => {
  const format = 'json';
  const differencePath = getFixturePath('json-difference.txt');
  const expectedValue = fs.readFileSync(differencePath, 'utf-8');
  let fixturePath1 = getFixturePath('file1.json');
  let fixturePath2 = getFixturePath('file2.json');
  let actualValue = runDiff(fixturePath1, fixturePath2, format);
  expect(actualValue).toEqual(expectedValue);

  fixturePath1 = getFixturePath('file1.yaml');
  fixturePath2 = getFixturePath('file2.yaml');
  actualValue = runDiff(fixturePath1, fixturePath2, format);
  expect(actualValue).toEqual(expectedValue);
});
