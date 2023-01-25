/**
 *@jest-enviroment jsdom
 */

import { addTodo, removeAllTodos } from '../ts/functions';
import { Todo } from '../ts/models/Todo';

describe('array tests', () => {
  test('check if todo list is cleared', () => {
    let todos: Todo[] = [];

    let length = todos.length;

    removeAllTodos(todos);

    expect(todos.length).toBe(0);
  });
  /*
  test('check if todo is created', () => {
    let todos: Todo[] = [];

    let todo = '';

    let length = todos.length;

    createNewTodo(todo, todos);

    expect(todos.length).toBe(length + 1);
  });
  */
});
