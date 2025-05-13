import { Component } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  images: { file: File, url: string }[] = [];

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    Array.from(input.files).forEach(file => {
      if (['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push({ file, url: e.target.result });
        };
        reader.readAsDataURL(file);
      }
    });
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
  }

  moveImageUp(index: number): void {
    if (index > 0) {
      [this.images[index - 1], this.images[index]] = [this.images[index], this.images[index - 1]];
    }
  }

  moveImageDown(index: number): void {
    if (index < this.images.length - 1) {
      [this.images[index + 1], this.images[index]] = [this.images[index], this.images[index + 1]];
    }
  }
}