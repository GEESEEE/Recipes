import { createConnection } from 'typeorm'

async function run() {
    const connection = await createConnection()

    await connection.manager.query(
        `   DELETE FROM ingredient
            WHERE id
            NOT IN
                (SELECT recipe_ingredient.ingredient_id
                FROM recipe_ingredient)`
    )

    process.exit(0)
}
;(async () => {
    await run()
})()
