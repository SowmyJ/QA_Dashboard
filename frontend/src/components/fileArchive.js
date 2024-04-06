



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



// import React, { useState, useEffect } from 'react';
// import Container from 'react-bootstrap/Container';
// import ENV from '../environment/environment';
// import { Dropdown } from 'react-bootstrap';
// import dropdown_img from '../dropdown.png';

// const Archive = () => {
//   const [data, setData] = useState([]);
//   const [selectedFolder, setSelectedFolder] = useState(null);
//   const [selectedCategory,setSelectedCategory] = useState(null);
//   const fetchData = async (folderName,categoryName) => {
//     try {
//       const response = await fetch(`${ENV.API_URL}/archives/uploads/${folderName}/${categoryName}`);
//       const responseData = await response.json();
//       console.log(Object.keys(responseData['files']))
//       if (responseData.files && Array.isArray(responseData.files)) {
//         const files = await Promise.all(responseData.files.map(async (fileName) => {
//           try {
//             const fileResponse = await fetch(`${ENV.API_URL}/file/${folderName}/${categoryName}/${fileName}`, {
//               headers: {
//                 'Content-Type': 'application/octet-stream', // Set content type to binary
//               },
//               responseType: 'blob', // Specify responseType as 'blob'
//             });
//             const fileContent = await fileResponse.arrayBuffer();
//             return { fileName, fileContent };
//           } catch (fileError) {
//             console.error(`Error fetching file ${fileName} for ${folderName}:`, fileError);
//             return null; // Skip this file on error
//           }
//         }).filter(Boolean)); // Filter out null values (skipped files)

//         console.log(`${folderName} files:`, files);
//         return { folderName,categoryName,files};
//       } else {
//         console.error(`Invalid response data for ${folderName}:`, responseData);
//         return { folderName, files: [] };
//       }
//     } catch (error) {
//       console.error(`Error fetching ${folderName} data:`, error);
//       return { folderName, files: [] };
//     }
//   };

//   useEffect(() => {
//     const folders = ['Systech', 'CDS', 'IOT']; 
//     // SupplySense
//     const subcategory = {
//       Systech: ["Unisecure", "Unitrace","UniSecure-Lite","Insight","UniSeries"],
//       CDS: ["Mentor", "Partable"],
//       IOT: ["Platform", "Hydro","Civacon","Mosaic","VHSS","Genesis","MI","Rego","SCDP"],
//       // EcommerceQA: ["DFS","PSG","OKI","ESG","CPC","Improseal","OPW EMEA","OPW","VSG EMEA","TWG","Destaco","MAAG","SWEP","VSG NA","DFR","Caldera","OPW CES"],
//     };
    
//     const fetchDataForAllFolders = async () => {
//       try {
//         const results = await Promise.all(folders.map(folder => Promise.all(subcategory[folder].map(subcat=>fetchData(folder,subcat)))));
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
//       <ul style={{ listStyleType: "none" }}>
//         {data.map(({ folderName,categoryName, files }, index) => (
//           <li key={index} onClick={() => handleFolderClick(folderName)}>
//             <img
//               src={dropdown_img}
//               alt="dropdown"
//               style={{ marginRight: '5px', height: '1.5%', width: '25px' }}
//             />
//             <strong>{folderName}</strong>
//             {selectedFolder === folderName && Array.isArray(files) && files.length > 0 ? (
//               <ul style={{ listStyleType: "none" }}>
//                 {files.map(({ fileName, fileContent }, innerFileIndex) => (
//                   <li key={innerFileIndex}>
//                     <a
//                       href={`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${btoa(String.fromCharCode.apply(null,new Uint8Array(fileContent)))}`}
//                       download={`${fileName}`}
//                     >
//                       {fileName}
//                     </a>
//                     <br />
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <br></br>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Archive;


// import React, { useState, useEffect } from 'react';
// import Container from 'react-bootstrap/Container';
// import dropdown_img from '../dropdown.png';
// import ENV from '../environment/environment';
// const Archive = () => {
//   const [data, setData] = useState([]);
//   const [selectedFolder, setSelectedFolder] = useState(null);

//   const fetchData = async (folderName, subfolderName) => {
//     try {
//       const response = await fetch(`${ENV.API_URL}/archives/uploads/${folderName}/${subfolderName}`);
//       const responseData = await response.json();
      
//       if (responseData.files && Array.isArray(responseData.files)) {
//         const files = await Promise.all(responseData.files.map(async (fileName) => {
//           try {
//             const fileResponse = await fetch(`${ENV.API_URL}/file/${folderName}/${subfolderName}/${fileName}`, {
//               headers: {
//                 'Content-Type': 'application/octet-stream',
//               },
//               responseType: 'blob',
//             });
//             const fileContent = await fileResponse.arrayBuffer();
//             return { fileName, fileContent };
//           } catch (fileError) {
//             console.error(`Error fetching file ${fileName} for ${folderName}/${subfolderName}:`, fileError);
//             return null;
//           }
//         }).filter(Boolean));
//         return { subfolderName, files };
//       } else {
//         console.error(`Invalid response data for ${folderName}/${subfolderName}:`, responseData);
//         return { subfolderName, files: [] };
//       }
//     } catch (error) {
//       console.error(`Error fetching ${folderName}/${subfolderName} data:`, error);
//       return { subfolderName, files: [] };
//     }
//   };

//   useEffect(() => {
//     const folders = ['Systech', 'CDS', 'IOT'];
//     const subcategory = {
//       Systech: ["Unisecure", "Unitrace","UniSecure-Lite","Insight","UniSeries"],
//       CDS: ["Mentor", "Partable"],
//       IOT: ["Platform", "Hydro","Civacon","Mosaic","VHSS","Genesis","MI","Rego","SCDP"],
//     };

//     const fetchDataForAllFolders = async () => {
//       try {
//         const results = await Promise.all(folders.map(folder => Promise.all(subcategory[folder].map(subcat => fetchData(folder, subcat)))));
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
//       <br />
//       <ul style={{ listStyleType: "none" }}>
//         {data.map(({ folderName, files }, index) => (
//           <li key={index} onClick={() => handleFolderClick(folderName)}>
//             <img
//               src={dropdown_img}
//               alt="dropdown"
//               style={{ marginRight: '5px', height: '1.5%', width: '25px' }}
//             />
//             <strong>{folderName}</strong>
//             {selectedFolder === folderName && Array.isArray(files) && files.length > 0 ? (
//               <ul style={{ listStyleType: "none" }}>
//                 {files.map(({ subfolderName, files }, innerIndex) => (
//                   <li key={innerIndex}>
//                     <strong>{subfolderName}</strong>
//                     <ul style={{ listStyleType: "none" }}>
//                       {files.map(({ fileName, fileContent }, fileIndex) => (
//                         <li key={fileIndex}>
//                           <a
//                             href={`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${btoa(String.fromCharCode.apply(null,new Uint8Array(fileContent)))}`}
//                             download={`${fileName}`}
//                           >
//                             {fileName}
//                           </a>
//                           <br />
//                         </li>
//                       ))}
//                     </ul>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <br />
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Archive;
import ENV from '../environment/environment';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import dropdown_img from '../dropdown.png';

const Archive = () => {
  const [data, setData] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedSubfolder, setSelectedSubfolder] = useState(null);

  const fetchData = async (folderName, subfolderName) => {
    try {
      const response = await fetch(`${ENV.API_URL}/archives/uploads/${folderName}/${subfolderName}`);
      const responseData = await response.json();
      
      if (responseData.files && Array.isArray(responseData.files)) {
        const files = await Promise.all(responseData.files.map(async (fileName) => {
          try {
            const fileResponse = await fetch(`${ENV.API_URL}/file/${folderName}/${subfolderName}/${fileName}`, {
              headers: {
                'Content-Type': 'application/octet-stream',
              },
              responseType: 'blob',
            });
            const fileContent = await fileResponse.arrayBuffer();
            return { fileName, fileContent };
          } catch (fileError) {
            console.error(`Error fetching file ${fileName} for ${folderName}/${subfolderName}:`, fileError);
            return null;
          }
        }).filter(Boolean));
        return files;
      } else {
        console.error(`Invalid response data for ${folderName}/${subfolderName}:`, responseData);
        return [];
      }
    } catch (error) {
      console.error(`Error fetching ${folderName}/${subfolderName} data:`, error);
      return [];
    }
  };

  useEffect(() => {
    const folders = ['Systech', 'CDS', 'IOT'];
    const subcategory = {
      Systech: ["Unisecure", "Unitrace","UniSecure-Lite","Insight","UniSeries"],
      CDS: ["Mentor", "Partable"],
      IOT: ["Platform", "Hydro","Civacon","Mosaic","VHSS","Genesis","MI","Rego","SCDP"],
    };

    const fetchDataForAllFolders = async () => {
      try {
        const results = await Promise.all(folders.map(async (folder) => {
          return {
            folderName: folder,
            subfolders: await Promise.all(subcategory[folder].map(async (subfolder) => {
              return {
                subfolderName: subfolder,
                files: await fetchData(folder, subfolder),
              };
            })),
          };
        }));
        console.log('Results:', results);
        setData(results);
      } catch (error) {
        console.error('Error fetching data for all folders:', error);
      }
    };
    fetchDataForAllFolders();
  }, []);

  const handleFolderClick = (folderName) => {
    setSelectedFolder(folderName);
    setSelectedSubfolder(null);
  };

  const handleSubfolderClick = (subfolderName) => {
    setSelectedSubfolder(subfolderName);
  };

  return (
    <div>
      <div className="full-width-border">
        <Container className="container">
          Archives
        </Container>
      </div>
      <br />
      <DropdownButton id="folder-dropdown" title="Select Folder">
        {data.map(({ folderName }) => (
          <Dropdown.Item key={folderName} onClick={() => handleFolderClick(folderName)}>{folderName}</Dropdown.Item>
        ))}
      </DropdownButton>
      <br />
      {selectedFolder && (
        <DropdownButton id="subfolder-dropdown" title={`Select Subfolder for ${selectedFolder}`}>
          {data.find(({ folderName }) => folderName === selectedFolder).subfolders.map(({ subfolderName }) => (
            <Dropdown.Item key={subfolderName} onClick={() => handleSubfolderClick(subfolderName)}>{subfolderName}</Dropdown.Item>
          ))}
        </DropdownButton>
      )}
      <br />
      {selectedSubfolder && (
        <>
          <strong>Selected Folder:</strong> {selectedFolder}<br />
          <strong>Selected Subfolder:</strong> {selectedSubfolder}<br />
          <ul style={{ listStyleType: "none" }}>
            {data.find(({ folderName }) => folderName === selectedFolder)
              .subfolders.find(({ subfolderName }) => subfolderName === selectedSubfolder)
              .files.map(({ fileName, fileContent }, innerIndex) => (
                <li key={innerIndex}>
                  <a
                    href={`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${btoa(String.fromCharCode.apply(null,new Uint8Array(fileContent)))}`}
                    download={`${fileName}`}
                  >
                    {fileName}
                  </a>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Archive;
