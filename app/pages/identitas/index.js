import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Layout2 from '../../components/layout/layout_2';
import styles from './styles';
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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import WorkIcon from '@material-ui/icons/Work';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import PersonalInformation from './personalInformation';
import SwipeableViews from 'react-swipeable-views';
import {getMahasiswa} from '../../actions/MahasiswaActions';
import {compose} from 'redux';
import {connect} from 'react-redux';
import Prestasi from './prestasi';
import Pekerjaan from './pekerjaan';
class Identitas extends Component {
  static async getInitialProps(something) {
      const { res, req } = something;
      if (!req.user) {
          res.writeHead(302, {
              Location: '/login'
          })
          res.end()
      }
    const mahasiswaProps = req.user;
    return {
      mahasiswaProps
    }
  }
  constructor(props){
    super(props);
    this.state={
      mahasiswa:{
        nrp:'',
        nama:'',
        email:'',
        jurusan:'',
        alamat:'',
        noTelepon:'',
        kodePIN:''
      },
      tabs:0
    }
  }

  componentDidMount(){
    if(this.props.mahasiswaProps){
      this.setState({
        mahasiswa:this.props.mahasiswaProps
      })
    }
    this.props.getMahasiswa(this.props.mahasiswaProps.id);
  }
  UNSAFE_componentWillReceiveProps(nextProps){
      if(nextProps.mahasiswaProps){
        this.setState({
          mahasiswa:nextProps.mahasiswaProps
        })
      }
  }

  handlerOnChange = (e) =>{
    let value = e.target.value;
    let name=e.target.name;
    this.setState(prevState=>({
      mahasiswa:{
        ...prevState,
        [name]:value
      }
    }));
  }
  handleChange = (event, value) => {
 
    this.setState({ tabs:value });
  };

  handleChangeIndex = index => {
    this.setState({ tabs: index });
  };
  render() {
    const { classes, theme,mahasiswas } = this.props;
    // const {nrp,nama,email,jurusan,alamat,noTelepon,kodePIN,tabs} = this.state.mahasiswa;
    const { mahasiswa, tabs}=this.state;
    return (

        <Layout2 url="/identitas">
        <div>
         
          {/* {value === 0 && <TabContainer>Item One</TabContainer>} */}
            <Grid container >
                <Grid item xs={12}>
              <Card>
                <AppBar position="static" color="inherit" elevation={0}>
                  <Tabs
                    value={tabs}
                    onChange={this.handleChange}
                    // variant="scrollable"
                    centered
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                  >
                    <Tab label=" Profile" icon={<PersonPinIcon />} />
                    <Tab label="Prestasi" icon={<GolfCourseIcon />} />
                    <Tab label="Pekerjaan" icon={<WorkIcon />} />
                  </Tabs>
                </AppBar>
                <Divider style={{ backgroundColor:"#cecece"}}/>
                <CardContent>
                  <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={tabs}
                    onChangeIndex={this.handleChangeIndex}
                  >
                    <PersonalInformation
                      {...mahasiswa}
                      classes={classes}
                      handlerOnChange={this.handlerOnChange}
                    /> 
                    <Prestasi
                      {...mahasiswas.prestasi[0]}
                    />
                    <Pekerjaan
                      {...mahasiswas.pekerjaan[0]}
                    />
                  </SwipeableViews>
              
                </CardContent>


                  <AppBar position="static" color="default" elevation={0}>
                    <Grid container justify="flex-end">
                      <div >
                        <Button style={{margin:5}}>
                          BATAL
                  </Button>
                      <Button style={{ margin: 5 }}>
                          SIMPAN
                  </Button>
                      </div>
                    </Grid>
                        </AppBar>



              </Card>
                </Grid>
            </Grid>
        </div>
        </Layout2>


    )
  }
}

Identitas.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  getMahasiswa:PropTypes.func.isRequired
};

const mapStateToProps = (state)=>({
  mahasiswas:state.mahasiswas
})
export default compose(withStyles(styles, { withTheme: true }),connect(mapStateToProps,{getMahasiswa}))(Identitas);
