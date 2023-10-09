import React, { useEffect, useState } from 'react'
import TodoList from './TodoList'
import { addTodo, getAllTodos } from '@/utils/supabaseFunction';

const TodoApp = () => {
  const [todos, setTodos] = useState<any>([]);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    const getTodos = async () => {
      const todos = await getAllTodos();
      setTodos(todos);
    }
    getTodos();
  }, []);

  const handleSubmit = async(e:any) => {
    e.preventDefault();

    if(title === '') return;

    // Todoの追加
    await addTodo(title);

    // Todosの更新
    let todos = await getAllTodos();
    setTodos(todos);

    setTitle('');
  };

  return (
    <section className='text-center mb-2 text-2xl font-medium'>
      <h3>Todoリスト</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type='text'
          className='mr-2 shadow-lg p-1'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button className='shadow-md border-2 px-2 py-1 rounded-lg bg-red-300'>
          追加
        </button>
      </form>
      <TodoList todos={todos} setTodos={setTodos}/>
    </section>
  )
}

export default TodoApp