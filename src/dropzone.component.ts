declare var require: any;

const Dropzone = require('dropzone');

import { Component, Optional, OnInit, DoCheck, OnDestroy, OnChanges, SimpleChanges, Input, Output, HostBinding, EventEmitter, ElementRef, KeyValueDiffers, ViewEncapsulation } from '@angular/core';

import { DropzoneConfig, DropzoneConfigInterface } from './dropzone.interfaces'

@Component({
  selector: 'dropzone',
  template: require('dropzone.component.html'),
  styles: [require('dropzone.component.scss'), require('dropzone/dist/min/dropzone.min.css')],
  encapsulation: ViewEncapsulation.None
})
export class DropzoneComponent implements OnInit, DoCheck, OnDestroy, OnChanges {
  public dropzone: any;

  private configDiff: any;

  @Input() disabled: boolean = false;

  @Input() config: DropzoneConfigInterface;

  @Input() message: string = 'Click or drag files to upload';
  @Input() placeholder: string = '';

  @Output() uploadError = new EventEmitter<any>();
  @Output() uploadSuccess = new EventEmitter<any>();
  @Output() uploadCanceled = new EventEmitter<any>();

  @HostBinding('class.dropzone') @Input() useDropzoneClass: boolean = true;
  @HostBinding('class.dz-wrapper') @Input() useDzWrapperClass: boolean = true;

  constructor( private elementRef: ElementRef, private differs : KeyValueDiffers, @Optional() private defaults: DropzoneConfig ) {
    Dropzone.autoDiscover = false;
  }

  ngOnInit() {
    let element = this.elementRef.nativeElement;

    let options = new DropzoneConfig(this.defaults);

    options.assign(this.config); // Custom config

    this.dropzone = new Dropzone(element, options);

    if (this.disabled) {
      this.dropzone.disable();
    }

    this.dropzone.on('error', (err) => {
      this.uploadError.emit(err);

      if (options.errorReset != null) {
        setTimeout(() => this.reset(), options.errorReset);
      }
    });

    this.dropzone.on('success', (res) => {
      this.uploadSuccess.emit(res);

      if (options.autoReset != null) {
        setTimeout(() => this.reset(), options.autoReset);
      }
    });

    this.dropzone.on('canceled', (res) => {
      this.uploadCanceled.emit(res);

      if (options.cancelReset != null) {
        setTimeout(() => this.reset(), options.cancelReset);
      }
    });

    if (!this.configDiff) {
      this.configDiff = this.differs.find(this.config || {}).create(null);
    }
  }

  ngDoCheck() {
    let changes = this.configDiff.diff(this.config);

    if (changes) {
      this.ngOnDestroy();

      this.ngOnInit();
    }
  }

  ngOnDestroy() {
    this.dropzone.destroy();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.dropzone && changes['disabled']) {
      if (changes['disabled'].currentValue != changes['disabled'].previousValue) {
        if (changes['disabled'].currentValue === true) {
          this.dropzone.enable();
        } else if (changes['disabled'].currentValue === false) {
          this.dropzone.disable();
        }
      }
    }
  }

  reset() {
    this.dropzone.removeAllFiles();
  }
}
