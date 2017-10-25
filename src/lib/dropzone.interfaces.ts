import { InjectionToken } from '@angular/core';

export const DROPZONE_CONFIG = new InjectionToken('DROPZONE_CONFIG');

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

  params?: any | DropzoneParamsFunction,
  headers?: any | DropzoneHeadersFunction,

  init?: DropzoneInitFunction,
  accept?: DropzoneAcceptFunction,
  resize?: DropzoneResizeFunction,
  fallback?: DropzoneFallbackFunction,
  renameFile?: DropzoneRenameFileFunction,
  transformFile?: DropzoneTransformFileFunction,

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

  url: string;
  method: string;

  params: any | DropzoneParamsFunction;
  headers: any | DropzoneHeadersFunction;

  init: DropzoneInitFunction;
  accept: DropzoneAcceptFunction;
  resize: DropzoneResizeFunction;
  fallback: DropzoneFallbackFunction;
  renameFile: DropzoneRenameFileFunction;
  transformFile: DropzoneTransformFileFunction;

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
    const copy = (JSON.parse(JSON.stringify(config || {})));

    Object.assign(this, copy);
  }
}

export type DropzoneParamsFunction = (files: any, xhr: any, chunk: any) => any;
export type DropzoneHeadersFunction = () => any;

export type DropzoneInitFunction = () => any;
export type DropzoneFallbackFunction = () => HTMLElement;

export type DropzoneAcceptFunction = (file: File, done: Function) => any;
export type DropzoneResizeFunction = (file: File, width: number, height: number, resizeMethod: string) => any;

export type DropzoneRenameFileFunction = (file: File) => string;
export type DropzoneTransformFileFunction = (file: File, done: Function) => any;
