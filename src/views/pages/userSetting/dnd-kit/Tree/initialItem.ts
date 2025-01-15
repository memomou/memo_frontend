import { TreeItems } from "./types";

export const initialItems: TreeItems = [
  {
    id: 1,
    name: 'Home',
    pos: 0,
    count: 0,
    children: [],
  },
  {
    id: 2,
    name: 'Collections',
    children: [
      {id: 3, name: 'Spring', children: []},
      {id: 4, name: 'Summer', children: []},
      {id: 5, name: 'Fall', children: []},
      {id: 6, name: 'Winter', children: []},
    ],
  },
  {
    id: 7,
    name: 'About Us',
    children: [],
  },
  {
    id: 8,
    name: 'My Account',
    children: [
      {id: 9, name: 'Addresses', children: []},
      {id: 10, name: 'Order History', children: []},
    ],
  },
];
