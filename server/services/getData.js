import { getDataFromDatabase } from '../controllers/database.js'


const getUnitData = async () => {
    return await getDataFromDatabase("SELECT * FROM units")
};

const getUnitDataById = async (id) => {
    const query = 'SELECT * FROM units WHERE id = ?'
    return await getDataFromDatabase(query, [id])
}

const getUnitArts = async () => {
    return await getDataFromDatabase("SELECT * FROM unit_arts")
}

const getUnitArtsById = async (id) => {
    const query = 'SELECT * FROM unit_arts WHERE unit_id = ?'
    return await getDataFromDatabase(query, [id]);
}

const getUnitAbility = async () => {
    return await getDataFromDatabase("SELECT * FROM unit_ability")
}

const getUnitAbilityById = async (id) => {
    const query = 'SELECT * FROM unit_ability WHERE unit_id = ?'
    return await getDataFromDatabase(query, [id]);
}

const getUnitZAbility = async () => {
    return await getDataFromDatabase("SELECT * FROM unit_z_ability")
}

const getUnitZAbilityById = async (id) => {
    const query = 'SELECT * FROM unit_z_ability WHERE unit_id = ?'
    return await getDataFromDatabase(query, [id]);
};

const getUnitZenkai = async () => {
    return await getDataFromDatabase('SELECT * FROM unit_zenkai')
}

const getUnitZenkaiById = async (id) => {
    const query = 'SELECT * FROM unit_zenkai WHERE unit_id = ?'
    return await getDataFromDatabase(query, [id])
}

export const getData = {
    getUnitData,
    getUnitAbility,
    getUnitArts,
    getUnitZAbility,
    getUnitArtsById,
    getUnitAbilityById,
    getUnitZAbilityById,
    getUnitDataById,
    getUnitZenkai,
    getUnitZenkaiById
}