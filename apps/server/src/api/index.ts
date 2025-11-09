import { initTRPC } from "@trpc/server";
import { todosRouter } from "./routers/todos";

const t = initTRPC.create();

// 🔗 Combine all routers here
export const appRouter = t.router({
  todos: todosRouter,
});

// 🔸 Export the type for the frontend client
export type AppRouter = typeof appRouter;
