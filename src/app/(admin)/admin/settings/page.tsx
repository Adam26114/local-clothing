import { StoreSettingsForm } from '@/components/admin/store-settings-form';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Storefront Controls</h1>
      <StoreSettingsForm />
    </div>
  );
}
