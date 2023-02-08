import { generateTreeView } from './stylish.js';
import { generatePlainView } from './plain.js';
import { generateJsonView } from './json.js';

const chooseFormat = (formatName) => {
  if (formatName === 'plain') {
    return generatePlainView;
  }
  if (formatName === 'json') {
    return generateJsonView;
  }
  return generateTreeView;
};

// eslint-disable-next-line import/prefer-default-export
export { chooseFormat };
