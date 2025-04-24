/** TODO: moduleへリファクタ */
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

// Supabaseクライアントを作成
export function createStorageClient() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );
}

export interface UploadFileToStorageRequest {
  bucket: string;
  file: File;
  uuid: string;
}

export interface UploadFileToStorageResponse {
  data: { id: string; path: string; fullPath: string } | null;
}

export const uploadFileToStorage = async ({
  bucket,
  file,
  uuid,
}: UploadFileToStorageRequest): Promise<UploadFileToStorageResponse> => {
  const savePath = generateFilePath(uuid, file.name);
  const supabaseStorageClient = createStorageClient();

  const { data: uploadData, error: uploadError } =
    await supabaseStorageClient.storage.from(bucket).upload(savePath, file);
  //console.log("uploadData", uploadData);

  if (uploadError) {
    console.error("Error uploading file:", uploadError);
    return {
      data: null,
    };
  }

  return {
    data: uploadData,
  };
};

export interface DeleteFileFromStorageRequest {
  bucket: string;
  filePath: string;
}

export const deleteFileFromStorage = async ({
  bucket,
  filePath,
}: DeleteFileFromStorageRequest): Promise<{ data: null }> => {
  const supabaseStorageClient = createStorageClient();

  const { error: uploadError } = await supabaseStorageClient.storage
    .from(bucket)
    .remove([filePath]);
  if (uploadError) {
    console.error("Error uploading file:", uploadError);
    return {
      data: null,
    };
  }

  return {
    data: null,
  };
};

export interface GetUploadedFileUrlRequest {
  bucket: string;
  filePath: string;
}

export interface GetUploadedFileUrlResponse {
  publicUrl: string;
}

export const getUploadedFileUrl = async ({
  bucket,
  filePath,
}: GetUploadedFileUrlRequest): Promise<GetUploadedFileUrlResponse> => {
  const supabaseStorageClient = createStorageClient();
  const { data: publicUrlData } = await supabaseStorageClient.storage
    .from(bucket)
    .getPublicUrl(filePath);

  if (!publicUrlData) {
    console.error("Error getting public URL:");
  }

  return {
    publicUrl: publicUrlData!.publicUrl,
  };
};

function generateFilePath(userUuid: string, originalFileName: string) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const fileUuid = uuidv4();
  const fileExtension = originalFileName.split(".").pop();

  return `/${year}/${month}/${day}/${userUuid}/${fileUuid}.${fileExtension}`;
}
