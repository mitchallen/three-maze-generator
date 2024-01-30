# @mitchallen/three-maze-generator
ThreeJS Maze Generator
--

* * * 

<p align="left">
  <a href="https://npmjs.com/package/@mitchallen/three-maze-generator">
    <img src="http://img.shields.io/npm/dt/@mitchallen/three-maze-generator.svg?style=flat-square" alt="Downloads">
  </a>
  <a href="https://npmjs.org/package/@mitchallen/three-maze-generator">
    <img src="http://img.shields.io/npm/v/@mitchallen/three-maze-generator.svg?style=flat-square" alt="Version">
  </a>
  <a href="https://npmjs.com/package/@mitchallen/three-maze-generator">
    <img src="https://img.shields.io/npm/l/@mitchallen/three-maze-generator.svg?style=flat-square" alt="License">
  </a>
  <a href="https://www.jsdelivr.com/package/npm/@mitchallen/three-maze-generator">
    <img src="https://data.jsdelivr.com/v1/package/npm/@mitchallen/three-maze-generator/badge" alt="jsdelivr">
  </a>
</p>

# Live Demo

* https://mitchallen.github.io/three-maze-generator/

# Usage

## Include maze generator dependency

```html
<html>
  <head>
  <title>threejs map generator</title>
  <link rel="stylesheet" href="./css/app.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r123/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@mitchallen/maze-generator@0.1.25/dist/maze-generator.min.js"></script>    
</head>
  <body>
    <script type="module" src="./app.js"></script>
  </body>
</html>
```

## Get from npm via jsdelivr 

For example, from within your **app.js** file:

```js
import {
  MAZEGEN,
} from 'https://cdn.jsdelivr.net/npm/@mitchallen/three-maze-generator@0.1.2/dist/three-maze-generator.modern.js'
```

* * *

# Example code

See the repo examples folder. 

## To run the example code

To run the example code go to the root of this project and run:

```
npm run web-server
```

Then browse to:

* http://localhost:8000/examples/demo-maze/

* * *

# Publishing

To publish your version of the package you must first setup an account and project in NPM.

This will boost the version number, push and publish:

```sh
git add .
git commit -m "updated code"
npm run pub:patch
```

As an alternative:

```sh
git add .
git commit -m "updated code"
npm version patch -m "Upgrade to %s for reasons"
```

* * * 

# References

* https://www.jsdelivr.com/