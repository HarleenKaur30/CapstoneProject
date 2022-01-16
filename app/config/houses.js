import values from "./values";

export default [
  {
    title: "house1",
    id: values.houses.house1.id,
    name: values.houses.house1.name,
    numberBlinds: values.houses.house1.blinds,

    blind1: {
      name: "Bedroom 1",
      group: "Bedroom",
      openPercentage: 36,
    },

    blind2: { name: "Bedroom 2", group: "Bedroom", openPercentage: 82 },
  },

  /* {
    title: "house2",
    id: values.houses.house2.id,
    name: values.houses.house2.name,
    numberBlinds: values.houses.house2.blinds,
    blind1: {
      name: "Kitchen",
      group: "Kitchen",
      openPercentage: 0,
    },
    blind2: {
      name: "Bedroom 5",
      group: "Bedroom",
      openPercentage: 100,
    },
  },
  {
    title: "house3",
    id: values.houses.house3.id,
    name: values.houses.house3.name,
    numberBlinds: values.houses.house3.blinds,
    blind1: {
      name: "Kitchen 2",
      group: "Kitchen",
      openPercentage: 50,
    },
  }, */
];
