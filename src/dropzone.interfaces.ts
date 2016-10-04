export interface DropzoneConfigInterface {
  server?: string,

  params?: any,
  headers?: any,

  maxFilesize?: number,
  previewDelay?: number,
  acceptedFiles?: string
}

export class DropzoneConfig implements DropzoneConfigInterface {
  url: string;
  server: string;

  params: any;
  headers: any;

  maxFilesize: number;
  previewDelay: number;
  acceptedFiles: string;

  constructor(config: DropzoneConfigInterface = {}) {
    this.assign(config);
  }

  public assign(config: DropzoneConfigInterface = {}) {
    for (var key in config) {
      this[key] = config[key];
    }

		this.url = this.server + (this.params ? ('?' + this.params) : '');
  }
}
