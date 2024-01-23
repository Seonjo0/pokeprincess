import { pokeType } from "../interface/Type";
import { Pokemon } from "./Pokemon";

export class WaterPokemon extends Pokemon{
    constructor(name: string) {
        super(name, "물");
        // this.hp = this.hp + 100;
    }

    public specialAttack(): void{
        console.log(`${this.name}의 물뿌리기!`);
        this.attack();
        this.dmg += 1;
    }
}