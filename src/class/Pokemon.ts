import { FightLog, pokeType } from "../interface/Type";

export class Pokemon {
    public name: string;
    private fightLog: FightLog;
    public hp: number = 50;
    public dmg: number;
    public shield: number;
    public hideStatus: boolean = false;
    public runStatus: boolean = false;

    constructor(name: string, type: pokeType) {
        this.name = name;
    }

    public attack() {
        this.dmg = Math.round((Math.random())*5)
    }

    public specialAttack(){

    }

    public defend(){
        this.shield = Math.round((Math.random())*3)
    }

    public hide(){
        if(Math.random() > 0.5){
            this.hideStatus = true
        }
    }

    public runaway(){
        if(Math.random() > 0.9){
            this.runStatus = true
        }
    }

    public die() {
        // this.fightLog.lose = this.fightLog.lose + 1;
    }
}