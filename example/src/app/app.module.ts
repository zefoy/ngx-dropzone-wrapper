import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { FlexLayoutModule } from '@angular/flex-layout';

import { DropzoneModule, DropzoneConfigInterface,
  DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';

import { AppComponent } from './app.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  acceptedFiles: 'image/*',
  createImageThumbnails: true
};

@NgModule({
    bootstrap: [
      AppComponent
    ],
    declarations: [
      AppComponent
    ],
    imports: [
      DropzoneModule,
      BrowserModule,
      FlexLayoutModule,
    ],
    exports: [
    ],
    providers: [
      {
        provide: DROPZONE_CONFIG,
        useValue: DEFAULT_DROPZONE_CONFIG
      }
    ]
})
export class AppModule {}
