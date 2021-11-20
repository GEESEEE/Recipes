import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createSchema1620169219541 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)

        await queryRunner.createTable(
            new Table({
                name: 'settings',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'theme',
                        type: 'enum',
                        enum: ['dark', 'light'],
                        default: "'dark'",
                    },
                    {
                        name: 'color',
                        type: 'varchar(255)',
                        default: "'#4ecdc4'",
                    },
                    {
                        name: 'inverted_colors',
                        type: 'boolean',
                        default: false,
                    },
                ],
            })
        )

        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'settings_id',
                        type: 'int',
                    },
                    {
                        name: 'name',
                        type: 'varchar(255)',
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar(255)',
                    },
                    {
                        name: 'email',
                        type: 'varchar(255)',
                        isUnique: true,
                    },
                ],
                foreignKeys: [
                    {
                        referencedTableName: 'settings',
                        columnNames: ['settings_id'],
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                    },
                ],
            })
        )

        await queryRunner.createTable(
            new Table({
                name: 'application',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'uid',
                        type: 'varchar(255)',
                        isUnique: true,
                        default: `uuid_generate_v4()`,
                    },
                    {
                        name: 'name',
                        type: 'varchar(1023)',
                    },
                    {
                        name: 'secret',
                        type: 'varchar(255)',
                    },
                    {
                        name: 'redirect_uri',
                        type: 'varchar(255)',
                    },
                    {
                        name: 'confidential',
                        type: 'boolean',
                        default: true,
                    },
                    {
                        name: 'scopes',
                        type: 'varchar(1023)',
                        default: "''",
                    },
                ],
            })
        )

        await queryRunner.createTable(
            new Table({
                name: 'token',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'token',
                        type: 'varchar(1023)',
                        isUnique: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        default: 'NOW()',
                    },
                    {
                        name: 'revoked_at',
                        type: 'timestamp with time zone',
                        isNullable: true,
                    },
                    {
                        name: 'user_id',
                        type: 'int',
                    },
                    {
                        name: 'application_id',
                        type: 'int',
                    },
                ],
                foreignKeys: [
                    {
                        referencedTableName: 'user',
                        columnNames: ['user_id'],
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                    },
                    {
                        referencedTableName: 'application',
                        columnNames: ['application_id'],
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                    },
                ],
            })
        )

        await queryRunner.createTable(
            new Table({
                name: 'section',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar(255)',
                    },
                    {
                        name: 'description',
                        type: 'varchar(1024)',
                    },
                    {
                        name: 'user_id',
                        type: 'int',
                    },
                    {
                        name: 'position',
                        type: 'int',
                    },
                ],
                foreignKeys: [
                    {
                        referencedTableName: 'user',
                        columnNames: ['user_id'],
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                    },
                ],
            })
        )

        await queryRunner.createTable(
            new Table({
                name: 'recipe',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar(255)',
                    },
                    {
                        name: 'description',
                        type: 'varchar(1024)',
                    },
                    {
                        name: 'prepare_time',
                        type: 'int',
                    },
                    {
                        name: 'people_count',
                        type: 'int',
                    },
                    {
                        name: 'section_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        default: 'NOW()',
                    },
                    {
                        name: 'position',
                        type: 'int',
                    },
                    {
                        name: 'published_at',
                        type: 'timestamp with time zone',
                        isNullable: true,
                        default: null,
                    },
                    {
                        name: 'copy_of',
                        type: 'int',
                        isNullable: true,
                        default: null,
                    },
                ],
                foreignKeys: [
                    {
                        referencedTableName: 'section',
                        columnNames: ['section_id'],
                        referencedColumnNames: ['id'],
                        onDelete: 'SET NULL',
                    },
                ],
            })
        )

        await queryRunner.createTable(
            new Table({
                name: 'ingredient',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar(255)',
                    },
                    {
                        name: 'unit',
                        type: 'varchar(255)',
                        isNullable: true,
                    },
                ],
                indices: [
                    {
                        columnNames: ['name', 'unit'],
                        isUnique: true,
                    },
                    {
                        columnNames: ['name'],
                        isUnique: true,
                        where: 'unit IS NULL',
                    },
                ],
            })
        )

        await queryRunner.createTable(
            new Table({
                name: 'recipe_ingredient',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'recipe_id',
                        type: 'int',
                    },
                    {
                        name: 'ingredient_id',
                        type: 'int',
                    },
                    {
                        name: 'amount',
                        type: 'float',
                    },
                    {
                        name: 'position',
                        type: 'int',
                    },
                ],
                foreignKeys: [
                    {
                        referencedTableName: 'recipe',
                        columnNames: ['recipe_id'],
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                    },
                    {
                        referencedTableName: 'ingredient',
                        columnNames: ['ingredient_id'],
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                    },
                ],
                indices: [
                    {
                        columnNames: ['recipe_id', 'ingredient_id'],
                        isUnique: true,
                    },
                ],
            })
        )

        await queryRunner.createTable(
            new Table({
                name: 'instruction',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'text',
                        type: 'varchar(255)',
                    },
                    {
                        name: 'position',
                        type: 'int',
                    },
                    {
                        name: 'recipe_id',
                        type: 'int',
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['recipe_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'recipe',
                        onDelete: 'CASCADE',
                    },
                ],
            })
        )

        await queryRunner.createTable(
            new Table({
                name: 'report',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'description',
                        type: 'varchar(255)',
                    },
                    {
                        name: 'category',
                        type: 'enum',
                        enum: ['incomplete', 'invalid', 'trolling', 'spam'],
                    },
                    {
                        name: 'recipe_id',
                        type: 'int',
                    },
                    {
                        name: 'user_id',
                        type: 'int',
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['recipe_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'recipe',
                        onDelete: 'CASCADE',
                    },
                    {
                        columnNames: ['user_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'user',
                        onDelete: 'CASCADE',
                    },
                ],
            })
        )

        await queryRunner.createTable(
            new Table({
                name: 'subscription_plan',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar(255)',
                    },
                    {
                        name: 'cost_per_period',
                        type: 'float',
                    },
                    {
                        name: 'time_period',
                        type: 'enum',
                        enum: ['monthly', 'yearly'],
                    },
                    {
                        name: 'payment_period',
                        type: 'enum',
                        enum: ['monthly', 'yearly'],
                    },
                ],
            })
        )

        await queryRunner.createTable(
            new Table({
                name: 'subscription',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'plan_id',
                        type: 'int',
                    },
                    {
                        name: 'user_id',
                        type: 'int',
                    },
                    {
                        name: 'start',
                        type: 'timestamp with time zone',
                        default: 'NOW()',
                    },
                    {
                        name: 'end',
                        type: 'timestamp with time zone',
                        isNullable: true,
                        default: null,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['plan_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'subscription_plan',
                        onDelete: 'CASCADE',
                    },
                    {
                        columnNames: ['user_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'user',
                        onDelete: 'CASCADE',
                    },
                ],
            })
        )

        await queryRunner.createTable(
            new Table({
                name: 'payment',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'subscription_id',
                        type: 'int',
                    },
                    {
                        name: 'amount',
                        type: 'float',
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone',
                        default: 'NOW()',
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['subscription_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'subscription',
                        onDelete: 'CASCADE',
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('payment')
        await queryRunner.dropTable('subscription')
        await queryRunner.dropTable('subscription_plan')
        await queryRunner.dropTable('instruction')
        await queryRunner.dropTable('recipe_ingredient')
        await queryRunner.dropTable('ingredient')
        await queryRunner.dropTable('recipe')
        await queryRunner.dropTable('section')
        await queryRunner.dropTable('token')
        await queryRunner.dropTable('application')
        await queryRunner.dropTable('user')
        await queryRunner.dropTable('settings')
    }
}
