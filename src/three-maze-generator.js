
export class MAZEGEN {

  static createMaze(spec = {}) {

    let {
      xSize = 10,
      ySize = 5,
      wallWidth = 4,
      wallDepth = 1,
      wallHeight = 1,
      wallTexture,
      capHeight = 0,
    } = spec;

    let wallNodes = [];
    let endCaps = [];

    var mazeFactory = window.MitchAllen.MazeGenerator;
    var maze = mazeFactory.Square({ x: xSize, y: ySize });
    console.log(maze);
    maze.generate();
    maze.printBoard();
    let d = maze.getMaxDistance(0, 0);
    let { x: dx, y: dy } = d;
    let points = [
      { x: 0, y: 0 },
      { x: dx, y: dy },
    ];
    maze.solve(points);
    maze.printBoard({ target: d });

    const cellSize = wallWidth;

    let yPos = 0;

    let xOffset = (xSize + 1) * cellSize / 2.0;
    let yOffset = (ySize + 1) * cellSize / 2.0;

    // { tag: `maze-wall`, map: textureMap['mazeWall'], y: yOffset + 0 * yFactor, x: -2, scale: 0.5, width: 4.0, rotY: 90.0 },

    for (let y = -1; y < ySize; y++) {
      for (let x = -1; x < xSize; x++) {
        let xPos = xOffset + (x - xSize) * cellSize;
        let zPos = yOffset + (y - ySize) * cellSize;

        // Draw end cap

        endCaps.push({
          x: xPos + cellSize / 2.0,
          y: capHeight,
          z: zPos + cellSize / 2.0,
          color: "#444444",
          radius: 0.5,  // TODO - get from spec
          height: 1.1,  // TODO - get from spec
        });

        if( maze.isGreen(x,y)) {
          // show solution
          let color = (x === dx && y === dy ) ? "#FF0000" : ((x === 0 && y === 0 ) ? "#FFFFFF" : "#00FF00" );
          let gScale = (x === dx && y === dy ) ? 1.0 : ((x === 0 && y === 0 ) ? 1.0 : 0.25 );
          wallNodes.push({
            x: xPos,
            y: yPos,
            z: zPos,
            width: gScale,
            height: 0.5,
            depth: gScale,
            color,
          });

        }

        if (!maze.connects(x, y, "S") && x >= 0 &&
          !((y === -1) && maze.connects(x, 0, "N"))
        ) {
          // draw south wall

          // console.log("DRAWING SOUTHWALL");

          wallNodes.push({
            tag: `maze-wall`,
            map: wallTexture,
            width: wallWidth,
            depth: wallDepth,
            height: wallHeight,
            x: xPos,
            y: yPos,
            z: zPos + cellSize / 2.0,
          })
        }

        if (!maze.connects(x, y, "E") && y >= 0 &&
          !((x === -1) && maze.connects(0, y, "W"))
        ) {
          // draw south wall

          // console.log("DRAWING SOUTHWALL");

          wallNodes.push({
            tag: `maze-wall`,
            map: wallTexture,
            width: wallWidth,
            depth: wallDepth,
            height: wallHeight,
            x: xPos + cellSize / 2.0,
            y: yPos,
            z: zPos,
            rotY: 90,
          })
        }
      }
    }

    return {
      wallNodes,
      endCaps,
    }

  }
}