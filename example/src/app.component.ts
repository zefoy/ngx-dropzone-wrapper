import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'my-app',
  template: require('app.component.html'),
  styles: [require('app.component.css'), require('dropzone/dist/min/dropzone.min.css')]
})
export class AppComponent {
  private title = 'Simple example app for the angular2-dropzone-wrapper';

  constructor() { }

  onUploadDone(event: any) {
    console.log('onUploadDone:', event);
  }

  onUploadError(event: any) {
    console.log('onUploadError:', event.msg);
  }
}
