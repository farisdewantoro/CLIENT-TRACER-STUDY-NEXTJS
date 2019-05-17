class Quisoner{
    constructor(){
        this.insertQuisoner = `INSERT INTO quisoner set ? `;
        this.insertQ_pertanyaan = `INSERT INTO q_pertanyaan (quisoner_id,kode,pertanyaan) values ? `;
        this.insertQ_jawaban = `INSERT INTO q_jawaban (q_pertanyaan_id,kode,jawaban,additional) values ? `;
        this.insertQ_jawaban_user = `INSERT into q_jawaban_user (q_user_id,jawaban_id) values ? `;
        this.insertQ_jawaban_user_lainnya = `INSERT INTO q_jawaban_user_lainnya (q_user_id,q_jawaban_lainnya_id,value) values ? `;
        this.insertQ_user = `INSERT into q_user set ? `;
        this.selectQ_user = `SELECT * from q_user where mahasiswa_id = ? and quisoner_id = ? `;
        this.selectQ_userMahasiswa = `SELECT * from q_user as qu where qu.mahasiswa_id = ? and qu.quisoner_id = (select q.id from quisoner as q where q.status = 1 limit 1)`;
        this.selectQuisoner = `SELECT * from quisoner`;
        this.selectQuisonerAktif = `select * from quisoner as q where q.status = 1 limit 1`;
        this.selectQ_pertanyaanAktif = `
        select qp.id,qp.quisoner_id,qp.kode,qp.pertanyaan
        from q_pertanyaan as qp
        left join quisoner as q on q.id = qp.quisoner_id
        where q.status = 1
        `;
        this.selectQ_jawabanAktif = `
        select qj.id,qj.q_pertanyaan_id,qj.kode,qj.jawaban,qj.additional
        from q_jawaban as qj
        left join q_pertanyaan as qp on qp.id = qj.q_pertanyaan_id
        left join quisoner as q on q.id = qp.quisoner_id
        where q.status = 1;
        `
        this.selectQ_jawabanLainyaAktif = `
        select qjl.id,qjl.q_jawaban_id,qjl.value,qjl.description
        from q_jawaban_lainnya as qjl
        left join q_jawaban as qj on qjl.q_jawaban_id = qj.id
        left join q_pertanyaan as qp on qp.id = qj.q_pertanyaan_id
        left join quisoner as q on q.id = qp.quisoner_id
        where q.status = 1;
        `;
    }
}

module.exports = Quisoner;
