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
                                      
                                    <Typography style={{margin:"0px 5px"}}>
                                    {qp.pertanyaan}
                                </Typography>
                                <FormControl component="fieldset" className={classes.formControl}>
                                        <RadioGroup
                                          aria-label="jawaban"
                                          name={qp.kode}
                                          className={classes.group}
                                          value={this.state.value}
                                          onChange={this.handleChange}
                                        >
                                {quisoners.q_jawaban.filter((qj,iJ)=>qj.q_pertanyaan_id !== qp.id).map(j1=>{
                                    return(
                                        <div>
                                          <FormControlLabel value={j1.jawaban} control={<Radio />} label={j1.jawaban} />
                                          </div>
                                    )
                                })}    
                                
                                </RadioGroup>
                                      </FormControl>
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
