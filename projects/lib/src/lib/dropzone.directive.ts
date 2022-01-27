import _dz from 'dropzone';
// Fix until Dropzone types are updated
const Dropzone: typeof _dz = (_dz as any).Dropzone;

import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgZone, Inject, Optional, ElementRef, Renderer2, Directive,
  OnInit, OnDestroy, DoCheck, OnChanges, Input, Output, EventEmitter,
  SimpleChanges, KeyValueDiffer, KeyValueDiffers } from '@angular/core';

import { DROPZONE_CONFIG, DropzoneConfig, DropzoneConfigInterface,
  DropzoneEvent, DropzoneEvents } from './dropzone.interfaces';

@Directive({
  selector: '[dropzone]',
  exportAs: 'ngxDropzone'
})
export class DropzoneDirective implements OnInit, OnDestroy, DoCheck, OnChanges {
  private instance: any;

  private configDiff: KeyValueDiffer<string, any> | null = null;

  @Input() disabled: boolean = false;

  @Input('dropzone') config?: DropzoneConfigInterface;

  @Output('init'                  ) DZ_INIT                     = new EventEmitter<any>();

  @Output('error'                 ) DZ_ERROR                    = new EventEmitter<any>();
  @Output('success'               ) DZ_SUCCESS                  = new EventEmitter<any>();
  @Output('sending'               ) DZ_SENDING                  = new EventEmitter<any>();
  @Output('canceled'              ) DZ_CANCELED                 = new EventEmitter<any>();
  @Output('complete'              ) DZ_COMPLETE                 = new EventEmitter<any>();
  @Output('processing'            ) DZ_PROCESSING               = new EventEmitter<any>();

  @Output('drop'                  ) DZ_DROP                     = new EventEmitter<any>();
  @Output('dragStart'             ) DZ_DRAGSTART                = new EventEmitter<any>();
  @Output('dragEnd'               ) DZ_DRAGEND                  = new EventEmitter<any>();
  @Output('dragEnter'             ) DZ_DRAGENTER                = new EventEmitter<any>();
  @Output('dragOver'              ) DZ_DRAGOVER                 = new EventEmitter<any>();
  @Output('dragLeave'             ) DZ_DRAGLEAVE                = new EventEmitter<any>();

  @Output('thumbnail'             ) DZ_THUMBNAIL                = new EventEmitter<any>();
  @Output('addedFile'             ) DZ_ADDEDFILE                = new EventEmitter<any>();
  @Output('addedFiles'            ) DZ_ADDEDFILES               = new EventEmitter<any>();
  @Output('removedFile'           ) DZ_REMOVEDFILE              = new EventEmitter<any>();
  @Output('uploadProgress'        ) DZ_UPLOADPROGRESS           = new EventEmitter<any>();
  @Output('maxFilesReached'       ) DZ_MAXFILESREACHED          = new EventEmitter<any>();
  @Output('maxFilesExceeded'      ) DZ_MAXFILESEXCEEDED         = new EventEmitter<any>();

  @Output('errorMultiple'         ) DZ_ERRORMULTIPLE            = new EventEmitter<any>();
  @Output('successMultiple'       ) DZ_SUCCESSMULTIPLE          = new EventEmitter<any>();
  @Output('sendingMultiple'       ) DZ_SENDINGMULTIPLE          = new EventEmitter<any>();
  @Output('canceledMultiple'      ) DZ_CANCELEDMULTIPLE         = new EventEmitter<any>();
  @Output('completeMultiple'      ) DZ_COMPLETEMULTIPLE         = new EventEmitter<any>();
  @Output('processingMultiple'    ) DZ_PROCESSINGMULTIPLE       = new EventEmitter<any>();

  @Output('reset'                 ) DZ_RESET                    = new EventEmitter<any>();
  @Output('queueComplete'         ) DZ_QUEUECOMPLETE            = new EventEmitter<any>();
  @Output('totalUploadProgress'   ) DZ_TOTALUPLOADPROGRESS      = new EventEmitter<any>();

  constructor(private zone: NgZone, private renderer: Renderer2, private elementRef: ElementRef,
    private differs: KeyValueDiffers, @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(DROPZONE_CONFIG) private defaults: DropzoneConfigInterface) {
    const dz = Dropzone;

    dz.autoDiscover = false;
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const params = new DropzoneConfig(this.defaults);

    params.assign(this.config); // Custom configuration

    this.renderer.addClass(this.elementRef.nativeElement,
      (params.maxFiles === 1) ? 'dz-single' : 'dz-multiple');

    this.renderer.removeClass(this.elementRef.nativeElement,
      (params.maxFiles === 1) ? 'dz-multiple' : 'dz-single');

    this.zone.runOutsideAngular(() => {
      this.instance = new Dropzone(this.elementRef.nativeElement, params);
    });

    if (this.disabled) {
      this.instance.disable();
    }

    if (this.DZ_INIT.observers.length) {
      this.zone.run(() => {
        this.DZ_INIT.emit(this.instance);
      });
    }

    // Add auto reset handling for events
    this.instance.on('success', () => {
      if (params.autoReset != null) {
        setTimeout(() => this.reset(), params.autoReset);
      }
    });

    this.instance.on('error', () => {
      if (params.errorReset != null) {
        setTimeout(() => this.reset(), params.errorReset);
      }
    });

    this.instance.on('canceled', () => {
      if (params.cancelReset != null) {
        setTimeout(() => this.reset(), params.cancelReset);
      }
    });

    // Add native Dropzone event handling
    DropzoneEvents.forEach((eventName: DropzoneEvent) => {
      this.instance.on(eventName.toLowerCase(), (...args: any[]) => {
        args = (args.length === 1) ? args[0] : args;

        const output = `DZ_${eventName.toUpperCase()}`;

        const emitter = this[output as keyof DropzoneDirective] as EventEmitter<any>;

        if (emitter.observers.length > 0) {
          this.zone.run(() => {
            emitter.emit(args);
          });
        }
      });
    });

    if (!this.configDiff) {
      this.configDiff = this.differs.find(this.config || {}).create();

      this.configDiff.diff(this.config || {});
    }
  }

  ngOnDestroy(): void {
    if (this.instance) {
      this.zone.runOutsideAngular(() => {
        this.instance.destroy();
      });

      this.instance = null;
    }
  }

  ngDoCheck(): void {
    if (!this.disabled && this.configDiff) {
      const changes = this.configDiff.diff(this.config || {});

      if (changes && this.instance) {
        this.ngOnDestroy();

        this.ngOnInit();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
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

  public dropzone(): any {
    return this.instance;
  }

  public reset(cancel?: boolean): void {
    if (this.instance) {
      this.zone.runOutsideAngular(() => {
        this.instance.removeAllFiles(cancel);
      });
    }
  }
}
