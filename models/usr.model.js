const {Schema, model } = require('mongoose');

const USRSchema = Schema({

    xusr: {
        type:String,
        required:[true,'Se Requiere de un Usuario'],
        unique: true
    },
    xpass: {
        type:String,
        required:[true,'Se Requiere de una Contraseña']
    },
    xstats: {    
        type:Boolean,
        default:true
    },
    xrol::
        {    
        type:String
    }

});
//ofuscate
USRSchema.methods.toJSON = function (){
    const {__v,xpass,...usr} = this.toObject();
    return usr
}

module.exports = model('Usr',USRSchema);
