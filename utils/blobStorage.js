const config = require("../config");

const ONE_MEGABYTE = 1024 * 1024;
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };

const {
  BlobServiceClient,
  StorageSharedKeyCredential,
  newPipeline,
} = require("@azure/storage-blob");

const sharedKeyCredential = new StorageSharedKeyCredential(
  config.azure.storageAccountName,
  config.azure.storageAccountAccessKey
);
const pipeline = newPipeline(sharedKeyCredential);
const blobServiceClient = new BlobServiceClient(
  `https://${config.azure.storageAccountName}.blob.core.windows.net`,
  pipeline
);

async function uploadBlob(container, blobName, stream) {
  const containerClient = blobServiceClient.getContainerClient(container);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    await blockBlobClient.uploadStream(
      stream,
      uploadOptions.bufferSize,
      uploadOptions.maxBuffers,
      { blobHTTPHeaders: { blobContentType: "image/jpeg" } }
    );
    console.log("File uploaded to Azure Blob Storage.");
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  uploadBlob
};
