module.exports = {
	syntax: 'postcss-scss',
	plugins: {
		'postcss-preset-env': {
			features: {
				'custom-properties': false
			}
		}
	}
};
