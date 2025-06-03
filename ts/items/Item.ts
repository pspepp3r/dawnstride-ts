import { Enemy, Entity } from "../entities/entity.js";

export abstract class Item {
	abstract name: string;
	abstract type: string; // e.g., "potion", "weapon", etc.
	abstract color: string;

	description = "";
	afterText = "";
	failText = "";
	afterTextColor: string = "#00ff00";
	failTextColor: string = "#ff0000";

	abstract use(owner?: Entity, enemy?: Entity): boolean;
}

// Potions
export abstract class Potion extends Item {
	type = "consumable";
}

export class HealthPotion extends Potion {
	name = "Health Potion";
	description = "A potion that restores health.";
	color = "#ff6b6b";
	afterText: string = "You drink the health potion and feel revitalized!";
	failText: string =
		"You drink the health potion, but it has no effect on you.";

	use(owner: Entity): boolean {
		if (owner.health >= owner.maxHealth) {
			return false;
		}

		owner.health += Math.floor(Math.random() * owner.strength);
		return true;
	}
}

// Weapons
export abstract class Weapon extends Item {
	baseDmg = 5;
}

export class ShortSword extends Weapon {
	name = "Short Sword";
	type = "weapon";
	color = "white";

	description = "A basic sword for close combat.";
	use(owner: Entity, enemy: Enemy): boolean {
		const damage = this.baseDmg + Math.random() * owner?.strength;
		if (enemy.health > 0) {
			enemy.health -= damage;
			this.afterText = `You swing your sword and deal ${damage} slashing damage!`;
			return true;
		} else {
			this.afterText = `You killed the ${enemy.name}!`;
			return false;
		}
	}
}
