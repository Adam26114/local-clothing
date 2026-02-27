'use client';

import { useMemo, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { categories, products } from '@/lib/mock-data';
import { Product, SizeKey } from '@/lib/types';

type ProductEditorProps = {
  mode: 'create' | 'edit';
  productId?: string;
};

function fallbackVariant() {
  return {
    id: `variant-${Math.random().toString(36).slice(2, 8)}`,
    colorName: 'Black',
    colorHex: '#000000',
    images: [],
    selectedSizes: ['M'] as SizeKey[],
    stock: { M: 1 } as Partial<Record<SizeKey, number>>,
  };
}

export function ProductEditor({ mode, productId }: ProductEditorProps) {
  const sourceProduct = useMemo(
    () => products.find((item) => item._id === productId) ?? products[0],
    [productId]
  );

  const [form, setForm] = useState<Product>(() => {
    if (mode === 'edit') {
      return sourceProduct;
    }

    return {
      _id: 'draft',
      sku: '',
      name: '',
      slug: '',
      description: '',
      categoryId: categories[0]?._id ?? '',
      basePrice: 0,
      salePrice: 0,
      isFeatured: false,
      isPublished: true,
      colorVariants: [fallbackVariant()],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  });

  return (
    <div className="space-y-6 rounded border bg-white p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Name</Label>
          <Input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label>SKU</Label>
          <Input value={form.sku} onChange={(event) => setForm((prev) => ({ ...prev, sku: event.target.value }))} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Category</Label>
          <select
            className="w-full rounded border px-3 py-2 text-sm"
            value={form.categoryId}
            onChange={(event) => setForm((prev) => ({ ...prev, categoryId: event.target.value }))}
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Base Price (MMK)</Label>
            <Input
              type="number"
              value={form.basePrice}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, basePrice: Number(event.target.value) || 0 }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Sale Price (MMK)</Label>
            <Input
              type="number"
              value={form.salePrice}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, salePrice: Number(event.target.value) || 0 }))
              }
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          rows={4}
          value={form.description}
          onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <Switch
            checked={form.isPublished}
            onCheckedChange={(checked) => setForm((prev) => ({ ...prev, isPublished: checked }))}
          />
          Published
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Switch
            checked={form.isFeatured}
            onCheckedChange={(checked) => setForm((prev) => ({ ...prev, isFeatured: checked }))}
          />
          Featured
        </label>
      </div>

      <section className="space-y-4 rounded border p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Color Variants</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                colorVariants: [...prev.colorVariants, fallbackVariant()],
              }))
            }
          >
            <Plus className="size-4" /> Add Variant
          </Button>
        </div>

        {form.colorVariants.map((variant, index) => (
          <div key={variant.id} className="space-y-4 rounded border p-3">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Color Name</Label>
                <Input
                  value={variant.colorName}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      colorVariants: prev.colorVariants.map((entry, entryIndex) =>
                        entryIndex === index ? { ...entry, colorName: event.target.value } : entry
                      ),
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Color Hex</Label>
                <Input
                  value={variant.colorHex}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      colorVariants: prev.colorVariants.map((entry, entryIndex) =>
                        entryIndex === index ? { ...entry, colorHex: event.target.value } : entry
                      ),
                    }))
                  }
                />
              </div>
              <div className="flex items-end justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      colorVariants: prev.colorVariants.filter((_, entryIndex) => entryIndex !== index),
                    }))
                  }
                  disabled={form.colorVariants.length <= 1}
                >
                  <Trash2 className="size-4" /> Remove
                </Button>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {(['S', 'M', 'L', 'XL'] as SizeKey[]).map((size) => (
                <div key={`${variant.id}-${size}`} className="space-y-2">
                  <Label>{size} stock</Label>
                  <Input
                    type="number"
                    min={0}
                    value={variant.stock[size] ?? 0}
                    onChange={(event) => {
                      const value = Number(event.target.value) || 0;
                      setForm((prev) => ({
                        ...prev,
                        colorVariants: prev.colorVariants.map((entry, entryIndex) => {
                          if (entryIndex !== index) return entry;
                          return {
                            ...entry,
                            selectedSizes: Array.from(new Set([...entry.selectedSizes, size])),
                            stock: {
                              ...entry.stock,
                              [size]: value,
                            },
                          };
                        }),
                      }));
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Save Draft</Button>
        <Button className="bg-black text-white hover:bg-zinc-800">
          {mode === 'create' ? 'Create Product' : 'Update Product'}
        </Button>
      </div>
    </div>
  );
}
