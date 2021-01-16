
export class MazeShapeFactory {

  static createWall(spec = {}) {

    let {
      name = "cube",
      color = "#FF00FF",
      tag = 'none',
      width = 1,
      height = 1,
      depth = 1,
      x = 0.0,
      y = 0.0,
      z = 0.0,
      rotX = 0.0,
      rotY = 0.0,
      rotZ = 0.0,
      scale = 1.0,  // apply to x, y, z
      map = undefined,
    } = spec;

    let basic = map ? { map } : { color };

    var geometry = new THREE.BoxGeometry(width, height, depth);
    var material = new THREE.MeshBasicMaterial(basic );

    const dRotX = THREE.MathUtils.degToRad(rotX);
    const dRotY = THREE.MathUtils.degToRad(rotY);
    const dRotZ = THREE.MathUtils.degToRad(rotZ);

    var cube = new THREE.Mesh(geometry, material);
    cube.name = name;
    cube.tag = tag;
    cube.position.set(x, y, z);
    cube.rotation.set(dRotX,dRotY,dRotZ);
    cube.scale.set(scale, scale, scale);

    return cube;
  }

  static createEndCap(spec = {}) {

    let {
      name = "cylinder",
      color = "#FF00FF",
      tag = 'none',
      radius = 1,
      height = 1,
      x = 0.0,
      y = 0.0,
      z = 0.0,
      rotX = 0.0,
      rotY = 0.0,
      rotZ = 0.0,
      scale = 1.0,  // apply to x, y, z
      map = undefined,
    } = spec;

    let basic = map ? { map } : { color };

    var geometry = new THREE.CylinderGeometry(radius, radius, height);
    var material = new THREE.MeshBasicMaterial(basic );

    const dRotX = THREE.MathUtils.degToRad(rotX);
    const dRotY = THREE.MathUtils.degToRad(rotY);
    const dRotZ = THREE.MathUtils.degToRad(rotZ);

    var cyl = new THREE.Mesh(geometry, material);
    cyl.name = name;
    cyl.tag = tag;
    cyl.position.set(x, y, z);
    cyl.rotation.set(dRotX,dRotY,dRotZ);
    cyl.scale.set(scale, scale, scale);

    return cyl;
  }
};