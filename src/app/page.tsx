"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";

export default function Home() {
  const projects = useQuery(api.projects.get);
  const createProject = useMutation(api.projects.create);

  return (
    <main>
      <h1>Home</h1>
      <ul>
        {projects?.map((project) => (
          <li key={project._id}>{project.name}</li>
        ))}
      </ul>
      <Button onClick={() => createProject({ name: "New Project" })}>
        Create Project
      </Button>
    </main>
  );
}
