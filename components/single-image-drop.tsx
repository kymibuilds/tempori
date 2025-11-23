"use client";

import { SingleImageDropzone } from "@/components/upload/single-image";
import {
  UploaderProvider,
  type UploadFn,
} from "@/components/upload/uploader-provider";
import { useEdgeStore } from "@/lib/edgestore";
import * as React from "react";

export function SingleImageDropzoneUsage() {
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = React.useState(0);
  const [uploadedUrl, setUploadedUrl] = React.useState<string>();

  // UploadFn expects: { file, onProgressChange, signal }
  const uploadFile: UploadFn = React.useCallback(
    async ({ file, onProgressChange, signal }) => {
      const res = await edgestore.publicFiles.upload({
        file,
        signal,
        onProgressChange: (p) => {
          setProgress(p);
          onProgressChange?.(p);
        },
      });

      setUploadedUrl(res.url);
      return res;
    },
    [edgestore]
  );

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <UploaderProvider uploadFn={uploadFile}>
        <SingleImageDropzone
          width={200}
          height={200}
          onChange={(e) => {
            // native input event
            // you do NOT handle file here
            // dropzone takes care of everything internally
          }}
        />
      </UploaderProvider>

      {progress > 0 && progress < 100 && (
        <div className="w-full max-w-md">
          <div className="text-sm text-gray-600 mb-2">Uploading: {progress}%</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {uploadedUrl && (
        <div className="text-sm text-green-600">
          Upload successful! URL: {uploadedUrl}
        </div>
      )}
    </div>
  );
}
