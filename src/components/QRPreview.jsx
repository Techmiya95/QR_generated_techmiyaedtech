import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import confetti from 'canvas-confetti';
import {
  Download,
  Copy,
  Check,
  FileCode,
  Sparkles,
  ShieldCheck,
  FileImage,
} from 'lucide-react';
import { cleanFilename } from '../utils/qrPayload';

export default function QRPreview({
  payload,
  qrName,
  design,
  logo,
  options,
  onSaveToHistory,
}) {
  const qrRef = useRef(null);
  const qrCodeInstance = useRef(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const finalName = cleanFilename(qrName || 'techmiya_qrcode');

  // Build styling configuration object
  const getStylingConfig = (overrideSize = null) => {
    const size = overrideSize || 300;

    const dotsOptions = {
      type: design.dotsType,
      color: design.fgColor,
    };

    if (design.useGradient) {
      dotsOptions.gradient = {
        type: 'linear',
        rotation: 45,
        colorStops: [
          { offset: 0, color: design.fgColor },
          { offset: 1, color: design.gradientEnd },
        ],
      };
    }

    return {
      width: size,
      height: size,
      data: payload || 'https://techmiyaedtech.com',
      image: logo.image || undefined,
      margin: options.margin,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: options.errorCorrectionLevel,
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: options.imageSize || 0.3,
        margin: options.imageMargin || 5,
        crossOrigin: 'anonymous',
      },
      dotsOptions,
      backgroundOptions: {
        color: design.transparentBg ? 'rgba(255, 255, 255, 0)' : design.bgColor,
      },
      cornersSquareOptions: {
        type: design.cornerSquareType,
        color: design.fgColor,
      },
      cornersDotOptions: {
        type: design.cornerSquareType === 'dot' ? 'dot' : 'square',
        color: design.fgColor,
      },
    };
  };

  // Initialize and update preview
  useEffect(() => {
    const config = getStylingConfig(280);

    if (!qrCodeInstance.current) {
      qrCodeInstance.current = new QRCodeStyling(config);
      if (qrRef.current) {
        qrRef.current.innerHTML = '';
        qrCodeInstance.current.append(qrRef.current);
      }
    } else {
      qrCodeInstance.current.update(config);
    }
  }, [payload, design, logo, options]);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981'],
    });
  };

  // Download handler
  const handleDownload = async (extension = 'png') => {
    try {
      setDownloading(true);

      // Create high-res instance for download
      const downloadConfig = getStylingConfig(options.size);
      const highResQR = new QRCodeStyling(downloadConfig);

      await highResQR.download({
        name: finalName,
        extension: extension,
      });

      triggerConfetti();

      // Save to recent history
      if (onSaveToHistory) {
        onSaveToHistory({
          name: qrName || 'Untitled QR',
          filename: `${finalName}.${extension}`,
          payload: payload,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
      }
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setDownloading(false);
    }
  };

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      if (qrRef.current) {
        const canvas = qrRef.current.querySelector('canvas');
        if (canvas) {
          canvas.toBlob(async (blob) => {
            if (blob) {
              await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob }),
              ]);
              setCopied(true);
              setTimeout(() => setCopied(false), 2200);
            }
          });
        }
      }
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <div className="preview-sticky">
      <div className="glass-panel preview-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Sparkles size={18} style={{ color: 'var(--primary)' }} />
          <h2 style={{ fontSize: '1.15rem' }}>Live QR Preview</h2>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Real-time vector preview • Scan with phone camera to test
        </p>

        {/* QR Canvas Display */}
        <div className="qr-canvas-holder" ref={qrRef}>
          {/* Canvas inserted by qr-code-styling */}
        </div>

        {/* QR Meta Details */}
        <div className="qr-meta-info">
          <div className="qr-meta-row">
            <span>Filename:</span>
            <strong>{finalName}.png</strong>
          </div>
          <div className="qr-meta-row">
            <span>Payload Size:</span>
            <strong>{payload.length} chars</strong>
          </div>
          <div className="qr-meta-row">
            <span>Resolution:</span>
            <strong>{options.size} x {options.size} px (HD)</strong>
          </div>
          <div className="qr-meta-row">
            <span>Error Correction:</span>
            <strong style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} style={{ color: 'var(--success)' }} />
              Level {options.errorCorrectionLevel}
            </strong>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="download-actions-grid" style={{ marginTop: '1.25rem' }}>
          <button
            className="btn-action btn-primary btn-full"
            onClick={() => handleDownload('png')}
            disabled={downloading}
          >
            <Download size={18} />
            <span>Download High-Res PNG ({options.size}px)</span>
          </button>

          <button
            className="btn-action btn-secondary"
            onClick={() => handleDownload('svg')}
            title="Lossless vector for posters and large prints"
          >
            <FileCode size={17} />
            <span>Vector SVG</span>
          </button>

          <button
            className="btn-action btn-secondary"
            onClick={() => handleDownload('jpeg')}
            title="JPEG format"
          >
            <FileImage size={17} />
            <span>Download JPEG</span>
          </button>

          <button
            className="btn-action btn-secondary btn-full"
            onClick={handleCopy}
            title="Copy image directly to clipboard"
          >
            {copied ? (
              <>
                <Check size={17} style={{ color: 'var(--success)' }} />
                <span style={{ color: 'var(--success)' }}>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy size={17} />
                <span>Copy Image to Clipboard</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
