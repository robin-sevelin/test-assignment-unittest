import { removeAllTodos } from '../ts/functions';
import { Todo } from '../ts/models/Todo';

test('check if todo list is cleared', () => {
  let todos: Todo[] = [];

  let length = todos.length;

  removeAllTodos(todos);

  expect(todos.length).toBe(0);
});
