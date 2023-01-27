/**
 * @jest-environment jsdom
 */

import * as functions from '../ts/functions';
import * as main from '../ts/main';
import * as models from '../ts/models/Todo';
import * as IAddResult from '../ts/models/IAddResult';

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('array functions', () => {
  test('should add todo to list', () => {
    let todo = 'clean house';
    let todos: models.Todo[] = [];
    let result = functions.addTodo(todo, todos);

    expect(result.success).toBeTruthy();
  });

  test('should not add todo to list', () => {
    let todo = '';
    let todos: models.Todo[] = [];
    let result = functions.addTodo(todo, todos);

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
  let todos: models.Todo = { text: 'clean house', done: false };

  functions.changeTodo(todos);

  expect(todos.done).toBeTruthy();
});
