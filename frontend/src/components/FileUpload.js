import React, { useState, useRef } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import ENV from '../environment/environment';
const FileUpload = () => {
  const [category, setCategory] = useState('Systech');
  const [subcategory,setSubcategory] = useState('Unisecure');
  const [subSubCategory,setsubSubcategory] = useState(null);
  const [Issupplysense,setIssupplysense] = useState(0);
  const [file, setFile] = useState(null);
  const [uploadedFilename, setUploadedFilename] = useState(null);
  const fileInputRef = useRef(null);
 
  const handleCategoryChange = (event) => {
    if(event.target.value==='Ecommerce'){
      setIssupplysense(1);
    }
    setCategory(event.target.value);
  };
  const handleSubCategoryChange = (event)=>{
    setSubcategory(event.target.value);
  }
  const handleSubSubCategoryChange = (event)=>{
    setsubSubcategory(event.target.value);
  }
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
 
  const handleUpload = () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }
 
    const formData = new FormData();
 
    formData.append('excelFile', file);
 
    // Replace 'http://localhost:3001' with your actual backend server URL
    const categories = encodeURIComponent(category);
    const filename = encodeURIComponent(file.name);
    const subcategories = encodeURIComponent(subcategory);
    const subSubCategories = encodeURIComponent(subSubCategory);
    if(Issupplysense===0){
    axios.post(`${ENV.API_URL}/uploads/${categories}/${subcategories}/${filename}/${Issupplysense}`,formData)
      .then(response => {
        console.log(response.data);
        setUploadedFilename(file.name);
        // Handle the response or update the UI as needed
      })
      .catch(error => {
        console.error(error);
        // Handle errors appropriately
      });
    }
    if(Issupplysense===1){
      axios.post(`${ENV.API_URL}/upload/${categories}/${subcategories}/${subSubCategories}/${filename}/${Issupplysense}`,formData)
      .then(response => {
        console.log(response.data);
        setUploadedFilename(file.name);
        // Handle the response or update the UI as needed
      })
      .catch(error => {
        console.error(error);
        // Handle errors appropriately
      });
    }
  };
 
 
 
  const handleDragOver = (e) => {
    e.preventDefault();
  };
 
  const handleDrop = (e) => {
    e.preventDefault();
 
    const droppedFile = e.dataTransfer.files[0];
    console.log('Dropped file:', droppedFile);
 
    if (droppedFile) {
      setFile(droppedFile);
    }
  };
 
  const handleDivClick = () => {
    // Trigger file input click programmatically
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
 
 
 const tabs = ["Systech", "CDS", "IOT", "EcommerceQA"];
 
 const subTabsMap = {
   Systech: ["Unisecure", "Unitrace", "UniSecure-Lite", "Insight", "UniSeries"],
   CDS: ["Mentor", "Partable"],
   IOT: ["Platform", "Hydro", "Civacon", "Mosaic", "VHSS", "Genesis", "MI", "Rego", "SCDP"],
   EcommerceQA: ["DFS", "PSG", "OKI", "ESG", "CPC", "Improseal", "OPW EMEA", "OPW", "VSG EMEA", "TWG", "Destaco", "MAAG", "SWEP", "VSG NA", "DFR", "Caldera", "OPW CES"]
 };
 
 const subSubTabsMap = {
   DFS: ["DFS-EMEA", "DFS-US", "DFS-Canada", "DFS-Brazil", "DFS-Order Tracking"],
   PSG: [],
   OKI: ["OKI-Techon", "OKI-Metcal"],
   ESG: [],
   CPC: [],
   Improseal: ["Improseal-US", "Improseal-UK"],
   'OPW EMEA': [],
   OPW: [],
   'VSG EMEA': [],
   TWG: [],
   Destaco: ["Destaco B2B"],
   MAAG: [],
   SWEP: [],
   'VSG NA': [],
   DFR: [],
   Caldera: [],
   'OPW CES': ["OPW CES", "TBD"]
 };
 
 return (
   <div>
     <div className="full-width-border">
       <Container className="container">
         Uploads
       </Container>
     </div>
     <div>
       <label style={{ margin: '15px 5px' }}>Choose a category: </label><br></br>
       <select className={`dropdown-button`} value={category} onChange={handleCategoryChange}>
         <option value="">Select Category</option>
         {tabs.map((tab, index) => (
           <option value={tab} key={index}>{tab}</option>
         ))}
       </select>
     </div>
     {category && (
       <div>
         <label style={{ margin: '15px 5px' }}>Choose a subcategory: </label><br></br>
         <select className={`dropdown-button`} value={subcategory} onChange={handleSubCategoryChange}>
           <option value="">Select Subcategory</option>
           {subTabsMap[category] && subTabsMap[category].map((subTab, index) => (
             <option value={subTab} key={index}>{subTab}</option>
           ))}
         </select>
       </div>
     )}
     {subcategory && category === 'EcommerceQA' && (
       <div>
         <label style={{ margin: '15px 5px' }}>Choose a subsubcategory: </label><br></br>
         <select className={`dropdown-button`} value={subSubCategory} onChange={handleSubSubCategoryChange}>
           <option value="">Select Subsubcategory</option>
           {subSubTabsMap[subcategory] && subSubTabsMap[subcategory].map((subSubTab, index) => (
             <option value={subSubTab} key={index}>{subSubTab}</option>
           ))}
         </select>
       </div>
     )}
     <div>
       <input
         type="file"
         onChange={handleFileChange}
         ref={fileInputRef}
         style={{ display: 'none', }}
       />
 
       <div
       
 
 
 
 
 
 
 
 
          style={{ border: '2px dashed #ccc', padding: '30px', textAlign: 'center', cursor: 'pointer', marginTop: '15px' }}
         onDragOver={handleDragOver}
         onDrop={handleDrop}
         onClick={handleDivClick}
       >
         <p>Drag and drop a file here or click to upload</p>
       </div>
       <p style={{ color: '#545859', fontSize: '13px' }}>Note : File Format is XLXS</p>
       <button className={`extract-button`} onClick={handleUpload}>Extract</button>
       {uploadedFilename && (
         <p>File '{uploadedFilename}' uploaded successfully!</p>
       )}
     </div>
   </div>
 );
};
 
export default FileUpload;