'use strict'

require('dotenv').config()

const baseConfig = {
    type: 'postgres',
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    entities: ['dist/entities/**/*.js'],
    migrations: ['dist/migrations/**/*.js'],
    subscribers: ['dist/subscribers/**/*.js'],
    seeds: ['dist/seeds/**/*.js'],
    factories: ['dist/factories/**/*.js'],
    cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/migrations',
        subscribersDir: 'src/subscribers',
    },
}

module.exports = {
    development: {
        ...baseConfig,
        host: '127.0.0.1',
        database: 'RecipesLocal_development',
        logging: true,
    },

    production: {
        ...baseConfig,
        host: process.env.POSTGRES_HOST,
        database: 'RecipesLocal_production',
    },

    test: {
        ...baseConfig,
        host: '127.0.0.1',
        database: 'RecipesLocal_test',
        dropSchema: true,
        synchronize: true,
    },
}[process.env.NODE_ENV ?? 'development']
