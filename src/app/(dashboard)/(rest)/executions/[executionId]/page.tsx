interface PageProps {
    params: Promise<{ executionId: string; }>;
};
const Page = async ({ params }: PageProps) => {
    const { executionId } = await params;
    return (
        <div>
            <h1>Execution ID: {executionId}</h1>
        </div>
    )
}

export default Page;