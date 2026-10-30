import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import QRControls from './components/QRControls';
import QRPreview from './components/QRPreview';
import HistoryDrawer from './components/HistoryDrawer';
import { buildPayload } from './utils/qrPayload';
import { Globe, ShieldCheck } from 'lucide-react';

const INITIAL_DESIGN = {
  dotsType: 'rounded',
  cornerSquareType: 'extra-rounded',
  fgColor: '#6366f1',
  gradientEnd: '#8b5cf6',
  bgColor: '#ffffff',
  useGradient: true,
  transparentBg: false,
};

const INITIAL_OPTIONS = {
  errorCorrectionLevel: 'H',
  size: 800,
  margin: 10,
  imageSize: 0.3,
  imageMargin: 6,
};

export default function App() {
  const [activeTab, setActiveTab] = useState('content');
  const [qrType, setQrType] = useState('url');
  const [qrName, setQrName] = useState('Techmiya_Registration_QR');

  const [contentData, setContentData] = useState({
    url: 'https://forms.gle/techmiya-registration',
    text: '',
    ssid: '',
    password: '',
    encryption: 'WPA',
    phone: '',
    message: '',
    firstName: 'Techmiya',
    lastName: 'EdTech',
    org: 'Techmiya EdTech',
    email: 'info@techmiyaedtech.com',
    to: 'info@techmiyaedtech.com',
    subject: 'Inquiry',
    body: '',
  });

  const [design, setDesign] = useState(INITIAL_DESIGN);
  const [logo, setLogo] = useState({
    image: null,
    name: '',
  });
  const [options, setOptions] = useState(INITIAL_OPTIONS);

  // History state synced with localStorage
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('techmiya_qr_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('techmiya_qr_history', JSON.stringify(history));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [history]);

  const payload = buildPayload(qrType, contentData);

  const handleSaveToHistory = (item) => {
    setHistory((prev) => [item, ...prev.slice(0, 11)]);
  };

  const handleLoadHistoryItem = (item) => {
    setQrName(item.name);
    setQrType('url');
    setContentData((prev) => ({ ...prev, url: item.payload }));
    setActiveTab('content');
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleReset = () => {
    setDesign(INITIAL_DESIGN);
    setOptions(INITIAL_OPTIONS);
    setLogo({ image: null, name: '' });
  };

  return (
    <div className="app-container">
      {/* Brand Navbar */}
      <Navbar onReset={handleReset} />

      {/* Domain Badge */}
      <div className="custom-domain-badge">
        <Globe size={18} />
        <span>
          Production Ready: Configured for custom domain <code>qrgenerated.techmiyaedtech.com</code> on GitHub Pages.
        </span>
      </div>

      {/* Main Studio Grid */}
      <main className="studio-grid">
        {/* Controls Column */}
        <section aria-label="QR Code Settings">
          <QRControls
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            qrType={qrType}
            setQrType={setQrType}
            qrName={qrName}
            setQrName={setQrName}
            contentData={contentData}
            setContentData={setContentData}
            design={design}
            setDesign={setDesign}
            logo={logo}
            setLogo={setLogo}
            options={options}
            setOptions={setOptions}
          />
        </section>

        {/* Live Preview & Actions Column */}
        <section aria-label="Live QR Preview">
          <QRPreview
            payload={payload}
            qrName={qrName}
            design={design}
            logo={logo}
            options={options}
            onSaveToHistory={handleSaveToHistory}
          />
        </section>
      </main>

      {/* History Drawer */}
      <HistoryDrawer
        history={history}
        onLoadItem={handleLoadHistoryItem}
        onClearHistory={handleClearHistory}
      />

      {/* Footer */}
      <footer className="app-footer">
        <div>
          Crafted for <strong>Techmiya EdTech</strong> • Fast, secure, 100% client-side QR generation.
        </div>
        <div style={{ fontSize: '0.8rem' }}>
          Custom Domain:{' '}
          <a
            href="https://qrgenerated.techmiyaedtech.com"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            qrgenerated.techmiyaedtech.com
          </a>
        </div>
      </footer>
    </div>
  );
}
