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

describe('render dom elements', () => {
  test('should render list elements', () => {
    document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;

    let todos: models.Todo[] = [{ text: 'clean house', done: false }];

    main.createHtml(todos);

    let liTags = document.getElementsByClassName('todo__text');
    liTags.length;

    expect(liTags.length).toBe(1);
    expect(liTags[0].innerHTML).toBe('clean house');
  });

  test('Should call CreateHTML', () => {
    let todos: models.Todo[] = [];
    let text = 'clean house';
    let result = functions.addTodo(text, todos);
    let spyOnCreateHtml = jest.spyOn(main, 'createHtml').mockReturnValue();

    main.createNewTodo(text, todos);

    if (result.success) {
      expect(result.error).toBe('');
      expect(main.createHtml).toBeCalled();
      expect(main.createHtml).toBeCalledTimes(1);
      expect(spyOnCreateHtml).toBeCalled();
      expect(spyOnCreateHtml).toBeCalledTimes(1);
    }
  });
});

test('check that functions inside clear todos are called', () => {
  let todos: models.Todo[] = [];
  let spyOnRemoveAllTodos = jest
    .spyOn(functions, 'removeAllTodos')
    .mockReturnValue();
  let createHtml = jest.spyOn(main, 'createHtml').mockReturnValue();

  main.clearTodos(todos);

  expect(spyOnRemoveAllTodos).toBeCalled();
  expect(spyOnRemoveAllTodos).toBeCalledTimes(1);
  expect(createHtml).toBeCalled();
  expect(createHtml).toBeCalledTimes(2);
});

describe('functions inside createNewTodo', () => {
  test('should call createHtml inside createNewTodo', () => {
    let todo = 'clean house';
    let todos: models.Todo[] = [];

    let spyOnCreateHtml = jest.spyOn(main, 'createHtml').mockReturnValue();

    main.createNewTodo(todo, todos);

    expect(spyOnCreateHtml).toBeCalled();
  });

  test('should call displayError inside createNewTodo', () => {
    let todo = '';
    let todos: models.Todo[] = [];

    let spyOnDisplayError = jest.spyOn(main, 'displayError').mockReturnValue();

    main.createNewTodo(todo, todos);

    expect(spyOnDisplayError).toBeCalled();
  });
});

describe('error message functions,', () => {
  test('should display error', () => {
    document.body.innerHTML = `<div id="error" class="error"></div>`;

    let errorContainer: HTMLDivElement = document.getElementById(
      'error'
    ) as HTMLDivElement;
    let errorMessage: string = 'error message';
    let error = true;

    main.displayError(errorMessage, error);

    expect(errorContainer).not.toBeNull();
  });

  test('should not display error', () => {
    document.body.innerHTML = `<div id="error" class="error"></div>`;

    let errorContainer: HTMLDivElement = document.getElementById(
      'error'
    ) as HTMLDivElement;
    let errorMessage: string = 'error message';
    let error = false;

    main.displayError(errorMessage, error);

    expect(errorContainer.classList.contains('show')).toBe(false);
    expect(errorContainer).not.toBeNull();
  });
});

describe('function inside toggle todo', () => {
  test('change todo should be called', () => {
    let todos: models.Todo[] = [{ text: 'clean house', done: false }];
    let spyOnChangeTodo = jest.spyOn(functions, 'changeTodo').mockReturnValue();

    // main.toggleTodo();

    // expect(spyOnChangeTodo).toBeCalled();
  });
});
