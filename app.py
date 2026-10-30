import os
import re
import requests
import qrcode
import streamlit as st

from io import BytesIO
from urllib.parse import urlparse


# ============================================================
# CONFIGURATION
# ============================================================

QR_FOLDER = "QR_codes"

# Create folder automatically
os.makedirs(QR_FOLDER, exist_ok=True)


# ============================================================
# URL VALIDATION
# ============================================================

def is_valid_url(url):

    try:
        parsed = urlparse(url)

        return (
            parsed.scheme in ("http", "https")
            and bool(parsed.netloc)
        )

    except Exception:
        return False


# ============================================================
# RESOLVE SHORT URL
# ============================================================

def resolve_short_url(url):

    try:

        response = requests.get(
            url,
            allow_redirects=True,
            timeout=10,
            headers={
                "User-Agent": "Mozilla/5.0"
            }
        )

        return response.url

    except requests.RequestException:
        return url


# ============================================================
# CLEAN FILE NAME
# ============================================================

def clean_filename(filename):

    filename = re.sub(
        r'[<>:"/\\|?*]',
        "_",
        filename
    )

    return filename.strip()


# ============================================================
# GENERATE QR CODE
# ============================================================

def generate_qr(link, qr_name):

    # Create QR object
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4
    )

    # Add link
    qr.add_data(link)

    # Generate QR
    qr.make(fit=True)

    # Create PIL image
    image = qr.make_image(
        fill_color="black",
        back_color="white"
    )

    # --------------------------------------------------------
    # Convert PIL image to PNG bytes
    # --------------------------------------------------------

    image_bytes = BytesIO()

    image.save(
        image_bytes,
        format="PNG"
    )

    image_bytes.seek(0)

    # Get bytes
    qr_bytes = image_bytes.getvalue()

    # --------------------------------------------------------
    # Save QR to folder
    # --------------------------------------------------------

    qr_name = clean_filename(qr_name)

    file_path = os.path.join(
        QR_FOLDER,
        f"{qr_name}.png"
    )

    with open(file_path, "wb") as file:

        file.write(qr_bytes)

    # Return file path + bytes
    return file_path, qr_bytes


# ============================================================
# STREAMLIT CONFIGURATION
# ============================================================

st.set_page_config(
    page_title="QR Code Generator",
    page_icon="🔳",
    layout="centered"
)


# ============================================================
# PAGE TITLE
# ============================================================

st.title("🔳 QR Code Generator")

st.write(
    "Enter a link and QR code name to generate your QR code."
)


# ============================================================
# INPUT 1 - LINK
# ============================================================

link = st.text_input(
    "🔗 Enter Link",
    placeholder="https://forms.gle/ABC123"
)


# ============================================================
# INPUT 2 - QR NAME
# ============================================================

qr_name = st.text_input(
    "📝 QR Code Name",
    placeholder="Python_Batch_Registration"
)


# ============================================================
# GENERATE BUTTON
# ============================================================

if st.button(
    "Generate QR Code",
    type="primary",
    use_container_width=True
):

    # --------------------------------------------------------
    # Validate link
    # --------------------------------------------------------

    if not link:

        st.error(
            "❌ Please enter a link."
        )

        st.stop()


    if not is_valid_url(link):

        st.error(
            "❌ Please enter a valid HTTP/HTTPS URL."
        )

        st.stop()


    # --------------------------------------------------------
    # Validate QR name
    # --------------------------------------------------------

    if not qr_name:

        st.error(
            "❌ Please enter a QR code name."
        )

        st.stop()


    # --------------------------------------------------------
    # Resolve Google Forms short URL
    # --------------------------------------------------------

    final_link = link

    if "forms.gle" in link.lower():

        with st.spinner(
            "Processing Google Form link..."
        ):

            final_link = resolve_short_url(link)


    # --------------------------------------------------------
    # Generate QR
    # --------------------------------------------------------

    try:

        file_path, qr_bytes = generate_qr(
            final_link,
            qr_name
        )

    except Exception as e:

        st.error(
            f"❌ Error generating QR code: {e}"
        )

        st.stop()


    # --------------------------------------------------------
    # SUCCESS
    # --------------------------------------------------------

    st.success(
        "✅ QR Code generated successfully!"
    )


    # ========================================================
    # SHOW QR CODE ON WEBPAGE
    # ========================================================

    st.subheader("Your QR Code")

    st.image(
        qr_bytes,
        caption=qr_name,
        width=300
    )


    # ========================================================
    # INFORMATION
    # ========================================================

    st.subheader("QR Code Details")

    st.write(
        f"**QR Name:** {qr_name}"
    )

    st.write(
        f"**Link:** {final_link}"
    )

    st.write(
        f"**Saved Location:** `{file_path}`"
    )


    # ========================================================
    # DOWNLOAD BUTTON
    # ========================================================

    st.download_button(
        label="⬇️ Download QR Code",
        data=qr_bytes,
        file_name=f"{clean_filename(qr_name)}.png",
        mime="image/png",
        use_container_width=True
    )