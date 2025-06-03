import { Entity } from "./entities/entity";

export type Scene = {
	text: string | ((something?: any[] | any) => string);
	choices: Choice[];
};

type Choice = {
    text: string;
    nextScene: string;
    action?: (anything?: any) => any;
}
