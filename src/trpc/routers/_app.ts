import {inngest} from '@/inngest/client';
import {processTask} from '@/inngest/functions';
import prisma from '@/lib/db';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
 
export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(({ctx}) => {
      return prisma.workflow.findMany();
        
    }),
    createWorkflow: protectedProcedure.mutation(async() => {
       await inngest.send({
        name: "app/task.created",
        data: {
          id: "task-123", 
        }
      });
      return prisma.workflow.create({
        data: {
          name: "New Workflow",
        }
      });
    })
});
// export type definition of API
export type AppRouter = typeof appRouter;