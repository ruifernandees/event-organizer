import textToArray from './textToArray';

function convertDuration(lecture) {
  const lightning = /lightnin/.exec(lecture) ?  5 : null;

  if (lightning) {
    return lightning;
  }

  const otherTime = lecture.match(/[0-9]+/) ? lecture.match(/[0-9]+/)[0] : null;

  return otherTime;
}

export default function textToObject(filePath) {
  const array = textToArray(filePath);

  console.log("textToObject: " + array);

  const object = array.map(lecture => {
    // console.log("textToObject" + lecture);

    const lectureTrim = lecture.trim();
    
    const lastSpace = lectureTrim.lastIndexOf(" ");
    const lectureTitle = lectureTrim.slice(0, lastSpace).replace(/[0-9]/g, '');
    const lectureDuration = lectureTrim.slice(lastSpace, -1);

    // console.log("textToObject " + lectureTrim);
    // console.log("textToObject " + lectureTitle);
    // console.log("textToObject " + lectureDuration);

    const duration = Number(convertDuration(lectureDuration));

    if (duration <= 0) {
      return null;
    }

    return { title: lectureTitle, duration: duration }
  });

  const haveNull = object.includes(null);

  if (haveNull) {
    return null;
  }

  return object;
}