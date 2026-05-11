const STAT_ROLLS = {
	revelation: {
		crit_rate: {
			min: 1.3,
			max: 2.0,
			rolls: [1.3, 1.4, 1.7, 1.8, 2.0]
		},
		crit_mult: {
			min: 2.5,
			max: 4.1,
			rolls: [2.5, 2.8, 3.4, 3.7, 4.1]
		}
	},
	space: {
		crit_rate: {
			min: 1.6,
			max: 2.6,
			rolls: [1.6, 1.8, 2.1, 2.3, 2.6]
		},
		crit_mult: {
			min: 3.1,
			max: 5.2,
			rolls: [3.1, 3.6, 4.1, 4.7, 5.2]
		}
	}
};

export default STAT_ROLLS;
