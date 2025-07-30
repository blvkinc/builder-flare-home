import { Layout } from "@/components/Layout";
import { useUser } from "@/contexts/UserContext";
import { BuyerDashboard } from "@/components/BuyerDashboard";
import { ArtistDashboard } from "@/components/ArtistDashboard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, isAuthenticated } = useUser();

  if (!isAuthenticated || !user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-foreground">Access Required</h1>
              <p className="text-muted-foreground">
                Please sign in to access your dashboard
              </p>
            </div>
            <Button asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {user.role === "buyer" ? <BuyerDashboard /> : <ArtistDashboard />}
    </Layout>
  );
}
