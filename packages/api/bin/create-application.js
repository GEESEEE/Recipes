#!/usr/bin/env node
'use strict'

/**
 * Usage: node create-application.js "Application Name" "scope1 scope2" https://example.com true
 */

require('dotenv').config()
require('reflect-metadata')

const containerLoader = require('../dist/loaders/container').default
const { constants } = require('../dist/util')

const { TYPES } = constants

async function createApplication(
    name = 'RecipesApp',
    secret = '',
    scopes = '',
    redirectUri = '',
    confidential = true
) {
    const container = await containerLoader()

    const applicationRepository = container.get(TYPES.ApplicationRepository)
    return applicationRepository.insert({
        name,
        secret,
        scopes,
        redirectUri,
        confidential: Boolean(confidential),
    })
}

createApplication(...process.argv.slice(2)).then(console.log)
