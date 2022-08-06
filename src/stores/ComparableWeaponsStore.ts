import {writable} from "svelte/store";
import type {Writable} from "svelte/store";
import type {IWeapon} from "../types/weapon.type";

export const ComparableWeaponsStore: Writable<IWeapon[]> = writable([]);