import * as path from 'path';
import * as fs from 'node:fs';
import _ from 'lodash';
import { parse } from './parsers/parser.js';
import { chooseFormat } from './formatters/index.js';

const compare = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const commonKeys = _.union(keys1, keys2);
  const sortedCommonKeys = _.sortBy(commonKeys);
  const difference = sortedCommonKeys.map((key) => {
    const value1 = _.isObject(object1[key])
      ? _.cloneDeep(object1[key]) : object1[key];
    const value2 = _.isObject(object2[key])
      ? _.cloneDeep(object2[key]) : object2[key];

    const item = {
      name: key,
      type: null,
      children: null,
      values: [],
    };
    if (_.isObject(value1)
            && !Array.isArray(value1)
            && _.isObject(value2)
            && !Array.isArray(value2)
    ) {
      const children = compare(value1, value2);
      item.type = 'nested';
      item.children = children;
      return item;
    }
    item.type = 'plained';
    if (!Object.hasOwn(object1, key)) {
      item.status = 'added';
      item.values.push(value2);
      return item;
    }
    if (!Object.hasOwn(object2, key)) {
      item.status = 'deleted';
      item.values.push(value1);
      return item;
    }
    if (_.isEqual(value1, value2)) {
      item.status = 'unchanged';
      item.values.push(value1);
      return item;
    }
    item.status = 'changed';
    item.values.push(value1);
    item.values.push(value2);
    return item;
  }, []);
  return difference;
};

const runDiff = (path1, path2, formatName = 'stylish') => {
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

export default runDiff;
