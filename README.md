# 🔳 Techmiya QR Studio

A modern, high-resolution, client-side QR Code Generator built with **React**, **Vite**, and **Vanilla CSS**. Designed for **Techmiya EdTech** and optimized for automated deployment on **GitHub Pages** with the custom domain `qrgenerated.techmiyaedtech.com`.

---

## ✨ Features

- **100% Client-Side & Static**: Runs purely in the browser. Zero backend server needed, zero hosting costs, infinite scalability.
- **Dynamic Content Support**:
  - 🔗 **Website & Google Forms**: Generates high-density QR codes for drive links and forms.
  - 📝 **Plain Text**: Formats notes, coupons, and instructions.
  - 📶 **Wi-Fi Access**: Instant connect credentials (WPA / WPA2 / Open).
  - 💬 **WhatsApp Direct**: Pre-filled chat launch.
  - 👤 **vCard Contact**: Instant address-book import.
  - 📧 **Email**: Pre-filled template mailto links.
- **Visual Customization**:
  - Dot shapes: Rounded, Dots, Classy, Smooth Extra-Rounded, Square.
  - Corner shapes: Extra-Rounded, Circular Dot, Square.
  - Gradients (Linear 45°) & Custom Color Palettes (Techmiya Indigo, Cyber Violet, Sunset, Emerald, Midnight).
  - Transparent background toggle.
- **Brand Logo Embedding**:
  - Center logo placement (PNG / SVG).
  - Configurable logo scale and margin.
- **Export Options**:
  - ⬇️ **PNG** (400px up to 1200px Ultra-HD Print resolution).
  - ⬇️ **Vector SVG** (Lossless vector for posters and banners).
  - ⬇️ **JPEG**.
  - 📋 **Copy to Clipboard** (one-click copy image).
- **Recent Codes History**: Automatically stores recent generations in browser `localStorage`.

---

## 🌐 Custom Domain & GitHub Pages Setup (Branch Hosting)

This repository is configured to host directly from the **`gh-pages` branch** without using GitHub Actions.

### 1. Deploy the Static Build to `gh-pages` branch
Run:
```bash
npm run deploy
```
This automatically builds the project and publishes the compiled static files (`index.html`, `assets/`, `CNAME`, `.nojekyll`) to the `gh-pages` branch on GitHub.

### 2. DNS Configuration (GoDaddy):
Add the following record:
- **Type**: `CNAME`
- **Name**: `qrgenerated`
- **Value**: `techmiya95.github.io.`
- **TTL**: `1/2 Hour`

### 3. GitHub Pages Repository Settings:
1. Go to repository **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select:
   - **Deploy from a branch**
3. Under **Branch**, select:
   - **`gh-pages`** and folder **`/ (root)`** → Click **Save**.
4. Under **Custom domain**, enter:
   ```text
   qrgenerated.techmiyaedtech.com
   ```
5. Check **Enforce HTTPS**.

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local dev server
npm run dev

# 3. Build for production
npm run build
```
