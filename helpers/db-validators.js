const Role = require('../models/rol.model');
const XUSR = require('../models/usr.model')

const eRoluoValso = async (rol = '') =>{
    const existRle = await Role.findOne({rol});
    if(!existRle){
        throw new Error(`El rol ${rol} no es valido`);
    }
}
const ilutenteEsiste = async (tzxusr = '') => {
    const USrExists = await XUSR.findOne({tzxusr});
    if(USrExists){
        throw new Error('Usuario existente > OK');
    }
}
const esisteID = async (usrid) => {
    const IDExists = await XUSR.findById(usrid);
    if(!IDExists){
        throw new Error('Usuario No Valido');
    }
}



module.exports = {
    eRoluoValso,
    ilutenteEsiste,
    esisteID
}
