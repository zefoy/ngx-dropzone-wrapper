import * as Dropzone from 'dropzone';

import { Directive, Optional, Inject, OnInit, DoCheck, OnChanges, OnDestroy, Input, Output,
  NgZone, EventEmitter, ElementRef, Renderer, SimpleChanges, KeyValueDiffers } from '@angular/core';

import { DROPZONE_CONFIG } from './dropzone.interfaces';

import { DropzoneEvents, DropzoneConfig, DropzoneConfigInterface } from './dropzone.interfaces';

@Directive({
  selector: '[dropzone]'
})
export class DropzoneDirective implements OnInit, DoCheck, OnChanges, OnDestroy {
  public dropzone: any;

  private configDiff: any;

  @Input() disabled: boolean = false;

  @Input('dropzone') config: DropzoneConfigInterface;

  @Input('useDropzoneClass') useDropzoneClass: boolean = true;

  @Output('drop'                  ) DZ_DROP                     = new EventEmitter<any>();
  @Output('dragstart'             ) DZ_DRAGSTART                = new EventEmitter<any>();
  @Output('dragend'               ) DZ_DRAGEND                  = new EventEmitter<any>();
  @Output('dragenter'             ) DZ_DRAGENTER                = new EventEmitter<any>();
  @Output('dragover'              ) DZ_DRAGOVER                 = new EventEmitter<any>();
  @Output('dragleave'             ) DZ_DRAGLEAVE                = new EventEmitter<any>();

  @Output('addedfile'             ) DZ_ADDEDFILE                = new EventEmitter<any>();
  @Output('removedfile'           ) DZ_REMOVEDFILE              = new EventEmitter<any>();
  @Output('thumbnail'             ) DZ_THUMBNAIL                = new EventEmitter<any>();
  @Output('error'                 ) DZ_ERROR                    = new EventEmitter<any>();
  @Output('processing'            ) DZ_PROCESSING               = new EventEmitter<any>();
  @Output('uploadprogress'        ) DZ_UPLOADPROGRESS           = new EventEmitter<any>();
  @Output('sending'               ) DZ_SENDING                  = new EventEmitter<any>();
  @Output('success'               ) DZ_SUCCESS                  = new EventEmitter<any>();
  @Output('complete'              ) DZ_COMPLETE                 = new EventEmitter<any>();
  @Output('canceled'              ) DZ_CANCELED                 = new EventEmitter<any>();
  @Output('maxfilesreached'       ) DZ_MAXFILESREACHED          = new EventEmitter<any>();
  @Output('maxfilesexceeded'      ) DZ_MAXFILESEXCEEDED         = new EventEmitter<any>();

  @Output('processingmultiple'    ) DZ_PROCESSINGMULTIPLE       = new EventEmitter<any>();
  @Output('sendingmultiple'       ) DZ_SENDINGMULTIPLE          = new EventEmitter<any>();
  @Output('successmultiple'       ) DZ_SUCCESSMULTIPLE          = new EventEmitter<any>();
  @Output('completemultiple'      ) DZ_COMPLETEMULTIPLE         = new EventEmitter<any>();
  @Output('canceledmultiple'      ) DZ_CANCELEDMULTIPLE         = new EventEmitter<any>();

  @Output('totaluploadprogress'   ) DZ_TOTALUPLOADPROGRESS      = new EventEmitter<any>();
  @Output('reset'                 ) DZ_RESET                    = new EventEmitter<any>();
  @Output('queuecomplete'         ) DZ_QUEUECOMPLETE            = new EventEmitter<any>();

  constructor(private zone: NgZone, private renderer: Renderer, private elementRef: ElementRef,
    private differs: KeyValueDiffers, @Optional() @Inject(DROPZONE_CONFIG) private defaults: DropzoneConfigInterface)
  {
    /* tslint:disable */
    eval('Dropzone.autoDiscover = false');
    /* tslint:enable */
  }

  ngOnInit() {
    const params = new DropzoneConfig(this.defaults);

    Object.assign(params, this.config); // Custom config

    this.renderer.setElementClass(this.elementRef.nativeElement,
      'dropzone', this.useDropzoneClass);

    this.renderer.setElementClass(this.elementRef.nativeElement,
      'dz-single', (params.maxFiles === 1));

    this.renderer.setElementClass(this.elementRef.nativeElement,
      'dz-multiple', (params.maxFiles !== 1));

    this.zone.runOutsideAngular(() => {
      this.dropzone = new Dropzone(this.elementRef.nativeElement, params);
    });

    // Add auto reset handling for events
    this.dropzone.on('success', (result) => {
      if (params.autoReset != null) {
        setTimeout(() => this.reset(), params.autoReset);
      }
    });

    this.dropzone.on('error', (error) => {
      if (params.errorReset != null) {
        setTimeout(() => this.reset(), params.errorReset);
      }
    });

    this.dropzone.on('canceled', (result) => {
      if (params.cancelReset != null) {
        setTimeout(() => this.reset(), params.cancelReset);
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
      this.configDiff = this.differs.find(this.config || {}).create();
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
    this.zone.runOutsideAngular(() => {
      this.dropzone.destroy();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.dropzone && changes['disabled']) {
      if (changes['disabled'].currentValue !== changes['disabled'].previousValue) {
        if (changes['disabled'].currentValue === false) {
          this.zone.runOutsideAngular(() => {
            this.dropzone.enable();
          });
        } else if (changes['disabled'].currentValue === true) {
          this.zone.runOutsideAngular(() => {
            this.dropzone.disable();
          });
        }
      }
    }
  }

  reset() {
    this.zone.runOutsideAngular(() => {
      this.dropzone.removeAllFiles();
    });
  }
}
