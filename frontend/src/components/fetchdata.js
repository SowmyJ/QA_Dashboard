import React, { useState, useEffect } from 'react';
import Table from './Tablejson';
import ENV from '../environment/environment';

const Fetch = () => {
  const [Data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // console.log('sss')
     
      try {
        fetch(`${ENV.API_URL}/json`)
        .then(response => response.json())
        .then(data => {
          const result=data;
          console.log(result,'ppp')
          setData(result);
        })
        .catch(error => console.error(error));
        // Replace 'https://api.example.com/tabledata' with the actual endpoint
       // const response = fetch('http://localhost:3001/json');
       // console.log(response,'rrr')
       
      //  d=Data;
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
      
    };

    fetchData();
  }, []);



  // console.log(Data,'dataaa')

return (
  <div>
  
         <Table
      tableName="Table1"
      columns={ Data && Data.length > 0 ? Data[0]?.Table1_columns: []}
      data={Data && Data.length > 0 ? Data[0]?.Table1_data: []}
    />

  
   <Table
      tableName="Table2"
      columns={ Data && Data.length > 0 ? Data[1]?.Table2_columns: []}
      data={Data && Data.length > 0 ? Data[1]?.Table2_data: []}
    />
    <Table
      tableName="Table3"
      columns={ Data && Data.length > 0 ? Data[2]?.Table3_columns: []}
      data={Data && Data.length > 0 ? Data[2]?.Table3_data: []}
    />
    <Table
      tableName="Table4"
      columns={ Data && Data.length > 0 ? Data[3]?.Table4_columns: []}
      data={Data && Data.length > 0 ? Data[3]?.Table4_data: []}
    />
    <Table
      tableName="Table5"
      columns={ Data && Data.length > 0 ? Data[4]?.Table5_columns: []}
      data={Data && Data.length > 0 ? Data[4]?.Table5_data: []}
    />
    <Table
      tableName="Table6"
      columns={ Data && Data.length > 0 ? Data[5]?.Table6_columns: []}
      data={Data && Data.length > 0 ? Data[5]?.Table6_data: []}
/>
    <Table
      tableName="Table7"
      columns={ Data && Data.length > 0 ? Data[6]?.Table7_columns: []}
      data={Data && Data.length > 0 ? Data[6]?.Table7_data: []}
    />
    <Table
      tableName="Table8"
      columns={ Data && Data.length > 0 ? Data[7]?.Table8_columns: []}
      data={Data && Data.length > 0 ? Data[7]?.Table8_data: []}
    />
    <Table
      tableName="Table9"
      columns={ Data && Data.length > 0 ? Data[8]?.Table9_columns: []}
      data={Data && Data.length > 0 ? Data[8]?.Table9_data: []}
    />
    <Table
      tableName="Table10"
      columns={ Data && Data.length > 0 ? Data[9]?.Table10_columns: []}
      data={Data && Data.length > 0 ? Data[9]?.Table10_data: []}
    />
    <Table
      tableName="Table11"
      columns={ Data && Data.length > 0 ? Data[10]?.Table11_columns: []}
      data={Data && Data.length > 0 ? Data[10]?.Table11_data: []}
    />
    <Table
      tableName="Table12"
      columns={ Data && Data.length > 0 ? Data[11]?.Table12_columns: []}
      data={Data && Data.length > 0 ? Data[11]?.Table12_data: []}
    />   
  </div>
);
};
export default Fetch