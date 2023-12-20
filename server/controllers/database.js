import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

const config =  {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'dblbox',
}

const getDataFromDatabase = async (query, params = []) => {
    try {
        const connection = await mysql.createConnection(config);
        const [results] = await connection.query(query, params);
        connection.end();
        return results;
    } catch (error) {
        console.error('Error al obtener datos de la base de datos:', error);
        throw error;
    }
};

const postUnit = async ({
    id,
    unit_name,
    unit_color,
    unit_type,
    unitTag,
    unitChapter,
    unitRarity,
    isLF,
    hasGauge,
    hasZenkai,
    strikeArt,
    blastArt,
    specialArt,
    special_moveArt,
    ultimateArt,
    awakenArt,
    name_specialArt,
    name_special_moveArt,
    name_ultimateArt,
    name_awakenArt,
    zLimited1,
    zLimited2,
    zLimited3,
    zLimited4,
    zAbility1,
    zAbility2,
    zAbility3,
    zAbility4,
    mainAbility,
    passive1,
    passive2,
    passive3,
    passive4,
    name_passive1,
    name_passive2,
    name_passive3,
    name_passive4,
    ultra_ability
}) => {
    let connection;

    try {
        connection = await mysql.createConnection(config);

        await connection.beginTransaction();

        const [result1] = await connection.query('INSERT INTO units (id, unit_name, unit_color, unit_type, unit_tag, unit_chapter, unit_rarity, is_lf, has_gauge, has_zenkai) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)',
            [id, unit_name, unit_color, unit_type, unitTag, unitChapter, unitRarity, isLF, hasGauge, hasZenkai]);

        const [result2] = await connection.query('INSERT INTO unit_arts (unit_id, strike_art, blast_art, name_special_card, special_card, name_special_art,special_art, name_ultimate_card,ultimate_art, name_awaken_art,awaken_art) VALUES (?, ?, ?, ?, ?,?,?,?,?,?,?)',
            [id, strikeArt, blastArt, name_special_moveArt, special_moveArt, name_specialArt, specialArt, name_ultimateArt, ultimateArt, name_awakenArt, awakenArt]);

        const [result3] = await connection.query('INSERT INTO unit_ability (unit_id, main, passive_1, passive_2, ultra_ability) VALUES (?, ?, ?, ?, ?)',
            [id, mainAbility, passive1, passive2, ultra_ability]);

        const [result4] = await connection.query('INSERT INTO unit_z_ability (unit_id, z_1, z_2, z_3, z_4) VALUES (?, ?, ?, ?, ?)',
            [id, zAbility1, zAbility2, zAbility3, zAbility4]);

        await connection.commit();

        return {
            message: 'Unidad agregada con éxito',
            result1: { id: result1.insertId },
            result2: { id: result2.insertId },
            result3: { id: result3.insertId },
            result4: { id: result4.insertId },
        };
    } catch (error) {
        // Revierte la transacción en caso de error
        if (connection) {
            await connection.rollback();
        }

        console.error('Error al agregar la unidad:', error);
        throw new Error('Error al agregar la unidad a la base de datos');
    } finally {
        if (connection) {
            connection.end();
        }
    }
};

export { getDataFromDatabase, postUnit };