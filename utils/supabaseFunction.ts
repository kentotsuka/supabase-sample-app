import { supabase } from '../utils/supabase';

//
// Todo取得の関数
//
export const getAllTodos = async () => {
  const todos = await supabase.from('todo').select('*');
  return todos.data;
};

//
// Todo追加の関数
//
export const addTodo = async (title: string) => {
  await supabase.from('todo').insert({ title: title });
};

//
// Todo削除の関数
//
export const deleteTodo = async (id: number) => {
  await supabase.from('todo').delete().eq('id', id)
};

//
// Todoを完了状態にする関数
//
export const completeTodo = async (id: number) => {
  await supabase.from('todo').update({ isCompleted: true}).eq('id', id)
};
