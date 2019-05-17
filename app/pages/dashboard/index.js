import React, { Component } from 'react'
import Layout2 from '../../components/layout/layout_2';
import BarChart from './BarChart';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
} from '@material-ui/core';
 class Dashboard extends Component {
  render() {
    return (
      <Layout2 url={'/dashboard'}>
        <div>
          <Grid container direcation="column" spacing={8}>
            <Card>
              <CardContent>
                  <Grid item md={12}>  
                  <div style={{margin:"10px 0"}}>
                    <Typography style={{fontWeight:"bold",padding:10}}>
                        Lulusan pertahun :
                    </Typography>
                    <Divider/>
                  </div>
               
                      <BarChart/>
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
