const page = async ({ params }: { params: Promise<{ projectId: string }> }) => {
  const { projectId } = await params;

  return <div>page {projectId}</div>;
};

export default page;
