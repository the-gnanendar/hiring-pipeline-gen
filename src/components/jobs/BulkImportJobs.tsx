
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { jobsApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { BulkImportDialog } from "@/components/shared/BulkImportDialog";
import { sampleJobsCSV } from "@/utils/csvUtils";
import { FileTextIcon, DownloadIcon, UploadIcon } from "lucide-react";
import { RBACWrapper } from "@/components/layout/RBACWrapper";

interface BulkImportJobsProps {
  onSuccess: () => void;
}

export const BulkImportJobs: React.FC<BulkImportJobsProps> = ({ onSuccess }) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleImportJobs = async (data: any[]) => {
    try {
      await jobsApi.bulkImport(data);
      onSuccess();
    } catch (error) {
      console.error("Error importing jobs:", error);
      throw new Error("Failed to import jobs. Please check your CSV format.");
    }
  };

  return (
    <>
      <RBACWrapper requiredPermission={{ action: 'create', subject: 'jobs' }}>
        <Button 
          variant="outline" 
          onClick={() => setOpen(true)}
          className="gap-1"
        >
          <UploadIcon className="h-4 w-4" /> Bulk Import
        </Button>
      </RBACWrapper>

      <BulkImportDialog
        open={open}
        onOpenChange={setOpen}
        onImport={handleImportJobs}
        sampleCsvData={sampleJobsCSV()}
        sampleFileName="ats_job_template.csv"
        entityName="Jobs"
      />
    </>
  );
};
