const { Schema,model } = require('mongoose');

const RoleSchema = Schema({

    tzxrol:{
        type: String,
        required:[true,'El rol es obligatorio']
    }
});


module.exports = model('Role',RoleSchema);