// cjs (common js)
// var generateName = require("sillyname");

// ejs (ecma js)
import generateName from "sillyName";

var sillyName = generateName();
console.log(`Some silly name could be ${sillyName}.`);

import { randomSuperhero } from 'superheroes';

var superHero = randomSuperhero();
console.log(`Dripping ${superHero}`)