import React from 'react'
import PropTypes from 'prop-types'
import {
    TextField
} from '@material-ui/core'
const Pekerjaan = props => {
    const { jurusan, nama, nrp, tanggalMasuk, tempat, jabatan, namaPerusahaan} = props;
  return (
    <div>
      
          <TextField
              label="Nama Perusahaan"
              name="namaPerusahaan"
              InputLabelProps={{
                  shrink: true
              }}
              value={namaPerusahaan}
              fullWidth
              margin="normal"
              
          />
          <TextField
              label="Tanggal Masuk"
              name="tanggalMasuk"
              InputLabelProps={{
                  shrink: true
              }}
              fullWidth
              margin="normal"
              type="date"
              value={tanggalMasuk}
              
          />
          <TextField
              label="Tempat"
              name="tempat"
              InputLabelProps={{
                  shrink: true
              }}
              value={tempat}
              fullWidth
              margin="normal"
              
          />
          <TextField
              label="Jabatan"
              name="jabatan"
              InputLabelProps={{
                  shrink: true
              }}
              fullWidth
              value={jabatan}
              margin="normal"
              
          />

    </div>
  )
}

Pekerjaan.propTypes = {

}

export default Pekerjaan
