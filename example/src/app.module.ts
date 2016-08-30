import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { DropzoneModule, DropzoneConfigInterface } from 'angular2-dropzone-wrapper';

import { AppComponent } from './app.component';

const DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'myserver.com', // Change this to your upload POST address
  maxFilesize: 50,
  acceptedFiles: 'image/*'
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
      DropzoneModule.forRoot(DROPZONE_CONFIG),
    ]
})
export class AppModule {}
