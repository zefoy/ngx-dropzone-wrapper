import { Directive, Optional, OnInit, DoCheck, OnChanges, OnDestroy, Input, Output } from '@angular/core';
import { NgZone, EventEmitter, ElementRef, Renderer, SimpleChanges, KeyValueDiffers } from '@angular/core';

import { AngularDropzone, DropzoneEvents, DropzoneConfig, DropzoneConfigInterface } from './dropzone.interfaces';

@Directive({
  selector: '[dropzone]'
})
export class DropzoneDirective implements OnInit, DoCheck, OnChanges, OnDestroy {
  public dropzone: any;

  private configDiff: any;

  @Input() disabled: boolean = false;

  @Input() runInsideAngular: boolean = false;

  @Input('dropzone') config: DropzoneConfigInterface;

  @Input('useDropzoneClass') useDropzoneClass: boolean = true;

  @Output('drop'               ) DZ_DROP                = new EventEmitter<any>();
  @Output('dragstart'          ) DZ_DRAGSTART           = new EventEmitter<any>();
  @Output('dragend'            ) DZ_DRAGEND             = new EventEmitter<any>();
  @Output('dragenter'          ) DZ_DRAGENTER           = new EventEmitter<any>();
  @Output('dragover'           ) DZ_DRAGOVER            = new EventEmitter<any>();
  @Output('dragleave'          ) DZ_DRAGLEAVE           = new EventEmitter<any>();

  @Output('addedfile'          ) DZ_ADDEDFILE           = new EventEmitter<any>();
  @Output('removedfile'        ) DZ_REMOVEDFILE         = new EventEmitter<any>();
  @Output('thumbnail'          ) DZ_THUMBNAIL           = new EventEmitter<any>();
  @Output('error'              ) DZ_ERROR               = new EventEmitter<any>();
  @Output('processing'         ) DZ_PROCESSING          = new EventEmitter<any>();
  @Output('uploadprogress'     ) DZ_UPLOADPROGRESS      = new EventEmitter<any>();
  @Output('sending'            ) DZ_SENDING             = new EventEmitter<any>();
  @Output('success'            ) DZ_SUCCESS             = new EventEmitter<any>();
  @Output('complete'           ) DZ_COMPLETE            = new EventEmitter<any>();
  @Output('canceled'           ) DZ_CANCELED            = new EventEmitter<any>();
  @Output('maxfilesreached'    ) DZ_MAXFILESREACHED     = new EventEmitter<any>();
  @Output('maxfilesexceeded'   ) DZ_MAXFILESEXCEEDED    = new EventEmitter<any>();

  @Output('processingmultiple' ) DZ_PROCESSINGMULTIPLE  = new EventEmitter<any>();
  @Output('sendingmultiple'    ) DZ_SENDINGMULTIPLE     = new EventEmitter<any>();
  @Output('successmultiple'    ) DZ_SUCCESSMULTIPLE     = new EventEmitter<any>();
  @Output('completemultiple'   ) DZ_COMPLETEMULTIPLE    = new EventEmitter<any>();
  @Output('canceledmultiple'   ) DZ_CANCELEDMULTIPLE    = new EventEmitter<any>();

  @Output('totaluploadprogress') DZ_TOTALUPLOADPROGRESS = new EventEmitter<any>();
  @Output('reset'              ) DZ_RESET               = new EventEmitter<any>();
  @Output('queuecomplete'      ) DZ_QUEUECOMPLETE       = new EventEmitter<any>();

  constructor(private zone: NgZone, private renderer: Renderer, private elementRef: ElementRef,
    private differs: KeyValueDiffers, @Optional() private defaults: DropzoneConfig ) {}

  ngOnInit() {
    const element = this.elementRef.nativeElement;

    const options = new DropzoneConfig(this.defaults);

    options.assign(this.config); // Custom config

    this.renderer.setElementClass(this.elementRef.nativeElement,
      'dropzone', this.useDropzoneClass);

    this.renderer.setElementClass(this.elementRef.nativeElement,
      'dz-single', (options.maxFiles === 1));

    this.renderer.setElementClass(this.elementRef.nativeElement,
      'dz-multiple', (options.maxFiles !== 1));

    if (this.runInsideAngular) {
      this.dropzone = new AngularDropzone(element, options);
    } else {
      this.zone.runOutsideAngular(() => {
         this.dropzone = new AngularDropzone(element, options);
      });
    }

    // Add auto reset handling for events
    this.dropzone.on('error', (error) => {
      if (options.errorReset != null) {
        setTimeout(() => this.reset(), options.errorReset);
      }
    });

    this.dropzone.on('success', (result) => {
      if (options.autoReset != null) {
        setTimeout(() => this.reset(), options.autoReset);
      }
    });

    this.dropzone.on('canceled', (result) => {
      if (options.cancelReset != null) {
        setTimeout(() => this.reset(), options.cancelReset);
      }
    });

    // Add native dropzone event handling
    DropzoneEvents.forEach((eventName) => {
      this.dropzone.on(eventName, (...args) => {
        if (args.length === 1) {
          args = args[0];
        }

        if (this[`DZ_${eventName.toUpperCase()}`]) {
          this.zone.run(() => {
            this[`DZ_${eventName.toUpperCase()}`].emit(args);
          });
        }
      });
    });


    if (!this.configDiff) {
      this.configDiff = this.differs.find(this.config || {}).create(null);
    }
  }

  ngDoCheck() {
    if (!this.disabled && this.configDiff) {
      const changes = this.configDiff.diff(this.config || {});

      if (changes && this.dropzone) {
        this.ngOnDestroy();

        this.ngOnInit();
      }
    }
  }

  ngOnDestroy() {
    if (this.runInsideAngular) {
      this.dropzone.destroy();
    } else {
      this.zone.runOutsideAngular(() => {
        this.dropzone.destroy();
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.dropzone && changes['disabled']) {
      if (changes['disabled'].currentValue !== changes['disabled'].previousValue) {
        if (changes['disabled'].currentValue === false) {
          if (this.runInsideAngular) {
            this.dropzone.enable();
          } else {
            this.zone.runOutsideAngular(() => {
              this.dropzone.enable();
            });
          }
        } else if (changes['disabled'].currentValue === true) {
          if (this.runInsideAngular) {
            this.dropzone.disable();
          } else {
            this.zone.runOutsideAngular(() => {
              this.dropzone.disable();
            });
          }
        }
      }
    }
  }

  reset() {
    if (this.runInsideAngular) {
      this.dropzone.removeAllFiles();
    } else {
      this.zone.runOutsideAngular(() => {
        this.dropzone.removeAllFiles();
      });
    }
  }
}
