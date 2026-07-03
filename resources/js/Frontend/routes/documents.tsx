import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { FileText, Lock, Eye } from 'lucide-react';

export const Route = createFileRoute('/documents')({
  component: DocumentsLayout,
});

function DocumentsLayout() {
  const isRootDocumentsPath = window.location.pathname === '/documents';
  const documents = [
    {
      id: 'uppcb',
      title: 'UPPCB Consent to Operate',
      description: 'Consolidated Consent & Authorization for E-waste Operations',
      category: 'Regulatory',
      icon: FileText,
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      description: 'Our commitment to your data privacy and security',
      category: 'Legal',
      icon: FileText,
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      description: 'Terms and conditions for using our services',
      category: 'Legal',
      icon: FileText,
    },
  ];

  // Show child routes (documents viewer)
  if (!isRootDocumentsPath) {
    return <Outlet />;
  }

  // Show documents listing on /documents root path
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <FileText className="text-green-600" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">Documents</h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl">
            Official documents and policies. All documents are available in
            view-only mode for your reference.
          </p>
        </div>

        {/* Security Badge */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-start gap-3">
          <Lock size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-blue-900">Secure Document Access</p>
            <p className="text-sm text-blue-800 mt-1">
              All documents are protected with view-only access. Download, print,
              and copy functionality is disabled to protect document integrity.
            </p>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {documents.map(doc => (
            <Link
              key={doc.id}
              to={`/documents/${doc.id}`}
              className="group bg-white rounded-lg shadow-md border border-slate-200 p-6 hover:shadow-lg hover:border-green-300 transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-green-50 p-3 rounded-lg group-hover:bg-green-100 transition-colors">
                  <FileText className="text-green-600" size={24} />
                </div>
                <span className="inline-block bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {doc.category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">
                {doc.title}
              </h3>
              <p className="text-slate-600 text-sm mb-4">{doc.description}</p>

              <div className="flex items-center gap-2 text-green-600 font-semibold text-sm group-hover:gap-3 transition-all">
                <Eye size={16} />
                View Document
              </div>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            About View-Only Documents
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Lock size={18} className="text-green-600" />
                Security Features
              </h3>
              <ul className="text-slate-600 text-sm space-y-2">
                <li>✓ No download functionality</li>
                <li>✓ No print capability</li>
                <li>✓ No screenshot capture</li>
                <li>✓ No text selection or copying</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Eye size={18} className="text-green-600" />
                Viewing Options
              </h3>
              <ul className="text-slate-600 text-sm space-y-2">
                <li>✓ Smooth scrolling</li>
                <li>✓ Zoom in/out controls</li>
                <li>✓ Reset zoom to default</li>
                <li>✓ Mobile responsive</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-slate-500 text-sm">
          <p>All documents are confidential and protected. Unauthorized copying
            or sharing is prohibited.</p>
        </div>
      </div>
    </div>
  );
}
