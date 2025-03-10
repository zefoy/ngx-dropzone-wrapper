import { bootstrapApplication } from "@angular/platform-browser";
import { DROPZONE_CONFIG, DropzoneConfigInterface } from "ngx-dropzone-wrapper";
import { AppComponent } from "./app/app.component";

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: "https://httpbin.org/post",
  acceptedFiles: "image/*",
  createImageThumbnails: true,
};

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG,
    },
  ],
});
