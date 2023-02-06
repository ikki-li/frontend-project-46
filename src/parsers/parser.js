import * as yaml from 'js-yaml';

const parse = (data, format) => {
  let object;
  if (format === '.json') {
    object = JSON.parse(data);
  }
  if (format === '.yml' || format === '.yaml') {
    object = yaml.load(data);
  }
  return object;
};

// eslint-disable-next-line import/prefer-default-export
export { parse };
