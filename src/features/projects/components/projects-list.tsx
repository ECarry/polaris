import { Spinner } from "@/components/ui/spinner";
import { useProjectsPartial } from "../hooks/use-projects";
import { Kbd } from "@/components/ui/kbd";
import { ProjectItem } from "./project-item";
import { Doc } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  AlertCircleIcon,
  ArrowRightIcon,
  GlobeIcon,
  Loader2,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

interface ProjectsListProps {
  onViewAll: () => void;
}

const formatTimestamp = (timestamp: number) => {
  return formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
  });
};

const getProjectIcon = (project: Doc<"projects">) => {
  switch (project.importStatus) {
    case "completed":
      return <FaGithub className="size-3.5 text-muted-foreground" />;
    case "failed":
      return <AlertCircleIcon className="size-3.5 text-muted-foreground" />;
    case "importing":
      return <Loader2 className="size-3.5 text-muted-foreground" />;
    default:
      return <GlobeIcon className="size-3.5 text-muted-foreground" />;
  }
};

const ContinueCard = ({ data }: { data: Doc<"projects"> }) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-muted-foreground">Last Updated</span>
      <Button
        variant="outline"
        size="sm"
        asChild
        className="h-auto items-start justify-start p-4 bg-background border rounded-none flex flex-col gap-2"
      >
        <Link href={`/projects/${data._id}`} className="group">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              {getProjectIcon(data)}
              <span className="font-medium truncate">{data.name}</span>
            </div>
            <ArrowRightIcon className="size-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
          </div>
          <span className="text-xs text-muted-foreground">
            {formatTimestamp(data.updatedAt)}
          </span>
        </Link>
      </Button>
    </div>
  );
};

export const ProjectsList = ({ onViewAll }: ProjectsListProps) => {
  const projects = useProjectsPartial(6);

  if (projects === undefined) {
    return <Spinner className="size-4 text-ring" />;
  }

  const [mostRecent, ...rest] = projects;

  return (
    <div className="flex flex-col gap-4 ">
      {mostRecent && <ContinueCard data={mostRecent} />}
      {rest.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">
              Recent Projects
            </span>
            <button
              className="flex items-center gap-2 text-muted-foreground text-xs hover:text-foreground transition-colors"
              onClick={onViewAll}
            >
              <span>View All</span>
              <Kbd className="bg-accent border">⌘K</Kbd>
            </button>
          </div>

          <ul className="flex flex-col">
            {rest.map((project) => (
              <ProjectItem key={project._id} data={project} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
