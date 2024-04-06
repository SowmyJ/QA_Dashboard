import React, { useState, useEffect } from 'react';
import TableStructure1 from './Tablejson1';
import TableStructure2 from './Tablejson2';
import '../App.css';
import ENV from '../environment/environment'
//Replace this with Data Fetcher
const Insight = (res) => {
  const [Data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // console.log('sss')
     console.log(res)
      try {
        await fetch(`${ENV.API_URL}/json/${res['a'][0]}/${res['a'][1]}`)
        .then(response => response.json())
        .then(data => {
          const result=data;
          // console.log(result,'ppp')
          setData(result);
        })
        // console.log(a,b)
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
  }, [res]);



  // console.log(Data,'dataaa')

// return (
//     <div>
//       {[...Array(11).keys()].map((index) => (
//         <TableStructure
//           key={`Table${index + 1}`}
//           tableName={`Table${index + 1}`}
//           columns={Data && Data.length > 0 ? Data[index]?.[`Table${index + 1}_columns`] : []}
//           data={Data && Data.length > 0 ? Data[index]?.[`Table${index + 1}_data`] : []}
//           className={`table${index + 1}-class`}
//         />
//       ))}
//     </div>
//   );
// };
const tableNames = ['Project Status','Report Date','Project Description','Project Details','Release Details','Key Highlights','Feature Status','Risk Tracker','Defect Trend','Defect Trend_2','QA Test Execution Status'];
return (
  <div>
    <div className='div-container-main-status'>
  {tableNames.map((tableName, index) => (
    (index === 0 || index === 1) && (
      <TableStructure1
        key={`Table${index + 1}`}
        tableName={tableName}
        columns={Data && Data.length > 0 ? Data[index]?.[`Table${index + 1}_columns`] : []}
        data={Data && Data.length > 0 ? Data[index]?.[`Table${index + 1}_data`] : []}
        className={`table${index + 1}-class`}
      />
    )
  ))}
  </div>
  {tableNames.map((tableName, index) => (
    (index !== 0 && index !== 1) && (
      <TableStructure2
        key={`Table${index + 1}`}
        tableName={tableName}
        columns={Data && Data.length > 0 ? Data[index]?.[`Table${index + 1}_columns`] : []}
        data={Data && Data.length > 0 ? Data[index]?.[`Table${index + 1}_data`] : []}
        className={`table${index + 1}-class`}
      />
    )
  ))}
</div>
);}




export default Insight;