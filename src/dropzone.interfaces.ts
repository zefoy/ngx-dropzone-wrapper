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

  constructor(config: DropzoneConfigInterface = {}) {
    this.assign(config);
  }

  public assign(config: DropzoneConfigInterface = {}) {
    for (var key in config) {
      this[key] = config[key];
    }
  }
}
