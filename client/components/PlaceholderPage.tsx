interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-muted rounded-lg mx-auto flex items-center justify-center">
          <div className="w-8 h-8 bg-neon/20 rounded-sm"></div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          This page is coming soon. Continue prompting to fill in the content!
        </p>
      </div>
    </div>
  );
}
