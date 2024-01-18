import { pokeType } from "../interface/Type";
import { Pokemon } from "./Pokemon";

export class ElectricPokemon extends Pokemon{
    constructor(name: string) {
        super(name, "전기");

        // this.hp = this.hp + 100;
    }

    public specialAttack() {
        console.log(`${this.name}의 백만볼트!`)
        this.attack();
        this.dmg += 2;
    }
}