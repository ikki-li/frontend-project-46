import path from 'path';
import fs from 'node:fs';
import parse from './parsers.js';
import compare from './compare.js';
import format from './formatters/index.js';

const buildFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getFormat = (filepath) => {
  if (!fs.existsSync(filepath)) {
    throw new Error(`"${path.basename(filepath)} doesn't exist"`);
  }
  return path.extname(filepath);
};
const getData = (filepath) => {
  const fullPath = buildFullPath(filepath);
  const fileFormat = getFormat(fullPath);
  const data = fs.readFileSync(fullPath, 'utf-8');
  if (data.length === 0) {
    throw new Error(`${path.basename(fullPath)} is empty`);
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
