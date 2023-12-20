import express from "express"
import { getData } from '../services/getData.js'
import { getMap } from '../services/mapData.js'
import { postUnit } from "../controllers/database.js"
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Puedes cambiar 'uploads/' a tu carpeta deseada
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

// Configura el middleware Multer
const upload = multer({ storage: storage });

// Ruta para subir imágenes y agregar una unidad
router.post('/unit', upload.array('images', 5), async (req, res) => {
    try {
        // Aquí puedes acceder a las imágenes subidas en req.files
        console.log(req.files);

        // Accede a los datos de la unidad desde req.body
        const {
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
        } = req.body;

        res.json({ message: 'Unidad y imágenes agregadas con éxito' });
    } catch (error) {
        console.error('Error al agregar la unidad:', error);
        res.status(500).json({ error: `Error al agregar la unidad a la base de datos: ${error.message}` });
    }
});

// Ruta para obtener los datos de una unidad por su ID
router.get('/unit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [unitResults] = await getData.getUnitDataById([id])
        const [artsResults] = await getData.getUnitArtsById([id])
        const [abilityResults] = await getData.getUnitAbilityById([id])
        const [zAbilityResults] = await getData.getUnitZAbilityById([id])
        const [zenkaiResults] = await getData.getUnitZenkaiById([id])

        if (unitResults.length === 0) {
            res.status(404).json({ error: 'No se encontró la unidad con el ID proporcionado' });
        } else {
            const completeUnitData = {
                id: unitResults.id,
                name: unitResults?.unit_name ?? '',
                color: unitResults.unit_color ?? '',
                type: unitResults.unit_type ?? '',
                tag: unitResults.unit_tag ?? '',
                chapter: unitResults.unit_chapter ?? '',
                rarity: unitResults.unit_rarity ?? '',
                extra: unitResults.unit_extra ?? '',
                lf: unitResults.is_lf ?? '',
                gauge: unitResults.has_gauge ?? '',
                zenkai: unitResults.has_zenkai ?? '',
                ability: {
                    mainName: abilityResults.name_main ?? '',
                    main: abilityResults.main_ability ?? '',
                    namePassive1: abilityResults.name_passive1 ?? '',
                    passive1: abilityResults.passive_1 ?? '',
                    namePassive2: abilityResults.name_passive2 ?? '',
                    passive2: abilityResults.passive_2 ?? '',
                    ultraAbility: abilityResults.ultra_ability ?? '',
                },
                arts: {
                    strike: artsResults.strike_art ?? '',
                    blast: artsResults.blast_art ?? '',
                    specialMoveName: artsResults.name_special_card ?? '',
                    specialMove: artsResults.special_card ?? '',
                    specialArtName: artsResults.name_special_art ?? '',
                    specialArt: artsResults.special_art ?? '',
                    ultimateName: artsResults.name_ultimate_card ?? '',
                    ultimate: artsResults.ultimate_art ?? '',
                    awakenName: artsResults.name_awaken_art ?? '',
                    awaken: artsResults.awaken_art ?? '',
                },
                zAbility: {
                    z1: zAbilityResults.z_1 ?? '',
                    z2: zAbilityResults.z_2 ?? '',
                    z3: zAbilityResults.z_3 ?? '',
                    z4: zAbilityResults.z_4 ?? '',
                },
                zenkai_ability: {
                    mainName: zenkaiResults ? zenkaiResults.name_main : null,
                    main: zenkaiResults ? zenkaiResults.main : null,
                    namePassive1: zenkaiResults ? zenkaiResults.name_passive1 : null,
                    passive1: zenkaiResults ? zenkaiResults.passive_1 : null,
                    namePassive2: zenkaiResults ? zenkaiResults.name_passive2 : null,
                    passive2: zenkaiResults ? zenkaiResults.passive_2 : null,
                    ultraAbility: zenkaiResults ? zenkaiResults.ultra_ability : null,
                    namePassive3: zenkaiResults ? zenkaiResults.name_passive3 : null,
                    passive3: zenkaiResults ? zenkaiResults.passive_3 : null,
                    namePassive4: zenkaiResults ? zenkaiResults.name_passive4 : null,
                    passive4: zenkaiResults ? zenkaiResults.passive_4 : null,
                    zenkai1: zenkaiResults ? zenkaiResults.zenkai_ability_1 : null,
                    zenkai2: zenkaiResults ? zenkaiResults.zenkai_ability_2 : null,
                    zenkai3: zenkaiResults ? zenkaiResults.zenkai_ability_3 : null,
                    zenkai4: zenkaiResults ? zenkaiResults.zenkai_ability_4 : null,
                },
            };

            // Devuelve los datos en formato JSON
            res.json(completeUnitData);
        }
    } catch (error) {
        console.error('Error al obtener los datos de la unidad:', error);
        res.status(500).json({ error: 'Error al obtener los datos de la unidad de la base de datos' });
    }
});

// Ruta para obtener todos los datos de todas las unidades
router.get('/unit', async (req, res) => {
    try {
        const unitResults = await getData.getUnitData()
        const artsResults = await getData.getUnitArts()
        const abilityResults = await getData.getUnitAbility()
        const zAbilityResults = await getData.getUnitZAbility()
        const zenkaiResults = await getData.getUnitZenkai()

        const tagMap = await getMap.getTags()
        const colorMap = await getMap.getColors()
        const typeMap = await getMap.getType()
        const rarityMap = await getMap.getRarity()
        const chapterMap = await getMap.getChapters()

        const allUnitsData = unitResults.map(unitData => {
            const artsData = artsResults.find(arts => arts.unit_id === unitData.id);
            const abilityData = abilityResults.find(ability => ability.unit_id === unitData.id);
            const zAbilityData = zAbilityResults.find(zAbility => zAbility.unit_id === unitData.id);
            const zenkaiData = zenkaiResults.find(zenkai => zenkai.unit_id === unitData.id)

            const unitColor = unitData.unit_color !== null && unitData.unit_color !== undefined
                ? colorMap.get(unitData.unit_color.toString().trim())
                : null;

            const unitType = unitData.unit_type !== null && unitData.unit_type !== undefined
                ? typeMap.get(unitData.unit_type.toString().trim())
                : null;

            const unitTags = unitData.unit_tag
                ? unitData.unit_tag.split(',').map(tagId => tagMap.get(tagId.trim()))
                : [];

            const unitChapter = unitData.unit_chapter !== null && unitData.unit_chapter !== undefined
                ? chapterMap.get(unitData.unit_chapter.toString().trim())
                : null;

            const unitRarity = unitData.unit_rarity !== null && unitData.unit_rarity !== undefined
                ? rarityMap.get(unitData.unit_rarity.toString().trim())
                : null;

            return {
                id: unitData.id,
                name: unitData.unit_name,
                color: unitColor,
                type: unitType,
                tags: unitTags,
                chapter: unitChapter,
                rarity: unitRarity,
                revival: unitData.is_revival,
                transform: unitData.is_transforming,
                tag_switch: unitData.is_tag_switch,
                lf: unitData.is_lf,
                gauge: unitData.has_gauge,
                zenkai: unitData.has_zenkai,
                ability: {
                    mainName: abilityData ? abilityData.name_main : null,
                    main: abilityData ? abilityData.main_ability : null,
                    namePassive1: abilityData ? abilityData.name_passive_1 : null,
                    passive1: abilityData ? abilityData.passive_1 : null,
                    namePassive2: abilityData ? abilityData.name_passive_2 : null,
                    passive2: abilityData ? abilityData.passive_2 : null,
                    ultraAbility: abilityData ? abilityData.ultra_ability : null,
                },
                arts: {
                    strike: artsData ? artsData.strike_art : null,
                    blast: artsData ? artsData.blast_art : null,
                    specialMoveName: artsData ? artsData.name_special_card : null,
                    specialMove: artsData ? artsData.special_card : null,
                    specialArtName: artsData ? artsData.name_special_art : null,
                    specialArt: artsData ? artsData.special_art : null,
                    ultimateName: artsData ? artsData.name_ultimate_card : null,
                    ultimate: artsData ? artsData.ultimate_art : null,
                    awakenName: artsData ? artsData.name_awaken_art : null,
                    awaken: artsData ? artsData.awaken_art : null,
                },
                zAbility: {
                    z1: zAbilityData ? zAbilityData.z_1 : null,
                    z2: zAbilityData ? zAbilityData.z_2 : null,
                    z3: zAbilityData ? zAbilityData.z_3 : null,
                    z4: zAbilityData ? zAbilityData.z_4 : null,
                },
                zenkai_ability: {
                    mainName: zenkaiData ? zenkaiData.name_main : null,
                    main: zenkaiData ? zenkaiData.main : null,
                    namePassive1: zenkaiData ? zenkaiData.name_passive1 : null,
                    passive1: zenkaiData ? zenkaiData.passive_1 : null,
                    namePassive2: zenkaiData ? zenkaiData.name_passive2 : null,
                    passive2: zenkaiData ? zenkaiData.passive_2 : null,
                    ultraAbility: zenkaiData ? zenkaiData.ultra_ability : null,
                    namePassive3: zenkaiData ? zenkaiData.name_passive3 : null,
                    passive3: zenkaiData ? zenkaiData.passive_3 : null,
                    namePassive4: zenkaiData ? zenkaiData.name_passive4 : null,
                    passive4: zenkaiData ? zenkaiData.passive_4 : null,
                    zenkai1: zenkaiData ? zenkaiData.zenkai_ability_1 : null,
                    zenkai2: zenkaiData ? zenkaiData.zenkai_ability_2 : null,
                    zenkai3: zenkaiData ? zenkaiData.zenkai_ability_3 : null,
                    zenkai4: zenkaiData ? zenkaiData.zenkai_ability_4 : null,
                }
            };
        });
        res.json(allUnitsData);
    } catch (error) {
        console.error('Error al obtener todos los datos de las unidades:', error);
        res.status(500).json({ error: 'Error al obtener todos los datos de las unidades de la base de datos' });
    }
});




export default router;