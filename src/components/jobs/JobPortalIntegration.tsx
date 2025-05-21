
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface JobPortalIntegrationProps {
  jobId: string;
  onSuccess?: () => void;
}

const JOB_PORTALS = [
  { id: 'linkedin', name: 'LinkedIn' },
  { id: 'indeed', name: 'Indeed' },
  { id: 'glassdoor', name: 'Glassdoor' },
  { id: 'monster', name: 'Monster' },
];

export function JobPortalIntegration({ jobId, onSuccess }: JobPortalIntegrationProps) {
  const { toast } = useToast();
  const [selectedPortals, setSelectedPortals] = useState<string[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePortalToggle = (portalId: string) => {
    if (selectedPortals.includes(portalId)) {
      setSelectedPortals(selectedPortals.filter(id => id !== portalId));
    } else {
      setSelectedPortals([...selectedPortals, portalId]);
    }
  };

  const handlePublish = async () => {
    if (selectedPortals.length === 0) {
      toast({
        title: "No portals selected",
        description: "Please select at least one job portal to publish to.",
        variant: "destructive",
      });
      return;
    }

    setIsPublishing(true);
    try {
      // In a real app, we would call an API here
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Job published",
        description: `Successfully published job to ${selectedPortals.length} portal${selectedPortals.length > 1 ? 's' : ''}.`,
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Publishing failed",
        description: "An error occurred while publishing the job.",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-3">Select job portals to publish to:</h3>
        <div className="space-y-2">
          {JOB_PORTALS.map(portal => (
            <div key={portal.id} className="flex items-center space-x-2">
              <Checkbox 
                id={`portal-${portal.id}`} 
                checked={selectedPortals.includes(portal.id)} 
                onCheckedChange={() => handlePortalToggle(portal.id)}
              />
              <Label htmlFor={`portal-${portal.id}`}>{portal.name}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <Button 
        className="w-full bg-ats-600 hover:bg-ats-700" 
        onClick={handlePublish}
        disabled={selectedPortals.length === 0 || isPublishing}
      >
        {isPublishing ? "Publishing..." : "Publish Job"}
      </Button>
    </div>
  );
}
