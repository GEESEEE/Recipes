module.exports = function config(api) {
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
                root: ["."],
                alias: {
                    '^@/(.+)': './app/\\1',
                    '@/atoms': './app/components/atoms'
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
                    '.json'
                ]
            }
        ]
    ]

    return {
        presets,
        plugins
    }
}
