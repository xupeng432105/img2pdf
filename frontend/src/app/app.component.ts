import { Component, ViewChild } from '@angular/core';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { Image2PdfService } from './image-upload/image2pdf.service';
import { RouterOutlet } from '@angular/router';
import { ImageUploadModule } from './image-upload/image-upload.module';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImageUploadModule, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild(ImageUploadComponent) imageUploadComp!: ImageUploadComponent;

  constructor(private image2Pdf: Image2PdfService) {}

  canGeneratePdf(): boolean {
    return this.imageUploadComp && this.imageUploadComp.images.length > 0;
  }

  async generatePdf() {
    if (!this.canGeneratePdf()) return;
    const files = this.imageUploadComp.images.map(img => img.file);
    const blob = await this.image2Pdf.imagesToPdf(files);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'images.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
