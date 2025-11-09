import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

let todos = [
  { id: 1, title: "Learn tRPC", completed: false },
  { id: 2, title: "Build a monorepo", completed: true },
];

export const todosRouter = t.router({
  getAll: t.procedure.query(() => todos),

  add: t.procedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(({ input }) => {
      const newTodo = {
        id: todos.length + 1,
        title: input.title,
        completed: false,
      };
      todos.push(newTodo);
      return newTodo;
    }),

  toggle: t.procedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => {
      const todo = todos.find((t) => t.id === input.id);
      if (todo) todo.completed = !todo.completed;
      return todo;
    }),
});
