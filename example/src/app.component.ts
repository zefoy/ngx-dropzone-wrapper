import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DropzoneComponent } from 'angular2-dropzone-wrapper';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  @ViewChild(DropzoneComponent) private dropzone: DropzoneComponent;

  private urlParameters = "directory=imageUploads&name=image.png";

  private title = 'Simple example app for the angular2-dropzone-wrapper';

  constructor() { }

  onUploadDone(event: any) {
    console.log('onUploadDone:', event);

    // Example: set the backgroundimage according to response
    if (event.xhr && event.xhr.response) {
      let responseObject = JSON.parse(event.xhr.response);
      this.dropzone.backgroundImage = responseObject['url'];
    }
  }

  onUploadError(event: any) {
    console.log('onUploadError:', event.msg);
  }
}
