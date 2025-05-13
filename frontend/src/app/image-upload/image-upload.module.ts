import { NgModule } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from './image-upload.component';

@NgModule({
  declarations: [ImageUploadComponent],
  imports: [CommonModule, MatButton],
  exports: [ImageUploadComponent]
})
export class ImageUploadModule {}