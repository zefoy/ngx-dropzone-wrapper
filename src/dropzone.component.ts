const Dropzone = require('dropzone');

import { OnInit, Output, Input, Optional, Component, ElementRef, EventEmitter } from '@angular/core';

import { DropzoneConfig } from './dropzone.interfaces'

@Component({
  selector: 'dropzone-upload',
  template: require('./dropzone.component.html'),
  styles: [require('./dropzone.component.scss')]
})
export class DropzoneComponent implements OnInit {
  private dropzone: any;
  private dropzoneElement: any;

  @Output() uploadDone = new EventEmitter<any>();
  @Output() uploadError = new EventEmitter<Object>();

  @Input() placeholderText: string = "Click or drop files to upload";

  constructor( private elementRef: ElementRef, @Optional() private config: DropzoneConfig ) {
    this.config = config;

    this.dropzoneElement = elementRef.nativeElement;
  }

  ngOnInit() {
    this.dropzone = new Dropzone(this.dropzoneElement, this.config);

    this.dropzone.on('error', (err) => {
      this.uploadError.emit({msg: "Upload errored", error: err});

      setTimeout(() => {
        this.dropzone.removeAllFiles();
      }, 5000);
    });

    this.dropzone.on('success', (res) => {
      this.uploadDone.emit(res);

      setTimeout(() => {
        this.dropzone.removeAllFiles();
      }, 5000);
    });
  }
}
