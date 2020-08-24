import textToArray from './textToArray';

function textToObject(filePath) {
  const object = textToArray(filePath);

  return object;
}

export default textToObject;