"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { AlertCircleIcon, GlobeIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Doc } from "../../../../convex/_generated/dataModel";
import { useProjects } from "../hooks/use-projects";
import { FaGithub } from "react-icons/fa";

interface ProjectCommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getProjectIcon = (project: Doc<"projects">) => {
  switch (project.importStatus) {
    case "completed":
      return <FaGithub className="size-4 text-muted-foreground" />;
    case "failed":
      return <AlertCircleIcon className="size-4 text-muted-foreground" />;
    case "importing":
      return <Loader2 className="size-4 text-muted-foreground" />;
    default:
      return <GlobeIcon className="size-4 text-muted-foreground" />;
  }
};

export const ProjectCommandDialog = ({
  open,
  onOpenChange,
}: ProjectCommandDialogProps) => {
  const router = useRouter();
  const projects = useProjects();

  const handleSelect = (projectId: string) => {
    router.push(`/projects/${projectId}`);
    onOpenChange(false);
  };
  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search Projects"
      description="Search and navigation to your projects"
    >
      <CommandInput placeholder="Search projects..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Projects">
          {projects?.map((project) => (
            <CommandItem
              key={project._id}
              value={`${project.name}-${project._id}`}
              onSelect={() => handleSelect(project._id)}
            >
              {getProjectIcon(project)}
              <span>{project.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
