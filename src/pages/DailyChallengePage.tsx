import { Layout } from '@/components/layouts/Layout';
import { DailyChallenge } from '@/components/dashboard/DailyChallenge';

export default function DailyChallengePage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <DailyChallenge />
      </div>
    </Layout>
  );
}
