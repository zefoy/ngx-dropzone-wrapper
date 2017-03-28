import * as Dropzone from 'dropzone';

import { NgZone, Renderer, SimpleChanges, KeyValueDiffers } from '@angular/core';
import { Directive, Optional, Input, Output, EventEmitter, ElementRef } from '@angular/core';

import { DropzoneEvents, DropzoneConfig, DropzoneConfigInterface } from './dropzone.interfaces';

@Directive({
  selector: '[dropzone]'
})
export class DropzoneDirective {
  private dropzone: any;

  private configDiff: any;

  @Input() disabled: boolean = false;

  @Input() runInsideAngular: boolean = false;

  @Input('dropzone') config: DropzoneConfigInterface;

  @Output('drop'               ) dz_drop                = new EventEmitter<any>();
  @Output('dragstart'          ) dz_dragstart           = new EventEmitter<any>();
  @Output('dragend'            ) dz_dragend             = new EventEmitter<any>();
  @Output('dragenter'          ) dz_dragenter           = new EventEmitter<any>();
  @Output('dragover'           ) dz_dragover            = new EventEmitter<any>();
  @Output('dragleave'          ) dz_dragleave           = new EventEmitter<any>();
  @Output('addedfile'          ) dz_addedfile           = new EventEmitter<any>();
  @Output('removedfile'        ) dz_removedfile         = new EventEmitter<any>();
  @Output('thumbnail'          ) dz_thumbnail           = new EventEmitter<any>();
  @Output('error'              ) dz_error               = new EventEmitter<any>();
  @Output('processing'         ) dz_processing          = new EventEmitter<any>();
  @Output('uploadprogress'     ) dz_uploadprogress      = new EventEmitter<any>();
  @Output('sending'            ) dz_sending             = new EventEmitter<any>();
  @Output('success'            ) dz_success             = new EventEmitter<any>();
  @Output('complete'           ) dz_complete            = new EventEmitter<any>();
  @Output('canceled'           ) dz_canceled            = new EventEmitter<any>();
  @Output('maxfilesreached'    ) dz_maxfilesreached     = new EventEmitter<any>();
  @Output('maxfilesexceeded'   ) dz_maxfilesexceeded    = new EventEmitter<any>();
  @Output('processingmultiple' ) dz_processingmultiple  = new EventEmitter<any>();
  @Output('sendingmultiple'    ) dz_sendingmultiple     = new EventEmitter<any>();
  @Output('successmultiple'    ) dz_successmultiple     = new EventEmitter<any>();
  @Output('completemultiple'   ) dz_completemultiple    = new EventEmitter<any>();
  @Output('canceledmultiple'   ) dz_canceledmultiple    = new EventEmitter<any>();
  @Output('totaluploadprogress') dz_totaluploadprogress = new EventEmitter<any>();
  @Output('reset'              ) dz_reset               = new EventEmitter<any>();
  @Output('queuecomplete'      ) dz_queuecomplete       = new EventEmitter<any>();

  constructor(private zone: NgZone, private renderer: Renderer, private elementRef: ElementRef,
    private differs: KeyValueDiffers, @Optional() private defaults: DropzoneConfig ) {
    Dropzone.autoDiscover = false;

    renderer.setElementClass(elementRef.nativeElement, 'dropzone', true);
  }

  ngOnInit() {
    let element = this.elementRef.nativeElement;

    let options = new DropzoneConfig(this.defaults);

    options.assign(this.config); // Custom config

    if (this.runInsideAngular) {
      this.dropzone = new Dropzone(element, options);
    } else {
      this.zone.runOutsideAngular(() => {
         this.dropzone = new Dropzone(element, options);
      });
    }

    if (this.disabled) {
      if (this.runInsideAngular) {
        this.dropzone.disable();
      } else {
        this.zone.runOutsideAngular(() => {
          this.dropzone.disable();
        });
      }
    }

    // Add native dropzone event handling
    DropzoneEvents.forEach((eventName) => {
      let self = this;

      this.dropzone.on(eventName, function(event) {
        let args = Array.prototype.slice.call(arguments);

        if (args.length === 1) {
          args = args[0];
        }

        self[`dz_${eventName}`].emit(args);
      });
    });


    if (!this.configDiff) {
      this.configDiff = this.differs.find(this.config || {}).create(null);
    }
  }

  ngDoCheck() {
    let changes = this.configDiff.diff(this.config || {});

    if (changes && this.dropzone) {
      this.ngOnDestroy();

      this.ngOnInit();
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
      if (changes['disabled'].currentValue != changes['disabled'].previousValue) {
        if (changes['disabled'].currentValue === true) {
          if (this.runInsideAngular) {
            this.dropzone.enable();
          } else {
            this.zone.runOutsideAngular(() => {
              this.dropzone.enable();
            });
          }
        } else if (changes['disabled'].currentValue === false) {
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
