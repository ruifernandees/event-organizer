import textToObject from './textToObject';

export default function organizeEvent(lecture) {

  const objects = textToObject(lecture);

  const possibles = objects.length;
  const durations = objects.map(lecture => lecture.duration);
  const totalEventDuration = durations.reduce((stored, current) => stored + current);
  const totalDays = Math.ceil(totalEventDuration / 420); // 840 => 1260 1680

  // const objectsSplit2 = split(objects, 4);

  // const filteredLectures = objectsSplit2.filter(group => {
  //   const sum = group.reduce((stored, current) => stored + current.duration, 0);
  //   console.log("group: ", group);
  //   console.log("Sum: ", sum);
  //   return sum === 105;
  // });

  let morningLectures = testLinearlyGroupsOfPossibleLectures(objects, possibles, [], 180);

  if (morningLectures.length < totalDays) {
    // morningLectures = [];
  }

  const event = {
    totalEventDuration,
    totalDays,
    morningLecturesQ: morningLectures.length,
    morningLectures
  };

  console.log(objects.length)

  return event;
}

const split = (items, max) => {
  return items.reduce((stored, current, index) => {
    const group = Math.floor(index / max);
    stored[group] = [...(stored[group] || []), current ];
    return stored;
  }, []);
};

function testLinearlyGroupsOfPossibleLectures(lectures, possibles, currentLectures, sessionMaxTime) {
  if (possibles <= 0 && currentLectures.length <= 0) {
    return [...lectures];
  }

  if (possibles <= 0 && currentLectures.length > 0) {
    return [...currentLectures];
  }

  const lecturesSplit = split(lectures, possibles); // [ [{}, {}], [{}, {}] ]
  
  const groupSum = (group) => group.reduce((stored, current) => stored + current.duration, 0);
  
  const filteredLectures = lecturesSplit.filter(group => {
    const sum = groupSum(group);
    console.log("group: ", group);
    console.log("Sum: ", sum);
    return sum === sessionMaxTime;
  });

  currentLectures = [...currentLectures, ...filteredLectures];

  const currentLecturesWithoutEmptyArr = currentLectures.filter(item => item.length !== 0);

  const currentLecturesWithoutDuplicates = currentLecturesWithoutEmptyArr.filter(function(item) {
    // console.log(this);
    return !this[JSON.stringify(item)] && (this[JSON.stringify(item)] = true);
  }, Object.create(null));

  return testLinearlyGroupsOfPossibleLectures(lectures, possibles - 1, currentLecturesWithoutDuplicates, sessionMaxTime);

}

