// src/inngest/functions.ts
import { inngest } from "./client";
import {createGoogleGenerativeAI} from "@ai-sdk/google";
import {generateText} from "ai";

const google= createGoogleGenerativeAI();
export const executeAI = inngest.createFunction(
  { id: "execute-ai", triggers: { event: "execute/ai" } },
  async ({ event, step }) => {
    const {steps} = await step.ai.wrap("gemini-generated-text",
       generateText,
       {
          model: google("gemini-2.5-flash"),
          system: "You are a helpful assistant that summarizes text.",
          prompt: "How  to find remote job in Reactjs?",
          experimental_telemetry: {
         isEnabled: true,
         recordInputs: true,
        
         recordOutputs: true,
  },
       }
    );
    return steps;
  
  }
);