import * as Dropzone from 'dropzone';

import { Directive,
  OnInit, DoCheck, OnChanges, OnDestroy,
  Input, Output, HostBinding, EventEmitter,
  NgZone, Renderer2, ElementRef, Optional, Inject,
  SimpleChanges, KeyValueDiffer, KeyValueDiffers } from '@angular/core';

import { DROPZONE_CONFIG } from './dropzone.interfaces';
import { DropzoneEvents, DropzoneConfig, DropzoneConfigInterface } from './dropzone.interfaces';

@Directive({
  selector: '[dropzone]'
})
export class DropzoneDirective implements OnInit, DoCheck, OnChanges, OnDestroy {
  private instance: any;

  private configDiff: KeyValueDiffer<string, any>;

  @Input() disabled: boolean = false;

  @Input('dropzone') config: DropzoneConfigInterface;

  @Output('drop'                  ) DZ_DROP                     = new EventEmitter<any>();
  @Output('dragstart'             ) DZ_DRAGSTART                = new EventEmitter<any>();
  @Output('dragend'               ) DZ_DRAGEND                  = new EventEmitter<any>();
  @Output('dragenter'             ) DZ_DRAGENTER                = new EventEmitter<any>();
  @Output('dragover'              ) DZ_DRAGOVER                 = new EventEmitter<any>();
  @Output('dragleave'             ) DZ_DRAGLEAVE                = new EventEmitter<any>();

  @Output('error'                 ) DZ_ERROR                    = new EventEmitter<any>();
  @Output('success'               ) DZ_SUCCESS                  = new EventEmitter<any>();
  @Output('sending'               ) DZ_SENDING                  = new EventEmitter<any>();
  @Output('canceled'              ) DZ_CANCELED                 = new EventEmitter<any>();
  @Output('complete'              ) DZ_COMPLETE                 = new EventEmitter<any>();
  @Output('processing'            ) DZ_PROCESSING               = new EventEmitter<any>();

  @Output('thumbnail'             ) DZ_THUMBNAIL                = new EventEmitter<any>();
  @Output('addedfile'             ) DZ_ADDEDFILE                = new EventEmitter<any>();
  @Output('removedfile'           ) DZ_REMOVEDFILE              = new EventEmitter<any>();
  @Output('uploadprogress'        ) DZ_UPLOADPROGRESS           = new EventEmitter<any>();
  @Output('maxfilesreached'       ) DZ_MAXFILESREACHED          = new EventEmitter<any>();
  @Output('maxfilesexceeded'      ) DZ_MAXFILESEXCEEDED         = new EventEmitter<any>();

  @Output('successmultiple'       ) DZ_SUCCESSMULTIPLE          = new EventEmitter<any>();
  @Output('sendingmultiple'       ) DZ_SENDINGMULTIPLE          = new EventEmitter<any>();
  @Output('canceledmultiple'      ) DZ_CANCELEDMULTIPLE         = new EventEmitter<any>();
  @Output('completemultiple'      ) DZ_COMPLETEMULTIPLE         = new EventEmitter<any>();
  @Output('processingmultiple'    ) DZ_PROCESSINGMULTIPLE       = new EventEmitter<any>();

  @Output('reset'                 ) DZ_RESET                    = new EventEmitter<any>();
  @Output('queuecomplete'         ) DZ_QUEUECOMPLETE            = new EventEmitter<any>();
  @Output('totaluploadprogress'   ) DZ_TOTALUPLOADPROGRESS      = new EventEmitter<any>();

  constructor(private zone: NgZone, private renderer: Renderer2,
    private elementRef: ElementRef, private differs: KeyValueDiffers,
    @Optional() @Inject(DROPZONE_CONFIG) private defaults: DropzoneConfigInterface)
  {
    /* tslint:disable */
    eval('Dropzone.autoDiscover = false');
    /* tslint:enable */
  }

  ngOnInit() {
    const params = new DropzoneConfig(this.defaults);

    params.assign(this.config); // Custom configuration

    this.renderer.addClass(this.elementRef.nativeElement,
      (params.maxFiles === 1) ? 'dz-single' : 'dz-multiple');

    this.renderer.removeClass(this.elementRef.nativeElement,
      (params.maxFiles === 1) ? 'dz-multiple' : 'dz-single');

    this.zone.runOutsideAngular(() => {
      this.instance = new Dropzone(this.elementRef.nativeElement, params);
    });

    // Add auto reset handling for events
    this.instance.on('success', (result) => {
      if (params.autoReset != null) {
        setTimeout(() => this.reset(), params.autoReset);
      }
    });

    this.instance.on('error', (error) => {
      if (params.errorReset != null) {
        setTimeout(() => this.reset(), params.errorReset);
      }
    });

    this.instance.on('canceled', (result) => {
      if (params.cancelReset != null) {
        setTimeout(() => this.reset(), params.cancelReset);
      }
    });

    // Add native dropzone event handling
    DropzoneEvents.forEach((eventName) => {
      this.instance.on(eventName, (...args) => {
        args = (args.length === 1) ? args[0] : args;

        if (this[`DZ_${eventName.toUpperCase()}`]) {
          this.zone.run(() => {
            this[`DZ_${eventName.toUpperCase()}`].emit(args);
          });
        }
      });
    });

    if (!this.configDiff) {
      this.configDiff = this.differs.find(this.config || {}).create();

      this.configDiff.diff(this.config || {});
    }
  }

  ngDoCheck() {
    if (!this.disabled && this.configDiff) {
      const changes = this.configDiff.diff(this.config || {});

      if (changes && this.instance) {
        this.ngOnDestroy();

        this.ngOnInit();
      }
    }
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      this.instance.destroy();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.instance && changes['disabled']) {
      if (changes['disabled'].currentValue !== changes['disabled'].previousValue) {
        if (changes['disabled'].currentValue === false) {
          this.zone.runOutsideAngular(() => {
            this.instance.enable();
          });
        } else if (changes['disabled'].currentValue === true) {
          this.zone.runOutsideAngular(() => {
            this.instance.disable();
          });
        }
      }
    }
  }

  dropzone(): any {
    return this.instance;
  }

  reset(cancel?: boolean) {
    this.zone.runOutsideAngular(() => {
      this.instance.removeAllFiles(cancel);
    });
  }
}
