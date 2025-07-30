import { ReactNode } from "react";
import { NavigationAnimated } from "./NavigationAnimated";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationAnimated />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
