import { createClient } from '@supabase/supabase-js';

// Assume service role for internal uploading if needed, or anon for client-side uploads
// We provide a utility assuming we use the service role on the backend
const getStorageClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
};

export class StorageService {
  /**
   * Uploads a file to the product_assets bucket.
   */
  static async uploadProductAsset(userId: string, productId: string, fileName: string, fileBuffer: Buffer, contentType: string) {
    const db = getStorageClient();
    const filePath = `${userId}/${productId}/${fileName}`;

    const { data, error } = await db.storage
      .from('product_assets')
      .upload(filePath, fileBuffer, {
        contentType,
        upsert: true,
      });

    if (error) {
      throw new Error(`Failed to upload asset: ${error.message}`);
    }

    return data;
  }

  /**
   * Gets the public URL for a product asset.
   */
  static getProductAssetUrl(userId: string, productId: string, fileName: string) {
    const db = getStorageClient();
    const filePath = `${userId}/${productId}/${fileName}`;
    const { data } = db.storage.from('product_assets').getPublicUrl(filePath);
    return data.publicUrl;
  }
}
