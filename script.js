document.addEventListener("DOMContentLoaded", () => {
    const qrOptions = {
        width: 300,
        height: 300,
        type: "svg",
        data: "https://fosspel.github.io/qr-code-generator/",
        image: "",
        dotsOptions: { color: "#000000", type: "square" },
        backgroundOptions: { color: "#ffffff" },
        imageOptions: { crossOrigin: "anonymous", margin: 10 }
    };

    const qrCode = new QRCodeStyling(qrOptions);
    qrCode.append(document.getElementById("qr-code-container"));

    const qrText = document.getElementById("qr-text");
    const qrSize = document.getElementById("qr-size");
    const qrSizeValue = document.getElementById("qr-size-value");
    const qrColor = document.getElementById("qr-color");
    const qrBgColor = document.getElementById("qr-bg-color");
    const dotStyle = document.getElementById("dot-style");
    const logoUpload = document.getElementById("logo-upload");
    const removeLogoBtn = document.getElementById("remove-logo");
    const downloadBtn = document.getElementById("download-btn");

    const updateQRCode = () => {
        const size = parseInt(qrSize.value, 10);
        qrCode.update({
            width: size,
            height: size,
            data: qrText.value.trim() === "" ? " " : qrText.value,
            dotsOptions: { color: qrColor.value, type: dotStyle.value },
            backgroundOptions: { color: qrBgColor.value }
        });
    };

    qrText.addEventListener("input", updateQRCode);
    qrSize.addEventListener("input", () => {
        qrSizeValue.textContent = `${qrSize.value}px`;
        updateQRCode();
    });
    qrColor.addEventListener("input", updateQRCode);
    qrBgColor.addEventListener("input", updateQRCode);
    dotStyle.addEventListener("change", updateQRCode);

    logoUpload.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                qrCode.update({ image: event.target.result });
                removeLogoBtn.classList.remove("hidden");
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    removeLogoBtn.addEventListener("click", () => {
        qrCode.update({ image: "" });
        logoUpload.value = "";
        removeLogoBtn.classList.add("hidden");
    });

    downloadBtn.addEventListener("click", () => {
        qrCode.download({ name: "qrcode", extension: "png" });
    });

    updateQRCode();
});
