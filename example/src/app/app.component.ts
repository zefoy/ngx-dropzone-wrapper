import { Component, ViewChild } from '@angular/core';

import { DropzoneComponent , DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
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

  reset() {
    if (this.type === 'component') {
      this.componentRef.directiveRef.reset();
    } else {
      this.directiveRef.reset();
    }
  }

  toggleType() {
    this.type = this.type == 'component' ? 'directive' : 'component';
  }

  toggleAutoReset() {
    this.config.autoReset = this.config.autoReset ? null : 5000;
    this.config.errorReset = this.config.errorReset ? null : 5000;
    this.config.cancelReset = this.config.cancelReset ? null : 5000;
  }

  toggleMultiUpload() {
    this.config.maxFiles = this.config.maxFiles ? null : 1;
  }

  toggleClickAction() {
    this.config.clickable = !this.config.clickable;
  }

  toggleDisabledState() {
    this.disabled = !this.disabled;
  }

  onUploadError(args: any) {
    console.log('onUploadError:', args);
  }

  onUploadSuccess(args: any) {
    console.log('onUploadSuccess:', args);
  }
}
