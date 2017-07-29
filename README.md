# Angular Dropzone Wrapper

<a href="https://badge.fury.io/js/ngx-dropzone-wrapper"><img src="https://badge.fury.io/js/ngx-dropzone-wrapper.svg" align="right" alt="npm version" height="18"></a>

This is an Angular wrapper library for the [Dropzone](http://www.dropzonejs.com/).

See a live example application <a href="https://zefoy.github.io/ngx-dropzone-wrapper/">here</a>.

### Building the library

    npm install
    npm run build

### Running the example

    cd example
    npm install
    npm start

### Installing and usage

    npm install ngx-dropzone-wrapper --save-dev

##### Load the module for your app (with global configuration):

```javascript
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

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

This library provides two ways to create a Dropzone element, simple component and custom directive.

**COMPONENT USAGE**

Simply replace the element that would ordinarily be passed to `Dropzone` with the dropzone component.

```html
<dropzone [config]="config" [message]="'Click or drag images here to upload'" (error)="onUploadError($event)" (success)="onUploadSuccess($event)"></dropzone>
```

```javascript
[config]          // Custom config to override the global defaults.
[disabled]        // Disables / detaches Dropzone from the element.

[message]         // Message to show for the user on the upload area.
[placeholder]     // Placeholder image to be shown as the upload area.

(error)           // Event handler for the dropzone upload error event.
(success)         // Event handler for the dropzone upload success event.
(canceled)        // Event handler for the dropzone upload canceled event.
```

**DIRECTIVE USAGE**

When using only the directive you need to provide your own theming or import the default theme:

```css
@import 'https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.1.1/min/dropzone.min.css';
```

Dropzone directive can be used in form or div element with optional custom configuration:

```html
<div [dropzone]="config" (error)="onUploadError($event)" (success)="onUploadSuccess($event)"></div>
```

```javascript
[dropzone]        // Can be used to provide optional custom config.
[disabled]        // Disables / detaches Dropzone from the element.

(error)           // Event handler for the dropzone upload error event.
(success)         // Event handler for the dropzone upload success event.
(canceled)        // Event handler for the dropzone upload canceled event.
```

##### Available configuration options (custom / global configuration):

This library supports all Dropzone configuration options and few custom extra options for easier usage.

**LIBRARY OPTIONS**

```javascript
autoReset         // Time for resetting component after upload (Default: null).
errorReset        // Time for resetting component after an error (Default: null).
cancelReset       // Time for resetting component after canceling (Default: null).
```

**DROPZONE OPTIONS**

```javascript
url               // Upload url where to send the upload request (Default: '').
method            // HTTP method to use communicating with the server (Default: 'post').
headers           // Object of additional headers to send to the server (Default: null).
paramName         // Name of the file parameter that gets transferred (Default: 'file').
maxFilesize       // Maximum file size for the upload files in megabytes (Default: null).
acceptedFiles     // Comma separated list of mime types or file extensions (Default: null).
```

For more detailed documentation with all the supported dropzone options see [Dropzone documentation](http://www.dropzonejs.com/#configuration-options).

##### Available control / helper functions (provided by the directive):

```javascript
reset()                         // Resets the Dropzone (removes all files).
```

Above functions can be accessed through the directive reference (available as directiveRef in the component).
