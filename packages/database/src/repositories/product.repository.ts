import { TypedSupabaseClient } from '../client';
import { Database } from '../types';

type ProductInsert = Database['public']['Tables']['products']['Insert'];
type ProductRow = Database['public']['Tables']['products']['Row'];

export class ProductRepository {
  constructor(private client: TypedSupabaseClient) {}

  /**
   * Fetch all products owned by the authenticated user
   */
  async getMyProducts(): Promise<ProductRow[]> {
    const { data, error } = await this.client
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch products: ${error.message}`);
    return data || [];
  }

  /**
   * Fetch a single product by ID (relies on RLS to verify ownership)
   */
  async getProductById(id: string): Promise<ProductRow | null> {
    const { data, error } = await this.client
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch product: ${error.message}`);
    }
    return data;
  }

  /**
   * Create a new immutable product
   */
  async createProduct(product: ProductInsert): Promise<ProductRow> {
    const { data, error } = await (this.client
      .from('products') as any)
      .insert(product)
      .select()
      .single();

    if (error) throw new Error(`Failed to create product: ${error.message}`);
    return data;
  }

  /**
   * Backend-only: Update a product's AI output fields. 
   * This must be called using a service_role client because RLS prevents authenticated users from updating products directly.
   */
  async updateProductAIOutputs(
    id: string,
    updates: Partial<Pick<ProductRow, 'status' | 'ai_product_analysis' | 'ai_market_research' | 'ai_competitor_analysis' | 'ai_customer_personas' | 'ai_positioning' | 'ai_value_proposition' | 'ai_marketing_strategy' | 'ai_seo_strategy'>>
  ): Promise<ProductRow> {
    const { data, error } = await (this.client
      .from('products') as any)
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update product AI outputs: ${error.message}`);
    return data;
  }
}
