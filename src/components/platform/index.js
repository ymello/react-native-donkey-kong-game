import React, { PureComponent } from "./node_modules/react";
import Matter from "./node_modules/matter-js";
import PlatformImage from "./platform.png"; //-- You can get the images from our repo.
import Tile from "./tile"; //-- This is just a helper component
import { collisionCategories } from "./constants";

export class Renderer extends PureComponent {
  render() {
    return (
      <Tile
        source={PlatformImage}
        size={this.props.size}
        position={this.props.body.position}
        angle={this.props.body.angle}
      />
    );
  }
}

export default (world, pos, angle, width, category = 0x0002) => {
  let height = 20;
  let body = Matter.Bodies.rectangle(pos.x, pos.y, width, height, {
    isStatic: true,
    angle: angle,
    friction: 1,
    collisionFilter: {
      category: collisionCategories.platform,
      mask: collisionCategories.barrel
    }
  });

  let vertices = [
    { x: pos.x - width / 2, y: pos.y - height / 2 },
    { x: pos.x + width / 2, y: pos.y - height / 2 },
    { x: pos.x - width / 2, y: pos.y + height / 2 },
    { x: pos.x + width / 2, y: pos.y + height / 2 }
  ];

  Matter.Vertices.rotate(vertices, body.angle, body.position);

  Matter.World.add(world, [body]);

  //-- These are all the components our platform entities will need.
  //-- Notice the renderer component? Our GameEngine will only draw entities that contain
  //-- a renderer component - the rest will not get displayed.
  return {
    platform: { vertices},
    body,
    size: { width, height },
    renderer: <Renderer />
  };
};