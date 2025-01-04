import { useToast } from "@/hooks/use-toast";

export function useAuthToast() {
  const { toast } = useToast();

  const authToast = {
    success: (title: string, description: string) => {
      toast({
        title,
        description,
        variant: "success",
        duration: 5000,
      });
    },
    error: (title: string, description: string) => {
      toast({
        title,
        description,
        variant: "destructive",
        duration: 6000,
      });
    },
    warning: (title: string, description: string) => {
      toast({
        title,
        description,
        variant: "warning",
        duration: 5000,
      });
    },
  };

  return authToast;
} 