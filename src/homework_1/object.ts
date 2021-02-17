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

type ElementNameType = 'name' | 'items';

function IterateObject(obj: typeof data, number: number) {
  let iterate = number;
  Object.keys(obj).forEach((elem) => {
    const name = elem as ElementNameType;
    if (typeof obj[name] === 'number') {
      console.log('-'.repeat(iterate), obj[name]);
    }

    if (typeof obj[name] === 'object') {
      if (Array.isArray(obj[name])) {
        iterate = iterate + 1;
      }
      const object = obj[name] as any;
      IterateObject(object, iterate);
    }
  });
}

IterateObject(data, 0);
