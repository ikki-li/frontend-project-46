import * as path from 'path';
import * as fs from 'node:fs';
import _ from 'lodash';
import { parse, prepareOutput } from './parsers/format-converters.js';

const compare = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const commonKeys = _.union(keys1, keys2);
  const sortedCommonKeys = _.sortBy(commonKeys);
  const result = [];
  sortedCommonKeys.forEach((key) => {
    if (!Object.hasOwn(object1, key)) {
      result.push(['+', key, object2[key]]);
    } else if (!Object.hasOwn(object2, key)) {
      result.push(['-', key, object1[key]]);
    } else if (object1[key] === object2[key]) {
      result.push([' ', key, object1[key]]);
    } else if (
      Object.hasOwn(object1, key)
      && Object.hasOwn(object2, key)
      && object1[key] !== object2[key]
    ) {
      result.push(['-', key, object1[key]], ['+', key, object2[key]]);
    }
  });
  return result;
};

const runDiff = (path1, path2) => {
  const normalizedPath1 = path.resolve(path1);
  const normalizedPath2 = path.resolve(path2);
  if (!fs.existsSync(normalizedPath1) || !fs.existsSync(normalizedPath2)) {
    throw new Error("File doesn't exist");
  }
  const format1 = path.extname(normalizedPath1);
  const format2 = path.extname(normalizedPath2);
  const data1 = fs.readFileSync(normalizedPath1);
  const data2 = fs.readFileSync(normalizedPath2);
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
  console.log(prepareOutput(difference));
  return prepareOutput(difference);
};

export default runDiff;
