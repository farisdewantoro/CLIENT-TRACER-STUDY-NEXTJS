import React from 'react'
import PropTypes from 'prop-types'
import {
    Grid,
    Button,
    Card,
    CardContent,
    CardActionArea,
    Typography,
    TextField,
    CardMedia,
    CardActions,
    AppBar,
    Divider
} from '@material-ui/core';
const personalInformation = props => {
    const { classes, handlerOnChange, nrp, nama, email, jurusan, alamat, noTelepon, kodePIN} = props;

    return (
    <div>
          <Grid container  direction="row">
              <Grid item md={12}>
              
                  <div style={{ padding: "10px 0 40px" }}>
                      <Grid container  direction="row" >
                          {/* <Grid item md={4}>
                              <CardActionArea>
                                  <CardMedia
                                      component="img"
                                      alt="Contemplative Reptile"
                                      className={classes.media}
                                      height="200"
                                      image="/static/noImage.png"
                                      title="Contemplative Reptile"
                                  />
                                  <Typography>
                                      NO IMAGE
                            </Typography>
                              </CardActionArea>
                          </Grid> */}
                          <Grid item md={12}>

                              <div>
                                  <TextField
                                      label="NRP"
                                      value={nrp}
                                      name="nrp"
                                      disabled
                                      InputLabelProps={
                                          { shrink: true }
                                      }
                                      margin="normal"
                                      fullWidth
                                      onChange={handlerOnChange}
                                  />
                                  <TextField
                                      label="Nama"
                                      value={nama}
                                      name="nama"
                                      InputLabelProps={
                                          { shrink: true }
                                      }
                                      margin="normal"
                                      fullWidth
                                      onChange={handlerOnChange}
                                  />
                                  <TextField
                                      label="No Telepon"
                                      value={noTelepon}
                                      name="noTelepon"
                                      type="number"
                                      InputLabelProps={
                                          { shrink: true }
                                      }
                                      margin="normal"
                                      fullWidth
                                      onChange={handlerOnChange}
                                  />
                                  <TextField
                                      label="Alamat"
                                      value={alamat}
                                      name="alamat"
                                      multiline
                                      rows="4"
                                      InputLabelProps={
                                          { shrink: true }
                                      }
                                      margin="normal"
                                      fullWidth
                                      onChange={handlerOnChange}
                                  />
                              </div>
                          </Grid>
                      </Grid>
                  </div>


              </Grid>
          </Grid>
    </div>
  )
}

personalInformation.propTypes = {

}

export default personalInformation
