// Función para generar el código QR
function generateQR() {
    const text = document.getElementById("qr-text").value;

    if (text) {
        QRCode.toDataURL(text, { width: 250, height: 250 }, function (err, url) {
            if (err) {
                console.error("Error al generar el QR:", err);
            } else {
                const qrImage = document.getElementById("qr-image");
                qrImage.src = url;
                qrImage.style.display = "block";
            }
        });
    } else {
        alert("Por favor, ingresa un texto o enlace.");
    }
}

// Función para iniciar el escaneo del código QR
function startScan() {
    const qrCodeSuccessCallback = function(decodedText, decodedResult) {
        // Mostrar el resultado del escaneo en la página
        document.getElementById("qr-result").innerText = `Resultado: ${decodedText}`;
    };

    const qrCodeErrorCallback = function(errorMessage) {
        console.log(`Error al escanear: ${errorMessage}`);
    };

    const html5QrCode = new Html5Qrcode("qr-video");
    html5QrCode.start(
        { facingMode: "environment" }, // Cámara trasera
        {
            fps: 10,    // frames per second
            qrbox: 250  // Tamaño del área de escaneo
        },
        qrCodeSuccessCallback,
        qrCodeErrorCallback
    ).catch(err => {
        console.log("Error al iniciar el escaneo:", err);
    });
}
