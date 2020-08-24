import fs from 'fs';

function textToArray(filePath) {
  const array = fs.readFileSync(filePath).toString().split('\n');

  const finalArray = array.filter((item) => /[A-Za-z0-9]/.test(item));

  return finalArray;
}

export default textToArray;