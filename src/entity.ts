export abstract class Entity {

  public _maxHealth: number = 100;
  public _health: number = 100;
  public _reloadTime: number = 40;

  constructor() {

  }

  public get maxHealth() {
    return this._maxHealth;
  }

  public set maxHealth(value) {
    this._maxHealth = value;
  }

  public get health() {
    return this._health;
  }

  public set health(value) {
    this._health = value;
  }
}
