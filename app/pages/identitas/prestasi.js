import React from 'react'
import PropTypes from 'prop-types'
import {
    TextField
} from '@material-ui/core';
const Prestasi = props => {
  const { jurusan, nama, nrp, tanggalMasuk, jenisPrestasi, tahun, namaPrestasi} = props;
  return (
    <div>
       
          <TextField
              label="Nama Prestasi"
              name="namaPrestasi"
              InputLabelProps={{
                  shrink: true
              }}
              value={namaPrestasi}
              fullWidth
              margin="normal"
            //   onChange={this.handleOnChange}
          />

          <TextField
              label="Jenis Prestasi"
              name="jenisPrestasi"
              InputLabelProps={{
                  shrink: true
              }}
              value={jenisPrestasi}
              fullWidth
              margin="normal"
            //   onChange={this.handleOnChange}
          />
          <TextField
              label="Tahun"
              name="tahun"
              InputLabelProps={{
                  shrink: true
              }}
              type="number"
              fullWidth
              value={tahun}
              margin="normal"
            //   onChange={this.handleOnChange}
          />

    </div>
  )
}

Prestasi.propTypes = {

}

export default Prestasi
