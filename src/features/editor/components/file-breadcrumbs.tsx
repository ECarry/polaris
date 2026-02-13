import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Id } from "../../../../convex/_generated/dataModel";
import { useEditor } from "../hooks/use-editor";
import { useFilePath } from "@/features/projects/hooks/use-files";
import React from "react";
import { FileIcon } from "@react-symbols/icons/utils";

export const FileBreadcrumbs = ({
  projectId,
}: {
  projectId: Id<"projects">;
}) => {
  const { activeTabId } = useEditor(projectId);
  const filepath = useFilePath(activeTabId);

  if (filepath === undefined || !activeTabId) {
    return (
      <div className="p-2 bg-background pl-4 border-b">
        <Breadcrumb>
          <BreadcrumbList className="gap-0.5">
            <BreadcrumbItem className="text-sm">
              <BreadcrumbPage>&nbsp;</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    );
  }

  return (
    <div className="p-2 bg-background pl-4 border-b">
      <Breadcrumb>
        <BreadcrumbList className="gap-0.5">
          {filepath.map((item, index) => {
            const isLast = index === filepath.length - 1;

            return (
              <React.Fragment key={item._id}>
                {isLast ? (
                  <BreadcrumbPage className="flex items-center gap-1">
                    <FileIcon
                      fileName={item.name}
                      autoAssign
                      className="size-4"
                    />
                    {item.name}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href="#">{item.name}</BreadcrumbLink>
                )}
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
