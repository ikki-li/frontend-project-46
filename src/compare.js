import _ from 'lodash';

const compare = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));
  return sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      const value2 = _.isObject(data2[key])
        ? _.cloneDeep(data2[key])
        : data2[key];
      return {
        key,
        type: 'added',
        value: value2,
      };
    }

    if (!_.has(data2, key)) {
      const value1 = _.isObject(data1[key])
        ? _.cloneDeep(data1[key])
        : data1[key];
      return {
        key,
        type: 'deleted',
        value: value1,
      };
    }

    if (
      _.isPlainObject(data1[key])
            && _.isPlainObject(data2[key])
    ) {
      const children = compare(data1[key], data2[key]);
      return {
        key,
        type: 'nested',
        children,
      };
    }

    if (_.isEqual(data1[key], data2[key])) {
      const value = _.isObject(data1[key])
        ? _.cloneDeep(data1[key])
        : data1[key];
      return {
        key,
        type: 'unchanged',
        value,
      };
    }
    const value1 = _.isObject(data1[key])
      ? _.cloneDeep(data1[key])
      : data1[key];
    const value2 = _.isObject(data2[key])
      ? _.cloneDeep(data2[key])
      : data2[key];
    return {
      key,
      type: 'changed',
      value1,
      value2,
    };
  });
};

export default compare;
