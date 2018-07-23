import { Renderer, State, SquireGame } from './squire';

export class ShietyShooter extends SquireGame {

  private gameState: GameState;

  constructor() {
    super('shietyshooter');
    this.gameState = new GameState(this);
    this.stateManager.state = this.gameState;
  }

}

export class GameState extends State {

  private characterSprite1: any = null;
  private characterSprite2: any = null;
  private grassSprite: any = null;
  private dirtSprite: any = null;

  private health = 100;
  private reloadTime = 40;
  private enemyDamage = 5;
  private playerMaxDamage = 40;
  private playerMinDamage = 20;

  private ownProjectiles: any[] = [];
  private enemyProjectiles: any[] = [];

  private enemies: any[] = [];

  constructor(gameCtx: any) {
    super(gameCtx);
    // Load assets
    this.characterSprite1 = new Image();
    this.characterSprite1.onload = () => {
      console.log('Image loaded: ' + 'https://punkweb.net/static/punkweb/js/assets/character-right.png');
    };
    this.characterSprite1.src = 'https://punkweb.net/static/punkweb/js/assets/character-right.png';
    this.characterSprite2 = new Image();
    this.characterSprite2.onload = () => {
      console.log('Image loaded: ' + 'https://punkweb.net/static/punkweb/js/assets/character-left.png');
    };
    this.characterSprite2.src = 'https://punkweb.net/static/punkweb/js/assets/character-left.png';
    this.grassSprite = new Image();
    this.grassSprite.onload = () => {
      console.log('Image loaded: ' + 'https://punkweb.net/static/punkweb/js/assets/grass.png');
    };
    this.grassSprite.src = 'https://punkweb.net/static/punkweb/js/assets/grass.png';
    this.dirtSprite = new Image();
    this.dirtSprite.onload = () => {
      console.log('Image loaded: ' + 'https://punkweb.net/static/punkweb/js/assets/dirt.png');
    };
    this.dirtSprite.src = 'https://punkweb.net/static/punkweb/js/assets/dirt.png';
  }

  public onClick(canvasEvent: any) {
    let offsetX, offsetY = 0;
    let element = this.gameCtx.canvas;
    offsetX = this.gameCtx.canvas.offsetLeft;
    offsetY = this.gameCtx.canvas.offsetTop;
    let actualClickX = canvasEvent.clientX - offsetX;
    let actualClickY = canvasEvent.clientY - offsetY;

    this.ownProjectiles.push({
      x: 200,
      y: 600 - 128 - 120
    });
  }

  public init() {
    this.gameCtx.canvas.addEventListener('click', this.onClick.bind(this), false);
  }

  public end() {
    this.gameCtx.canvas.removeEventListener('click', this.onClick.bind(this), false);
    this.gameCtx.stateManager.state = new GameOverState(this.gameCtx);
  }

  public render(r: Renderer) {
    r.rect('#7EC0EE', 0, 0, 1024, 600);
    if (this.grassSprite) {
      for (let i = 0; i < 1024; i += 128) {
        let dx = i;
        let dy = 600-128;
        r.image(this.grassSprite, 0, 0, 128, 128, dx, dy, 128, 128);
      }
    }
    if (this.characterSprite1) {
      let dy = 600 - 128 - 203;
      r.image(this.characterSprite1, 0, 0, 161, 203, 40, dy, 161, 203);
    }
    // Enemies and their health bars
    if (this.enemies && this.characterSprite2) {
      this.enemies.forEach((obj) => {
        let dy = 600 - 128 - 203;
        r.image(this.characterSprite2, 0, 0, 161, 203, obj.x, dy, 161, 203);
        let percentHealth = obj.health / 100;
        r.rect('#282828', obj.x + 80, dy - 40, 104, 12);
        r.rect('red', obj.x + 82, dy - 38, 100 * percentHealth, 8);
      });
    }
    // Projectiles
    if (this.ownProjectiles) {
      this.ownProjectiles.forEach((obj) => {
        r.circle('red', obj.x, obj.y, 2);
      });
    }
    if (this.enemyProjectiles) {
      this.enemyProjectiles.forEach((obj) => {
        r.circle('red', obj.x, obj.y, 2);
      });
    }
    // Player health
    let percentHealth = this.health / 100;
    r.rect('#282828', 12, 12, 240, 24);
    r.rect('red', 14, 14, 236 * percentHealth, 20);
  }

  public update(dt: number) {
    // Randomly create enemies 1% of every game tick
    if (Math.random() > .99) {
      this.enemies.push({
        x: 1024,
        lastShot: 30,
        health: 100,
      });
    }
    if (this.enemies) {
      this.enemies.forEach((obj, i) => {
        obj.x -= 5;
        // Delete enemies that go off screen
        if (obj.x <= -180) {
          this.enemies.splice(i, 1);
        }
        // Every 60 updates enemy shoots
        obj.lastShot++;
        if (obj.lastShot > 60) {
          this.enemyProjectiles.push({
            x: obj.x,
            y: 600 - 128 - 120
          });
          obj.lastShot = 0;
        }
      });
    }
    // Move own projectiles and check for collision on first enemy
    this.ownProjectiles.forEach((obj, i) => {
      obj.x += 15;
      // If projectile is off screen delete it
      if (obj.x > 1024) {
        this.ownProjectiles.splice(i, 1);
      }
      if (this.enemies.length > 0) {
        let firstEnemy = this.enemies.sort((a: any, b: any) => {
          return a.x - b.x;
        })[0];
        if (obj.x >= firstEnemy.x) {
          firstEnemy.health -= ((Math.random() * this.playerMaxDamage) + this.playerMinDamage);
          this.ownProjectiles.splice(i, 1);
          if (firstEnemy.health < 1) {
            let index = this.enemies.indexOf(firstEnemy);
            this.enemies.splice(index, 1);
          }
        }
      }
    });
    // Move enemy projectiles and check fo collision on player
    this.enemyProjectiles.forEach((obj, i) => {
      obj.x -= 15;
      if (obj.x <= 200) {
        this.health -= this.enemyDamage;
        this.enemyProjectiles.splice(i, 1);
        if (this.health < 1) {
          this.end();
        }
      }
    });
  }
}

export class GameOverState extends State {

  constructor(gameCtx: any) {
    super(gameCtx);
  }

  public init() {
  }

  public end() {
  }

  public render(r: Renderer) {
    r.text('GAME OVER', 12, 80, 'black', '72px Verdana');
  }

  public update() {

  }
}

window.onload = () => {
  let shietyshooter = new ShietyShooter();
  shietyshooter.run();
}