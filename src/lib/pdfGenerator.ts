import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

async function captureElement(
  element: HTMLElement,
  bgColor: string,
  width: number,
  height: number
): Promise<string> {
  // Clone the element and append to body for reliable capture
  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.position = 'fixed';
  clone.style.top = '0';
  clone.style.left = '0';
  clone.style.opacity = '0';
  clone.style.pointerEvents = 'none';
  clone.style.zIndex = '-1';
  clone.style.width = `${width}px`;
  clone.style.height = `${height}px`;
  clone.style.overflow = 'hidden';
  document.body.appendChild(clone);

  // Wait for fonts and layout
  await new Promise((resolve) => setTimeout(resolve, 300));

  try {
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      backgroundColor: bgColor,
      logging: false,
      width,
      height,
      windowWidth: width,
      windowHeight: height,
    });

    return canvas.toDataURL('image/png');
  } finally {
    document.body.removeChild(clone);
  }
}

export async function generateCertificatePDF(
  element: HTMLElement,
  filename: string
): Promise<void> {
  const imgData = await captureElement(element, '#0a0a0e', 1123, 794);

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [1123, 794],
  });

  pdf.addImage(imgData, 'PNG', 0, 0, 1123, 794);
  pdf.save(filename);
}

export async function generateOfferLetterPDF(
  element: HTMLElement,
  filename: string
): Promise<void> {
  const imgData = await captureElement(element, '#FAFAF8', 794, 1123);

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [794, 1123],
  });

  pdf.addImage(imgData, 'PNG', 0, 0, 794, 1123);
  pdf.save(filename);
}
