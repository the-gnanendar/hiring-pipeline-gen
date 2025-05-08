
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { candidatesApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { BulkImportDialog } from "@/components/shared/BulkImportDialog";
import { sampleCandidatesCSV } from "@/utils/csvUtils";
import { FileTextIcon, DownloadIcon, UploadIcon } from "lucide-react";
import { RBACWrapper } from "@/components/layout/RBACWrapper";

interface BulkImportCandidatesProps {
  onSuccess: () => void;
}

export const BulkImportCandidates: React.FC<BulkImportCandidatesProps> = ({ onSuccess }) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleImportCandidates = async (data: any[]) => {
    try {
      await candidatesApi.bulkImport(data);
      onSuccess();
    } catch (error) {
      console.error("Error importing candidates:", error);
      throw new Error("Failed to import candidates. Please check your CSV format.");
    }
  };

  return (
    <>
      <RBACWrapper requiredPermission={{ action: 'create', subject: 'candidates' }}>
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
        onImport={handleImportCandidates}
        sampleCsvData={sampleCandidatesCSV()}
        sampleFileName="ats_candidate_template.csv"
        entityName="Candidates"
      />
    </>
  );
};
