import { DocsNav } from "@/components/docs/docs-nav";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex-1">
        <div className="grid grid-cols-[220px_1fr] gap-6 py-8">
          <aside className="hidden md:block">
            <DocsNav />
          </aside>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
} 