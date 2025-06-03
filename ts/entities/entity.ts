import { Item, ShortSword } from "../items/Item.js";

export abstract class Entity {
	abstract maxHealth: number;
	health = 0;
	strength = 0;
}

export class Player extends Entity {
	maxHealth: number = 100;
	gold = 50;
	health = 100;
	inventory: Item[] = [];
	strength = 10;
	knowledge: string[] = [];

	constructor() {
		super();
		
		this.inventory.push(new ShortSword());
	}
}

export abstract class Enemy extends Entity {
	maxHealth: number = 100;
	abstract name: string;
}

export class ShardThief extends Enemy{
	name = "Shard Thief";
	health = 125;
	maxHealth = 125;
	strength = 15;
}
