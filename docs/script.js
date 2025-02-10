// Función para generar el código QR
function generateQR() {
    const text = document.getElementById("qr-text").value; // Obtener el texto del input

    if (text) {
        // Usar la librería QRCode para generar la imagen
        QRCode.toDataURL(text, { width: 250, height: 250 }, function (err, url) {
            if (err) {
                console.error("Error al generar el QR:", err); // Si hay error, lo mostramos en la consola
            } else {
                // Obtener la imagen y el enlace de descarga
                const qrImage = document.getElementById("qr-image");
                qrImage.src = url; // Asignar el URL generado como fuente de la imagen
                qrImage.style.display = "block"; // Hacer visible la imagen
                const downloadLink = document.getElementById("download-link");
                downloadLink.href = url; // Establecer el enlace de descarga con la URL generada
                downloadLink.style.display = "inline-block"; // Hacer visible el enlace de descarga
            }
        });
    } else {
        alert("Por favor, ingresa un texto o enlace."); // Si no hay texto, se muestra un mensaje
    }
}
