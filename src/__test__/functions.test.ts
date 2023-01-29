/**
 * @jest-environment jsdom
 */

import * as functions from '../ts/functions';
import * as models from '../ts/models/Todo';

describe('array functions', () => {
  test('should add todo to list', () => {
    // arrange
    let todo = 'clean house';
    let todos: models.Todo[] = [];
    // act
    let result = functions.addTodo(todo, todos);

    // assert
    expect(result.success).toBeTruthy();
  });

  test('should not add todo to list', () => {
    // arrange
    let todo = '';
    let todos: models.Todo[] = [];

    // act
    let result = functions.addTodo(todo, todos);

    // arrange
    expect(result.success).toBeFalsy();
  });

  test('check if todo list is cleared', () => {
    let todos: models.Todo[] = [{ text: 'clean house', done: false }];

    let length = todos.length;

    functions.removeAllTodos(todos);

    expect(todos.length).toBe(length - 1);
  });

  test('check if todo is added to list', () => {
    let todos: models.Todo[] = [];

    let todo = 'clean house';

    let length = todos.length;

    functions.addTodo(todo, todos);

    expect(todos.length).toBe(length + 1);
  });
});

test('change done state to todo', () => {
  // arrange
  let todos: models.Todo = { text: 'clean house', done: false };

  // act
  functions.changeTodo(todos);

  // assert
  expect(todos.done).toBeTruthy();
});

test('array should sort todos by text', () => {
  // arrange
  let todos: models.Todo[] = [
    { text: 'clean house', done: false },
    { text: 'wash car', done: false },
    { text: 'eat candy', done: true },
  ];

  // act
  functions.sortTodos(todos);

  // assert
  expect(todos[1]).toEqual({ done: true, text: 'eat candy' });
  expect(todos[2]).toEqual({ done: false, text: 'wash car' });
  expect(todos[0]).toEqual({ done: false, text: 'clean house' });
});
