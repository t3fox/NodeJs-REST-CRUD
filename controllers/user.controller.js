const { response,request } = require('express');
let hash = require('hash.js');

const XUSR = require('../models/usr.model');

const UsrGet = async (req = request,res = response) =>{
    // const {q,nombre = "no name",apikey} = req.query;
    const {limite = 5,desde = 0} = req.query;
    const query = { xstats:true }

    // const usr = await XUSR.find(query)
    //     .limit(Number(limite))
    //     .skip(Number(desde));
    // const total = await XUSR.countDocuments(query);

    const [total,usrs] = await Promise.all([ 
        XUSR.countDocuments(query),
        XUSR.find(query)
        .limit(Number(limite))
        .skip(Number(desde))

    ]);
    res.json({
        total,
        usrs
    });
}

const UsrPut = async (req, res = response) =>{
    const { usrid } = req.params;
    const { _id,xusr,xpass, ...resto } = req.body;

    if(xusr){
        resto.xpass =  hash.sha512().update(xpass).digest('hex');
        const usr = await XUSR.findByIdAndUpdate(usrid,resto);
        res.json(usr);
    }
    
}

const UsrPost = async (req = request,res = response) =>{
    const {xusr,xpass,xrol,xstats} = req.body;
    const USR = new XUSR({xusr,xpass,xrol,xstats});


    USR.xpass =  hash.sha512().update(xpass).digest('hex');

    //DATA SAVE (change to GET METHOD) / Pd: commit next line
    await USR.save();
    res.json({
        mundo: 'POST / Hola mundo',
        USR
    });
    console.log("CRIPT:",USR.xpass);
}

const UsrDelete = async (req,res = response) =>{
    const { usrid } = req.params;
    
    // const usrphys = await XUSR.findByIdAndDelete(usrid);
    const usrmv = await XUSR.findByIdAndUpdate(usrid,{xstats:false});

    res.json(usrmv);

}

module.exports = {
    UsrGet,
    UsrPut,
    UsrPost,
    UsrDelete
}
