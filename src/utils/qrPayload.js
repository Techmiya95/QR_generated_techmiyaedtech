// Utility functions for QR data formatting and validation

export function cleanFilename(name) {
  if (!name) return 'qrcode';
  return name
    .replace(/[<>:"/\\|?*]/g, '_')
    .replace(/\s+/g, '_')
    .trim();
}

export function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function buildPayload(type, data) {
  switch (type) {
    case 'url':
      return data.url?.trim() || '';

    case 'text':
      return data.text || '';

    case 'wifi': {
      const { ssid = '', password = '', encryption = 'WPA', hidden = false } = data;
      return `WIFI:T:${encryption};S:${ssid};P:${password};H:${hidden ? 'true' : 'false'};;`;
    }

    case 'whatsapp': {
      const phone = (data.phone || '').replace(/[^0-9]/g, '');
      const text = encodeURIComponent(data.message || '');
      return phone ? `https://wa.me/${phone}${text ? `?text=${text}` : ''}` : '';
    }

    case 'vcard': {
      const {
        firstName = '',
        lastName = '',
        org = 'Techmiya EdTech',
        phone = '',
        email = '',
        url = '',
      } = data;
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${lastName};${firstName};;;`,
        `FN:${firstName} ${lastName}`.trim(),
        org ? `ORG:${org}` : '',
        phone ? `TEL;TYPE=CELL:${phone}` : '',
        email ? `EMAIL:${email}` : '',
        url ? `URL:${url}` : '',
        'END:VCARD',
      ]
        .filter(Boolean)
        .join('\n');
    }

    case 'email': {
      const { to = '', subject = '', body = '' } = data;
      const params = [];
      if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
      if (body) params.push(`body=${encodeURIComponent(body)}`);
      return `mailto:${to}${params.length ? `?${params.join('&')}` : ''}`;
    }

    default:
      return '';
  }
}
