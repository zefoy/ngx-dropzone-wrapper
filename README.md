# Angular 2 Dropzone Wrapper

<a href="https://badge.fury.io/js/angular2-dropzone-wrapper"><img src="https://badge.fury.io/js/angular2-dropzone-wrapper.svg" align="right" alt="npm version" height="18"></a>

This is an Angular 2 wrapper library for [dropzone](http://www.dropzonejs.com/).

See a live example application <a href="https://zefoy.github.io/angular2-dropzone-wrapper/">here</a>.

### Building the library

    npm install
    npm run build

### Running the example

    cd example
    npm install
    npm start

### Installing and usage

    npm install angular2-dropzone-wrapper --save-dev

##### Load the module for your app (with global configuration):

```javascript
import { DropzoneModule } from 'angular2-dropzone-wrapper';
import { DropzoneConfigInterface } from 'angular2-dropzone-wrapper';

const DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  server: 'https://httpbin.org/post',
  maxFilesize: 50,
  previewDelay: 5000,
  acceptedFiles: 'image/*'
};

@NgModule({
  ...
  imports: [
    ...
    DropzoneModule.forRoot(DROPZONE_CONFIG)
  ]
})
```

##### Use it in your html template (with custom configuration):

```html
<dropzone [config]="config" [placeholder]="'Drag or click here to upload an image'" 
  (uploadDone)="onUploadDone($event)" (uploadError)="onUploadError($event)"></dropzone>
```

```javascript
[config]       // Custom config to override the global defaults.
[placeholder]  // Placeholder text to be shown on the upload area.

(uploadDone)   // Event handler for the dropzone upload done events.
(uploadError)  // Event handler for the dropzone upload error events.
```

##### Available configuration options (custom / global configuration):

```javascript
server         // Server url for the POST upload request.
params         // Url parameters to be added into the server url.
headers        // Object of additional headers to send to the server. 
maxFilesize    // Maximum file size for the uploads (in megabytes).
previewDelay   // Delay for hiding the preview image after the upload.
acceptedFiles  // Comma separated list of mime types or file extensions.
```
