const db = require('../config/conn');
const {QuisonerModel} = require('../models');
// const { ValidationMahasiswa } = require('../validations');
const async = require('async');

function getQuisonerUser(mahasiswa_id,question_id){
    const queryQuisonerUser = new QuisonerModel().selectQ_user; 
    return new Promise((res,rej)=>{
        db.query(queryQuisonerUser, [mahasiswa_id, question_id],(err,result)=>{
            if(err) return rej(err);
            if(result) return res(result);
        })
    });
}

function insertQuisonerUser(mahasiswa_id,question_id){
    const queryQuisonerUser = new QuisonerModel().insertQ_user;
    return new Promise((res, rej) => {
        db.query(queryQuisonerUser, [{
             quisoner_id:question_id,
            mahasiswa_id: mahasiswa_id
        }], (err, result) => {
            if (err) return rej(err);
            if (result) return res(result.insertId);
        })
    });
}

class QuisonerController{

  getQuisonerAktif(req,res){
    const queryQuisonerAktif = new QuisonerModel().selectQuisonerAktif;
    const queryQ_pertanyaanAktif = new QuisonerModel().selectQ_pertanyaanAktif;
    const queryQ_jawabanAktif = new QuisonerModel().selectQ_jawabanAktif;
    const queryQ_jawabanLainnyaAktif= new QuisonerModel().selectQ_jawabanLainyaAktif;
    const queryQ_user= new QuisonerModel().selectQ_userMahasiswa;
    
    async.parallel({
      quisoner:function(callback){
        db.query(queryQuisonerAktif,(err,result)=>{
            callback(err,result);
        });
      },
      q_pertanyaan:function(callback){
        db.query(queryQ_pertanyaanAktif,(err,result)=>{
            callback(err,result);
        });
      },
      q_jawaban:function(callback){
        db.query(queryQ_jawabanAktif,(err,result)=>{
            callback(err,result);
        });
      },
      q_jawaban_lainnya:function(callback){
        db.query(queryQ_jawabanLainnyaAktif,(err,result)=>{
            callback(err,result);
        });
      },
      q_user(callback){
          db.query(queryQ_user,[req.user.id],(err,result)=>{
                   callback(err,result);
          })
      }

    },function(err,result){
      if (err) return res.status(400).json(err);
      if (result) {
          return res.status(200).json(result);
      }

    });

  }

    
   async submitJawaban(req,res){
        const queryInsertJawaban = new QuisonerModel().insertQ_jawaban_user;
        const queryInsertJawabanlainnya = new QuisonerModel().insertQ_jawaban_user_lainnya;
 
        try{
        const q_user = await getQuisonerUser(
            req.user.id,
            req.body.quisoner[0].id
        );
       let q_user_id;
        if(q_user.length > 0 ){
            q_user_id = q_user[0].id;
        }else{
            q_user_id = await insertQuisonerUser(
                req.user.id,
                req.body.quisoner[0].id
            ); 
        }
         
        // console.log(req.body);
        let dataJawabanLainnya = []
        const dataJawaban = req.body.jawaban.map(rb=>{
            return[
                q_user_id,
                parseInt(rb.idJawaban)
            ]
        });
        let jawabanLainnya=[];
        req.body.jawaban.forEach(rb=>{
            if(rb.jawabanLainnya.length !== 0){
                jawabanLainnya.push(rb.jawabanLainnya)
            }
        });
        if (jawabanLainnya.length !== 0){
            jawabanLainnya.forEach(jw=>{
                dataJawabanLainnya.push([
                    q_user_id,
                    parseInt(jw.id),
                    jw.value
                ]
                 );
            })
        }
        async.parallel({
            insert_jawaban:function(cb){
                db.query(queryInsertJawaban,[dataJawaban],(err,result)=>{
                    cb(err,result);
                })
            },
            insert_jawabanLainnya:function(cb){
                if (dataJawabanLainnya.length > 0 ){
                    db.query(queryInsertJawabanlainnya, [dataJawabanLainnya], (err, result) => {
                        cb(err, result);
                    })
                }else{
                    cb(null,'ok')
                }
              
            }
        },function(err,result){
            if(err) return res.status(400).json(err);
            if(result) return res.status(200).json(result);
        });



        }
        catch(err){
           return res.status(400).json(err);
        }
     
    }

    create(req,res){
    //   TODO:VALIDATION
        let quisoner =req.body.quisoner;
        let q_pertanyaan = req.body.q_pertanyaan.map(qp=>{
            return{
                kode:qp.kode,
                pertanyaan:qp.kode
            }
        });


        const queryInsertQuisoner = new QuisonerModel().insertQuisoner;
        const queryInsertQ_pertanyaan = new QuisonerModel().insertQ_pertanyaan;
        const queryInsertQ_jawaban= new QuisonerModel().insertQ_jawaban;
        async.waterfall([
            function Quisoner(callback){
                db.query(queryInsertQuisoner,[quisoner],(err,result)=>{
                    if (err) callback(err);
                    if (result) {

                        const lastId = result.insertId;
                        callback(null, lastId);
                    }
                })
            },
            function Q_pertanyaan(arg1,callback){
                let quisoner_id = arg1;
                const  Nq_pertanyaan = q_pertanyaan.map(qp=>{
                  return [
                        quisoner_id,
                        qp.kode,
                        qp.kode
                    ]

                });
                db.query(queryInsertQ_pertanyaan, [Nq_pertanyaan],(err,result)=>{
                    if (err) callback(err);
                    if (result) {
                        let lastIdPertanyaan = result.insertId;
                        callback(null, lastIdPertanyaan);
                    }
                })
            },
            function Q_jawaban(arg2, callback){
                let lastId = arg2;
                let id = lastId - (req.body.q_pertanyaan.length-1);

                let q_jawaban = req.body.q_pertanyaan.map((qp, i) => qp.q_jawaban);
                let newD = [];
                q_jawaban.forEach((qj, i) => {
                    qj.forEach(j => {
                        newD.push([
                            id+(i+1),
                            j.kode,
                            j.jawaban,
                            j.additional ? 1 :0
                        ]);
                    })
                });
                db.query(queryInsertQ_jawaban, [newD],(err,result)=>{
                    if (err) callback(err);
                    if (result) {

                        callback(null, newD);
                    }
                })
            },
            function Q_jawabanLainnya(arg3,callback){
                let q_jawaban = req.body.q_pertanyaan.map((qp, i) => qp.q_jawaban);
                let newD = [];
                q_jawaban.forEach((qj, i) => {
                    qj.forEach(j => {
                        newD.push({
                            kode: j.kode,
                            jawaban: j.jawaban,
                            additional: j.additional ? 1 : 0,
                            q_jawaban_lainnya: j.q_jawaban_lainnya
                        });
                    })
                });
                let q_jawabanLainnya = newD.filter(a => a.additional === 1).map(qj => {
                    return {
                        kode:qj.kode,
                        description:(typeof qj.q_jawaban_lainnya === 'object' && qj.q_jawaban_lainnya.description) ? qj.q_jawaban_lainnya.description : 0
                    }
                });

                let queryData = [];
                q_jawabanLainnya.forEach(qj => {
                    queryData.push((
                        `((SELECT id from q_jawaban where kode = '${qj.kode}'),'${
                        qj.description}')`).toString()
                    )
                })
                queryData = queryData.toString();
                let queryInsertQ_jawabanLainnya =`
                INSERT INTO q_jawaban_lainnya (q_jawaban_id,description) values ${queryData}`;
                db.query(queryInsertQ_jawabanLainnya,(err,result)=>{
                    callback(err,result);
                })
            }
        ], function (err, result) {

            if (err) return res.status(400).json(err);
            if (result) {
                return res.status(200).json(result);
            }
        })

    }
    getAll(req,res){
        const querSelectQuisoner = new QuisonerModel().selectQuisoner;
        async.parallel({
            quisoner:function(callback){
                db.query(querSelectQuisoner,(err,result)=>{
                    callback(err,result);
                })
            }
        },function(err,result){
                 if (err) return res.status(400).json(err);
            if (result) {
                return res.status(200).json(result);
            }
        })
    }
}

module.exports = new QuisonerController();
