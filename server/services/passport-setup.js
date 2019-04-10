const passport = require('passport'),
      LocalStrategy=require('passport-local').Strategy;
const db = require('../config/conn');
const keys = require('../config/keys');
const bcrypt = require('bcryptjs');
const {MahasiswaModel} = require('../models');
passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser((data, done) => {
    let querySelect = new MahasiswaModel().SelectMahasiswaNrp;
    db.query(querySelect, [data.nrp], (err, ress) => {
        if (ress.length > 0) {
            let d = ress[0];
   
            done(null,d );
        }

    })

})

passport.use(new LocalStrategy({
    usernameField: 'nrp',
    passwordField: 'kodePIN',
},
    function (nrp, kodePIN, done) {

        console.log({
            nrp,kodePIN
        })
        let querySelect = new MahasiswaModel().SelectMahasiswa;

        db.query(querySelect, [nrp,kodePIN], (err, result) => {

            if (err) return done(err, null);
            if (result.length > 0) {
                let data = result[0];
                return done(null, data);
                // bcrypt.compare(kodePIN, data.kodePIN)
                //     .then(isMatch => {
                     
                //         if (isMatch) {
                //             return done(null, data);
                //         } else {
                //             return done(null, false, { message: 'nrp atau kodePIN salah' });
                //         }

                //     })

            }
            if (result.length === 0) {
                return done(null, false, { message: 'nrp atau kodePIN salah' });
            }


        })

    }
));




