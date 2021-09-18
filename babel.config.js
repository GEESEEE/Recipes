module.exports = function(api) {
    const { cache } = api
    cache(true)

    const presets = ['babel-preset-expo']

    const plugins = [
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
                root: ["./app/"],
                extensions: [
                    '.js',
                    '.ts',
                    '.jsx',
                    '.tsx',
                    '.ios.ts',
                    '.android.ts',
                    '.ios.tsx',
                    '.android.tsx',
                    '.json'
                ],
                alias: {
                    "@components": "./app/components",
                    '@routes': './app/routes',
                    '@screens': './app/screens',
                    '@actions': './app/actions',
                    '@reducers': './app/reducers',
                    '@hooks': './app/hooks',
                    '@services': './app/services',
                    '@adapters': './app/adapters',
                    '@assets': './app/assets',
                    '@config': './app/config',
                    '@data': './app/data',
                }
            }
        ]
    ]

    return {
        presets,
        plugins
    }
}
