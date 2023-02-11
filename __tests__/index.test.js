import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import * as fs from 'node:fs';
import runDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('main flow', () => {
  const differencePath = getFixturePath('tree-difference.txt');
  const expectedValue = fs.readFileSync(differencePath, 'utf-8');
  const format = 'stylish';
  test('get diff between two json files', () => {
    const fixturePath1 = getFixturePath('file1.json');
    const fixturePath2 = getFixturePath('file2.json');
    const actualValue = runDiff(fixturePath1, fixturePath2, format);
    expect(actualValue).toEqual(expectedValue);
  });
  const fixturePath2 = getFixturePath('file2.yaml');
  test('get diff between two yaml files', () => {
    const fixturePath1 = getFixturePath('file1.yml');
    const actualValue = runDiff(fixturePath1, fixturePath2, format);
    expect(actualValue).toEqual(expectedValue);
  });
  test('throw: empty file', () => {
    const fixturePath1 = getFixturePath('empty-file1.json');
    const throwMessage = 'empty-file1.json is empty';
    expect(() => {
      runDiff(fixturePath1, fixturePath2, format);
    }).toThrow(throwMessage);
  });
  test('throw: non-existent file', () => {
    const fixturePath1 = getFixturePath('non-existent-file.json');
    const throwMessage = "File doesn't exist";
    expect(() => {
      runDiff(fixturePath1, fixturePath2, format);
    }).toThrow(throwMessage);
  });
});

describe('plain formatter', () => {
  const format = 'plain';
  const differencePath = getFixturePath('flat-difference.txt');
  const expectedValue = fs.readFileSync(differencePath, 'utf-8');
  test('get diff between two json files', () => {
    const fixturePath1 = getFixturePath('file1.json');
    const fixturePath2 = getFixturePath('file2.json');
    const actualValue = runDiff(fixturePath1, fixturePath2, format);
    expect(actualValue).toEqual(expectedValue);
  });
  test('get diff between two yaml files', () => {
    const fixturePath1 = getFixturePath('file1.yaml');
    const fixturePath2 = getFixturePath('file2.yaml');
    const actualValue = runDiff(fixturePath1, fixturePath2, format);
    expect(actualValue).toEqual(expectedValue);
  });
});

describe('json formatter', () => {
  const format = 'json';
  const differencePath = getFixturePath('json-difference.txt');
  const expectedValue = fs.readFileSync(differencePath, 'utf-8');
  test('get diff between two json files', () => {
    const fixturePath1 = getFixturePath('file1.json');
    const fixturePath2 = getFixturePath('file2.json');
    const actualValue = runDiff(fixturePath1, fixturePath2, format);
    expect(actualValue).toEqual(expectedValue);
  });
  test('get diff between two yaml files', () => {
    const fixturePath1 = getFixturePath('file1.yaml');
    const fixturePath2 = getFixturePath('file2.yaml');
    const actualValue = runDiff(fixturePath1, fixturePath2, format);
    expect(actualValue).toEqual(expectedValue);
  });
});
