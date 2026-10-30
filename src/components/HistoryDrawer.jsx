import React from 'react';
import { History, Download, Trash2, ArrowUpRight } from 'lucide-react';

export default function HistoryDrawer({ history, onLoadItem, onClearHistory }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="glass-panel history-section fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <History size={18} style={{ color: 'var(--primary)' }} />
          <h3 style={{ fontSize: '1.05rem' }}>Recent Generated Codes</h3>
          <span className="brand-badge">{history.length}</span>
        </div>
        <button
          className="header-btn"
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}
          onClick={onClearHistory}
        >
          <Trash2 size={14} />
          <span>Clear History</span>
        </button>
      </div>

      <div className="history-grid">
        {history.map((item, index) => (
          <div key={index} className="history-card">
            <div className="history-info">
              <div className="history-title">{item.name}</div>
              <div className="history-subtitle">{item.payload}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {item.timestamp} • {item.filename}
              </div>
            </div>
            <button
              className="header-btn"
              style={{ padding: '0.4rem', borderRadius: 'var(--radius-sm)' }}
              title="Load this into editor"
              onClick={() => onLoadItem(item)}
            >
              <ArrowUpRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
