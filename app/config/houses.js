import values from "./values";

export default [
  {
    title: "house1",
    id: values.houses.house1.id,
    name: values.houses.house1.name,
    numberBlinds: values.houses.house1.blinds,

    blinds: [
      {
        id: 1,
        stringID: "A83790-3",
        title: "blind1",
        name: "Bedroom 1",
        group: "Bedroom",
        storey: "1",
        height: "25",
        orientation: "North",
        obstruction: 0.4,
        openPercentage: 20,
        schedule: "None",
      },
      {
        id: 2,
        stringID: "A83790-3",
        title: "blind2",
        name: "Bedroom 2",
        group: "Bedroom",
        storey: "2",
        height: "34",
        orientation: "Northwest",
        obstruction: 0.2,
        openPercentage: 100,
        schedule: "Optimized",
      },
      { id: 3, name: "Bedroom 1", group: "Bedroom", openPercentage: 13 },
      { id: 4, name: "Bedroom 2", group: "Bedroom", openPercentage: 82 },
      { id: 5, name: "Kitchen 1", group: "Kitchen", openPercentage: 36 },
      { id: 6, name: "Kitchen 2", group: "Kitchen", openPercentage: 100 },
      { id: 7, name: "Hallway", group: "Hallway", openPercentage: 36 },
      { id: 8, name: "Guest Room 1 ", group: "Guest Room", openPercentage: 82 },
      { id: 9, name: "Guest Room 2", group: "Guest Room", openPercentage: 66 },
      { id: 10, name: "Guest Room 3", group: "Guest Room", openPercentage: 90 },
    ],
  },

  {
    title: "house2",
    id: values.houses.house2.id,
    name: values.houses.house2.name,
    numberBlinds: values.houses.house2.blinds,
    blinds: [
      {
        id: 1,
        stringID: "A83790-3",
        title: "blind1",
        name: "Hallway 2",
        group: "Hallway",
        storey: "3",
        height: "37",
        orientation: "Southeast",
        obstruction: 0.1,
        openPercentage: 0,
        schedule: "Weekends",
      },
      {
        id: 2,
        stringID: "A83790-3",
        title: "blind2",
        name: "Bedroom Blind",
        group: "Bedroom",
        storey: "1",
        height: "60",
        orientation: "South",
        obstruction: 0.9,
        openPercentage: 100,
        schedule: "Weekday",
      },
    ],
  },
  {
    title: "house3",
    id: values.houses.house3.id,
    name: values.houses.house3.name,
    numberBlinds: values.houses.house3.blinds,
    blinds: [
      {
        id: 1,
        stringID: "A83790-3",
        title: "blind1",
        name: "Kitchen",
        group: "Kitchen",
        storey: "1",
        height: "77",
        orientation: "East",
        obstruction: 1,
        openPercentage: 55,
        schedule: "Weekends",
      },
    ],
  },
];
