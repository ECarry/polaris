import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  ChevronRightIcon,
  CopyMinusIcon,
  FilePlusCornerIcon,
  FolderPlusIcon,
} from "lucide-react";
import { useState } from "react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useProject } from "../../hooks/use-projects";
import { Button } from "@/components/ui/button";

export const FileExplorer = ({ projectId }: { projectId: Id<"projects"> }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [collapseKey, setCollapseKey] = useState(0);
  const [creating, setCreating] = useState<"file" | "folder" | null>(null);

  const project = useProject(projectId);

  return (
    <div className="h-full bg-sidebar">
      <ScrollArea>
        <div
          role="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="group/project cursor-pointer w-full text-left flex items-center gap-0.5 h-5.5 bg-accent font-bold"
        >
          <ChevronRightIcon
            className={cn(
              "size-4 shrink-0 text-muted-foreground transition-transform",
              isOpen ? "rotate-90" : "",
            )}
          />
          <p className="text-xs uppercase line-clamp-1">
            {project?.name ?? "Loading..."}
          </p>

          <div className="opacity-0 group-hover/project:opacity-100 transition-opacity duration-0 flex items-center gap-0.5 ml-auto">
            <Button
              variant="highlight"
              size="icon-xs"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsOpen(true);
              }}
            >
              <FilePlusCornerIcon className="size-3.5" />
            </Button>

            <Button
              variant="highlight"
              size="icon-xs"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsOpen(true);
              }}
            >
              <FolderPlusIcon className="size-3.5" />
            </Button>

            <Button
              variant="highlight"
              size="icon-xs"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setCollapseKey((prev) => prev + 1);
              }}
            >
              <CopyMinusIcon className="size-3.5" />
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
