import type { StatType } from "$lib/domain/types/shared";
import { Heart, HeartPlus, Swords, Shield, Zap, Sparkles, Gauge, Flame, Crosshair, Sword, Goal, Icon } from "@lucide/svelte";

export const STAT_ICONS: Record<StatType, typeof Icon> = {
	hp: Heart,
	hp_recovery: HeartPlus,
	hp_percent: Heart,
	atk: Swords,
	atk_percent: Swords,
	def: Shield,
	def_percent: Shield,
	speed: Zap,
	sp: Sparkles,
	sp_recovery_percent: Gauge,
	damage_mult: Flame,
	crit_rate: Crosshair,
	crit_mult: Crosshair,
	pierce_rate: Sword,
	ailment_accuracy: Goal
};
 
export function getStatIcon(stat: StatType): typeof Icon {
	return STAT_ICONS[stat];
}