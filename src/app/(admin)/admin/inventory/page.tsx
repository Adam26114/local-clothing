import { DataSourceNotice } from '@/components/shared/data-source-notice';
import { InventoryTable } from '@/components/admin/inventory-table';
import { getServerDataRepositories } from '@/lib/data/repositories';

export default async function AdminInventoryPage() {
  const { repositories, selection } = getServerDataRepositories();
  const rows = await repositories.inventory.listFlattened();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Inventory</h1>
      <DataSourceNotice selection={selection} />
      <InventoryTable initialRows={rows} />
    </div>
  );
}
