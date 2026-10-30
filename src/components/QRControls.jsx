import React from 'react';
import {
  Link2,
  FileText,
  Wifi,
  PhoneCall,
  UserCheck,
  Mail,
  Palette,
  Sliders,
  Image as ImageIcon,
  Check,
  Upload,
  Trash2,
  Info,
} from 'lucide-react';

const COLOR_PRESETS = [
  { name: 'Techmiya Indigo', fg: '#6366f1', end: '#8b5cf6', bg: '#ffffff' },
  { name: 'Cyber Violet', fg: '#8b5cf6', end: '#d946ef', bg: '#ffffff' },
  { name: 'Ocean Cyan', fg: '#06b6d4', end: '#3b82f6', bg: '#ffffff' },
  { name: 'Emerald Glow', fg: '#10b981', end: '#059669', bg: '#ffffff' },
  { name: 'Sunset Amber', fg: '#f59e0b', end: '#ef4444', bg: '#ffffff' },
  { name: 'Classic Obsidian', fg: '#0f172a', end: '#0f172a', bg: '#ffffff' },
];

export default function QRControls({
  activeTab,
  setActiveTab,
  qrType,
  setQrType,
  qrName,
  setQrName,
  contentData,
  setContentData,
  design,
  setDesign,
  logo,
  setLogo,
  options,
  setOptions,
}) {
  const handleContentChange = (field, value) => {
    setContentData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDesignChange = (field, value) => {
    setDesign((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogo((prev) => ({ ...prev, image: reader.result, name: file.name }));
      };
      reader.readAsDataURL(file);
    }
  };

  const applyColorPreset = (preset) => {
    setDesign((prev) => ({
      ...prev,
      fgColor: preset.fg,
      gradientEnd: preset.end,
      bgColor: preset.bg,
      useGradient: preset.fg !== preset.end,
    }));
  };

  return (
    <div className="glass-panel">
      {/* Tab Navigation */}
      <div className="tabs-header">
        <button
          className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          <Link2 size={16} />
          <span>1. Content</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'style' ? 'active' : ''}`}
          onClick={() => setActiveTab('style')}
        >
          <Palette size={16} />
          <span>2. Style & Colors</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'logo' ? 'active' : ''}`}
          onClick={() => setActiveTab('logo')}
        >
          <ImageIcon size={16} />
          <span>3. Logo</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <Sliders size={16} />
          <span>4. Quality</span>
        </button>
      </div>

      {/* TAB 1: CONTENT */}
      {activeTab === 'content' && (
        <div className="fade-in">
          {/* Content Type Selector */}
          <div className="type-pills">
            <button
              className={`type-pill ${qrType === 'url' ? 'active' : ''}`}
              onClick={() => setQrType('url')}
            >
              <Link2 />
              <span>URL / Link</span>
            </button>
            <button
              className={`type-pill ${qrType === 'text' ? 'active' : ''}`}
              onClick={() => setQrType('text')}
            >
              <FileText />
              <span>Plain Text</span>
            </button>
            <button
              className={`type-pill ${qrType === 'wifi' ? 'active' : ''}`}
              onClick={() => setQrType('wifi')}
            >
              <Wifi />
              <span>Wi-Fi</span>
            </button>
            <button
              className={`type-pill ${qrType === 'whatsapp' ? 'active' : ''}`}
              onClick={() => setQrType('whatsapp')}
            >
              <PhoneCall />
              <span>WhatsApp</span>
            </button>
            <button
              className={`type-pill ${qrType === 'vcard' ? 'active' : ''}`}
              onClick={() => setQrType('vcard')}
            >
              <UserCheck />
              <span>vCard</span>
            </button>
            <button
              className={`type-pill ${qrType === 'email' ? 'active' : ''}`}
              onClick={() => setQrType('email')}
            >
              <Mail />
              <span>Email</span>
            </button>
          </div>

          {/* QR Name */}
          <div className="form-group">
            <label className="form-label">
              <span>QR Code Title / Name</span>
              <span className="label-hint">Used for downloaded filename</span>
            </label>
            <input
              type="text"
              className="form-input"
              value={qrName}
              onChange={(e) => setQrName(e.target.value)}
              placeholder="e.g. Python_Batch_Registration"
            />
          </div>

          {/* Type-Specific Fields */}
          {qrType === 'url' && (
            <div className="form-group">
              <label className="form-label">
                <span>Destination Website or Google Form Link</span>
              </label>
              <input
                type="url"
                className="form-input"
                value={contentData.url}
                onChange={(e) => handleContentChange('url', e.target.value)}
                placeholder="https://forms.gle/XYZ123 or https://techmiyaedtech.com"
              />
              {contentData.url && contentData.url.includes('forms.gle') && (
                <div className="notice-box info" style={{ marginTop: '0.6rem' }}>
                  <Info size={16} />
                  <span>
                    Google Forms shortlink detected! Mobile phones will automatically resolve and open the full form directly upon scanning.
                  </span>
                </div>
              )}
            </div>
          )}

          {qrType === 'text' && (
            <div className="form-group">
              <label className="form-label">
                <span>Text Content</span>
                <span className="label-hint">{contentData.text.length} chars</span>
              </label>
              <textarea
                className="form-textarea"
                value={contentData.text}
                onChange={(e) => handleContentChange('text', e.target.value)}
                placeholder="Type or paste any note, token, coupon, or instructions here..."
              />
            </div>
          )}

          {qrType === 'wifi' && (
            <>
              <div className="form-group">
                <label className="form-label">Network Name (SSID)</label>
                <input
                  type="text"
                  className="form-input"
                  value={contentData.ssid}
                  onChange={(e) => handleContentChange('ssid', e.target.value)}
                  placeholder="e.g. Techmiya_Office_5G"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Wi-Fi Password</label>
                <input
                  type="text"
                  className="form-input"
                  value={contentData.password}
                  onChange={(e) => handleContentChange('password', e.target.value)}
                  placeholder="Network password"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Encryption Type</label>
                <select
                  className="form-select"
                  value={contentData.encryption}
                  onChange={(e) => handleContentChange('encryption', e.target.value)}
                >
                  <option value="WPA">WPA / WPA2 / WPA3 (Standard)</option>
                  <option value="WEP">WEP (Legacy)</option>
                  <option value="nopass">None (Open Network)</option>
                </select>
              </div>
            </>
          )}

          {qrType === 'whatsapp' && (
            <>
              <div className="form-group">
                <label className="form-label">
                  <span>WhatsApp Phone Number</span>
                  <span className="label-hint">With country code (e.g. 919876543210)</span>
                </label>
                <input
                  type="tel"
                  className="form-input"
                  value={contentData.phone}
                  onChange={(e) => handleContentChange('phone', e.target.value)}
                  placeholder="919876543210"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Pre-filled Chat Message (Optional)</label>
                <textarea
                  className="form-textarea"
                  value={contentData.message}
                  onChange={(e) => handleContentChange('message', e.target.value)}
                  placeholder="Hi Techmiya EdTech, I'd like more details regarding the upcoming workshop."
                />
              </div>
            </>
          )}

          {qrType === 'vcard' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={contentData.firstName}
                    onChange={(e) => handleContentChange('firstName', e.target.value)}
                    placeholder="John"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={contentData.lastName}
                    onChange={(e) => handleContentChange('lastName', e.target.value)}
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Organization / College</label>
                <input
                  type="text"
                  className="form-input"
                  value={contentData.org}
                  onChange={(e) => handleContentChange('org', e.target.value)}
                  placeholder="Techmiya EdTech"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-input"
                  value={contentData.phone}
                  onChange={(e) => handleContentChange('phone', e.target.value)}
                  placeholder="+91 9876543210"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={contentData.email}
                  onChange={(e) => handleContentChange('email', e.target.value)}
                  placeholder="contact@techmiyaedtech.com"
                />
              </div>
            </>
          )}

          {qrType === 'email' && (
            <>
              <div className="form-group">
                <label className="form-label">Recipient Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={contentData.to}
                  onChange={(e) => handleContentChange('to', e.target.value)}
                  placeholder="info@techmiyaedtech.com"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Subject Line</label>
                <input
                  type="text"
                  className="form-input"
                  value={contentData.subject}
                  onChange={(e) => handleContentChange('subject', e.target.value)}
                  placeholder="Inquiry about Placement Drive"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email Body</label>
                <textarea
                  className="form-textarea"
                  value={contentData.body}
                  onChange={(e) => handleContentChange('body', e.target.value)}
                  placeholder="Write your email template here..."
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* TAB 2: STYLE & COLORS */}
      {activeTab === 'style' && (
        <div className="fade-in">
          {/* Quick Palettes */}
          <div className="form-group">
            <label className="form-label">Brand Color Palettes</label>
            <div className="palette-grid">
              {COLOR_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  className="palette-btn"
                  title={preset.name}
                  style={{
                    background:
                      preset.fg === preset.end
                        ? preset.fg
                        : `linear-gradient(135deg, ${preset.fg}, ${preset.end})`,
                  }}
                  onClick={() => applyColorPreset(preset)}
                />
              ))}
            </div>
          </div>

          {/* Color Pickers */}
          <div className="color-pickers-row">
            <div className="form-group">
              <label className="form-label">Primary Color</label>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  value={design.fgColor}
                  onChange={(e) => handleDesignChange('fgColor', e.target.value)}
                />
                <input
                  type="text"
                  value={design.fgColor}
                  onChange={(e) => handleDesignChange('fgColor', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span>Gradient Finish</span>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={design.useGradient}
                    onChange={(e) => handleDesignChange('useGradient', e.target.checked)}
                  />
                  <span>Enable</span>
                </label>
              </label>
              <div className="color-input-wrapper" style={{ opacity: design.useGradient ? 1 : 0.45 }}>
                <input
                  type="color"
                  disabled={!design.useGradient}
                  value={design.gradientEnd}
                  onChange={(e) => handleDesignChange('gradientEnd', e.target.value)}
                />
                <input
                  type="text"
                  disabled={!design.useGradient}
                  value={design.gradientEnd}
                  onChange={(e) => handleDesignChange('gradientEnd', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Background Options */}
          <div className="color-pickers-row">
            <div className="form-group">
              <label className="form-label">Background Color</label>
              <div className="color-input-wrapper" style={{ opacity: design.transparentBg ? 0.45 : 1 }}>
                <input
                  type="color"
                  disabled={design.transparentBg}
                  value={design.bgColor}
                  onChange={(e) => handleDesignChange('bgColor', e.target.value)}
                />
                <input
                  type="text"
                  disabled={design.transparentBg}
                  value={design.bgColor}
                  onChange={(e) => handleDesignChange('bgColor', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Transparent BG</label>
              <label className="switch-label">
                <span>Transparent canvas</span>
                <input
                  type="checkbox"
                  checked={design.transparentBg}
                  onChange={(e) => handleDesignChange('transparentBg', e.target.checked)}
                />
              </label>
            </div>
          </div>

          {/* Dot Patterns */}
          <div className="form-group">
            <label className="form-label">QR Dot Shape</label>
            <div className="options-grid">
              {[
                { id: 'rounded', label: 'Rounded' },
                { id: 'dots', label: 'Dots' },
                { id: 'classy-rounded', label: 'Classy' },
                { id: 'square', label: 'Square' },
                { id: 'extra-rounded', label: 'Smooth' },
              ].map((item) => (
                <button
                  key={item.id}
                  className={`option-chip ${design.dotsType === item.id ? 'active' : ''}`}
                  onClick={() => handleDesignChange('dotsType', item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Corner Squares */}
          <div className="form-group">
            <label className="form-label">Corner Eye Shape</label>
            <div className="options-grid">
              {[
                { id: 'extra-rounded', label: 'Extra Rounded' },
                { id: 'dot', label: 'Circular' },
                { id: 'square', label: 'Sharp Square' },
              ].map((item) => (
                <button
                  key={item.id}
                  className={`option-chip ${design.cornerSquareType === item.id ? 'active' : ''}`}
                  onClick={() => handleDesignChange('cornerSquareType', item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LOGO & BRANDING */}
      {activeTab === 'logo' && (
        <div className="fade-in">
          {logo.image ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="logo-preview-row">
                <img src={logo.image} alt="Custom Logo" className="logo-thumb" />
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{logo.name || 'Center Logo'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Embedded in QR center</div>
                </div>
                <button
                  className="header-btn"
                  style={{ color: 'var(--danger)', padding: '0.4rem 0.75rem' }}
                  onClick={() => setLogo({ image: null, name: '' })}
                >
                  <Trash2 size={16} />
                  <span>Remove</span>
                </button>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span>Logo Scale</span>
                  <span className="label-hint">{Math.round((options.imageSize || 0.3) * 100)}%</span>
                </label>
                <input
                  type="range"
                  min="0.15"
                  max="0.4"
                  step="0.05"
                  className="range-slider"
                  value={options.imageSize || 0.3}
                  onChange={(e) => setOptions((prev) => ({ ...prev, imageSize: parseFloat(e.target.value) }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span>Logo Margin / Padding</span>
                  <span className="label-hint">{options.imageMargin || 5}px</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="1"
                  className="range-slider"
                  value={options.imageMargin || 5}
                  onChange={(e) => setOptions((prev) => ({ ...prev, imageMargin: parseInt(e.target.value) }))}
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="logo-upload-box">
                <Upload size={32} style={{ color: 'var(--primary)' }} />
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Upload Brand Logo</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  PNG, SVG, or JPG (Recommended: Square with transparent background)
                </div>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/svg+xml"
                  style={{ display: 'none' }}
                  onChange={handleLogoUpload}
                />
              </label>

              <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                <button
                  className="header-btn"
                  onClick={() =>
                    setLogo({
                      image:
                        "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%236366f1'/><text x='50' y='62' font-size='38' font-weight='bold' fill='white' text-anchor='middle' font-family='sans-serif'>T</text></svg>",
                      name: 'Techmiya Icon Badge',
                    })
                  }
                >
                  ⚡ Use Techmiya Badge
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: QUALITY & EXPORT SETTINGS */}
      {activeTab === 'settings' && (
        <div className="fade-in">
          <div className="form-group">
            <label className="form-label">
              <span>Error Correction Level</span>
              <span className="label-hint">Higher allows scanning even if partly covered or with logo</span>
            </label>
            <div className="options-grid">
              {[
                { id: 'L', label: 'Low (7%)' },
                { id: 'M', label: 'Medium (15%)' },
                { id: 'Q', label: 'Quartile (25%)' },
                { id: 'H', label: 'High (30% - Best)' },
              ].map((item) => (
                <button
                  key={item.id}
                  className={`option-chip ${options.errorCorrectionLevel === item.id ? 'active' : ''}`}
                  onClick={() => setOptions((prev) => ({ ...prev, errorCorrectionLevel: item.id }))}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span>Export Resolution</span>
              <span className="label-hint">{options.size} x {options.size} px</span>
            </label>
            <div className="options-grid">
              {[
                { id: 400, label: '400px (Web)' },
                { id: 600, label: '600px (HD)' },
                { id: 800, label: '800px (2K)' },
                { id: 1200, label: '1200px (Print)' },
              ].map((item) => (
                <button
                  key={item.id}
                  className={`option-chip ${options.size === item.id ? 'active' : ''}`}
                  onClick={() => setOptions((prev) => ({ ...prev, size: item.id }))}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span>Quiet Zone / Margin</span>
              <span className="label-hint">{options.margin}px</span>
            </label>
            <input
              type="range"
              min="0"
              max="30"
              step="5"
              className="range-slider"
              value={options.margin}
              onChange={(e) => setOptions((prev) => ({ ...prev, margin: parseInt(e.target.value) }))}
            />
          </div>
        </div>
      )}
    </div>
  );
}
