module.exports = function config(api) {
    const { cache } = api
    cache(true)

    const presets = ['babel-preset-expo']

    const plugins = [
        ['@babel/plugin-proposal-export-namespace-from'],
        [
            'module:react-native-dotenv',
            {
                moduleName: '@env',
                path: '.env',
                blacklist: null,
                whitelist: null,
                safe: false,
                allowUndefined: true,
            },
        ],
        [
            'module-resolver',
            {
                root: ['.'],
                alias: {
                    '^@/(.+)': './src/\\1',
                },
                extensions: [
                    '.js',
                    '.ts',
                    '.jsx',
                    '.tsx',
                    '.ios.js',
                    '.android.js',
                    '.ios.ts',
                    '.android.ts',
                    '.ios.tsx',
                    '.android.tsx',
                    '.json',
                ],
            },
        ],
        ['react-native-reanimated/plugin'],
    ]

    return {
        presets,
        plugins,
    }
}
