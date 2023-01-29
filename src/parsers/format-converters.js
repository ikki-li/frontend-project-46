import * as yaml from 'js-yaml';

const parse = (data, format) => {
  let object;
  if (format === '.json') {
    object = JSON.parse(data);
  } if (format === '.yml' || format === '.yaml') {
    object = yaml.load(data);
  }
  return object;
};

const prepareOutput = (data) => {
  let result = '';
  data.forEach((element) => {
    result += ` ${element[0]} ${element[1]}: ${element[2]}\n`;
  });
  return `{\n${result}}`;
};

export { parse, prepareOutput };
