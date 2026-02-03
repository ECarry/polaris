import { useState } from "react";
import { Doc, Id } from "../../../../../convex/_generated/dataModel";
import {
  useCreateFile,
  useCreateFolder,
  useDeleteFile,
  useRenameFile,
  useFolderContents,
} from "../../hooks/use-files";

export const Tree = ({
  item,
  level = 0,
  projectId,
}: {
  level?: number;
  projectId: Id<"projects">;
  item: Doc<"files">;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [creating, setCreating] = useState<"file" | "folder" | null>(null);

  const createFile = useCreateFile();
  const createFolder = useCreateFolder();
  const renameFile = useRenameFile();
  const deleteFile = useDeleteFile();

  const folderContents = useFolderContents({
    projectId,
    parentId: item._id,
    enabled: item.type === "folder" && isOpen,
  });

  if (item.type === "file") {
    return (
      <div>
        <div>file</div>
      </div>
    );
  }

  return <div>Folder</div>;
};
