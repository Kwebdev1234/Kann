
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";


const Page = async () => {
  const users = await prisma.user.findMany();
  return (
    <div className="p-4 font-extrabold">
      <Button variant="outline">Click here </Button>
      This is the page component.
      {JSON.stringify(users)}

    </div>
  )
}
export default Page;