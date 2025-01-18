"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface PrivacyFormData {
  anonymizeIPs: boolean;
  cookieConsent: boolean;
  dataRetention: number;
  collectPII: boolean;
}

export function PrivacySettings() {
  const [settings, setSettings] = useState<PrivacyFormData>({
    anonymizeIPs: true,
    cookieConsent: true,
    dataRetention: 90,
    collectPII: false,
  });

  const { toast } = useToast();

  const handleSave = async () => {
    try {
      await fetch('/api/settings/privacy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      toast({
        title: "Settings saved",
        description: "Your privacy settings have been updated.",
      });
    } catch (err) {
      console.error('Failed to save privacy settings:', err);
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to save privacy settings.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
        <CardDescription>
          Configure your analytics privacy and GDPR compliance settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">Anonymize IP Addresses</label>
            <p className="text-sm text-muted-foreground">
              Automatically anonymize visitor IP addresses
            </p>
          </div>
          <Switch
            checked={settings.anonymizeIPs}
            onCheckedChange={(checked) => 
              setSettings(prev => ({ ...prev, anonymizeIPs: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">Cookie Consent</label>
            <p className="text-sm text-muted-foreground">
              Require cookie consent before tracking
            </p>
          </div>
          <Switch
            checked={settings.cookieConsent}
            onCheckedChange={(checked) => 
              setSettings(prev => ({ ...prev, cookieConsent: checked }))
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Data Retention Period</label>
          <select
            className="w-full rounded-md border border-input bg-background px-3 py-2"
            value={settings.dataRetention}
            onChange={(e) => 
              setSettings(prev => ({ 
                ...prev, 
                dataRetention: parseInt(e.target.value) 
              }))
            }
          >
            <option value={30}>30 days</option>
            <option value={90}>90 days</option>
            <option value={180}>180 days</option>
            <option value={365}>1 year</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">Collect PII</label>
            <p className="text-sm text-muted-foreground">
              Collect personally identifiable information
            </p>
          </div>
          <Switch
            checked={settings.collectPII}
            onCheckedChange={(checked) => 
              setSettings(prev => ({ ...prev, collectPII: checked }))
            }
          />
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Privacy Settings
        </Button>
      </CardContent>
    </Card>
  );
} 