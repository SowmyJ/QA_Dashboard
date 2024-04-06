import React, { useState, useEffect } from 'react';
import TableStructure1 from './Tablejson1';
import TableStructure2 from './Tablejson2';
import '../App.css';
import ENV from '../environment/environment';
const Unisecure = () => {
  const [Data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      // console.log('sss')
     
      try {
        fetch(`${ENV.API_URL}/json/${activeTab}`)
        .then(response => response.json())
        .then(data => {
          const result=data;
          console.log(result,'ppp')
          setData(result);
        })
        .catch(error => console.error(error));
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
      
    };

    fetchData();
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

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
);


    };
export default Unisecure;