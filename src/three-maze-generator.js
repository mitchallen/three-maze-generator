
export class MAZEGEN {

  static createMaze(spec = {}) {

    let {
      xSize = 10,
      ySize = 5,
      wallWidth = 4,
      wallDepth = 1,
      wallHeight = 1,
      wallTexture,
      capY = 0,
      capHeight = 1.1,
      capRadius = 0.5,   
      capColor = "#444444",
      startColor = "#FFFFFF",
      endColor = "#FF0000",
      solutionColor = "#00FF00",
      showStart = true,
      showFinish = true,
      showSolution = true,
      solutionScale = 0.25,
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
          y: capY,
          z: zPos + cellSize / 2.0,
          color: capColor,
          radius: capRadius,  
          height: capHeight,  
        });

          if (maze.isGreen(x, y)) {
            let isStartPos = (x === 0 && y === 0);
            let isEndPos = (x === dx && y === dy);
            let isSolutionPos = (!isStartPos && !isEndPos);
            // show solution
            let color = isEndPos ? endColor : ( isStartPos ? startColor : solutionColor );
            let gScale = isEndPos ? 1.0 : ( isStartPos ? 1.0 : solutionScale);
            let tag = isStartPos ? "maze-start" : isEndPos ? "maze-finish" : "maze-solution";
            if(
              (isSolutionPos && showSolution)
              || (isStartPos && showStart)
              || (isEndPos && showFinish)
            ) {
              wallNodes.push({
                tag,
                x: xPos,
                y: yPos,
                z: zPos,
                width: gScale,
                height: 0.5,
                depth: gScale,
                color,
              });
            }
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