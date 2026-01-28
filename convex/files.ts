import { query } from "./_generated/server";
import { verifyAuth } from "./auth";
import { v } from "convex/values";

export const getFiles = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    if (project.ownerId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    return await ctx.db
      .query("files")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
  },
});

export const getFile = query({
  args: {
    id: v.id("files"),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const file = await ctx.db.get(args.id);
    if (!file) {
      throw new Error("File not found");
    }

    const project = await ctx.db.get(file.projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    if (project.ownerId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    return file;
  },
});

export const getFolderContents = query({
  args: {
    projectId: v.id("projects"),
    parentId: v.optional(v.id("files")),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    if (project.ownerId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    const files = await ctx.db
      .query("files")
      .withIndex("by_project_parent", (q) =>
        q.eq("projectId", args.projectId).eq("parentId", args.parentId),
      )
      .collect();

    // Sort: folder first, then files, alphabetically within each group
    return files.sort((a, b) => {
      // Folder before file
      if (a.type === "folder" && b.type !== "file") return -1;
      if (a.type === "file" && b.type === "folder") return 1;
      // Alphabetical within same type
      return a.name.localeCompare(b.name);
    });
  },
});
