import textToObject from './textToObject';

export default function organizeEvent(lecture) {

  const objects = textToObject(lecture);

  if (!objects) {
    return null;
  }

  const possibles = objects.length;
  const durations = objects.map(lecture => lecture.duration);
  const totalEventDuration = durations.reduce((stored, current) => stored + current);
  const totalDays = Math.ceil(totalEventDuration / 420); 

  const morningLectures = testLinearlyGroupsOfPossibleLectures(objects, possibles, [], 180);

  const morningLecturesIndexesInArrs = morningLectures.map(group => {
    return group.map(lecture => objects.indexOf(lecture));
  });

  const morningLecturesIndexes = morningLecturesIndexesInArrs.reduce((stored, current) => {
    return stored.concat(current);
  }, []);

  const objectsWithoutMorningLectures = objects.filter((lecture, index) => {
    return !morningLecturesIndexes.includes(index);
  });
  

  let afternoonLectures = testLinearlyGroupsOfPossibleLectures(objectsWithoutMorningLectures, possibles, [], 240);

  const afternoonLecturesIndexesInArrs = afternoonLectures.map(group => {
    return group.map(lecture => objectsWithoutMorningLectures.indexOf(lecture));
  });

  const afternoonLecturesIndexes = afternoonLecturesIndexesInArrs.reduce((stored, current) => {
    return stored.concat(current);
  }, []);

  const objectsWithoutAfternoonLectures = objectsWithoutMorningLectures.filter((lecture, index) => {
    return !afternoonLecturesIndexes.includes(index);
  });

  if (afternoonLectures.length < totalDays) {
    afternoonLectures = [...afternoonLectures, [...objectsWithoutAfternoonLectures]];
  }

  const minutesToHours = (valueInMinutes) => {
    const hours = Math.floor(valueInMinutes / 60);
    let minutes = valueInMinutes % 60 || "00";

    if (minutes < 10 && minutes !== "00") {
      minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}`;
  };

  const morningLecturesHours = morningLectures.map(group => {
    let begin = 540;
    return group.map((lecture, index) => {
      if (index !== 0) {
        begin = begin + lecture.duration;
      }
      return {
        title: lecture.title,
        time: minutesToHours(begin)
      }
    })
  });

  const afternoonLecturesHours = afternoonLectures.map(group => {
    let begin = 780;
    return group.map((lecture, index) => {
      if (index !== 0) {
        begin = begin + lecture.duration;
      }

      return {
        title: lecture.title,
        time: minutesToHours(begin)
      }
    })
  });

  const morningLecturesComplete = morningLecturesHours.map(group => {
    return [...group, { title: "Almoço", time: "12:00" }];
  });

  const afternoonLecturesComplete = afternoonLecturesHours.map(group => {
    return [...group, { title: "Evento de networking", time: "17:00" }];
  });

  const generateEvent = (morningLectures, afternoonLectures, totalDays, tracks, iterator = 0) => {

    if (iterator >= totalDays) {
      return tracks;
    }

    const alphabet = [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
      'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
      'Y', 'Z'
    ];

    tracks = [...tracks, {
      name: `Track ${alphabet[iterator]}`,
      morningLectures: morningLectures[iterator],
      afternoonLectures: afternoonLectures[iterator]
    }];

    return generateEvent(morningLectures, afternoonLectures, totalDays, tracks, iterator + 1);
  };

  const event = generateEvent(morningLecturesComplete, afternoonLecturesComplete, totalDays, []);
  
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

