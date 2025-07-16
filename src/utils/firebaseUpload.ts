import { bucket } from "../config/firebase";

export async function uploadFileToFirebase(file : Express.Multer.File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("Nenhum arquivo recebido"));

    const filename = `${Date.now()}-${file.originalname}`;
    const blob = bucket.file(filename);

    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on("error", (err) => reject(err));

    blobStream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    });

    blobStream.end(file.buffer);
  });
}
