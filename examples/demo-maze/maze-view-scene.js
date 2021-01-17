/*
 * File: maze-view-scene.js
 * Author: Mitch Allen
 */

import {
  MAZEGEN
// } from 'https://cdn.jsdelivr.net/npm/@mitchallen/three-maze-generator@0.1.2/dist/three-maze-generator.modern.js'
} from '../../dist/three-maze-generator.modern.js';

import {
  XRKIT,
} from 'https://cdn.jsdelivr.net/npm/@mitchallen/three-xr-kit@1.0.13/dist/three-xr-kit.modern.js';

import {
  XRCONTROLLER,
  CONTROLLER_PROFILE,
  OCULUS_GO,
  OCULUS_QUEST,
} from 'https://cdn.jsdelivr.net/npm/@mitchallen/three-xr-controller@0.1.3/dist/three-xr-controller.modern.js';

import { MazeShapeFactory } from './maze-shapes.js';

export class MazeViewSceneFactory {

  // Define a static create method to return new scenes filled with shapes
  static create() {

    let selectPressed = {
      "right": false,  // right [0]
      "left": false,  // left [1]
    }

    let squeezePressed = {
      "right": false,  // right [0]
      "left": false,  // left [1]
    }

    let textureLoader = new THREE.TextureLoader();

    let textureMap = {};

    var speed = 1;

    var xrApp = XRKIT.create();

    let textureList = [
      { key: 'mazeWall', file: `./img/arrow-left-blue.png` },
    ];

    // Load textures

    textureList.forEach(function (t) {
      textureMap[t.key] = textureLoader.load(t.file);
    });

    function makeMaze() {

      let mazeOptions = MAZEGEN.createMaze({
        wallTexture: textureMap['mazeWall'],
        // showSolution: false,
        // showStart: false,
        // showFinish: false,
      });
  
      // Grid layout parameters
      let yOffset = 0.0;
      let yFactor = 1.0;
  
      const mazeNode = new THREE.Group();
      mazeNode.name = "maze";
      mazeNode.rotation.x = THREE.MathUtils.degToRad(90);
  
      // Add walls to world
      mazeOptions.wallNodes.forEach(options => mazeNode.add(MazeShapeFactory.createWall(options)));
      mazeOptions.endCaps.forEach(options => mazeNode.add(MazeShapeFactory.createEndCap(options)));

      return mazeNode;
    }

    const mazeNode = makeMaze();

    // Create a demo world group node
    const demoWorld = new THREE.Group();
    demoWorld.name = "world";

    demoWorld.add(mazeNode);


    // In VR headset / camera is locked at 0,0,0
    // So you have to move the world and not the camera

    const WORLD_X = 0.0;
    const WORLD_Y = 1.6;
    const WORLD_Z = -20.0;

    // position the demo world
    demoWorld.translateY(WORLD_Y)
    demoWorld.translateZ(WORLD_Z);

    // Create a new ThreeJS scene
    var scene = new THREE.Scene();

    // Add demo world to scene
    scene.add(demoWorld);

    let xrCtrl = XRCONTROLLER.connect({
      xr: xrApp.renderer.xr,
    });

    // Select 0

    xrCtrl.c0.addEventListener('selectstart', function (event) {
      selectPressed[event.data.handedness] = true;
    });

    xrCtrl.c0.addEventListener('selectend', function (event) {
      selectPressed[event.data.handedness] = false;
    });

    // Squeeze 0

    xrCtrl.c0.addEventListener('squeezestart', function (event) {
      squeezePressed[event.data.handedness] = true;
    });

    xrCtrl.c0.addEventListener('squeezeend', function (event) {
      squeezePressed[event.data.handedness] = false;
    });

    // Select 1

    xrCtrl.c1.addEventListener('selectstart', function (event) {
      selectPressed[event.data.handedness] = true;  // left
    });

    xrCtrl.c1.addEventListener('selectend', function (event) {
      selectPressed[event.data.handedness] = false;
    });

    // Squeeze 1

    xrCtrl.c1.addEventListener('squeezestart', function (event) {
      squeezePressed[event.data.handedness] = true;
    });

    xrCtrl.c1.addEventListener('squeezeend', function (event) {
      squeezePressed[event.data.handedness] = false;
    });

    // Define a scene with methods to return
    var demoScene = {

      // Define a method on the scene to handle browser window resizing
      resize: function () {
        XRKIT.resize(xrApp);
      },

      // Define a method to be called when the scene is rendered
      step: function () {

        let controller = XRCONTROLLER.getState({ controllers: xrCtrl.controllers });

        scene.traverse(function (node) {
          if( node.name === "maze") {

          }
          if( node.tag === "maze-finish") {
            // node.rotation.x += 0.01;
            // node.rotation.y += 0.02;
            // node.rotation.z += 0.03;
          }
          if (node.name === "world") {
            const rightSelect = selectPressed['right'] ? 1 : 0;
            if( rightSelect ) {
              let doomed = scene.getObjectByName("maze");
              demoWorld.remove(doomed);
              demoWorld.add(makeMaze());
            }
            // Process left thumbstick values
            let range = 2.0;
            if (controller.profile === CONTROLLER_PROFILE.OCULUS_TOUCH) {
              // Oculus Quest
              node.position.x = WORLD_X + controller.left.axes[OCULUS_QUEST.THUMBSTICK_X] * -range;
              node.position.z = WORLD_Z + controller.left.axes[OCULUS_QUEST.THUMBSTICK_Y] * -range;
              const scale = controller.left.pressed[OCULUS_QUEST.INDEX_TRIGGER] ? 2.0 : 1.0;
              node.scale.set(scale, scale, scale);
            }
            // Process right thumbstick values
            let maxDegrees = 180.0;
            if (controller.profile === CONTROLLER_PROFILE.OCULUS_TOUCH) {
              // Oculus Quest
              // Change in thumbstick Y should rotate on X axis (rotate forward and back)
              node.rotation.x = (THREE.MathUtils.degToRad(controller.right.axes[OCULUS_QUEST.THUMBSTICK_Y] * maxDegrees));
              // CHange in thumbstick X should rotate on Y axis (rotate side to side)
              node.rotation.y = (THREE.MathUtils.degToRad(controller.right.axes[OCULUS_QUEST.THUMBSTICK_X] * maxDegrees));
              const scale = controller.right.pressed[OCULUS_QUEST.INDEX_TRIGGER] ? 2.0 : 1.0;
              node.scale.set(scale, scale, scale);
            }
          }
        });

        XRKIT.render({
          scene,
          ...xrApp
        });
      },

      animate: function () {
        xrApp.renderer.setAnimationLoop(this.step);
      }
    };

    return demoScene;
  }
}