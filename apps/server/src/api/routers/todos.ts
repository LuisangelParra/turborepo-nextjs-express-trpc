import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { db, todos, eq } from "@repo/db";

const t = initTRPC.create();

/**
 * Type definition for a mock TODO item.
 */
export interface MockTodo {
  id: number;
  title: string;
  completed: boolean;
}

/**
 * In-memory mock data used when the database is not available.
 * This array persists between requests as long as the server stays running.
 */
let mockTodos: MockTodo[] = [
  { id: 1, title: "Mock Task 1", completed: false },
  { id: 2, title: "Mock Task 2", completed: true },
];

export const todosRouter = t.router({
  /**
   * Returns all TODOs — from DB if connected, otherwise from mock data.
   */
  getAll: t.procedure.query(async () => {
    try {
      const result = await db.select().from(todos);
      return result;
    } catch {
      console.warn("⚠️ No database connected. Returning mock data.");
      return mockTodos;
    }
  }),

  /**
   * Adds a new TODO item.
   */
  add: t.procedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(async ({ input }) => {
      try {
        const [newTodo] = await db
          .insert(todos)
          .values({ title: input.title })
          .returning();
        return newTodo;
      } catch {
        const newTodo: MockTodo = {
          id: Math.floor(Math.random() * 1000),
          title: input.title,
          completed: false,
        };
        mockTodos = [...mockTodos, newTodo];
        return newTodo;
      }
    }),

  /**
   * Toggles a TODO item’s completion status.
   */
  toggle: t.procedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      try {
        const [todo] = await db
          .select()
          .from(todos)
          .where(eq(todos.id, input.id));
        if (!todo) return null;

        const [updated] = await db
          .update(todos)
          .set({ completed: !todo.completed })
          .where(eq(todos.id, input.id))
          .returning();
        return updated;
      } catch {
        const index = mockTodos.findIndex((t) => t.id === input.id);
        if (index < 0) {
          console.warn(`Mock todo with id ${input.id} not found.`);
          return null;
        }

        const todo = mockTodos[index] as MockTodo;

        const updatedTodo: MockTodo = {
          id: todo.id,
          title: todo.title,
          completed: !todo.completed,
        };

        // Replace safely
        mockTodos = [
          ...mockTodos.slice(0, index),
          updatedTodo,
          ...mockTodos.slice(index + 1),
        ];

        return updatedTodo;
      }
    }),
});
