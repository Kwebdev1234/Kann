import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";
import CreateWorkflow from "./create-workflow";

const Page = async () => {
  await requireAuth();

  // Server-side: use the trpc `caller` to fetch data without client hooks
  const data = await caller.getWorkflows();

  return (
    <div>
      <p>{JSON.stringify(data)}</p>

      <LogoutButton />

      <CreateWorkflow />
    </div>
  )
}

export default Page;