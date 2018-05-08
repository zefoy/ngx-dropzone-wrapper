import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, Component,
  OnInit, Input, Output, EventEmitter,
  ViewChild, ViewEncapsulation } from '@angular/core';

import { DropzoneDirective } from './dropzone.directive';
import { DropzoneEvents, DropzoneConfigInterface } from './dropzone.interfaces';

@Component({
  selector: 'dropzone',
  exportAs: 'ngxDropzone',
  templateUrl: '../../dist/lib/dropzone.component.html',
  styleUrls: [ '../../dist/lib/dropzone.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class DropzoneComponent implements OnInit {
  @Input() disabled: boolean = false;

  @Input() config: DropzoneConfigInterface;

  @Input() message: string = 'Click or drag files to upload';
  @Input() placeholder: string = '';

  @Input() useDropzoneClass: boolean = true;

  @ViewChild(DropzoneDirective) directiveRef: DropzoneDirective;

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
  @Output('removedFile'           ) DZ_REMOVEDFILE              = new EventEmitter<any>();
  @Output('uploadProgress'        ) DZ_UPLOADPROGRESS           = new EventEmitter<any>();
  @Output('maxFilesReached'       ) DZ_MAXFILESREACHED          = new EventEmitter<any>();
  @Output('maxFilesExceeded'      ) DZ_MAXFILESEXCEEDED         = new EventEmitter<any>();

  @Output('successMultiple'       ) DZ_SUCCESSMULTIPLE          = new EventEmitter<any>();
  @Output('sendingMultiple'       ) DZ_SENDINGMULTIPLE          = new EventEmitter<any>();
  @Output('canceledMultiple'      ) DZ_CANCELEDMULTIPLE         = new EventEmitter<any>();
  @Output('completeMultiple'      ) DZ_COMPLETEMULTIPLE         = new EventEmitter<any>();
  @Output('processingMultiple'    ) DZ_PROCESSINGMULTIPLE       = new EventEmitter<any>();

  @Output('reset'                 ) DZ_RESET                    = new EventEmitter<any>();
  @Output('queueComplete'         ) DZ_QUEUECOMPLETE            = new EventEmitter<any>();
  @Output('totalUploadProgress'   ) DZ_TOTALUPLOADPROGRESS      = new EventEmitter<any>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    window.setTimeout(() => {
      if (this.directiveRef) {
        DropzoneEvents.forEach((eventName: string) => {
          eventName = `DZ_${eventName.toUpperCase()}`;

          this.directiveRef[eventName] = this[eventName];
        });
      }
    }, 0);
  }

  public getPlaceholder(): string {
    return 'url(' + encodeURI(this.placeholder) + ')';
  }
}
