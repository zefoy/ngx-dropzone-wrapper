import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { DropzoneModule, DropzoneConfigInterface } from 'angular2-dropzone-wrapper';

import { AppComponent } from './app.component';

const DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  server: 'https://httpbin.org/post',
  autoReset: 5000,
  errorReset: 5000,
  maxFilesize: 50,
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
      BrowserModule,
      DropzoneModule.forRoot(DROPZONE_CONFIG)
    ]
})
export class AppModule {}
