import { Pokemon } from "./Pokemon";
import { ElectricPokemon } from "./ElectricPokemon";
import { WaterPokemon } from "./WaterPokemon";
import { Battle } from "./Battle";

export class Game {
    private battleManager: Battle = new Battle();

    constructor(){
        document.getElementById("startGame").onclick = () => {
            this.setup()
        }

        document.getElementById("attack").onclick = () => {
            this.battleManager.myAction(1)
        }

        document.getElementById("specialatk").onclick = () => {
            this.battleManager.myAction(2)
        }

        document.getElementById("defense").onclick = () => {
            this.battleManager.myAction(3)
        }
        
        document.getElementById("hide").onclick = () => {
            this.battleManager.myAction(4)
        }

        document.getElementById("runaway").onclick = () => {
            this.battleManager.myAction(5)
        }
    }

    public play(): void{
        document.getElementById("battleprompt").innerHTML = "행동을 선택하세요."
    }

    public setup(): void{
        console.log("게임이 시작되었습니다.");
        document.getElementById("ispoke").innerHTML = "플레이할 포켓몬을 골라주세요."

        const pikabtn = document.getElementById("startPika") as HTMLButtonElement;
        const kkobubtn = document.getElementById("startKkobu") as HTMLButtonElement;

        pikabtn.disabled = false;
        kkobubtn.disabled = false;

        pikabtn.onclick = () => {this.createPokemon(1)}
        kkobubtn.onclick = () => {this.createPokemon(2)}
    }

    public createPokemon(myNum: Number): void{
        let myPokemon : Pokemon;
        let enemyPokemon : Pokemon;

        if (myNum === 1){
            myPokemon = new ElectricPokemon("피카츄")
            enemyPokemon = new WaterPokemon("꼬부기")

            const mypic = document.getElementById("mypic") as HTMLImageElement;
            const enempic = document.getElementById("enemypic") as HTMLImageElement;

            mypic.src = "../src/pika.webp";
            enempic.src = "../src/kkobu.webp";
        } else {
            myPokemon = new WaterPokemon("꼬부기")
            enemyPokemon = new ElectricPokemon("피카츄")

            const mypic = document.getElementById("mypic") as HTMLImageElement;
            const enempic = document.getElementById("enemypic") as HTMLImageElement;

            mypic.src = "../src/kkobu.webp";
            enempic.src = "../src/pika.webp";
        }
        const myhp = document.getElementById("myhp") as HTMLProgressElement;
        const enemyhp = document.getElementById("enemyhp") as HTMLProgressElement;

        myhp.max = myPokemon.hp
        myhp.value = myPokemon.hp
        enemyhp.max = enemyPokemon.hp
        enemyhp.value = enemyPokemon.hp

        this.battleManager.setPokemon(myPokemon, enemyPokemon)

        document.getElementById("ispoke").innerHTML = "";
        const battle = document.getElementById("battlebody");
        const setup = document.getElementById("setupbody");

        document.getElementById("mybattlelog").innerHTML = `win : ${myPokemon.getLog()[0]} // lose : ${myPokemon.getLog()[1]}`
        document.getElementById("enemybattlelog").innerHTML = `win : ${enemyPokemon.getLog()[0]} // lose : ${enemyPokemon.getLog()[1]}`


        battle.hidden = false;
        setup.hidden = true;

        this.play()
    }
 }
