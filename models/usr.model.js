const {Schema, model } = require('mongoose');

const USRSchema = Schema({

    tzxusr: {
        type:String,
        required:[true,'Se Requiere de un Usuario'],
        unique: true
    },
    tzxpass: {
        type:String,
        required:[true,'Se Requiere de una Contraseña']
    },
    tzxstats: {      //      (Opcional)
        type:Boolean,
        default:true
    }
    

});
//ofuscate
USRSchema.methods.toJSON = function (){
    const {__v,tzxpass,...usr} = this.toObject();
    return usr
}

module.exports = model('Usr',USRSchema);