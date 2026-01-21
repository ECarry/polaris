import Link from "next/link";
import { Doc } from "../../../../convex/_generated/dataModel";
import { AlertCircleIcon, GlobeIcon, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { FaGithub } from "react-icons/fa";

interface ProjectItemProps {
  data: Doc<"projects">;
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

export const ProjectItem = ({ data }: ProjectItemProps) => {
  return (
    <Link
      href={`/projects/${data._id}`}
      className="text-sm text-foreground/60 font-medium hover:text-foreground py-1 flex items-center justify-between w-full group"
    >
      <div className="flex items-center gap-2">
        {getProjectIcon(data)}
        <span className="truncate">{data.name}</span>
      </div>
      <span className="text-sm text-muted-foreground group-hover:text-foreground/60 transition-colors">
        {formatTimestamp(data.updatedAt)}
      </span>
    </Link>
  );
};
