import {inngest} from '@/inngest/client';
import {executeWorkflow} from '@/inngest/functions';
import prisma from '@/lib/db';
import {  baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import {google} from '@ai-sdk/google';
import {generateText} from 'ai';
import { workflowsRouter } from '@/features/workflows/server/routers';
import { executionsRouter } from '@/features/executions/server/routers';
import { credentialsRouter } from '@/features/credentials/server/routers';
export const appRouter = createTRPCRouter({
  workflows:workflowsRouter,
  executions:executionsRouter,
  credentials:credentialsRouter,
  testWorkflow:baseProcedure.mutation(async() => {
    await inngest.send({
      name: "execute/ai",
    });
    return {success: true,message: "AI execution triggered" };
  }),
  getWorkflows: protectedProcedure.query(({ctx}) => {
      return prisma.workflow.findMany();
        
    }),
    createWorkflow: protectedProcedure.mutation(async({ctx}) => {
       await inngest.send({
        name: "app/task.created",
        data: {
          id: "task-123", 
        }
      });
      return prisma.workflow.create({
        data: {
          name: "New Workflow",
          userId: ctx.auth.user.id,
        }
      });
    })
});
// export type definition of API
export type AppRouter = typeof appRouter;