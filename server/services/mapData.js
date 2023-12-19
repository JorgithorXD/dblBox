import { getDataFromDatabase } from '../controllers/database.js'

const getTags = async () => {
    const tagsResult = await getDataFromDatabase("SELECT * FROM tag")
    return new Map(tagsResult.map(i => [i.tag_id.toString(), i.tag_name]))
}

const getType = async () => {
    const typeResult = await getDataFromDatabase("SELECT * FROM type")
    return new Map(typeResult.map(i => [i.type_id.toString(), i.type_name]))
}

const getColors = async () => {
    const colorResult = await getDataFromDatabase("SELECT * FROM color")
    return new Map(colorResult.map(i => [i.color_id.toString(), i.color_name]))
}

const getChapters = async () => {
    const chapterResult = await getDataFromDatabase("SELECT * FROM chapter")
    return new Map(chapterResult.map(i => [i.chapter_id.toString(), i.chapter_name]))
}

const getRarity = async () => {
    const rarityResult = await getDataFromDatabase("SELECT * FROM rarity")
    return new Map(rarityResult.map(i => [i.rarity_id.toString(), i.rarity_name]))
}

export const getMap = {
    getTags,
    getType,
    getColors,
    getChapters,
    getRarity
}