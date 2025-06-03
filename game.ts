import { Game } from "./ts/classes.js";
import { Player } from "./ts/entities/entity.js";
import { Item } from "./ts/items/Item.js";
import { scenes } from "./ts/story/scenes.js";

window.addEventListener("load", initGame);

// DOM Elements
const storyTextEl = document.getElementById("story-text")!;
const choicesEl = document.getElementById("choices")!;
const healthValueEl = document.getElementById("health-value")!;
const goldValueEl = document.getElementById("gold-value")!;
const strengthValueEl = document.getElementById("strength-value")!;
const inventoryItemsEl = document.getElementById("inventory-items")!;

// Initialize the game
function initGame(): void {
	const player = new Player();

	updatePlayer(player);
	updateInventory(player);
	renderScene(Game.currentScene, player);
}

function renderScene(sceneId: string, player: Player) {
	Game.currentScene = sceneId;

	// const previous = scenes[sceneId];
	const scene = scenes[sceneId];

	// Update story text (handle both static strings and functions)
	if (typeof scene.text === "function") {
		storyTextEl.innerHTML = scene.text(player);
	} else {
		storyTextEl.textContent = scene.text;
	}

	// Clear previous choices
	choicesEl.innerHTML = "";

	// Create buttons for each choice
	scene.choices.forEach((choice) => {
		const button = document.createElement("button");
		button.className = "choice-btn";
		button.textContent = choice.text;
		button.addEventListener("click", () => {
			// Execute the choice's action if it exists
			if (choice.action) {
				choice.action(player);
			}
			// Move to the next scene
			renderScene(choice.nextScene, player);

			// Update the UI
			updatePlayer(player);
			updateInventory(player);
		});
		choicesEl.appendChild(button);
	});

	// If no choices available (shouldn't happen in proper design)
	if (scene.choices.length === 0) {
		const button = document.createElement("button");
		button.className = "choice-btn";
		button.textContent = "Continue";
		button.addEventListener("click", () => {
			renderScene("start", player);

			updatePlayer(player);
			updateInventory(player);
		});
		choicesEl.appendChild(button);
	}
}

// Update stats display
function updatePlayer(player: Player) {
	healthValueEl.textContent = player.health.toString();
	goldValueEl.textContent = player.gold.toString();
	strengthValueEl.textContent = player.strength.toString();
}

// Update inventory display
function updateInventory(player: Player): void {
	inventoryItemsEl.innerHTML = "";

	if (player.inventory.length === 0) {
		const item = document.createElement("li");
		item.textContent = "Empty";
		inventoryItemsEl.appendChild(item);
	} else {
		player.inventory.forEach((item: unknown) => {
			const li = document.createElement("li");

			// Make Items look clickable
			if (item instanceof Item) {
				li.style.cursor = "pointer";
				li.style.color = item.color;

				// Add listeners to items
				li.textContent = item.name;
				li.addEventListener("click", () => {
					if (item.use(player) == true) {
						storyTextEl.textContent = item.afterText || "You used the item!";
						storyTextEl.style.color = item.afterTextColor || "#00ff00";

						// Remove consumable item from inventory
						updatePlayer(player);
						if (item.type == "consumable") reduceItemCount(player, item.name);
					} else {
						console.log(player.health, player.maxHealth);
						storyTextEl.textContent = item.failText || "Failed to use item.";
						storyTextEl.style.color = item.failTextColor || "#ff0000";

						// Remove consumable item from inventory
						if (item.type == "consumable") reduceItemCount(player, item.name);
					}
				});
			}

			inventoryItemsEl.appendChild(li);
		});
	}
}

// Reduce item count
function reduceItemCount(player: Player, itemName: string): void {
	const itemIndex = player.inventory.findIndex(
		(item) => item instanceof Item && item.name === itemName
	);

	if (itemIndex !== -1) {
		player.inventory.splice(itemIndex, 1);
		updateInventory(player);
	} else {
		console.warn(`Item ${itemName} not found in inventory.`);
	}
}

// Add item to inventory
function addItemToInventory(player: Player, item: Item): void {
	if (player.inventory.length < 10) {
		// Limit inventory size to 10 items
		player.inventory.push(item);
		updateInventory(player);
	} else {
		console.warn("Inventory is full. Cannot add more items.");
	}
}
