



// import React, { useState, useEffect } from 'react';
// import Container from 'react-bootstrap/Container';
// import ENV from '../environment/environment';
// import { Dropdown,ListGroup } from 'react-bootstrap';
// import dropdown_img from '../dropdown.png';

// const Archive = () => {
//   const [data, setData] = useState([]);
//   const [selectedFolder, setSelectedFolder] = useState(null);

//   const fetchData = async (folderName) => {
//     try {
//       const response = await fetch(`${ENV.API_URL}/archives/uploads/${folderName}`);
//       const files = await response.json();
//       console.log(`${folderName} files:`, files); // Log files for debugging
//       return { folderName, files: Object.values(files) }; // Convert object values to an array
//     } catch (error) {
//       console.error(`Error fetching ${folderName} data:`, error);
//       return { folderName, files: [] };
//     }
//   };

//   useEffect(() => {
//     const folders = ['Insight', 'Unisecure', 'Unitrace'];
//     // 'SupplySense'

//     const fetchDataForAllFolders = async () => {
//       try {
//         const results = await Promise.all(folders.map(folder => fetchData(folder)));
//         console.log('Results:', results);
//         setData(results);
//       } catch (error) {
//         console.error('Error fetching data for all folders:', error);
//       }
//     };

//     fetchDataForAllFolders();
//   }, []);

//   const handleFolderClick = (folderName) => {
//     setSelectedFolder(selectedFolder === folderName ? null : folderName);
//   };

//   return (
//     <div>
//       <div className="full-width-border">
//         <Container className="container">
//           Archives
//         </Container>
//       </div>
//       <br></br>
//       <ul style={{listStyleType:"none"}}>
//   {data.map(({ folderName, files }, index) => (
//     <li key={index} onClick={() => handleFolderClick(folderName)}>
//       <img
//         src={dropdown_img}// Replace with the actual path to your dropdown image
//         alt="dropdown"
//         style={{ marginRight: '5px', height:'1.5%', width: '25px'}}  // Adjust spacing as needed
//       />
//       <strong>{folderName}</strong>
//       {selectedFolder === folderName && Array.isArray(files) && files.length > 0 ? (
//         <ul>
//           {files.map((nestedFiles, fileIndex) => (
//             <ul style={{listStyleType:"none"}} key={fileIndex}>
//               {nestedFiles.map((file, innerFileIndex) => (
//                 <li key={innerFileIndex}>
//                   {/* Assuming the file name is the actual filename and can be used in the URL */}
//                   {/* <a
//                     href={`${ENV.API_URL}/archives/uploads/${folderName}/${file}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
                    
//                     {file}
//                   </a> */}
//                   {data &&(
//       <a href={`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${btoa(String.fromCharCode.apply(null,new Uint8Array(data)))}`} download={`${file}`}>{file}</a>
//     )}
//                   <br /> {/* Add a line break after each file link */}
//                 </li>
//               ))}
//             </ul>
//           ))}
//         </ul>
//       ) : (
//         <br></br>
//       )}
//     </li>
//   ))}
// </ul>
//     </div>
//   );
// };



import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import ENV from '../environment/environment';
import { Dropdown } from 'react-bootstrap';
import dropdown_img from '../dropdown.png';

const Archive = () => {
  const [data, setData] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const fetchData = async (folderName) => {
    try {
      const response = await fetch(`${ENV.API_URL}/archives/uploads/${folderName}`);
      const responseData = await response.json();

      if (responseData.files && Array.isArray(responseData.files)) {
        const files = await Promise.all(responseData.files.map(async (fileName) => {
          try {
            const fileResponse = await fetch(`${ENV.API_URL}/file/${folderName}/${fileName}`, {
              headers: {
                'Content-Type': 'application/octet-stream', // Set content type to binary
              },
              responseType: 'blob', // Specify responseType as 'blob'
            });
            const fileContent = await fileResponse.arrayBuffer();
            return { fileName, fileContent };
          } catch (fileError) {
            console.error(`Error fetching file ${fileName} for ${folderName}:`, fileError);
            return null; // Skip this file on error
          }
        }).filter(Boolean)); // Filter out null values (skipped files)

        console.log(`${folderName} files:`, files);
        return { folderName, files };
      } else {
        console.error(`Invalid response data for ${folderName}:`, responseData);
        return { folderName, files: [] };
      }
    } catch (error) {
      console.error(`Error fetching ${folderName} data:`, error);
      return { folderName, files: [] };
    }
  };

  useEffect(() => {
    const folders = ['Insight', 'Unisecure', 'Unitrace']; 
    // SupplySense

    const fetchDataForAllFolders = async () => {
      try {
        const results = await Promise.all(folders.map(folder => fetchData(folder)));
        console.log('Results:', results);
        setData(results);
      } catch (error) {
        console.error('Error fetching data for all folders:', error);
      }
    };

    fetchDataForAllFolders();
  }, []);

  const handleFolderClick = (folderName) => {
    setSelectedFolder(selectedFolder === folderName ? null : folderName);
  };

  return (
    <div>
      <div className="full-width-border">
        <Container className="container">
          Archives
        </Container>
      </div>
      <br></br>
      <ul style={{ listStyleType: "none" }}>
        {data.map(({ folderName, files }, index) => (
          <li key={index} onClick={() => handleFolderClick(folderName)}>
            <img
              src={dropdown_img}
              alt="dropdown"
              style={{ marginRight: '5px', height: '1.5%', width: '25px' }}
            />
            <strong>{folderName}</strong>
            {selectedFolder === folderName && Array.isArray(files) && files.length > 0 ? (
              <ul style={{ listStyleType: "none" }}>
                {files.map(({ fileName, fileContent }, innerFileIndex) => (
                  <li key={innerFileIndex}>
                    <a
                      href={`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${btoa(String.fromCharCode.apply(null,new Uint8Array(fileContent)))}`}
                      download={`${fileName}`}
                    >
                      {fileName}
                    </a>
                    <br />
                  </li>
                ))}
              </ul>
            ) : (
              <br></br>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Archive;


// import XLSX from 'xlsx'
// import axios from 'axios'

// const Archive=()=>{
//   const[Data,setData]= useState(null)
//   useEffect(()=>{
//     const filename = '4-11-2023_InsightReport.xlsx'
//     const url = 'http://20.127.210.6:7777/file/'
//     axios.get(`${url}${filename}`,{responseType:'arraybuffer'}).then(
//       res=>{
//         setData(res.data)
//       }).catch(error=>{
//         console.error(error)
//       })
// },[])
// return(
//   <div>
//     {Data &&(
//       <a href={`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${btoa(String.fromCharCode.apply(null,new Uint8Array(Data)))}`} download="download.xlsx">download</a>
//     )}
//   </div>
// )
// }
// export default Archive;



