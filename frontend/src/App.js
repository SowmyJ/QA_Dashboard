import React, { useState } from 'react';
 import { useEffect } from 'react';
 import HeaderComponent from './components/Systech';
 import Header from './components/Header.js';
 
//  import RenderData from './components/Insight';
 import Unisecure from './components/Unisecure';
 import Unitrace from './components/Unitrace.js';
 import SupplySense from './components/SupplySense.js';
 import UploadsArchives from './components/UploadsArchives.js';
 import FooterComponent from './components/Footer';
 import logo from './doverLogo.png';
 import homepageImage from './eg1.jpg';
 
 
 import 'bootstrap/dist/css/bootstrap.min.css';
 import './App.css';
import Insight from './components/Insight';
 
 
 
 
 
 
 // import Table from './Table';
 const App = () => {
  // Sample data
  // useEffect(() => {
  //   document.title = 'QE Dashboard'; // Set the title dynamically
  // }, []);
  useEffect(() => {
    document.title = 'QA Dashboard'; // Set the title dynamically
 
 
    const link = document.querySelector("link[rel~='icon']");
    if (!link) {
      const newLink = document.createElement("link");
      newLink.rel = "icon";
      document.head.appendChild(newLink);
    }
    link.href = logo; // Set the logo as the favicon
  }, []);
  /*const [selectedTab, setSelectedTab] = useState('None');*/
 
 
  const [selectedTab, setSelectedTab] = useState(null);
  const [selectedSubTab, setSelectedSubTab] = useState(null);
  const [selectedSubSubTab, setSelectedSubSubTab] = useState(null);
 
 
  const handleChange = (selectedKey) => {
    if (selectedKey.startsWith('tab')) {
      setSelectedTab(selectedKey);
      setSelectedSubTab(null); // Reset subtab when changing tab
      setSelectedSubSubTab(null); // Reset subsubtab when changing tab
    } else if (selectedKey.startsWith('subtab')) {
      setSelectedSubTab(selectedKey);
      setSelectedSubSubTab(null); // Reset subsubtab when changing subtab
    } else {
      setSelectedSubSubTab(selectedKey);
    }
  };
 
 
  // Map the selected tab to its corresponding component
  const getTabComponent = (tab) => {
    switch (tab) {
      case 'tab1':
        return <Insight category={'Systech'} subcategory={'Insight'}  />;
      case 'tab2':
        return <Insight  />;
      case 'tab3':
        return <Unitrace />;
      case 'tab4':
        return <SupplySense />;
      case 'tab5':
        return <UploadsArchives />;
      default:
        return null;
    }
  };
 
 
  return (
      <div className="all-body-div">
 
 
      <div className="body-div">
      <HeaderComponent/>
      <Header
        selectedTab={selectedTab}
        selectedSubTab={selectedSubTab}
        selectedSubSubTab={selectedSubSubTab}
        handleChange={handleChange}
      />
      <div className="background-image-div" style={{backgroundImage: selectedTab === null ? homepageImage:'none'}}>
     
      {/* Render the component based on the selected tab */}
      {getTabComponent(selectedTab)}
      </div>
      </div>
      <FooterComponent/>
     
     </div>
     
   
  );
//   const [selectedTab, setSelectedTab] = useState('one');
 
//   const handleChange = (value) => {
//     setSelectedTab(value);
//   };
 
//   const getTabComponent = (tab) => {
//     switch (tab) {
//       case 'one':
//         return <Insight />;
//       case 'two':
//         return <Unisecure/>;
//       // case 'three':
//       //   return <Unitrace />;
//       // case 'four':
//       //   return <SupplySense/>;
//       // case 'five':
//       //   return <UploadsArchives/>;
//       default:
//         return null;
//     }
//   };
 
//   return (
//     <div className="mainbody">
//      <HeaderComponent/>
     
     
//       <Header selectedTab={selectedTab} handleChange={handleChange} />
 
//       {getTabComponent(selectedTab)}
   
//       <FooterComponent/>
 
//   </div>
 
 
//   );
};
 
export default App;
 
 
// // App.jsx
// import React, { useState, useEffect } from 'react';
// import MyComponent from './Unitrace'; // Adjust the path
 
// const App = () => {
//   const [data, setData] = useState(null);
 
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:3001/json'); // Replace with the actual endpoint
//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         console.error('Error fetching table data:', error);
//       }
//     };
 
//     fetchData();
//   }, []);
 
//   return (
//     <div>
//       <MyComponent tableData={data} />
//     </div>
//   );
// };
 
// export default App;