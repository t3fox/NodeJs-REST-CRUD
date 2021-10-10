const { response,request } = require('express');
let hash = require('hash.js');

const XUSR = require('../models/usr.model');

const UsrGet = async (req = request,res = response) =>{
    // const {q,nombre = "no name",apikey} = req.query;
    const {limite = 5,desde = 0} = req.query;
    const query = { tzxstats:true }

    // const usr = await XUSR.find(query)
    //     .limit(Number(limite))
    //     .skip(Number(desde));
    // const total = await XUSR.countDocuments(query);

    const [total,usrs] = await Promise.all([  //ejecuta en simultaneo ambas promesas
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
    const { _id,tzxusr,tzxpass, ...resto } = req.body;

    if(tzxusr){
        resto.tzxpass =  hash.sha512().update(tzxpass).digest('hex');
        const usr = await XUSR.findByIdAndUpdate(usrid,resto);
        res.json(usr);
    }
    
}

const UsrPost = async (req = request,res = response) =>{
    const {tzxusr,tzxpass,tzxrol,tzxstats} = req.body;
    const USR = new XUSR({tzxusr,tzxpass,tzxrol,tzxstats});


    USR.tzxpass =  hash.sha512().update(tzxpass).digest('hex');

    //DATA SAVE (change to GET METHOD) / Pd: commit next line
    await USR.save();
    res.json({
        mundo: 'POST / Hola mundo',
        USR
    });
    console.log("CRIPT:",USR.tzxpass);
}

const UsrDelete = async (req,res = response) =>{
    const { usrid } = req.params;
    //del fisicamente
    // const usrphys = await XUSR.findByIdAndDelete(usrid);
    const usrmv = await XUSR.findByIdAndUpdate(usrid,{tzxstats:false});

    res.json(usrmv);

}

module.exports = {
    UsrGet,
    UsrPut,
    UsrPost,
    UsrDelete
}
