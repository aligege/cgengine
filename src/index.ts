import { BabylonFileLoaderConfiguration, Engine, Scene } from "@babylonjs/core";
import "@babylonjs/materials";

import * as CANNON from "cannon";

import { appendScene } from "./scenes/tools";
import JSZip = require("jszip");
import { global } from "./gloal";

export class Game {
    /**
     * Defines the engine used to draw the game using Babylon.JS and WebGL.
     */
    public engine: Engine
    /**
     * Defines the scene used to store and draw elements in the canvas.
     */
    public scene: Scene
    protected _canvas:HTMLCanvasElement

    /**
     * Constructor.
     */
    public constructor() {
        this._canvas=document.getElementById("renderCanvas") as HTMLCanvasElement
        this.engine = new Engine(this._canvas, true)
        this.scene = new Scene(this.engine)

        console.log("---------------------_bindEvents")
        this._bindEvents()
        console.log("---------------------_loadScene")
        this._loadScene()
        //332894
        global.roleSer.init(332894)
    }

    /**
     * Loads the first scene.
     */
    private async _loadScene(): Promise<void> {
        const rootUrl = "./scenes/_assets/"

        BabylonFileLoaderConfiguration.LoaderInjectedPhysicsEngine = CANNON

        await appendScene(this.scene, rootUrl, "../scene/scene.babylon")

        // Attach camera.
        if (!this.scene.activeCamera) {
            throw new Error("No camera defined in the scene. Please add at least one camera in the project or create one yourself in the code.")
        }

        this.scene.activeCamera.attachControl(this.engine.getRenderingCanvas(), false)

        // Render.
        this.engine.runRenderLoop(() => this.scene.render())
    }

    /**
     * Binds the required events for a full experience.
     */
    private _bindEvents(): void {
        window.addEventListener("resize", () => this.engine.resize())
    }
    protected async _showSkin()
    {

        ////var url="http://10.10.1.90:80/guest/stores/bat-persistent/50a6f56744bc34089642c89b5bb68e4e_1418986.zip"
        var url = "https://game.batchat.com/yyz/skin_1711516180884_142054.zip"
        console.log("---------------------begin url:"+url)
        var res = await fetch(url,{
            mode:"cors",
            //credentials:"include",
            headers:{
                "Access-Control-Allow-Origin":"*",
                "credentails":"true"
            }
        })
        console.log("---------------------res:"+res)
        var blob=await res.blob()
        console.log("---------------------blob.size:"+blob.size)
        var zip = new JSZip()
        const zipdata=await zip.loadAsync(blob)
        var extractedFiles: { name: string, data: any }[] = []
        for(var [name,file] of Object.entries(zipdata.files))
        {
            extractedFiles.push({name, data:file})
        }
        console.log(extractedFiles)
    }
}
