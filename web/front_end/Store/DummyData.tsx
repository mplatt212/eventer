export const events = [
  {
    event_id: 1,
    name: "Beach '22",
    location: 'Port St. Joe, FL',
    startDate: 'Oct. 1',
    endDate: 'Oct. 8',
    participantCount: 13,
  },
];

export const meals_for_day = [
  {
    day_id: 1,
    event_id: 1,
    meal_id: 1,
  },
];

export const meals = [
  {
    meal_id: 1,
    day_id: 1,
    type: 'Breakfast',
    menu_items: [1, 2, 3],
  },
  {
    meal_id: 2,
    day_id: 1,
    type: 'Lunch',
    menu_items: [4, 5, 6],
  },
  {
    meal_id: 3,
    day_id: 1,
    type: 'Dinner',
    menu_items: [7, 8, 9],
  },
];

export const menu_items = [
  {
    item_id: 1,
    meal_id: 1,
    item: 'Eggs',
    ingredients: [1, 2, 3],
  },
  {
    item_id: 2,
    meal_id: 1,
    item: 'Bacon',
    ingredients: [1, 2, 3],
  },
  {
    item_id: 3,
    meal_id: 1,
    item: 'Toast',
    ingredients: [1, 2, 3],
  },
  {
    item_id: 4,
    meal_id: 2,
    item: 'Sandwiches',
    ingredients: [1, 2, 3],
  },
  {
    item_id: 5,
    meal_id: 2,
    item: 'Chips',
    ingredients: [1, 2, 3],
  },
  {
    item_id: 6,
    meal_id: 2,
    item: 'Fruit',
    ingredients: [1, 2, 3],
  },
  {
    item_id: 7,
    meal_id: 3,
    item: 'Cheeseburgers',
    ingredients: [1, 2, 3],
  },
  {
    item_id: 8,
    meal_id: 3,
    item: 'Fries',
    ingredients: [1, 2, 3],
  },
  {
    item_id: 9,
    meal_id: 3,
    item: 'Roasted Veggies',
    ingredients: [1, 2, 3],
  },
];

export const ingredients = [
  {
    ingred_id: 1,
    item_id: 1,
    ingredient: 'Eggs',
    qty: 1,
    qty_type: 'Dozen',
  },
];
