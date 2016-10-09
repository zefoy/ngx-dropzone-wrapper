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
  acceptedFiles: 'image/*'
};

@NgModule({
  ...
  imports: [
    ...
    DropzoneModule.forRoot(DROPZONE_CONFIG,)
  ]
})
```

##### Use it in your html template (with custom configuration):

```html
<dropzone [config]="config" [message]="'Drag or click here to upload an image'" (uploadError)="onUploadError($event)" (uploadSuccess)="onUploadSuccess($event)"></dropzone>
```

```javascript
[config]          // Custom config to override the global defaults.
[message]         // Message to show for the user on the upload area.
[placeholder]     // Placeholder image to be shown as the upload area.

(uploadError)     // Event handler for the dropzone upload error event.
(uploadSuccess)   // Event handler for the dropzone upload success event.
(uploadCanceled)  // Event handler for the dropzone upload canceled event.
```

##### Available configuration options (custom / global configuration):

```javascript
server            // Server url for the POST upload request (Default: '').
params            // Url parameters to be added to the server url (Default: null).
preview           // Show preview of the image(s) before uploading (Default: false).

method            // HTTP method to use communicating with the server (Default: 'post').
headers           // Object of additional headers to send to the server (Default: null).
paramName         // The name of the file param that gets transferred (Default: 'file').
maxFilesize       // Maximum file size for the upload files in megabytes (Default: null).
acceptedFiles     // Comma separated list of mime types or file extensions (Default: null).
addRemoveLinks    // Add a link for the file preview to remove the file (Default: false).
uploadMultiple    // Whether to send multiple files in one request or not (Default: false).
parallerUploads   // How many file uploads should be processed in parallel (Default: 1).
```

For more detailed documentation with all the supported options see [dropzone documentation](http://www.dropzonejs.com/#configuration-options).
