import { Layout } from '@/components/layouts/Layout';
import { SmartSuggestions } from '@/components/dashboard/SmartSuggestions';

export default function SuggestionsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <SmartSuggestions />
      </div>
    </Layout>
  );
}
