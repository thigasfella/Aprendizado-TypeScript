import { spaceShip } from "./expoort";
import * as lodash from "lodash"

interface BattleSpaceShip extends spaceShip{
    weapons: number,

}

let xwing: BattleSpaceShip = {
    name: "X-wing",
    pilot: "Luke",
    speed: 50,
    weapons: 4
}

console.log(lodash.camelCase(xwing.pilot))
