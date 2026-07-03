import { createFileRoute } from '@tanstack/react-router';
import ViewOnlyDocumentViewer from '@/Frontend/components/ViewOnlyDocumentViewer';

export const Route = createFileRoute('/documents/uppcb')({
  component: UPPCBConsentPage,
});

function UPPCBConsentPage() {
  return (
    <ViewOnlyDocumentViewer
      pdfUrl="/certificates/uppcb-consent-to-operate.pdf"
      documentTitle="UPPCB Consent to Operate"
      documentDescription="Consolidated Consent & Authorization for E-waste Operations - This is an official regulatory document."
    />
  );
}
