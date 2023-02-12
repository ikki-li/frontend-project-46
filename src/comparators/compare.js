import _ from 'lodash';

const compare = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const commonKeys = _.union(keys1, keys2);
  const sortedCommonKeys = _.sortBy(commonKeys);
  const difference = sortedCommonKeys.map((key) => {
    const value1 = _.isObject(object1[key])
      ? _.cloneDeep(object1[key])
      : object1[key];
    const value2 = _.isObject(object2[key])
      ? _.cloneDeep(object2[key])
      : object2[key];

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
    if (!Object.hasOwn(object1, key)) {
      return {
        name: key,
        type: 'plained',
        status: 'added',
        values: [value2],
      };
    }
    if (!Object.hasOwn(object2, key)) {
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

export { compare };
