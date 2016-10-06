import { Component, ViewEncapsulation, ViewChild } from '@angular/core';

import { DropzoneConfigInterface } from 'angular2-dropzone-wrapper';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  private config: DropzoneConfigInterface = {
    params: "name=test.png&directory=images"
  };

  constructor() {}

  onUploadDone(event: any) {
    console.log('onUploadDone:', event);
  }

  onUploadError(event: any) {
    console.log('onUploadError:', event);
  }
}
