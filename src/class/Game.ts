import { Pokemon } from "./Pokemon";
import { ElectricPokemon } from "./ElectricPokemon";
import { WaterPokemon } from "./WaterPokemon";

export class Game {
    public myPokemon: Pokemon;
    public enemyPokemon: Pokemon;
    public enemyResult: String;
    
    constructor() {
            document.getElementById("startGame").onclick = () => {
                this.setup()

            document.getElementById("attack").onclick = () => {
                this.myPokemon.attack()
                document.getElementById("battleprompt").innerHTML = `${this.myPokemon.dmg}로 공격했다!`
                this.enemyResult = this.enemyAction()
                this.battleResult(1, this.enemyResult)
            }

            document.getElementById("specialatk").onclick = () => {
                this.myPokemon.specialAttack()
                document.getElementById("battleprompt").innerHTML = `${this.myPokemon.dmg}로 특수공격했다!`
                this.enemyResult = this.enemyAction()
                this.battleResult(1, this.enemyResult)
            }

            document.getElementById("defense").onclick = () => {
                this.myPokemon.defend()
                document.getElementById("battleprompt").innerHTML = `${this.myPokemon.shield}로 막아냈다!`
                this.enemyResult = this.enemyAction()
                this.battleResult(2, this.enemyResult)
            }
            
            document.getElementById("hide").onclick = () => {
                document.getElementById("battleprompt").innerHTML = `회피에 ${this.myPokemon.hideStatus? "성공했다!" : "실패했다..."}`
                this.enemyResult = this.enemyAction()
                this.battleResult(3, this.enemyResult)
            }

            document.getElementById("runaway").onclick = () => {
                document.getElementById("battleprompt").innerHTML = `도망에 ${this.myPokemon.runStatus? "성공했다!" : "실패했다..."}`
                this.enemyResult = this.enemyAction()
                this.battleResult(4, this.enemyResult)
            }
        }
    }

    public play(){
        document.getElementById("battleprompt").innerHTML = "행동을 선택하세요."
    }

    
    public setup() {
        console.log("게임이 시작되었습니다.");
        document.getElementById("ispoke").innerHTML = "플레이할 포켓몬을 골라주세요."

        const pikabtn = document.getElementById("startPika") as HTMLButtonElement;
        const kkobubtn = document.getElementById("startKkobu") as HTMLButtonElement;

        pikabtn.disabled = false;
        kkobubtn.disabled = false;

        pikabtn.onclick = () => {this.createPokemon(1)}
        kkobubtn.onclick = () => {this.createPokemon(2)}
    }

    public createPokemon(myNum: Number) {
        if (myNum === 1){
            this.myPokemon = new ElectricPokemon("피카츄")
            this.enemyPokemon = new WaterPokemon("꼬부기")

            const mypic = document.getElementById("mypic") as HTMLImageElement;
            const enempic = document.getElementById("enemypic") as HTMLImageElement;

            mypic.src = "../src/pika.webp";
            enempic.src = "../src/kkobu.webp";
        } else {
            this.myPokemon = new WaterPokemon("꼬부기")
            this.enemyPokemon = new ElectricPokemon("피카츄")

            const mypic = document.getElementById("mypic") as HTMLImageElement;
            const enempic = document.getElementById("enemypic") as HTMLImageElement;

            mypic.src = "../src/kkobu.webp";
            enempic.src = "../src/pika.webp";
        }

        const myhp = document.getElementById("myhp") as HTMLProgressElement;
        const enemyhp = document.getElementById("enemyhp") as HTMLProgressElement;

        myhp.max = this.myPokemon.hp
        myhp.value = this.myPokemon.hp
        enemyhp.max = this.enemyPokemon.hp
        enemyhp.value = this.enemyPokemon.hp

        document.getElementById("ispoke").innerHTML = "";
        const battle = document.getElementById("battlebody");
        const setup = document.getElementById("setupbody");
        battle.hidden = false;
        setup.hidden = true;

        this.play()
    }

    public enemyAction(){
        const probAction = Math.random()
        let actionType: string;

        if (probAction > 0.5 && probAction < 1){
            this.enemyPokemon.attack()
            actionType = "attack";
            document.getElementById("enemybattleprompt").innerHTML = `${this.enemyPokemon.name}이(가) ${this.enemyPokemon.dmg}로 공격합니다.`
        }
        else if(probAction > 0.4 && probAction < 0.5){
            this.enemyPokemon.specialAttack()
            actionType = "attack";
            document.getElementById("enemybattleprompt").innerHTML = `${this.enemyPokemon.name}이(가) ${this.enemyPokemon.dmg}로 특수 공격합니다.`
        }
        else if(probAction > 0.1 && probAction < 0.4){
            this.enemyPokemon.defend()
            actionType = "defend";
            document.getElementById("enemybattleprompt").innerHTML = `${this.enemyPokemon.name}이(가) ${this.enemyPokemon.shield}로 방어합니다.`
        }
        else if(probAction < 0.1){
            if(this.enemyPokemon.hideStatus){
                document.getElementById("enemybattleprompt").innerHTML = `${this.enemyPokemon.name}이(가) 회피합니다.`
            } else {
                document.getElementById("enemybattleprompt").innerHTML = `${this.enemyPokemon.name}이(가) 회피에 실패합니다.`
            }
            actionType = "hide"
        }
        else{
            if(this.enemyPokemon.runStatus){
                document.getElementById("enemybattleprompt").innerHTML = `${this.enemyPokemon.name}이(가) 도망갑니다.`
            } else {
                document.getElementById("enemybattleprompt").innerHTML = `${this.enemyPokemon.name}이(가) 도망에 실패합니다.`
            }
            actionType = "runaway"
        }
        return actionType;
    }

    public battleResult(actionNum:Number, enemyAction: String){
        const action = actionNum
        const enemyActionType = enemyAction;
        switch (action) {
            // 내가 attack
            case 1:
                if(enemyActionType == "attack"){
                    this.myPokemon.hp -= this.enemyPokemon.dmg
                    this.enemyPokemon.hp -= this.myPokemon.dmg
                }
                else if (enemyActionType == "defend") {
                    const battleResultValue = this.enemyPokemon.shield - this.myPokemon.dmg;
                    this.enemyPokemon.hp -= (battleResultValue > 0) ? battleResultValue : -battleResultValue;
                }
                else if(enemyActionType == "hide"){
                    if(this.enemyPokemon.hideStatus){

                    } else {
                        this.enemyPokemon.hp -= this.myPokemon.dmg
                    }
                }
                else if(enemyActionType == "runaway"){
                    if(this.enemyPokemon.runStatus){
                        this.enemyPokemon.hp = 0
                        break;
                    } else {
                        this.enemyPokemon.hp -= this.myPokemon.dmg
                    }
                }
                break;
            // 내가 방어
            case 2:
                if(enemyActionType == "attack"){
                    const battleResultValue = this.myPokemon.shield - this.enemyPokemon.dmg;
                    this.myPokemon.hp -= (battleResultValue > 0) ? battleResultValue : -battleResultValue;
                }
                else if(enemyActionType == "defend"){
                    break;
                }
                else if(enemyActionType == "hide"){
                    break;
                }
                else if(enemyActionType == "runaway"){
                    if(this.enemyPokemon.runStatus){
                        this.enemyPokemon.hp = 0
                        break;
                    } else {
                        break;
                    }
                }
                break;
            // 내가 회피
            case 3:
                if(this.myPokemon.hideStatus){
                    if(enemyActionType == "runaway" && this.enemyPokemon.runStatus){
                        this.enemyPokemon.hp = 0
                        break;
                        }
                } else {
                    if(enemyActionType == "attack"){
                        this.myPokemon.hp -= this.enemyPokemon.dmg
                    } else if(enemyActionType == "runaway" && this.enemyPokemon.runStatus){
                        this.enemyPokemon.hp = 0
                            break;
                    }
                }
                break;
            // 내가 도망
            case 4:
                if(this.myPokemon.runStatus){
                    this.myPokemon.hp = 0
                    break;
                } else {
                    if(enemyActionType == "attack"){
                        this.myPokemon.hp -= this.enemyPokemon.dmg
                    } else if(enemyActionType == "runaway" && this.enemyPokemon.runStatus){
                        this.enemyPokemon.hp = 0
                            break;
                    }
                }
                break;
            default:
                console.log("...")
                break;
        }

        const myPokemonHpBar = document.getElementById("myhp") as HTMLProgressElement;
        const enemyPokemonHpBar = document.getElementById("enemyhp") as HTMLProgressElement;

        myPokemonHpBar.value = this.myPokemon.hp;
        console.log("my poke =>", this.myPokemon.hp)
        enemyPokemonHpBar.value = this.enemyPokemon.hp;
        console.log("enemy poke =>", this.enemyPokemon.hp)

        if(this.myPokemon.hp <= 0){
            this.myPokemon.die()
            const selectBox = document.getElementById("actionSelectionBox") as HTMLElement;
            selectBox.hidden = true;
            document.getElementById("battleprompt").innerHTML = `${this.myPokemon.name}이(가) 쓰러졌다...`;
            document.getElementById("enemybattleprompt").innerHTML = `${this.enemyPokemon.name}이(가) 승리했다!`;

        } else if(this.enemyPokemon.hp <= 0) {
            this.enemyPokemon.die()
            const selectBox = document.getElementById("actionSelectionBox") as HTMLElement;
            selectBox.hidden = true;
            document.getElementById("battleprompt").innerHTML = `${this.myPokemon.name}이(가) 승리했다!`;
            document.getElementById("enemybattleprompt").innerHTML = `${this.enemyPokemon.name}은 쓰러졌다...`;
        }
    }
 }
