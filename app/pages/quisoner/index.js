import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Layout2 from '../../components/layout/layout_2';
import {
    Grid,
    Card,
    CardActions,
    Button,
    CardContent,
    CardHeader,
    Typography,
    IconButton,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    FormHelperText,
    InputBase,
    InputLabel,
    TextField,
    Divider
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from 'next/link';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { getQuisonerAktif } from '../../actions/quisonerActions';
import update from 'react-addons-update';
class DataQuisoner extends Component {
    static async getInitialProps(something) {
        const { res, req } = something;
        if (!req.user) {
            res.writeHead(302, {
                Location: '/login'
            })
            res.end()
        }

    }
    state={
        value:'',
        jawaban:[]
    }

    componentDidMount() {
        this.props.getQuisonerAktif();
    }
    handlerChangeJawabanLainnya = (e, data)=>{
        let checkIndex;
        this.state.jawaban.forEach((jUser, i) => {
            if (jUser.idJawaban === data.q_jawaban_id.toString()) {
                checkIndex = i;
            }
        });

        data.value = e.target.value;

        this.setState({
            jawaban: update(this.state.jawaban, { [checkIndex]: { jawabanLainnya: { $set: data} } })
        });
        console.log(this.state.jawaban);
    }
    handleChange = (e,data)=> {
        let checkIndex;
       this.state.jawaban.forEach((jUser,i) =>{
           if (jUser.kodePertanyaan === data.kode){
               checkIndex = i;
           }
       });
        let newData = {
            kodePertanyaan: data.kode,
            pertanyaan: data.pertanyaan,
            idPertanyaan: data.id,
            idJawaban:e.target.value,
            jawabanLainnya:[]
        };
       if(typeof checkIndex !== "undefined"){
           this.setState({
               jawaban: update(this.state.jawaban, { [checkIndex]: { $set: newData } })
           })
        
       }else{
           this.setState({
               jawaban: this.state.jawaban.concat(newData)
           });
       }
   
      };
    render() {
        const { classes, quisoners } = this.props;
        const { value, jawaban} = this.state;
        console.log(jawaban)
        return (
            <Layout2 url={'/data-quisoner'}>
                <div>
                    <Grid container direction="column" spacing={16}>
                        <Grid item xs={12}>
                        {quisoners.quisoner.map(q=>{
                          return(
                            <Card>
                                <CardHeader
                                    title={
                                <div style={{display:'flex'}}>
                                        <Typography style={{margin:"0px 5px"}}>
                                            {q.judul}
                                        </Typography>
                                
                                <Typography style={{margin:"0px 5px"}}>
                                {q.tahun}
                            </Typography>
                            </div>    
                                }
                                />
                            </Card>
                          )
                        })}
                        </Grid>
                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    {quisoners.q_pertanyaan.map((qp,iQ)=>{
                                        return(
                                            <div key={iQ}>   
                                      
                                    <Typography style={{margin:"0px 5px",fontWeight:"bold"}}>
                                    {qp.pertanyaan}
                                </Typography>
                                <div style={{margin:"10px 20px"}}>
                                                    <FormControl component="fieldset" className={classes.formControl}>
                                                 
                                                            {quisoners.q_jawaban.filter((qj, iJ) => qj.q_pertanyaan_id == qp.id).map(j1 => {
                                                      
                                                           return (
                                                                    <div>
                                                                        <div style={{display:'block'}}>
                                                                            <RadioGroup
                                                                                // checked={this.state.jawaban.filter(jUser => jUser.kodePertanyaan === qp.kode && jUser.kodeJawaban === j1.kode ).length > 0 }
                                                                                onChange={(e) => this.handleChange(e,qp)}
                                                                                value={this.state.jawaban.filter(jUser =>  jUser.idJawaban === j1.id.toString()).map(jUN => {
                                                                                    return jUN.idJawaban
                                                                                }).toString()}
                                                                                name="jawaban"
                                                                            >
                                                                            {/* <FormLabel>
                                                                                {j1.jawaban}
                                                                            </FormLabel>   */}
                                                                            <FormControlLabel
                                                                                value={j1.id.toString()}
                                                                                control={<Radio color="primary" />}
                                                                                label={j1.jawaban}
                                                                                // labelPlacement="start"
                                                                            />
                                                                            </RadioGroup>
                                                                        </div>
                                                                        {quisoners.q_jawaban_lainnya.filter((qjl, qjI) => qjl.q_jawaban_id === j1.id ).map(qjl1=>{
                                                                  
                                                                            return(
                                                                                <div style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"0px 30px"}}>
                                                                                    {/* <FormControl className={classes.jawabanLainnya}> */}
                                                                                   <Typography style={{margin:"0px 20px"}}>
                                                                                        {qjl1.description}
                                                                                   </Typography>
                                                                                    <TextField
                                                                                        id="outlined-name"
                                                                                        label=""
                                                                                        className={classes.textField}
                                                                                        value={this.state.jawaban.filter(jUser => jUser.idJawaban === qjl1.q_jawaban_id.toString()).map(jUN => {
                                                                                            return jUN.jawabanLainnya
                                                                                        }).map(jw=>{
                                                                                            return jw.value
                                                                                        })}
                                                                                        disabled={this.state.jawaban.filter(jUser => jUser.idJawaban === qjl1.q_jawaban_id.toString()).length === 0}
                                                                                        onChange={(e) => this.handlerChangeJawabanLainnya(e,qjl1)}
                                                                                        variant="outlined"
                                                                                    />

                                                                                   
                                                                                    {/* </FormControl> */}
                                                                                </div>
                                                                            )
                                                                        })}
                                                                     
                                                                                                       
                                                                        {/* <FormControlLabel value={j1.jawaban} control={<Radio 
                                                                        
                                                                        />} label={j1.jawaban} /> */}

                                                                    </div>
                                                                )
                                                            })}

                                                    </FormControl>
                                </div>
                          
                                            </div>
                                        )
                                    })}
                                </CardContent>
                                <Divider/>
                                     <CardActions>
                                        <Button color="primary" > 
                                            SUBMIT    
                                        </Button>     
                                    </CardActions>   
                            </Card>
                        </Grid>

                    </Grid>
                </div>
            </Layout2>

        )
    }
}

DataQuisoner.propTypes = {
    classes: PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({
    quisoners: state.quisoners
});

export default compose(withStyles(styles), connect(mapStateToProps, { getQuisonerAktif }))(DataQuisoner);
