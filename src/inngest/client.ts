import { realtimeMiddleware } from "@inngest/realtime/middleware";
import { Inngest } from "inngest";

export const inngest = new Inngest({ 
  id: "Kann",
   middleware: [realtimeMiddleware()],
});

//To run dev
// npx inngest-cli@latest dev