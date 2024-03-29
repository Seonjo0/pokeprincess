import { battleAction } from "../interface/Type";
import { Pokemon } from "./Pokemon";


export class Battle{
    private myPokemon: Pokemon
    private enemyPokemon: Pokemon
    private enemyResult: String;

    setPokemon(myPoke:Pokemon, enemyPoke:Pokemon): void{
        this.myPokemon = myPoke;
        this.enemyPokemon = enemyPoke;
    }

    myAction(myAction: battleAction): void{
        switch (myAction){
            case 1:
                this.myPokemon.attack()
                document.getElementById("battleprompt").innerHTML = `${this.myPokemon.dmg}로 공격했다!`
                break;
            case 2:
                this.myPokemon.specialAttack()
                document.getElementById("battleprompt").innerHTML = `${this.myPokemon.dmg}로 특수 공격한다!`
                break;
            case 3:
                this.myPokemon.defend()
                document.getElementById("battleprompt").innerHTML = `${this.myPokemon.shield}로 방어한다!`
                break;
            case 4:
                this.myPokemon.hide()
                document.getElementById("battleprompt").innerHTML = `회피에 ${this.myPokemon.hideStatus? '성공' : '실패'} 했다.`
                break;
            case 5:
                this.myPokemon.runaway()
                document.getElementById("battleprompt").innerHTML = `도망에 ${this.myPokemon.runStatus? '성공' : '실패'} 했다.`
                break;
        }
        this.enemyResult = this.enemyAction()
        this.battleResult(myAction, this.enemyResult)
    }
    
    private enemyAction(): string{
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

    private battleResult(actionNum:battleAction, enemyAction: String): void{
        const action = actionNum
        const enemyActionType = enemyAction;
        switch (action) {
            case 1:
                if(enemyActionType == "attack"){
                    this.myPokemon.attacked(this.enemyPokemon.dmg)
                    this.enemyPokemon.attacked(this.myPokemon.dmg)
                }
                else if (enemyActionType == "defend") {
                    this.enemyPokemon.attacked(this.myPokemon.dmg)
                }
                else if(enemyActionType == "hide"){
                    if(this.enemyPokemon.hideStatus){
                    } else {
                        this.enemyPokemon.attacked(this.myPokemon.dmg)
                    }
                }
                else if(enemyActionType == "runaway"){
                    if(this.enemyPokemon.runStatus){
                        this.enemyPokemon.hp = 0
                        break;
                    } else {
                        this.enemyPokemon.attacked(this.myPokemon.dmg)
                    }
                }
                break;
            case 2:
                if(enemyActionType == "attack"){
                    this.myPokemon.attacked(this.enemyPokemon.dmg)
                    this.enemyPokemon.attacked(this.myPokemon.dmg)
                }
                else if (enemyActionType == "defend") {
                    this.enemyPokemon.attacked(this.myPokemon.dmg)
                }
                else if(enemyActionType == "hide"){
                    if(this.enemyPokemon.hideStatus){
                    } else {
                        this.enemyPokemon.attacked(this.myPokemon.dmg)
                    }
                }
                else if(enemyActionType == "runaway"){
                    if(this.enemyPokemon.runStatus){
                        this.enemyPokemon.hp = 0
                        break;
                    } else {
                        this.enemyPokemon.attacked(this.myPokemon.dmg)
                    }
                }
                break;
            // 내가 방어
            case 3:
                if(enemyActionType == "attack"){
                    this.myPokemon.attacked(this.enemyPokemon.dmg)
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
            case 4:
                if(this.myPokemon.hideStatus){
                    if(enemyActionType == "runaway" && this.enemyPokemon.runStatus){
                        this.enemyPokemon.hp = 0
                        break;
                        }
                } else {
                    if(enemyActionType == "attack"){
                        this.myPokemon.attacked(this.enemyPokemon.dmg)
                    } else if(enemyActionType == "runaway" && this.enemyPokemon.runStatus){
                        this.enemyPokemon.hp = 0
                            break;
                    }
                }
                break;
            // 내가 도망
            case 5:
                if(this.myPokemon.runStatus){
                    this.myPokemon.hp = 0
                    break;
                } else {
                    if(enemyActionType == "attack"){
                        this.myPokemon.attacked(this.enemyPokemon.dmg)
                    } else if(enemyActionType == "runaway" && this.enemyPokemon.runStatus){
                        this.enemyPokemon.hp = 0
                            break;
                    }
                }
                break;
            default:
                break;
        }

        this.myPokemon.initialized()
        this.enemyPokemon.initialized()

        const myPokemonHpBar = document.getElementById("myhp") as HTMLProgressElement;
        const enemyPokemonHpBar = document.getElementById("enemyhp") as HTMLProgressElement;

        myPokemonHpBar.value = this.myPokemon.hp;
        enemyPokemonHpBar.value = this.enemyPokemon.hp;

        if(this.myPokemon.hp <= 0){
            this.myPokemon.die()
            this.enemyPokemon.win()
            const selectBox = document.getElementById("actionSelectionBox") as HTMLElement;
            selectBox.hidden = true;
            document.getElementById("mybattlelog").innerHTML = `win : ${this.myPokemon.getLog()[0]} // lose : ${this.myPokemon.getLog()[1]}`
            document.getElementById("enemybattlelog").innerHTML = `win : ${this.enemyPokemon.getLog()[0]} // lose : ${this.enemyPokemon.getLog()[1]}`
            document.getElementById("battleprompt").innerHTML = `${this.myPokemon.name}이(가) 쓰러졌다...`;
            document.getElementById("enemybattleprompt").innerHTML = `${this.enemyPokemon.name}이(가) 승리했다!`;

        } else if(this.enemyPokemon.hp <= 0) {
            this.enemyPokemon.die()
            this.myPokemon.win()
            const selectBox = document.getElementById("actionSelectionBox") as HTMLElement;
            selectBox.hidden = true;
            document.getElementById("mybattlelog").innerHTML = `win : ${this.myPokemon.getLog()[0]} // lose : ${this.myPokemon.getLog()[1]}`
            document.getElementById("enemybattlelog").innerHTML = `win : ${this.enemyPokemon.getLog()[0]} // lose : ${this.enemyPokemon.getLog()[1]}`
            document.getElementById("battleprompt").innerHTML = `${this.myPokemon.name}이(가) 승리했다!`;
            document.getElementById("enemybattleprompt").innerHTML = `${this.enemyPokemon.name}은 쓰러졌다...`;
        }
    }
}