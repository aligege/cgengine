import * as BABYLON from '@babylonjs/core/Legacy/legacy'; //全部引入
import { Engine, Scene } from '@babylonjs/core'; //只引入使用到的类
import "@babylonjs/materials/legacy/legacy"; //引入其他模块中的所有类，例如materials

import * as scoreJson from "./score.json"
class Game {
    protected _engine: BABYLON.Engine = null
    protected _canvas: HTMLCanvasElement = null
    protected _scene: BABYLON.Scene = null
    async run() {
        this._canvas = <HTMLCanvasElement>document.getElementById("renderCanvas") // 得到canvas对象的引用
        this._engine = new BABYLON.Engine(this._canvas, true) // 初始化 BABYLON 3D engine

        this._createScene()

        this._engine.runRenderLoop(() => {
            this._scene.render()
        });

        window.addEventListener("resize", () => {
            this._engine.resize()
        });

    }
    protected _createScene() {
        this._scene = new BABYLON.Scene(this._engine)

        var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0, 5), this._scene)
        camera.attachControl(this._canvas, true)

        var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), this._scene)
        var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), this._scene)

        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, this._scene)

        return this._scene
    };
}

var game = new Game()
game.run()
