/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {

  // map tells the System loader where to look for things
  var map = {
    'app': 'app', // 'dist',
    '@angular': 'node_modules/@angular',
    // include bits for HttpClientModule to work (needs to be able to get to @angular/common/http and to tslib)
    '@angular/common/http': 'node_modules/@angular/common/bundles/common-http.umd.js',
    '@ngrx/store': 'node_modules/@ngrx/store',
    '@ngrx/effects': 'node_modules/@ngrx/effects',
    '@ngrx/store-devtools': 'node_modules/@ngrx/store-devtools',
    'tslib': 'node_modules/tslib/tslib.js',
    'rxjs': 'node_modules/rxjs',
    'rxjs/operators': 'node_modules/rxjs/operators'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app': { main: 'main.js', defaultExtension: 'js' },
    '@ngrx/store': { defaultExtension: 'js', main: 'bundles/store.umd.min.js' },
    '@ngrx/effects': { defaultExtension: 'js', main: 'bundles/effects.umd.min.js' },
    '@ngrx/store-devtools': { defaultExtension: 'js', main: 'bundles/store-devtools.umd.min.js' },
    'rxjs': { defaultExtension: 'js', main: 'index.js' },
    'rxjs/operators': { defaultExtension: 'js', main: 'index.js' },
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }

  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/' + pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }

  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);

  var config = {
    map: map,
    packages: packages
  };

  System.config(config);

})(this);