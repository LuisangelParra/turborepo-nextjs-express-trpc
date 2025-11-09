"use client";

import { trpc } from "../utils/trpc";
import { useState } from "react";

export default function Page() {
  const utils = trpc.useUtils();
  const { data: todos, isLoading } = trpc.todos.getAll.useQuery();
  const addTodo = trpc.todos.add.useMutation({
    onSuccess: () => utils.todos.getAll.invalidate(),
  });
  const toggleTodo = trpc.todos.toggle.useMutation({
    onSuccess: () => utils.todos.getAll.invalidate(),
  });

  const [newTitle, setNewTitle] = useState("");

  if (isLoading) return <p>Cargando tareas...</p>;

  return (
    <main style={{ maxWidth: 500, margin: "3rem auto" }}>
      <h1>✅ tRPC Todo Demo</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!newTitle.trim()) return;
          addTodo.mutate({ title: newTitle });
          setNewTitle("");
        }}
        style={{ display: "flex", gap: "0.5rem" }}
      >
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Nueva tarea..."
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button type="submit">Agregar</button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos?.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo.mutate({ id: todo.id })}
              />{" "}
              {todo.title}
            </label>
          </li>
        ))}
      </ul>
    </main>
  );
}
