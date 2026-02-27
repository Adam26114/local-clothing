import type { Category, InventoryAuditLog, Product, SizeKey, StoreSettings } from '@/lib/types';

export type ProductUpsertInput = Omit<Product, '_id' | 'createdAt' | 'updatedAt'>;

export type InventoryRow = {
  productId: string;
  productName: string;
  variantId: string;
  colorName: string;
  size: SizeKey;
  stock: number;
  isPublished: boolean;
};

export type UpdateStockInput = {
  productId: string;
  variantId: string;
  size: SizeKey;
  newValue: number;
  changedBy: string;
};

export interface ProductRepository {
  list(options?: { publishedOnly?: boolean }): Promise<Product[]>;
  listFeatured(): Promise<Product[]>;
  listByCategorySlug(categorySlug: string): Promise<Product[]>;
  listBySubcategorySlugs(categorySlug: string, subcategorySlug: string): Promise<Product[]>;
  listRelatedBySlug(slug: string, limit?: number): Promise<Product[]>;
  getById(id: string): Promise<Product | undefined>;
  getBySlug(slug: string, options?: { publishedOnly?: boolean }): Promise<Product | undefined>;
  create(input: ProductUpsertInput): Promise<Product>;
  update(id: string, input: ProductUpsertInput): Promise<Product>;
  softDelete(id: string): Promise<void>;
  duplicate(id: string): Promise<Product>;
  toggleBulkStatus(ids: string[], isPublished: boolean): Promise<number>;
}

export interface CategoryRepository {
  list(options?: { activeOnly?: boolean }): Promise<Category[]>;
}

export interface SettingsRepository {
  get(): Promise<StoreSettings>;
}

export interface InventoryRepository {
  listFlattened(): Promise<InventoryRow[]>;
  updateStock(input: UpdateStockInput): Promise<{ row: InventoryRow; log: InventoryAuditLog }>;
  listAuditLogs(input: {
    productId?: string;
    variantId?: string;
    size?: SizeKey;
    limit?: number;
  }): Promise<InventoryAuditLog[]>;
}

export type DataRepositories = {
  products: ProductRepository;
  categories: CategoryRepository;
  settings: SettingsRepository;
  inventory: InventoryRepository;
};
