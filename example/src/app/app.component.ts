import { Component } from '@angular/core';

import { DropzoneConfigInterface } from 'angular2-dropzone-wrapper';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  private config: DropzoneConfigInterface = {
    params: 'directory=images'
  };

  constructor() {}

  onUploadError(args: any) {
    console.log('onUploadError:', args);
  }

  onUploadSuccess(args: any) {
    console.log('onUploadSuccess:', args);
  }
}
