/**
 * @jest-environment jsdom
 */
import * as functions from '../ts/functions';
import * as main from '../ts/main';
import * as models from '../ts/models/Todo';

beforeEach(() => {
  document.body.innerHTML = '';
  jest.restoreAllMocks();
});

describe('render dom elements', () => {
  test('should render list elements', () => {
    // arrange
    document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
    let todos: models.Todo[] = [
      { text: 'clean house', done: false },
      { text: 'wash car', done: true },
    ];

    // act
    main.createHtml(todos);

    // assert
    let liTags = document.getElementsByClassName('todo__text');
    let liTagsDone = document.getElementsByClassName('todo__text--done');
    liTags.length;
    expect(liTags.length).toBe(2);
    expect(liTags[0].innerHTML).toBe('clean house');
    expect(liTags[1].innerHTML).toBe('wash car');
  });

  test('should not render list elements', () => {
    // arrange
    document.body.innerHTML = `<div id="error" class="error"></div>`;
    let todo = 'c';
    let todos: models.Todo[] = [];

    // act
    main.createNewTodo(todo, todos);
    let result = document.querySelector('#error')?.classList.contains('show');

    // assert
    expect(result).toBe(true);
  });
});

describe('functions inside clearTodos', () => {
  test('check that removeAllTodos is called', () => {
    let todos: models.Todo[] = [];
    let spyOnRemoveAllTodos = jest
      .spyOn(functions, 'removeAllTodos')
      .mockReturnValue();

    main.clearTodos(todos);

    expect(spyOnRemoveAllTodos).toBeCalled();
    expect(spyOnRemoveAllTodos).toBeCalledTimes(1);
  });

  test('check that createHtml is called', () => {
    let todos: models.Todo[] = [];

    let createHtml = jest.spyOn(main, 'createHtml').mockReturnValue();

    main.clearTodos(todos);

    expect(createHtml).toBeCalled();
    expect(createHtml).toBeCalledTimes(1);
  });
});

describe('functions inside createNewTodo', () => {
  test('should call createHtml inside createNewTodo', () => {
    // arrange
    let todo = 'clean house';
    let todos: models.Todo[] = [];
    let spyOnCreateHtml = jest.spyOn(main, 'createHtml').mockReturnValue();

    // act
    main.createNewTodo(todo, todos);

    // assert
    expect(spyOnCreateHtml).toBeCalled();
  });

  test('Should call CreateHTML', () => {
    // arrange
    let todos: models.Todo[] = [];
    let text = 'clean house';
    let spyOnCreateHtml = jest.spyOn(main, 'createHtml').mockReturnValue();
    let spyOnDisplayError = jest.spyOn(main, 'displayError').mockReturnValue();

    // act
    main.createNewTodo(text, todos);

    // assert
    expect(spyOnCreateHtml).toBeCalled();
    expect(todos.length).toBe(1);
    expect(spyOnDisplayError).not.toBeCalled();
    expect(spyOnDisplayError).toBeCalledTimes(0);
    expect(todos.length).not.toBe(0);
  });

  test('Should call displayError', () => {
    // 1 arrange
    let todos: models.Todo[] = [];
    let text = 'c';
    let spyOnDisplayError = jest.spyOn(main, 'displayError').mockReturnValue();

    // act
    main.createNewTodo(text, todos);

    // assert
    expect(spyOnDisplayError).toBeCalled();
    expect(spyOnDisplayError).toBeCalledTimes(1);
    expect(todos.length).toBe(0);
  });

  test('should not displayerror', () => {
    // act
    document.body.innerHTML = `<div id="error" class="error"></div>`;
    let errorMessage: string = 'error message';

    // act
    main.displayError(errorMessage, false);

    let result = document.getElementById('error') as HTMLDivElement;

    // assert

    expect(result.classList.contains('show')).toBe(false);
  });
});

describe('functions inside toggle todo', () => {
  test('change todo should be called', () => {
    // arrange
    let todos: models.Todo = { text: 'clean house', done: false };
    let spyOnChangeTodo = jest.spyOn(functions, 'changeTodo').mockReturnValue();

    // act
    main.toggleTodo(todos);

    // assert
    expect(spyOnChangeTodo).toBeCalled();
    spyOnChangeTodo.mockRestore();
  });

  test('create html should be called', () => {
    // arrange
    let todos: models.Todo = { text: 'clean house', done: false };
    let spyOnCreateHtml = jest.spyOn(main, 'createHtml').mockReturnValue();

    // act
    main.toggleTodo(todos);

    // assert
    expect(spyOnCreateHtml).toBeCalled();
  });
});
