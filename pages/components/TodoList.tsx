import { Todo } from '@/utils/interface';
import { completeTodo, deleteTodo, getAllTodos } from '@/utils/supabaseFunction';
import React from 'react'

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<any>;
};

const TodoList = (props: Props) => {
  const { todos, setTodos } = props;

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    let todos = await getAllTodos();
    setTodos(todos);
  };

  const handleComplete = async (id: number) => {
    await completeTodo(id);
    let todos = await getAllTodos();
    setTodos(todos);
  };

  const iconFunction = (isCompleted: boolean) => {
    if (isCompleted) {
      return '✅';
    } else {
      return '';
    }
  }

  return (
    <div>
      <ul className='mx-auto'>
        { todos.map((todo) => (
          <div
            key={todo.id}
            className='flex bg-blue-200 rounded-md mt-2 mb-2 p-2 justify-between'
          >
            <li className='font-medium'>
              {iconFunction(todo.isCompleted)} { todo.title }
            </li>
            <div>
              { !todo.isCompleted &&
                <span
                  className='cursor-pointer mx-3'
                  onClick={() => handleComplete(todo.id)}
                >☑︎</span>
              }

              <span
                className='cursor-pointer'
                onClick={() => handleDelete(todo.id)}
              >×</span>
            </div>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default TodoList