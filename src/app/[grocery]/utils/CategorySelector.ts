interface objArray {
  [key: string]: number;
}

function typeNumberGenerator(category: string, type: number) {
  var isPeriodOfDay = function (num: number, period: number) {
    return (num & period) === period;
  };

  const dairyArray = {
    Milk: 1,
    Cheese: 2,
    Yogurt: 4,
    Butter: 8,
    Eggs: 32,
    NonDairy: 64,
    "Dips and Sour Cream": 128,
  };

  let possibleTypes: Array<objArray> = [];
  let returnStrings: Array<string> = [];

  switch (category) {
    case "Dairy":
      possibleTypes.push(dairyArray);
  }

  for (let i = 0; i < possibleTypes.length; i++) {
    for (let key in possibleTypes[i]) {
      if (isPeriodOfDay(type, possibleTypes[i][key] || 0)) {
        returnStrings.push(key);
      }
    }
  }

  return returnStrings;
}

export default typeNumberGenerator;
