import { Layout } from '@/components/layouts/Layout';
import { AchievementSystem } from '@/components/dashboard/AchievementSystem';

export default function AchievementsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <AchievementSystem />
      </div>
    </Layout>
  );
}
