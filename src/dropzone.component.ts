declare var require: any;

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
  public dropzone: any;

  private dropzoneConfig: any;
  private dropzoneElement: any;

  @Input() disabled: boolean = false;

  @Input() config: DropzoneConfigInterface;

  @Input() message: string = 'Click or drag files to upload';
  @Input() placeholder: string = '';

  @Output() uploadError = new EventEmitter<any>();
  @Output() uploadSuccess = new EventEmitter<any>();
  @Output() uploadCanceled = new EventEmitter<any>();

  @HostBinding('class.dropzone') useDropzoneClass = true;
  @HostBinding('class.dz-wrapper') useDzWrapperClass = true;

  constructor( private elementRef: ElementRef, @Optional() private defaults: DropzoneConfig ) {
    Dropzone.autoDiscover = false;

    this.dropzoneConfig = new DropzoneConfig(defaults);

    this.dropzoneElement = elementRef.nativeElement;
  }

  ngOnInit() {
    this.dropzone = new Dropzone(this.dropzoneElement, this.dropzoneConfig);

    this.dropzone.on('error', (err) => {
      this.uploadError.emit(err);

      if (this.dropzoneConfig.errorReset != null) {
        setTimeout(() => this.reset(), this.dropzoneConfig.errorReset);
      }
    });

    this.dropzone.on('success', (res) => {
      this.uploadSuccess.emit(res);

      if (this.dropzoneConfig.autoReset != null) {
        setTimeout(() => this.reset(), this.dropzoneConfig.autoReset);
      }
    });

    this.dropzone.on('canceled', (res) => {
      this.uploadCanceled.emit(res);

      if (this.dropzoneConfig.cancelReset != null) {
        setTimeout(() => this.reset(), this.dropzoneConfig.cancelReset);
      }
    });

    if (this.disabled) {
      this.dropzone.disable();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.dropzone) {
      if (changes['disabled']) {
        if (changes['disabled'].currentValue != changes['disabled'].previousValue) {
          if (changes['disabled'].currentValue === true) {
            this.dropzone.enable();
          } else if (changes['disabled'].currentValue === false) {
            this.dropzone.disable();
          }
        }
      }
    }

    this.dropzoneConfig.assign(this.defaults);

    this.dropzoneConfig.assign(this.config);
  }

  reset() {
    this.dropzone.removeAllFiles();
  }
}
