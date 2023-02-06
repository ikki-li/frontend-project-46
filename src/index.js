import * as path from 'path';
import * as fs from 'node:fs';
import _ from 'lodash';
import { generateTreeView } from './formatters/stylish.js';
import { parse } from './parsers/parser.js';

const getSortedEntries = (object) => {
  const entries = Object
    .entries(object)
    .sort(([key1], [key2]) => (key1 > key2 ? 1 : -1))
    .map(([key, value]) => {
      if (!_.isObject(value)) {
        return [' ', key, value];
      }
      return [' ', key, getSortedEntries(value)];
    });
  return entries;
};

const compare = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const commonKeys = _.union(keys1, keys2);
  const sortedCommonKeys = _.sortBy(commonKeys);
  const difference = sortedCommonKeys.reduce((acc, key) => {
    const value1 = _.isObject(object1[key])
      ? _.cloneDeep(object1[key]) : object1[key];
    const value2 = _.isObject(object2[key])
      ? _.cloneDeep(object2[key]) : object2[key];
    let preparedValue1 = value1;
    let preparedValue2 = value2;
    if (Array.isArray(value1)) {
      preparedValue1 = ['array', value1];
    } else if (
      _.isObject(value1)
      && !(
        _.isObject(value2)
        && !Array.isArray(value2)
        && !_.isEqual(value1, value2)
      )
    ) {
      preparedValue1 = getSortedEntries(value1);
    }
    if (Array.isArray(value2)) {
      preparedValue2 = ['array', value2];
    } else if (
      _.isObject(value2)
      && !(
        _.isObject(value1)
        && !Array.isArray(value1)
        && !_.isEqual(value1, value2)
      )
    ) {
      preparedValue2 = getSortedEntries(value2);
    }

    if (!Object.hasOwn(object1, key)) {
      acc.push(['+', key, preparedValue2]);
      return acc;
    }
    if (!Object.hasOwn(object2, key)) {
      acc.push(['-', key, preparedValue1]);
      return acc;
    }
    if (_.isEqual(value1, value2)) {
      acc.push([' ', key, preparedValue1]);
      return acc;
    }
    if (_.isObject(value1)
      && !Array.isArray(value1)
      && _.isObject(value2)
      && !Array.isArray(value2)) {
      const currentValue = compare(preparedValue1, preparedValue2);
      acc.push([' ', key, currentValue]);
      return acc;
    }
    acc.push(['-', key, preparedValue1]);
    acc.push(['+', key, preparedValue2]);
    return acc;
  }, []);
  console.log(difference);
  return difference;
};

const runDiff = (path1, path2) => {
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
  console.log(generateTreeView(difference));
  return generateTreeView(difference);
};

export default runDiff;
