import { useCallback } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useEditorStore } from "../store/use-editor-store";

export const useEditor = (projectId: Id<"projects">) => {
  const store = useEditorStore();
  const tabState = useEditorStore((state) => state.getTabState(projectId));

  const openFile = useCallback(
    (
      file: Id<"files">,
      options: {
        pinned: boolean;
      },
    ) => {
      store.openFile(projectId, file, options);
    },
    [projectId, store],
  );

  const closeTab = useCallback(
    (fileId: Id<"files">) => {
      store.closeTab(projectId, fileId);
    },
    [projectId, store],
  );

  const closeAllTabs = useCallback(() => {
    store.closeAllTabs(projectId);
  }, [projectId, store]);

  const setActiveTab = useCallback(
    (filedId: Id<"files">) => {
      store.setActiveTab(projectId, filedId);
    },
    [projectId, store],
  );

  return {
    openTabs: tabState.openTabs,
    activeTabId: tabState.activeTabId,
    previewTabId: tabState.previewTabId,
    openFile,
    closeTab,
    closeAllTabs,
    setActiveTab,
  };
};
