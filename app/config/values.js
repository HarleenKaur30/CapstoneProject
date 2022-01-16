export default {
  maxNumberOfHouses: 5,
  maxNumberOfBlinds: 10,

  houses: {
    number: 3,

    house1: {
      id: 1,
      name: "House",

      blinds: 2,

      blind1: {
        name: "Bedroom 1",
        group: "Bedroom",
        openPercentage: 36,
      },
      blind2: {
        name: "Bedroom 2",
        group: "Bedroom",
        openPercentage: 82,
      },
    },

    house2: {
      id: 2,
      name: "Vacation House",
      blinds: 2,
    },
    house3: {
      id: 3,
      name: "Work",
      blinds: 1,
    },
    house4: {
      id: 4,
      blinds: 0,
    },
    house5: {
      id: 5,
      blinds: 0,
    },
  },
};
