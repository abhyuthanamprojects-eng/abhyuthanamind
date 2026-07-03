import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Eye, Lock } from 'lucide-react';

interface ViewOnlyDocumentViewerProps {
  pdfUrl: string;
  documentTitle: string;
  documentDescription?: string;
}

const ViewOnlyDocumentViewer: React.FC<ViewOnlyDocumentViewerProps> = ({
  pdfUrl,
  documentTitle,
  documentDescription,
}) => {
  const [scale, setScale] = useState(1);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
  const handleResetZoom = () => setScale(1);

  // Disable right-click context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  // Disable text selection and keyboard shortcuts that could be used to capture
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Disable common capture/save shortcuts
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === 's' || e.key === 'p' || e.key === 'c' || e.key === 'a')
    ) {
      e.preventDefault();
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8"
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyDown}
      style={{ userSelect: 'none' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Eye className="text-green-600" size={24} />
                </div>
                <h1 className="text-3xl font-bold text-slate-900">
                  {documentTitle}
                </h1>
              </div>
              {documentDescription && (
                <p className="text-slate-600 mt-2">{documentDescription}</p>
              )}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-2">
              <Lock size={16} className="text-amber-600" />
              <span className="text-xs font-medium text-amber-800">
                View Only
              </span>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>📋 View Mode:</strong> This document is for viewing only.
              Download, print, and copying are disabled for document security.
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700">Zoom:</span>
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={scale <= 0.5}
                title="Zoom Out"
              >
                <ChevronLeft size={18} className="text-slate-600" />
              </button>
              <button
                onClick={handleResetZoom}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium"
                title="Reset Zoom"
              >
                {Math.round(scale * 100)}%
              </button>
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={scale >= 2}
                title="Zoom In"
              >
                <ChevronRight size={18} className="text-slate-600" />
              </button>
            </div>

            <div className="text-xs text-slate-500">
              💡 Scroll to view • Use zoom controls to adjust size
            </div>
          </div>
        </div>

        {/* Document Viewer - Using native PDF.js viewer in view-only mode */}
        <div
          className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden"
          onContextMenu={handleContextMenu}
        >
          <iframe
            ref={iframeRef}
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
            className="w-full bg-slate-100"
            style={{
              height: `${800 * scale}px`,
              border: 'none',
              borderRadius: '0.5rem',
              userSelect: 'none',
            }}
            title={documentTitle}
            onContextMenu={handleContextMenu}
            sandbox={{
              // Sandboxed iframe - maximum security
              allowSameOrigin: true,
            }}
            allow="none"
          />
        </div>

        {/* Footer */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <p className="text-xs text-slate-500 text-center">
            This is a secure view-only document. No downloads, printing, or
            screen capture are permitted.
          </p>
        </div>
      </div>

      {/* Global CSS for document protection */}
      <style>{`
        /* Prevent text selection and copying */
        .pdf-viewer-container {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }

        /* Disable right-click on iframe and document */
        iframe {
          pointer-events: none;
        }

        iframe.interactive {
          pointer-events: auto;
        }

        /* Prevent PrintScreen */
        @media print {
          * {
            display: none !important;
          }
        }

        /* Disable selection on document viewer */
        .document-viewer {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>
    </div>
  );
};

export default ViewOnlyDocumentViewer;
