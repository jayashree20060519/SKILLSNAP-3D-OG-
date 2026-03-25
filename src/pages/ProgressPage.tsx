import { Layout } from '@/components/layouts/Layout';
import { ProgressTracker } from '@/components/dashboard/ProgressTracker';

export default function ProgressPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <ProgressTracker />
      </div>
    </Layout>
  );
}
