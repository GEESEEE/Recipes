import { createConnection } from 'typeorm'

async function run() {
    const connection = await createConnection()

    await connection.manager.query(
        `   DELETE FROM recipe
            WHERE section_id = null
            AND WHERE id
            NOT IN
                (SELECT recipe.copy_of
                FROM recipe
                WHERE recipe.copy_of IS NOT null
                )
                `
    )

    process.exit(0)
}

run()
