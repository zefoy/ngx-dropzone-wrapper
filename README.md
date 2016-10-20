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
    DropzoneModule.forRoot(DROPZONE_CONFIG)
  ]
})
```

##### Use it in your html template (with custom configuration):

```html
<dropzone [config]="config" [message]="'Click or drag images here to upload'" (uploadError)="onUploadError($event)" (uploadSuccess)="onUploadSuccess($event)"></dropzone>
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
server            // Server url for sending the upload request (Default: '').
params            // Url parameters to be added to the server url (Default: null).
autoReset         // Time for resetting upload area after upload (Default: null).
errorReset        // Time for resetting upload area after an error (Default: null).
cancelReset       // Time for resetting upload area after canceling (Default: null).

method            // HTTP method to use communicating with the server (Default: 'post').
headers           // Object of additional headers to send to the server (Default: null).
paramName         // Name of the file parameter that gets transferred (Default: 'file').
maxFilesize       // Maximum file size for the upload files in megabytes (Default: null).
acceptedFiles     // Comma separated list of mime types or file extensions (Default: null).
```

For more detailed documentation with all the supported options see [dropzone documentation](http://www.dropzonejs.com/#configuration-options).
