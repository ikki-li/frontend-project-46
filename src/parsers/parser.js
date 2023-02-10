import * as yaml from 'js-yaml';

const parse = (data, format) => {
  if (format === '.json') {
    return JSON.parse(data);
  }
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(data);
  }
  throw new Error('File format is not defined');
};

// eslint-disable-next-line import/prefer-default-export
export { parse };
