import React from 'react';
import Table from 'react-bootstrap/Table'
// import Container from 'react-bootstrap/Container';
import '../App.css';
const TableStructure1 = ({tableName,columns, data }) => {
    const getFontColor = (value) => {
        if (value.toLowerCase() === 'green') {
          return '#23A393';
        } else if (value.toLowerCase() === 'yellow') {
          return '#FFCF53';
        } 
        else if (value.toLowerCase()==='not started'){
          return '#8A9199';
        }
        else {
          return '#CF3232'; // Default color or any other color
        }
      };
    // const allowedTables=['Release Details','Key Highlights','Feature Status','Risk Tracker','Defect Trend','QA Test Execution Status'];
    // const allowedTables2= ['Project Status','Report Date','Project Details','Release Details','Feature Status','Risk Tracker','Defect Trend','Defect Trend_2','QA Test Execution Status'];
    return(
        <div>        
  {tableName === 'Project Status' && (
    <div style={{ textAlign: 'left', }}>
      <Table className={`custom-table-status`} hover>
        <tbody>
          {columns?.map((column) => (
            // <React.Fragment key={column} className="frag">
              <tr>
                <th>{column}</th>
                <div className={`custom-table-status-div`} style={{ backgroundColor: getFontColor(data[0]?.[column])}}><td>{data[0]?.[column]}</td></div>
              </tr>
            // </React.Fragment>
          ))}
        </tbody>
     
      </Table>
    </div>)}
    {tableName === 'Report Date' && (
    <div style={{ textAlign: 'right',}}>
      <Table className={`custom-table-report`} hover>
        <tbody>
          {columns?.map((column) => (
            // <React.Fragment key={column} className="frag">
              <tr>
                <th>{column}</th>
                <td>{data[0]?.[column]}</td>
              </tr>
            // </React.Fragment>
          ))}
        </tbody>
     
      </Table>
    </div>)}
  
 </div>
  )} ; 
    
    

export default TableStructure1


     