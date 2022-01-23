export default [
  {
    title: "Schedule 1",
    id: 1,
    numberBlinds: 2,

    blinds: [
      { id: 1, name: "Bedroom 1", group: "Bedroom", openPercentage: 36 },
      { id: 2, name: "Bedroom 2", group: "Bedroom", openPercentage: 82 },
    ],
  },

  {
    title: "Schedule Night",
    id: 2,
    numberBlinds: 2,
    blinds: [
      { id: 1, name: "Hallway 2", group: "Hallway", openPercentage: 0 },
      { id: 2, name: "Bedroom Blind", group: "Bedroom", openPercentage: 100 },
    ],
  },
  {
    title: "Schedule Weekends",
    id: 3,
    numberBlinds: 2,
    blinds: [{ id: 1, name: "Kitchen", group: "Kitchen", openPercentage: 55 }],
  },
];
