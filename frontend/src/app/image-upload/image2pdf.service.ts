import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Image2PdfService {
  async imagesToPdf(images: File[]): Promise<Blob> {
    const { jsPDF } = await import('jspdf');
    const pdf = new jsPDF();
    for (let i = 0; i < images.length; i++) {
      const imgData = await this.fileToDataUrl(images[i]);
      const img = new Image();
      img.src = imgData;
      await new Promise(resolve => { img.onload = resolve; });
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(img, 'JPEG', 0, 0, width, height);
      if (i < images.length - 1) pdf.addPage();
    }
    return pdf.output('blob');
  }

  private fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}