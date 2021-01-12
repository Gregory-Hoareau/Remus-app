const {Router} = require('express')
const RestOperator = require('../utils/rest-operator')

const rest_operator = new RestOperator('character-sheet', 'character-sheet/sheets.json')

const router = new Router()
router.get('/', (req, res) => {
    res.status(200).json(rest_operator.get());
})

router.get('/:sheet_id', (req, res) => {
    try {
        const sheet = rest_operator.getById(req.params.sheet_id);
        res.status(200).json(sheet);
    } catch (e) {
        if(e.name === 'ItemNotFoundError') {
            res.status(404).end()
        } else {
            res.status(500).json(e)
        }
    }
})

router.post('/', (req, res) => {
    try {
        const sheet = rest_operator.post(req.body);
        res.status(201).json(sheet);
    } catch (e) {
        res.status(500).json(e);
    }
})

router.put('/:sheet_id', (req, res) => {
    try {
        const sheet = rest_operator.update(req.params.sheet_id, req.body)
        res.status(200).json(sheet)
    } catch (e) {
        if(e.name === 'ItemNotFoundError') {
            res.status(404).end()
        } else {
            res.status(500).json(e)
        }
    }
})

router.delete('/:sheet_id', (req, res) => {
    try {
        const sheet = rest_operator.delete(req.params.sheet_id)
        res.status(204).end()
    } catch (e) {
        if(e.name === 'ItemNotFoundError') {
            res.status(404).end()
        } else {
            res.status(500).json(e)
        }
    }
})

module.exports = router