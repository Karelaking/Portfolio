"use client";

import {
  upload,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
} from "@imagekit/next";
import Image from "next/image";
import type { ReactElement } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui";

export interface ImageKitUploadProps {
  // eslint-disable-next-line no-unused-vars
  readonly onUploadSuccess: (...args: [string]) => void;
  // eslint-disable-next-line no-unused-vars
  readonly onUploadError: (...args: [string]) => void;
  readonly folder?: string;
  readonly existingImageUrl?: string;
  readonly existingImageAlt?: string;
}

export const ImageKitUpload = ({
  onUploadSuccess,
  onUploadError,
  folder = "portfolio",
  existingImageUrl,
  existingImageAlt,
}: ImageKitUploadProps): ReactElement => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const uploadInputId = useId();

  useEffect((): (() => void) => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return () => {};
    }

    const nextPreviewUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(nextPreviewUrl);

    return () => {
      URL.revokeObjectURL(nextPreviewUrl);
    };
  }, [selectedFile]);

  const getAuthenticator = async (): Promise<{
    signature: string;
    expire: number;
    token: string;
    publicKey: string;
  }> => {
    try {
      const response = await fetch("/api/upload-auth");
      if (!response.ok) {
        const body = (await response.json().catch((): null => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error ?? "Failed to get upload auth params");
      }
      return (await response.json()) as {
        signature: string;
        expire: number;
        token: string;
        publicKey: string;
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Authentication failed",
      );
    }
  };

  const handleUpload = async (): Promise<void> => {
    if (!selectedFile) {
      onUploadError("Please select a file to upload");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    abortControllerRef.current = new AbortController();

    try {
      const authParams = await getAuthenticator();

      const response = await upload({
        file: selectedFile,
        fileName: selectedFile.name,
        signature: authParams.signature,
        expire: authParams.expire,
        token: authParams.token,
        publicKey: authParams.publicKey,
        folder,
        tags: ["portfolio"],
        onProgress: (event) => {
          setUploadProgress(Math.round((event.loaded / event.total) * 100));
        },
        abortSignal: abortControllerRef.current.signal,
      });

      if (!response.url) {
        throw new Error("Upload succeeded but no URL returned");
      }
      onUploadSuccess(response.url);
      setUploadedImageUrl(response.url);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setUploadProgress(0);
    } catch (error) {
      let errorMessage = "Upload failed";

      if (error instanceof ImageKitAbortError) {
        errorMessage = "Upload cancelled";
      } else if (error instanceof ImageKitInvalidRequestError) {
        errorMessage = `Invalid request: ${error.message}`;
      } else if (error instanceof ImageKitUploadNetworkError) {
        errorMessage = `Network error: ${error.message}`;
      } else if (error instanceof ImageKitServerError) {
        errorMessage = `Server error: ${error.message}`;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      onUploadError(errorMessage);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleCancel = (): void => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsUploading(false);
    setUploadProgress(0);
  };

  const resolvedPreviewUrl =
    previewUrl ?? uploadedImageUrl ?? existingImageUrl ?? null;
  const resolvedPreviewAlt =
    selectedFile?.name ?? existingImageAlt ?? "Image preview";

  return (
    <div className="grid gap-3">
      <label
        className="inline-flex items-center gap-2 text-xs font-normal normal-case"
        htmlFor={uploadInputId}
      >
        <span className="border-border/70 text-foreground rounded-full border px-3 py-1 text-[11px] tracking-[0.2em] uppercase">
          Choose file
        </span>
        <input
          accept="image/*"
          className="sr-only"
          id={uploadInputId}
          ref={fileInputRef}
          onChange={(event): void => {
            const file = event.currentTarget.files?.[0] ?? null;
            setSelectedFile(file);
          }}
          type="file"
        />
      </label>

      <div className="flex flex-wrap items-center gap-3 text-xs">
        <span className="text-muted-foreground font-normal">
          {selectedFile ? selectedFile.name : "No file selected"}
        </span>

        <Button
          className="border-border rounded-full border px-3 py-1 text-[11px] font-semibold tracking-[0.2em] uppercase"
          type="button"
          variant="outline"
          onClick={handleUpload}
          disabled={isUploading || !selectedFile}
        >
          {isUploading ? `Uploading ${uploadProgress}%` : "Upload"}
        </Button>

        {isUploading && (
          <Button
            className="border-border rounded-full border px-3 py-1 text-[11px] font-semibold tracking-[0.2em] uppercase"
            type="button"
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        )}
      </div>

      {resolvedPreviewUrl ? (
        <div className="border-border/70 bg-background relative h-44 w-full overflow-hidden rounded-2xl border">
          <Image
            alt={resolvedPreviewAlt}
            className="h-full w-full object-cover"
            fill
            src={resolvedPreviewUrl}
            unoptimized
            sizes="(min-width: 768px) 480px, 100vw"
          />
        </div>
      ) : null}

      {isUploading && (
        <div className="bg-border h-1 w-full overflow-hidden rounded-full">
          <div
            className="bg-foreground h-full transition-all"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}
    </div>
  );
};
