import { Component } from '@angular/core';

import { DropzoneConfigInterface } from 'angular2-dropzone-wrapper';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  private config: DropzoneConfigInterface = {
    params: 'directory=images',
    dictDefaultMessage: 'Please place a file here!'
  };

  constructor() {}

  onUploadError(event: any) {
    console.log('onUploadError:', event);
  }

  onUploadSuccess(event: any) {
    console.log('onUploadSuccess:', event);
  }
}
