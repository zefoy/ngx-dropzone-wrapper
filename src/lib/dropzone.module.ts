import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropzoneComponent } from './dropzone.component';
import { DropzoneDirective } from './dropzone.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [DropzoneComponent, DropzoneDirective],
  exports: [CommonModule, DropzoneComponent, DropzoneDirective]
})
export class DropzoneModule {
}
