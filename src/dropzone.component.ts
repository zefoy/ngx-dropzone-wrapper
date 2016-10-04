const Dropzone = require('dropzone');

import { Component, ViewEncapsulation, OnInit, OnChanges, SimpleChanges, ElementRef, Input, Output, EventEmitter, HostBinding, Optional } from '@angular/core';

import { DropzoneConfig, DropzoneConfigInterface } from './dropzone.interfaces'

@Component({
  selector: 'dropzone',
  template: require('dropzone.component.html'),
  styles: [require('dropzone.component.scss'), require('dropzone/dist/min/dropzone.min.css')],
  encapsulation: ViewEncapsulation.None
})
export class DropzoneComponent implements OnInit, OnChanges {
  private dropzone: any;
  private dropzoneConfig: any;
  private dropzoneElement: any;

  @Input() config: DropzoneConfigInterface;

  @Input() placeholder: string = "Click or drop files to upload";

  @Output() uploadDone = new EventEmitter<any>();
  @Output() uploadError = new EventEmitter<Object>();

  @HostBinding('class.dropzone') useDropzoneClass = true;
  
  constructor( private elementRef: ElementRef, @Optional() private defaults: DropzoneConfig ) {
    this.dropzoneConfig = new DropzoneConfig(defaults);

    this.dropzoneElement = elementRef.nativeElement;
  }

  ngOnInit() {
    this.dropzone = new Dropzone(this.dropzoneElement, this.dropzoneConfig);

    this.dropzone.on('error', (err) => {
      this.uploadError.emit({msg: "Upload error", error: err});

      setTimeout(() => {
        this.dropzone.removeAllFiles();
      }, 5000);
    });

    this.dropzone.on('success', (res) => {
      this.uploadDone.emit(res);

      setTimeout(() => {
        this.dropzone.removeAllFiles();
      }, this.dropzoneConfig.previewDelay || 0);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dropzoneConfig.assign(this.defaults);

    this.dropzoneConfig.assign(this.config);
  }
}
