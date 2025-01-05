import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSettingsLoading() {
  return (
    <div className="container max-w-2xl py-6 animate-in fade-in-50">
      <div className="space-y-6">
        <div>
          <Skeleton className="h-6 w-[180px]" />
          <Skeleton className="h-4 w-[300px] mt-2" />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-[120px]" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
            <Skeleton className="h-10 w-[120px]" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 