import _ from 'lodash';

const compare = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const commonKeys = _.union(keys1, keys2);
  const sortedCommonKeys = _.sortBy(commonKeys);
  const difference = sortedCommonKeys.map((key) => {
    const value1 = _.isObject(data1[key])
      ? _.cloneDeep(data1[key])
      : data1[key];
    const value2 = _.isObject(data2[key])
      ? _.cloneDeep(data2[key])
      : data2[key];

    if (
      _.isObject(value1)
            && !Array.isArray(value1)
            && _.isObject(value2)
            && !Array.isArray(value2)
    ) {
      const children = compare(value1, value2);
      return {
        name: key,
        type: 'nested',
        children,
      };
    }
    if (!Object.hasOwn(data1, key)) {
      return {
        name: key,
        type: 'plained',
        status: 'added',
        values: [value2],
      };
    }
    if (!Object.hasOwn(data2, key)) {
      return {
        name: key,
        type: 'plained',
        status: 'deleted',
        values: [value1],
      };
    }
    if (_.isEqual(value1, value2)) {
      return {
        name: key,
        type: 'plained',
        status: 'unchanged',
        values: [value1],
      };
    }
    return {
      name: key,
      type: 'plained',
      status: 'changed',
      values: [value1, value2],
    };
  });
  return difference;
};

export default compare;
