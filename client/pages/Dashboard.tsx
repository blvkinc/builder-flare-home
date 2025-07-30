import { Layout } from "@/components/Layout";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export default function Dashboard() {
  return (
    <Layout>
      <PlaceholderPage 
        title="Dashboard"
        description="Manage your art collection, sales, and profile."
      />
    </Layout>
  );
}
