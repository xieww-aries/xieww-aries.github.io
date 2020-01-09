module.exports = {
    syntax: 'postcss-scss',
    plugins: {
        'postcss-cssnext': {
            browsers: [
                'last 3 versions',
                'ff >= 30',
                'chrome >= 34',
                'safari >= 6',
                'opera >= 12.1',
                'ios >= 6',
                'android >= 4.0',
                'bb >= 10'
            ]
        }
    }
};
