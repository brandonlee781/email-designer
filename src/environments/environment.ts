// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hmr: false,
  firebase: {
    apiKey: 'AIzaSyBsd1HNt7mRwS2JB2_bRSCoVKseBt5jNWU',
    authDomain: 'email-designer-5aa67.firebaseapp.com',
    databaseURL: 'https://email-designer-5aa67.firebaseio.com',
    projectId: 'email-designer-5aa67',
    storageBucket: 'email-designer-5aa67.appspot.com',
    messagingSenderId: '778482168820'
  },
  inlinerUrl: 'https://us-central1-email-designer-5aa67.cloudfunctions.net/htmlInliner',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
