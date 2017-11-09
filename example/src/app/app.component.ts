import { Component, ViewChild } from '@angular/core';

import { DropzoneComponent , DropzoneDirective,
  DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'my-app',
  moduleId: 'src/app/app.component',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  public type: string = 'component';

  public disabled: boolean = false;

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  @ViewChild(DropzoneComponent) componentRef: DropzoneComponent;
  @ViewChild(DropzoneDirective) directiveRef: DropzoneDirective;

  constructor() {}

  public toggleType() {
    this.type = (this.type === 'component') ? 'directive' : 'component';
  }

  public toggleDisabled() {
    this.disabled = !this.disabled;
  }

  public toggleAutoReset() {
    this.config.autoReset = this.config.autoReset ? null : 5000;
    this.config.errorReset = this.config.errorReset ? null : 5000;
    this.config.cancelReset = this.config.cancelReset ? null : 5000;
  }

  public toggleMultiUpload() {
    this.config.maxFiles = this.config.maxFiles ? null : 1;
  }

  public toggleClickAction() {
    this.config.clickable = !this.config.clickable;
  }

  public resetDropzoneUploads() {
    if (this.type === 'directive') {
      this.directiveRef.reset();
    } else {
      this.componentRef.directiveRef.reset();
    }
  }

  public onUploadError(args: any) {
    console.log('onUploadError:', args);
  }

  public onUploadSuccess(args: any) {
    console.log('onUploadSuccess:', args);
  }
}
