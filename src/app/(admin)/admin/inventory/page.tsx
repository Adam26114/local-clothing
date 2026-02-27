import { InventoryTable } from '@/components/admin/inventory-table';

export default function AdminInventoryPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Inventory</h1>
      <InventoryTable />
    </div>
  );
}
