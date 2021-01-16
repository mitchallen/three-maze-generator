/*
 * File: app.js
 * Author: Mitch Allen
 */

// 1. Add reminder for how to reference the script
/*
  In a browser must use script type="module" parameter:
  <script type="module" src="./src/app.js"></script>
 */

// 2. Import the scene factory
import {MazeViewSceneFactory} from './maze-view-scene.js';

// 3. Create a new scene
var demoScene = MazeViewSceneFactory.create({
  clear: "#111111"
});

// 4. Add and define a listener for browser resize events
window.addEventListener( 
  'resize', 
  demoScene.resize, 
  false 
);

// 5. Animate
demoScene.animate();