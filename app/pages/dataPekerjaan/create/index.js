import React, { Component } from 'react'
import {
    Grid,
    TextField,
    Card,
    CardContent,
    Button,
    CardActions
} from '@material-ui/core';
import Layout2 from '../../../components/layout/layout_2';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import Select from '../../../components/common/select';
import SelectDynamic from '../../../components/common/selectDynamic';
import { getAllJurusan } from '../../../actions/JurusanActions';
import {getAllMahasiswa,addPekerjaan} from '../../../actions/MahasiswaActions';
import moment from 'moment';
const ListJurusan = (jurusans) => {

    if (jurusans.jurusan) {
        return jurusans.jurusan.map(j => {
            return {
                label: j.nama,
                value: j.id
            }
        })
    } else {
        return [];
    }

}

const ListMahasiswa = (mahasiswas) => {

    if (mahasiswas.mahasiswa) {
        return mahasiswas.mahasiswa.map(m => {
            return {
                label: m.nrp,
                value: m.id,
                nama:m.nama
            }
        })
    } else {
        return [];
    }

}



class DataPekerjaanCreate extends Component {
    static async getInitialProps(something) {
        const { res, req } = something;
        if (!req.user) {
            res.writeHead(302, {
                Location: '/login'
            })
            res.end()
        }

    }
    constructor() {
        super();
        this.state = {
            jurusan:'',
            nrp:'',
            nama:'',
            namaPerusahaan:'',
            tanggalMasuk:moment(new Date).format('YYYY-MM-DD'),
            tempat:'',
            jabatan:''

        }
    }
    componentDidMount() {
        this.props.getAllJurusan();
        this.props.getAllMahasiswa();
    }
    handlerChangeJurusan = (e) => {
        this.setState({
            jurusan: e
        }
        )
    }
    handlerChangeMahasiswa = (e) =>{
        let val = {
            label:e.label,
            value:e.value
        }
        this.setState({
            nrp: val,
            nama:e.nama
        }
        )
    }
    handleOnChange = (e) => {
        let nama = e.target.name;
        let value = e.target.value;
        this.setState({
            [nama]:value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let data = this.state;
        this.props.addPekerjaan(data);

    }

    render() {
        const { classes, jurusans,mahasiswas } = this.props;
        const { jurusan,nama,nrp,tanggalMasuk,tempat,jabatan,namaPerusahaan} = this.state;
        return (
            <Layout2 url={`/data-pekerjaan`}>
                <div>
                    <Grid container direction="column" spacing={16}>
                        <Grid item xs={12}>
                            <Card style={{ overflow: 'inherit' }}>
                                <form onSubmit={this.handleSubmit}>
                          
                                    <CardContent>
                                        <Select jurusans={ListJurusan(jurusans)}
                                            jurusan={jurusan}
                                            handlerChangeJurusan={this.handlerChangeJurusan} />
                                        <SelectDynamic 
                                        label="NRP" 
                                        value={nrp}
                                        options={ListMahasiswa(mahasiswas)} 
                                        handleChange={this.handlerChangeMahasiswa}
                                        />
                                        <TextField
                                            label="Nama"
                                            name="nama"
                                            value={nama}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            disabled
                                            fullWidth
                                            margin="normal"
                                        />
                                        <TextField
                                            label="Nama Perusahaan"
                                            name="namaPerusahaan"
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            value={namaPerusahaan}
                                            fullWidth
                                            margin="normal"
                                            onChange={this.handleOnChange}
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
                                            onChange={this.handleOnChange}
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
                                            onChange={this.handleOnChange}
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
                                            onChange={this.handleOnChange}
                                        />
                                 
                                  


                                    </CardContent>
                                    <CardActions>
                                        <Button color="primary" type="submit" variant="contained">
                                            SUBMIT
                                </Button>
                                        <Button variant="outlined">
                                            CANCEL
                                </Button>
                                    </CardActions>
                                </form>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </Layout2>

        )
    }
}

DataPekerjaanCreate.propTypes = {
    classes: PropTypes.object.isRequired,
    jurusans:PropTypes.object.isRequired,
    getAllMahasiswa:PropTypes.func.isRequired,
    getAllMahasiswa:PropTypes.func.isRequired,
    addPekerjaan:PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    jurusans:state.jurusans,
    mahasiswas:state.mahasiswas
});

export default compose(withStyles(styles), connect(mapStateToProps, { getAllJurusan,getAllMahasiswa,addPekerjaan }))
    (DataPekerjaanCreate);
