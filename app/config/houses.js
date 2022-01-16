import values from "./values";

export default [
  {
    title: "house1",
    id: values.houses.house1.id,
    name: values.houses.house1.name,
    numberBlinds: values.houses.house1.blinds,

    blinds: [
      { id: 1, name: "Bedroom 1", group: "Bedroom", openPercentage: 36 },
      { id: 2, name: "Bedroom 2", group: "Bedroom", openPercentage: 82 },
    ],
  },

  {
    title: "house2",
    id: values.houses.house2.id,
    name: values.houses.house2.name,
    numberBlinds: values.houses.house2.blinds,
    blinds: [
      { id: 1, name: "Hallway 2", group: "Hallway", openPercentage: 0 },
      { id: 2, name: "Bedroom Blind", group: "Bedroom", openPercentage: 100 },
    ],
  },
  {
    title: "house3",
    id: values.houses.house3.id,
    name: values.houses.house3.name,
    numberBlinds: values.houses.house3.blinds,
    blinds: [{ id: 1, name: "Kitchen", group: "Kitchen", openPercentage: 55 }],
  },
];
