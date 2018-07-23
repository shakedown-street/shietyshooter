/**
* https://gamedevelopment.tutsplus.com/tutorials/creating-isometric-worlds-a-primer-for-game-developers--gamedev-6511
*
* I've converted the above snippet to typescript.
**/

import { Point2d } from '../../../utils';

export class IsoHelper {

  /**
   * convert an isometric point to 2D
   * */
  public static isoTo2D(pt: Point2d): Point2d {
    //gx=(2*isoy+isox)/2;
    //gy=(2*isoy-isox)/2
    let tempPt: Point2d = new Point2d(0, 0);
    tempPt.x = (2 * pt.y + pt.x) / 2;
    tempPt.y = (2 * pt.y - pt.x) / 2;
    return tempPt;
  }

  /**
   * convert a 2d point to isometric
   * */
  public static twoDToIso(pt: Point2d): Point2d {
    //gx=(isox-isoxy;
    //gy=(isoy+isox)/2
    let tempPt: Point2d = new Point2d(0, 0);
    tempPt.x = pt.x - pt.y;
    tempPt.y = (pt.x + pt.y) / 2;
    return tempPt;
  }

  /**
   * convert a 2d point to specific tile row/column
   * */
  public static getTileCoordinates(pt: Point2d, tileHeight: number): Point2d {
    var tempPt: Point2d = new Point2d(0, 0);
    tempPt.x = Math.floor(pt.x / tileHeight);
    tempPt.y = Math.floor(pt.y / tileHeight);
    return tempPt;
  }

  /**
   * convert specific tile row/column to 2d point
   * */
  public static get2dFromTileCoordinates(pt: Point2d, tileHeight: number): Point2d {
    var tempPt: Point2d = new Point2d(0, 0);
    tempPt.x = pt.x * tileHeight;
    tempPt.y = pt.y * tileHeight;
    return tempPt;
  }
}
