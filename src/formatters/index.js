import { generateTreeView } from './stylish.js';
import { generatePlainView } from './plain.js';

const chooseFormat = (formatName) => {
  if (formatName === 'plain') {
    return generatePlainView;
  }
  return generateTreeView;
};

// eslint-disable-next-line import/prefer-default-export
export { chooseFormat };
