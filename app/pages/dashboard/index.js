import React, { Component } from 'react'
import Layout2 from '../../components/layout/layout_2';
import BarChart from './BarChart';
import PieChart from './PieChart';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
} from '@material-ui/core';


const data = [
  {
    name: '2013', uv: 100, color:"#7FFFD4",
  },
  {
    name: '2014', uv: 90,  color:"#7FFF00",
  },
{
    name: '2015', uv: 70,  color:"#FF7F50",
  },
  {
    name: '2016', uv: 120,  color:"#FFF8DC",
  },
    {
    name: '2017', uv: 105,  color:"#ADFF2F",
  },
      {
          name: '2018', uv: 100, color:"#ADD8E6",
  },
        {
    name: '2019', uv: 140,  color:"#6184d8",
  },
];
 class Dashboard extends Component {
   static async getInitialProps(something) {
     const { res,req} = something;
     if(!req.user){
       res.writeHead(302, {
         Location: '/login'
       })
       res.end()
     }
     let mahasiswa = req.user;
     return {
        mahasiswa
     }
   }
   state={
     jurusan:""
   }


  render() {
    const {jurusan} = this.state;
    return (
      <Layout2 url={'/dashboard'}>
        <div>
          <Grid container direcation="column" spacing={8}>
            <Card>
              <CardContent>
                  <Grid item md={12}>
                  <div style={{margin:"10px 0"}}>
                    <Typography style={{fontWeight:"bold",padding:10}}>
                        Lulusan {this.props.mahasiswa.jurusan} pertahun :
                    </Typography>
                    <Divider/>
                  </div>
                    <Grid container direction="row" spacing={8}>
                    <Grid item md={6}>
                      <BarChart data={data}/>
                    </Grid>
                    <Grid item md={6}>
                    <PieChart data={data}/>
                    </Grid>
                    </Grid>
                  </Grid>
              </CardContent>
            </Card>

          </Grid>
        </div>
        </Layout2>
    )
  }
}
export default Dashboard;
