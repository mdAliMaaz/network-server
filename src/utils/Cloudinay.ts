import { v2 } from "cloudinary";

interface SingleResult {
  url: string;
  public_id: string;
}
export class Cloudinary {
  public static async uploadSingle(
    imagePath: string
  ): Promise<SingleResult | any> {
    try {
      const result = await v2.uploader.upload(imagePath, {
        folder: "network/profile",
        transformation: [
          { width: 200, height: 200, crop: "thumb", gravity: "face" },
        ],
      });

      if (result) {
        return { url: result.url, public_id: result.public_id };
      }
    } catch (error: any) {
      console.log("Cloudinary Error:", error.message);
    }
  }
}
