const { supabase } = require("../supabaseClient");

const getTodos = async () => {
  const { data, error } = await supabase.from("todos").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const addTodo = async (todo) => {
  const { data, error } = await supabase.from("todos").insert([todo]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const updateTodo = async (id, updatedFields) => {
  const { data, error } = await supabase
    .from("todos")
    .update(updatedFields)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const deleteTodo = async (id) => {
  const { data, error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
