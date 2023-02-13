import path from 'path';
import fs from 'node:fs';
import parse from './parsers/parser.js';
import format from './formatters/index.js';
import compare from './comparators/compare.js';

const normalizePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFormat = (filepath) => {
  if (!fs.existsSync(filepath)) {
    throw new Error(`"${path.basename(filepath)} doesn't exist"`);
  }
  return path.extname(filepath);
};
const getData = (filepath) => {
  const normalizedPath = normalizePath(filepath);
  const fileFormat = getFormat(normalizedPath);
  const data = fs.readFileSync(normalizedPath, 'utf-8');
  if (data.length === 0) {
    throw new Error(`${path.basename(normalizedPath)} is empty`);
  }
  return parse(data, fileFormat);
};

const genDiff = (path1, path2, formatName = 'stylish') => {
  const data1 = getData(path1);
  const data2 = getData(path2);
  const difference = compare(data1, data2);
  return format(formatName, difference);
};

export default genDiff;
