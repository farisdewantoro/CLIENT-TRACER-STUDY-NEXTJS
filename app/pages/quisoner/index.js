import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Layout2 from '../../components/layout/layout_2';
import {
    Grid,
    Card,
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
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from 'next/link';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { getQuisonerAktif } from '../../actions/quisonerActions';
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
        value:''
    }

    componentDidMount() {
        this.props.getQuisonerAktif();
    }
    handleChange = event => {
        this.setState({ value: event.target.value });
      };
    render() {
        const { classes, quisoners } = this.props;
        const {value} = this.state;
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
                                                                            <Radio
                                                                                // checked={this.state.selectedValue === 'b'}
                                                                                // onChange={this.handleChange}
                                                                                value="b"
                                                                                name="radio-button-demo"
                                                                            />
                                                                            <FormLabel>
                                                                                {j1.jawaban}
                                                                            </FormLabel>  
                                                                        </div>
                                                                        {quisoners.q_jawaban_lainnya.filter((qjl, qjI) => qjl.q_jawaban_id === j1.id ).map(qjl1=>{
                                                                            return(
                                                                                <div style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"0px 30px"}}>
                                                                                    {/* <FormControl className={classes.jawabanLainnya}> */}
                                                                                   <Typography style={{margin:"0px 20px"}}>
                                                                                        {qjl1.description}
                                                                                   </Typography>
                                                                                        <InputBase
                                                                                            id="bootstrap-input"
                                                                                            // placeholder={}
                                                                                            classes={{
                                                                                                root: classes.bootstrapRoot,
                                                                                                input: classes.bootstrapInput,
                                                                                            }}
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
