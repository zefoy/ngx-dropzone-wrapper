import { Component, Input, HostBinding, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';

import { DropzoneDirective } from './dropzone.directive';
import { DropzoneConfigInterface } from './dropzone.interfaces';

@Component({
  selector: 'dropzone',
  exportAs: 'dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DropzoneComponent {
  @Input() disabled: boolean = false;

  @Input() config: DropzoneConfigInterface;

  @Input() message: string = 'Click or drag files to upload';
  @Input() placeholder: string = '';

  @Input() runInsideAngular: boolean = false;
  @Input() useDropzoneClass: boolean = true;

  @HostBinding('class.dz-wrapper')
  @Input() useDzWrapperClass: boolean = true;

  @ViewChild(DropzoneDirective) directiveRef: DropzoneDirective;

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

  constructor() {}

  reset() {
    console.warn('Deprecated function, reset needs to be called through directiveRef!');

    this.directiveRef.reset();
  }

  getPlaceholder() {
    return 'url(' + encodeURI(this.placeholder) + ')';
  }
}
