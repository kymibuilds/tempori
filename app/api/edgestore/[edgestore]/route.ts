import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";

const es = initEdgeStore.create();

/**
 * This is the main router for the EdgeStore buckets.
 * Note: `beforeDelete` only works for imageBucket. fileBucket deletes
 * must be handled via a backend route or mutation.
 */
const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket(), // fileBucket cannot use beforeDelete
  publicImages: es
    .imageBucket({
      maxSize: 1024 * 1024 * 5, // 5MB
      accept: ["image/jpeg", "image/png"],
    })
    .beforeDelete(() => {
      // Allow deletion from frontend for images
      return true;
    }),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export { handler as GET, handler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;
