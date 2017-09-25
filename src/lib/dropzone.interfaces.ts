// http://www.dropzonejs.com/#event-list

export const DropzoneEvents = [
  'drop',
  'dragstart',
  'dragend',
  'dragenter',
  'dragover',
  'dragleave',

  'addedfile',
  'removedfile',
  'thumbnail',
  'error',
  'processing',
  'uploadprogress',
  'sending',
  'success',
  'complete',
  'canceled',
  'maxfilesreached',
  'maxfilesexceeded',

  'processingmultiple',
  'sendingmultiple',
  'successmultiple',
  'completemultiple',
  'canceledmultiple',

  'totaluploadprogress',
  'reset',
  'queuecomplete'
];

export interface DropzoneConfigInterface {
  timeout?: number,

  autoReset?: number,
  errorReset?: number,
  cancelReset?: number,

  url?: string,
  method?: string,

  params?: Object,
  headers?: Object,

  init?: any,
  accept?: any,
  resize?: any,
  fallback?: any,
  renameFile?: any,

  previewsContainer?: any,
  hiddenInputContainer?: any,

  clickable?: string | string[] | boolean,
  paramName?: string,
  maxFiles?: number,
  maxFilesize?: number,
  filesizeBase?: number,
  acceptedFiles?: string,
  forceFallback?: boolean,
  addRemoveLinks?: boolean,
  uploadMultiple?: boolean,
  parallelUploads?: number,
  resizeWidth?: number,
  resizeHeight?: number,
  resizeMethod?: string,
  resizeQuality?: number,
  resizeMimeType?: string,
  thumbnailWidth?: number,
  thumbnailHeight?: number,
  thumbnailMethod?: string,
  previewTemplate?: string,
  autoProcessQueue?: boolean,
  maxThumbnailFilesize?: number,
  createImageThumbnails?: boolean,

  dictDefaultMessage?: string,
  dictFallbackMessage?: string,

  dictFileTooBig?: string,
  dictResponseError?: string,
  dictInvalidFileType?: string,

  dictRemoveFile?: string,
  dictCancelUpload?: string,
  dictFallbackText?: string,
  dictMaxFilesExceeded?: string,
  dictRemoveFileConfirmation?: string,
  dictCancelUploadConfirmation?: string
}

export class DropzoneConfig implements DropzoneConfigInterface {
  timeout: number;

  autoReset: number;
  errorReset: number;
  cancelReset: number;

  url: string;
  method: string;

  params: Object;
  headers: Object;

  init: any;
  accept: any;
  resize: any;
  fallback: any;
  renameFile: any;

  previewsContainer: any;
  hiddenInputContainer: any;

  clickable: string | string[] | boolean;
  paramName: string;
  maxFiles: number;
  maxFilesize: number;
  filesizeBase: number;
  acceptedFiles: string;
  forceFallback: boolean;
  addRemoveLinks: boolean;
  uploadMultiple: boolean;
  parallelUploads: number;
  resizeWidth: number;
  resizeHeight: number;
  resizeMethod: string;
  resizeQuality: number;
  resizeMimeType: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  thumbnailMethod: string;
  previewTemplate: string;
  autoProcessQueue: boolean;
  maxThumbnailFilesize: number;
  createImageThumbnails: boolean;

  dictDefaultMessage: string;
  dictFallbackMessage: string;

  dictFileTooBig: string;
  dictResponseError: string;
  dictInvalidFileType: string;

  dictRemoveFile: string;
  dictCancelUpload: string;
  dictFallbackText: string;
  dictMaxFilesExceeded: string;
  dictRemoveFileConfirmation: string;
  dictCancelUploadConfirmation: string;

  constructor(config: DropzoneConfigInterface = {}) {
    this.assign(config);
  }

  public assign(config: DropzoneConfigInterface = {}) {
    for (const key in config) {
      this[key] = config[key];
    }
  }
}
