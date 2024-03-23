import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container';
import '../App.css';
const TableStructure2 = ({tableName,columns, data }) => {
  const getFontColor = (value) => {
    if (value.toLowerCase() === 'completed' || value.toLowerCase()==='closed' || value.toLowerCase()=== 'resolved') {
      return '#23A393';
    } else if (value.toLowerCase() === 'inprogress') {
      return '#0087F5';
    } 
    else if (value.toLowerCase()==='not started'){
      return '#8A9199';
    }
    else {
      return '#CF3232'; // Default color or any other color
    }
  };
   const allowedTables=['Release Details','Key Highlights','Feature Status','Risk Tracker','Defect Trend','QA Test Execution Status'];
   const allowedTables2= ['Project Status','Report Date','Release Details','Feature Status','Risk Tracker','Defect Trend','Defect Trend_2','QA Test Execution Status'];
    return(
    <div>
     
      {/* {tableName !== 'Defect Trend_2' ? (
        <div className="full-width-border">
          <Container className="container">
            {tableName}
          </Container>
        </div>
      ) : null} */}
      {allowedTables.includes(tableName) && (
        <div className="full-width-border">
          <Container className="container">
            {tableName}
          </Container>
        </div>
      )}
      
      <Table className="custom-table"bordered hover>
      {allowedTables2.includes(tableName) &&(<thead > 
         <tr className="tablehead">
            {columns?.map(column => (
              <th  key={column}>{column}</th>
              // style={{ backgroundColor: 'blue'}}
            ))}
          </tr>
        </thead>)}
        


        {tableName === 'Project Details' ? (
        <div className="padding-container">
          <Table className={`custom-table ${tableName === 'Project Details'?'striped' : ''}`} hover>  
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
          </Table></div>):(






        <tbody>
          {data?.map((row, index) => (
            <tr key={index}>
                {columns?.map((column) => {
                const isStatus = ['status'].includes(column.toLowerCase());
                const isRemarkColumn = column.toLowerCase() === 'remarks';
                const isRemarkInTableX = tableName.toLowerCase() === 'qa test execution status' && isRemarkColumn;
                const isTableXorY = ['key highlights', 'project description'].includes(tableName.toLowerCase());
                const backgroundColor = isTableXorY ? '#F2F2F2' : 'none';
                  

                if (isStatus || isRemarkInTableX) {
                  // If the column name is "Remark" or "Status", wrap the content in a container
                  return (
                    <td key={column} style={{backgroundColor:backgroundColor}}>
                      <Container className="custom-container" >
                        <span style={{
                        // color: getCellColors(row[column]).color,
                        display: 'inline-block',
                       // height: '24px',
                         padding: '2px 4px',
                         justifyContent: 'center',
                         alignItems: 'center',
                        borderRadius: '4px',
                        backgroundColor: getFontColor(row[column]),
                      }}>{row[column]}</span>
                      </Container>
                    </td>
                  );
                } else {
                  // Otherwise, apply styles and render as usual
                  return (
                    <td
                      key={column}style={{backgroundColor:backgroundColor}}
                      
                    >
                      {row[column]}
                    </td>
                  );}
                    }
                  
                
              /* {columns?.map(column => (

                <td key={column}
                >{row[column]}
                </td> */
                )}
            </tr>
          ))}
        </tbody>)}
      </Table>
    </div>);
};

export default TableStructure2