import path from 'path';
import fs from 'node:fs';
import parse from './parsers/parser.js';
import chooseFormat from './formatters/index.js';
import compare from './comparators/compare.js';

const genDiff = (path1, path2, formatName = 'stylish') => {
  const normalizedPath1 = path.resolve(path1);
  const normalizedPath2 = path.resolve(path2);
  if (!fs.existsSync(normalizedPath1) || !fs.existsSync(normalizedPath2)) {
    throw new Error("File doesn't exist");
  }
  const format1 = path.extname(normalizedPath1);
  const format2 = path.extname(normalizedPath2);
  const data1 = fs.readFileSync(normalizedPath1, 'utf-8');
  const data2 = fs.readFileSync(normalizedPath2, 'utf-8');
  if (data1.length === 0 && data2.length === 0) {
    throw new Error('Files are empty');
  }
  if (data1.length === 0) {
    throw new Error(`${path.basename(normalizedPath1)} is empty`);
  }
  if (data2.length === 0) {
    throw new Error(`${path.basename(normalizedPath2)} is empty`);
  }
  const object1 = parse(data1, format1);
  const object2 = parse(data2, format2);
  const difference = compare(object1, object2);
  const format = chooseFormat(formatName);
  console.log(format(difference));
  return format(difference);
};

export default genDiff;
