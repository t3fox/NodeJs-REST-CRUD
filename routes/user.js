const { Router } = require('express');
const { check } = require('express-validator');



const { UsrGet, UsrPut, UsrPost, UsrDelete } = require('../controllers/user.controller');
const { eRoluoValso, ilutenteEsiste, esisteID } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();


router.get('/', UsrGet); 

router.put('/:usrid',[
    check('usrid','ID no validate').isMongoId(),
    check('usrid').custom(esisteID),
    check('usrid').custom(eRoluoValso),
    validarCampos
],UsrPut);

router.post('/',[
    check('tzxusr','Se Requiere de un Usuario').not().isEmpty(),
    check('tzxusr').custom(ilutenteEsiste),
    check('tzxpass','Se Requiere de una Contrasenia').isLength({min:3}),
    check('tzxrol','No permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(eRoluoValso),
    validarCampos

 ],UsrPost);

router.delete('/:usrid',[
    check('usrid','ID no validate').isMongoId(),
    check('usrid').custom(esisteID),
    validarCampos
],UsrDelete);

module.exports = router;
