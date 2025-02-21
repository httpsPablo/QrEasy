import QRCode from 'qrcode';
import { Html5QrcodeScanner } from 'html5-qrcode';

// Configuración de pestañas
const tabs = document.querySelectorAll('.tab-btn');
const sections = document.querySelectorAll('.section');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    
    // Actualizar botones
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    // Actualizar secciones
    sections.forEach(section => {
      section.classList.remove('active');
      if (section.id === `${target}-section`) {
        section.classList.add('active');
      }
    });
  });
});

// Configuración del generador QR
const qrText = document.getElementById('qr-text');
const generateQrBtn = document.getElementById('generate-qr-btn');
const downloadQrBtn = document.getElementById('download-qr-btn');
const canvas = document.getElementById('qr-canvas');

generateQrBtn.addEventListener('click', () => {
  const text = qrText.value;
  if (text) {
    QRCode.toCanvas(canvas, text, { 
      width: 300,
      margin: 2,
      color: {
        dark: '#2c3e50',
        light: '#ffffff'
      }
    }, (error) => {
      if (error) console.error('Error generando QR:', error);
      else downloadQrBtn.style.display = 'block';
    });
  }
});

downloadQrBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'codigo-qr.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});

// Configuración del generador de códigos de barras
const barcodeText = document.getElementById('barcode-text');
const barcodeType = document.getElementById('barcode-type');
const generateBarcodeBtn = document.getElementById('generate-barcode-btn');
const downloadBarcodeBtn = document.getElementById('download-barcode-btn');
const barcodeElement = document.getElementById('barcode');

generateBarcodeBtn.addEventListener('click', () => {
  const text = barcodeText.value;
  if (text) {
    try {
      window.JsBarcode('#barcode', text, {
        format: barcodeType.value,
        width: 2,
        height: 100,
        displayValue: true,
        font: 'Poppins',
        lineColor: '#2c3e50'
      });
      downloadBarcodeBtn.style.display = 'block';
    } catch (error) {
      alert('Error: Verifica que el texto sea válido para el tipo de código seleccionado');
    }
  }
});

downloadBarcodeBtn.addEventListener('click', () => {
  const svgData = new XMLSerializer().serializeToString(barcodeElement);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    
    const link = document.createElement('a');
    link.download = 'codigo-barras.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };
  
  img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
});

// Configuración del escáner QR
const resultContainer = document.getElementById('result');
const html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  { 
    fps: 10, 
    qrbox: { width: 250, height: 250 },
    rememberLastUsedCamera: true,
  }
);

function onScanSuccess(decodedText) {
  resultContainer.innerHTML = `
    <strong>Código escaneado:</strong><br>
    ${decodedText}
  `;
}

function onScanFailure(error) {
  // console.warn(`Fallo al escanear: ${error}`);
}

html5QrcodeScanner.render(onScanSuccess, onScanFailure);