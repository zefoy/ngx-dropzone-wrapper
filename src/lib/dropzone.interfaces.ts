import * as Dropzone from 'dropzone';

// http://www.dropzonejs.com/#event-list

export const DropzoneEvents = [
  'error',
  'success',
  'sending',
  'canceled',
  'complete',
  'processing',

  'drop',
  'dragstart',
  'dragend',
  'dragenter',
  'dragover',
  'dragleave',

  'thumbnail',
  'addedfile',
  'removedfile',
  'uploadprogress',
  'maxfilesreached',
  'maxfilesexceeded',

  'successmultiple',
  'sendingmultiple',
  'canceledmultiple',
  'completemultiple',
  'processingmultiple',

  'reset',
  'queuecomplete',
  'totaluploadprogress'
];

export interface DropzoneConfigInterface {
  timeout?: number,

  autoReset?: number,
  errorReset?: number,
  cancelReset?: number,

  url?: any | string,
  method?: any | string,

  params?: any,
  headers?: any,

  init?: any,
  accept?: any,
  resize?: any,
  fallback?: any,
  renameFile?: any,
  transformFile?: any,
  chunksUploaded?: any,

  withCredentials?: boolean,

  previewsContainer?: any,
  hiddenInputContainer?: any,

  clickable?: string | string[] | boolean,
  paramName?: string,
  capture?: string,
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
  autoQueue?: boolean,
  autoProcessQueue?: boolean,
  ignoreHiddenFiles?: boolean,
  maxThumbnailFilesize?: number,
  createImageThumbnails?: boolean,

  chunking?: boolean,
  chunkSize?: number,
  retryChunks?: boolean,
  forceChunking?: boolean,
  retryChunksLimit?: number,
  parallelChunkUploads?: boolean,

  dictFileSizeUnits?: any,

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

  url: any | string;
  method: any | string;

  params: any;
  headers: any;

  init: any;
  accept: any;
  resize: any;
  fallback: any;
  renameFile: any;
  transformFile: any;
  chunksUploaded: any;

  withCredentials: boolean;

  previewsContainer: any;
  hiddenInputContainer: any;

  clickable: string | string[] | boolean;
  paramName: string;
  capture: string;
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
  autoQueue: boolean;
  autoProcessQueue: boolean;
  ignoreHiddenFiles: boolean;
  maxThumbnailFilesize: number;
  createImageThumbnails: boolean;

  chunking: boolean;
  chunkSize: number;
  retryChunks: boolean;
  forceChunking: boolean;
  retryChunksLimit: number;
  parallelChunkUploads: boolean;

  dictFileSizeUnits: any;

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

  assign(config: DropzoneConfigInterface | any = {}, target?: any) {
    target = target || this;

    for (const key in config) {
      if (config[key] != null && !(Array.isArray(config[key])) &&
        typeof config[key] === 'object' && !(config[key] instanceof HTMLElement))
      {
        target[key] = {};

        this.assign(config[key], target[key]);
      } else {
        target[key] = config[key];
      }
    }
  }
}
