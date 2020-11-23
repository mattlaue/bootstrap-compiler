![GitHub](https://img.shields.io/github/license/mattlaue/bootstrap-compiler?label=License)
![Coverage](./badges/coverage.svg)

A library to compile [Bootstrap][bootstrap] V5 SCSS that can be used in a browser.

[bootstrap]: https://v5.getbootstrap.com/

## Overview
`bootstrap-compiler` is a Javascript library that builds a CSS stylesheet from the Bootstrap sources.
It's primarily intended to customize Bootstrap in a browser-based application.

## Getting Started
Here is an example usage that builds bootstrap with default options:

```js
const bootstrapCompiler = require('bootstrap-compiler/dist/bootstrap-compiler');

let result = bootstrapCompiler.compile(bootstrapCompiler.SOURCE_CACHE['bootstrap']);
let css = result.css.toString();
```

The `css` variable contains the generated CSS.

## Javascript API
The `bootstrap-compiler` library uses a version of Dart SASS built for the browser to generate a CSS file.
Since the library file contains a SASS compiler (2M uncompressed) and all Bootstrap source files (44K), the resulting file size is *big*,
1.5MB minified, so plan accordingly. 

The API consists of a single function `compile()` and two variables `SOURCE_CACHE` and  `BOOTSTRAP_VERSION`.

### `compile()`
```js
let result = bootstrapCompler.compile(scss, options)
```

* **`scss`** - The custom SCSS file to build.
The intended input is one of the top level Bootstrap source SCSS files
e.g. [this](https://github.com/twbs/bootstrap/blob/main/scss/bootstrap.scss)
but any SCSS file will work.
Any imports statements will be automatically replaced with the corresponding Bootstrap source.
* **`options`** - The [options](https://sass-lang.com/documentation/js-api#options) object passed directly to Dart-SASS.
This object is passed as-is except for `data` is replaced with the above `scss` value and `file` is ignored.
 
The `compile` function returns a Dart SASS [result](https://sass-lang.com/documentation/js-api#result-object) object.

### `SOURCE_CACHE`
The SOURCE_CACHE constant is a mapping of the Bootstrap source files keyed by the base file name 
e.g. the contents of `_variables.scss` are found via `SOURCE_CACHE['variables']`.
Subdirectories of source files are concatenated under the directory name as well as stored by individual file names.
For example, `SOURCE_CACHE['forms']` contains the concatenation of all files in the `forms` subdirectory and the
individual file contents for `forms/_form-text.scss` is found via `SOURCE_CACHE['forms/form-text']`.

### `BOOTSTRAP_VERSION`
BOOTSTRAP_VERSION contains the version number of the contained Bootstrap source code, currently `5.0.0-alpha3`.


## CLI
This package contains a command-line tool `bootstrap-compiler` which may be used to test the compiler against a
specified source file.  To build the full BS5 source from the command line do:

```shell script
bootstrap-compiler init  # creates style.scss in the current directory
bootstrap-compiler compile  # creates style.css and style.css.map
```
The primary use for the CLI is validation of the resulting library builds.

## Development/Testing

Please submit any issues that you encounter via [GitHub]()

### Testing
```
npm link
npm link bootstrap-compiler
npx webpack
npm run test
```

The library must be build using webpack *before* running Jest because several
test cases depend on both the source and the compiled result.
(This is to validate the webpack build itself).

The tests require Node v12 or higher.
