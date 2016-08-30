export interface DropzoneConfigInterface {
  url?: string,
  headers?: any
  maxFilesize?: number,
  acceptedFiles?: string
}

export class DropzoneConfig implements DropzoneConfigInterface {
  url: string;
  headers: any;
  maxFilesize: number;
  acceptedFiles: string;
}
