const data = {
  name: 1,
  items: [
    {
      name: 2,
      items: [
        {
          name: 3,
        },
        {
          name: 4,
          items: [
            {
              name: 5,
            },
            {
              name: 6,
            },
          ],
        },
      ],
    },
    {
      name: 7,
      items: [
        {
          name: 8,
        },
      ],
    },
  ],
};

function IterateObject(obj, number) {
  let iterate = number;
  Object.keys(obj).forEach((elem) => {
    if (typeof obj[elem] === 'number') {
      console.log('-'.repeat(iterate), obj[elem]);
    }

    if (typeof obj[elem] === 'object') {
      if (Array.isArray(obj[elem])) {
        iterate = iterate + 1;
      }
      IterateObject(obj[elem], iterate);
    }
  });
}

IterateObject(data, 0);
