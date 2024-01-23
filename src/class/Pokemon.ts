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
        this.fightLog = {
            win: 0,
            lose: 0,
        }
    }

    attack(): void{
        this.dmg = Math.round((Math.random())*5) + 1
    }

    specialAttack(): void{

    }

    defend(): void{
        this.shield = Math.round((Math.random())*3) + 1
    }

    hide(): void{
        if(Math.random() > 0.5){
            this.hideStatus = true
        }
    }

    runaway(): void{
        if(Math.random() > 0.9){
            this.runStatus = true
        }
    }

    attacked(dmg: number): void{
        if(this.shield == 0){
            this.hp -= dmg
        } else {
            if (dmg - this.shield > 0) {
                this.hp -= (dmg - this.shield);
            } else {
              return;
            }
        }
        console.log(`${this.name} 의 hp ==> ${this.hp}`)
    }

    die(): void{
        this.fightLog.lose += 1;
    }

    win(): void {
        this.fightLog.win += 1
    }

    getLog(): number[]{
        return [this.fightLog.win, this.fightLog.lose]
    }

    initialized(): void{
        this.dmg = 0;
        this.shield = 0;
        this.hideStatus = false;
        this.runStatus = false;
    }
}