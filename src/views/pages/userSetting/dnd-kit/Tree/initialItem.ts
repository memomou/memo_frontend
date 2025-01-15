import { CategoryType } from "../../../../../types/post";
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


export const categoriesExample : CategoryType[] = [
  {
    id: 1,
    categoryName: "카테고리1",
    pos: 1,
    user: {
      id: 1,
      email: "user1@example.com",
      createdAt: "2021-01-01",
    },
    tempPostCount: 0,
    postCount: 0,
    children: [
      {
        id: 3,
        categoryName: "카테고리3",
        pos: 2,
        user: {
          id: 1,
          email: "user1@example.com",
          createdAt: "2021-01-01",
        },
        tempPostCount: 0,
        postCount: 0,
        children: [],
      },
    ],
  },
  {
    id: 2,
    categoryName: "카테고리2",
    pos: 2,
    user: {
      id: 1,
      email: "user1@example.com",
      createdAt: "2021-01-01",
    },
    tempPostCount: 0,
    postCount: 0,
    children: [],
  },
];