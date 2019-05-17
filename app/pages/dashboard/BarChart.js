import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer
} from 'recharts';

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


//   {
//     name: '2015', uv: 2000, pv: 9800, amt: 2290,
//   },
//   {
//     name: '2016', uv: 2780, pv: 3908, amt: 2000,
//   },
//   {
//     name: '2017', uv: 1890, pv: 4800, amt: 2181,
//   },
//   {
//     name: '2018', uv: 2390, pv: 3800, amt: 2500,
//   },
//   {
//     name: '2019', uv: 3490, pv: 4300, amt: 2100,
//   },
];

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

  render() {
    return (
         <div style={{ width: '100%', height: 300 }}>   
            
      <BarChart
        width={900}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* <Bar dataKey="pv" fill="color" /> */}
        <Bar dataKey="uv" fill="#82ca9d">
            {/* {data.map((d,index)=>{
                return(
                    <Cell key={`cell-${index}`} fill={d.color}/>
                )
            })} */}
        </Bar>
      </BarChart>
      
    </div>
    );
  }
}
