import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto max-w-md rounded border p-6">
      <h1 className="mb-1 text-2xl font-semibold">Forgot Password</h1>
      <p className="mb-6 text-sm text-zinc-600">
        Password reset email flow scaffolded for Better Auth integration.
      </p>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required />
        </div>
        <Button type="submit" className="w-full bg-black text-white hover:bg-zinc-800">
          Send Reset Link
        </Button>
      </form>
    </div>
  );
}
