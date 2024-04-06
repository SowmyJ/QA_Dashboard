import React, { useState } from 'react';
 import { useEffect } from 'react';
 import HeaderComponent from './components/Systech';
 import Header from './components/Header.js';
 import UploadsArchives from './components/UploadsArchives.js';
 import FooterComponent from './components/Footer';
 import logo from './doverLogo.png';
 import homepageImage from './eg1.jpg';
 
 
 import 'bootstrap/dist/css/bootstrap.min.css';
 import './App.css';
import Insight from './components/Insight';
 
 
 
 
 
const subTabsMap = {
  Systech: ["Unisecure", "Unitrace","UniSecure-Lite","Insight","UniSeries"],
  CDS: ["Mentor", "Partable"],
  IOT: ["Platform", "Hydro","Civacon","Mosaic","VHSS","Genesis","MI","Rego","SCDP"],
  EcommerceQA: ["DFS","PSG","OKI","ESG","CPC","Improseal","OPW EMEA","OPW","VSG EMEA","TWG","Destaco","MAAG","SWEP","VSG NA","DFR","Caldera","OPW CES"],
};


const subSubTabsMap = {
  DFS: ["DFS-EMEA","DFS-US","DFS-Canada","DFS-Brazil","DFS-Order Tracking"],
  PSG: ["PSG"],
  OKI: ["OKI-Techon","OKI-Metcal"],
  ESG: ["ESG"],
  CPC: ["CPC"],
  Improseal: ["Improseal-US","Improseal-UK"],
  'OPW EMEA': ["Fibrelite","Sweden","OES","Midland"],
  OPW: ["Civacon","RF","PDQ","VWS-PDQ","VWS-Belanger"],
  'VSG EMEA': ["VSG-EMEA"],
  TWG:["TWG"],
  Destaco: ["Destaco B2B"],
  MAAG: ["MAAG"],
  SWEP: ["SWEP"],
  'VSG NA':["VSGNA"],
  DFR: ["DFR"],
  Caldera: ["Caldera"],
  'OPW CES': ["OPW CES","TBD"],
};
 // import Table from './Table';
 const App = () => {
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
 
 
  const [selectedTab, setSelectedTab] = useState(null);
  const [selectedSubTab, setSelectedSubTab] = useState(null);
  const [selectedSubSubTab, setSelectedSubSubTab] = useState(null);
  // Map the selected tab to its corresponding component
  const getTabComponent = (tab,subtab) => {
    switch (tab) {
      case ('Systech'):
        return <Insight category={selectedTab} subcategory={selectedSubTab}  />
      case 'CDS':
        return <Insight category={selectedTab} subcategory={selectedSubTab}  />
      case 'tab5':
        return <UploadsArchives />;
      default:
      
    }
  };
 
 
  return (
      <div className="all-body-div">
 
 
      <div className="body-div">
      <HeaderComponent/>
      <Header tabData={subTabsMap}/>
      
      <div className="background-image-div" style={{backgroundImage: selectedTab === null ? homepageImage:'none'}}>
      {/* Render the component based on the selected tab */}
      {/* {getTabComponent(selectedTab)} */}
      </div>
      </div>
      <FooterComponent/>
     
     </div>
     
   
  );
};
 
export default App;
 
 