const save = require('../db/save');
const router = require('express').Router();

router.get('/notes', (req, res) => {
    save.getNotes().then((notes) => {
        return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

router.post('/notes', (req, res) => {
    save.addNotes(req.body)
    .then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err));
});
router.delete('/notes/:id', (req, res) => {save.removeNotes(req.params.id)
    .then(() => res.json({ok: true}))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;