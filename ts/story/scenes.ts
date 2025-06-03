import { Player, ShardThief } from "../entities/entity.js";
import { Scene } from "../types.js";

interface Nodes {
	[key: string]: Scene;
}

export const scenes: Nodes = {
	start: {
		text:
			"You're a young guard working in the gates of the temple of Soltherion, located in Earhea - The city of Sun." +
			" \nIt's another boring day at work, most of the other guards getting wasted in booze while you're out taking your routine check through the quarters of the east temple wall." +
			" You hear the sound of confused murmurs coming just beyond the walls of the beautifully adorned garden. What do you decide to do?",
		choices: [
			{
				text: "Head out to find out what's going on.",
				nextScene: "gate_riot",
			},
			{
				text: '"That\'s beyond my job description" Continue strolling through the quarters.',
				nextScene: "encounter_shard_thieves",
			},
		],
	},
	gate_riot: {
		text:
			"You quickly ready yourself for trouble and quickly head out to see what was wrong." +
			" \nOn getting to the gates, you find the temple leaders on top of a platform while other guards a pushing a mob of rioting people away from the platform.",
		choices: [
			{
				text: "Ask someone of what's going on.",
				nextScene: "gate_riot_cause",
				action: (player) => {
					player.knowledge.push("knows_about_shard_thieves");
				},
			},
			{
				text: "Watch a little more",
				nextScene: "gate_riot_cause",
			},
		],
	},
	gate_riot_cause: {
		text: function (player) {
			if (player.knowledge.indexOf("knows_about_shard_thieves") > -1) {
				player.knowledge.push("knows_about_shard_thieves");

				return (
					"You approach one of the wailing men and ask what's going on. \"You work for the temple and still don't know? The Rays found Miraad's tears and foresaw dusk falling upon the land...\"" +
					" While he was still speaking, a cloud of smoke encircles the Rays and a banging sound is heard from within the smoke." +
					" \nYou join the guards who are already rushing into the smoke to find out what's going on and chaos fills the place even more." +
					"Entering the cloud, you see some of the Rays lying in a pool of their blood. Just at the corner of your eye, you see some black-hooded men jumping over the fence into the temple walls."
				);
			} else {
				player.knowledge.push("knows_about_shard_thieves");

				return (
					" While you are still watching, a cloud of smoke encircles the Rays and a banging sound is heard from within the smoke." +
					" \nYou join the guards who are already rushing into the smoke to find out what's going on and chaos fills the place even more." +
					"Entering the cloud, you see some of the Rays lying in a pool of their blood. Just at the corner of your eye, you see some black-hooded men jumping over the fence into the temple walls."
				);
			}
		},
		choices: [
			{
				text: "Follow the hooded men",
				nextScene: "encounter_shard_thieves",
			},
			{
				text: "Assist the remaining Rays and control crowd",
				nextScene: "",
			},
		],
	},

	encounter_shard_thieves: {
		text: function (player) {
			if (player.knowledge.indexOf("knows_about_shard_thieves") > -1) {
				return (
					"You cautiously walk down the temple quarter with your eyes intensely looking at every thing." +
					"Eventually, you find the men you're looking for standing in a circle."
				);
			} else {
				return (
					"That's none of your business, they only pay you to keep the peace within the temple walls." +
					"  You shrug and continue strolling down the quarter, completely ignoring the sounds coming from behind the wall." +
					" You soon find a group of men in dark hood standing in a circle.This is unusual as nobody ever comes to this part of the temple."
				);
			}
		},

		choices: [
			{
				text: "Confront the suspicious men with a battle stance.",
				nextScene: "shard_thieves_attack",
			},
			{
				text: "Keep monitoring the suspicious men.",
				nextScene: "shard_thieves_escape",
			},
		],
	},
	shard_thieves_attack: {
		text: function (player) {
			if (player.knowledge.indexOf("knows_about_shard_thieves") > -1) {
				return "You draw your steel sword and charge at the hooded men";
			} else {
				return '"Identify yourselves!" you say as you approach the hooded men';
			}
		},
		choices: [
			{
				text: "Begin Fight",
				nextScene: "shard_thieves_fight",
			},
		],
	},
	shard_thieves_fight: {
		text: function (player) {
			const thief1 = new ShardThief();

			return (
				"<div class='enemy-table'> " +
					"<p> Enemy Name </p>" +
					"<p> Enemy HP </p>" +
				"</div>" +
				"<div class='enemy-table'> " +
					`<p> ${thief1.name} </p>` +
					`<p> ${thief1.health} </p>` +
				"</div>"
			);
		},
		choices: [
			{
				text: "Use fist",
				nextScene: "",
				action: function (player: Player) {
					player.inventory[0].use(player);
				}
			}
		],
	},
	shard_thieves_escape: {
		text: function (player) {
			if (player.knowledge.indexOf("knows_about_shard_thieves") > -1) {
				return "Cautiously, you watch as the men mutter some strange words in their circle and eventually vanish in a cloud of smoke";
			} else {
				return (
					"You watch as the hooded men say some strange muttering as they gather in a circle." +
					" Just as you decide to stop them, the men disappear in a cloud of smoke."
				);
			}
		},
		choices: [
			{
				text: "Continue",
				nextScene: "",
			},
		],
	},
};
