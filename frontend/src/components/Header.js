import React,{useEffect} from 'react';
  import Navbar from 'react-bootstrap/Navbar';
  import Nav from 'react-bootstrap/Nav';
 
const Header = ({ selectedTab, selectedSubTab, selectedSubSubTab, handleChange }) => {
  useEffect(() => {
    if (selectedTab) {
      const subtabs = document.getElementById(`subtabs${selectedTab}`);
      if (subtabs) {
        subtabs.style.display = 'block';
      }
    }
     if (selectedSubTab) {
      const subsubtabs = document.getElementById(`subsubtabs${selectedSubTab}`);
      if (subsubtabs) {
        subsubtabs.style.display = 'block';
      }
    }
  }, [selectedTab, selectedSubTab]);
 
 
  const subTabsMap = {
    tab1: ["Unisecure", "Unitrace","UniSecure-Lite","Insight","UniSeries"],
    tab2: ["Mentor", "Partable"],
    tab3: ["Platform", "Hydro","Civacon","Mosaic","VHSS","Genesis","MI","Rego","SCDP"],
    tab4: ["DFS","PSG","OKI","ESG","CPC","Improseal","OPW EMEA","OPW","VSG EMEA","TWG","Destaco","MAAG","SWEP","VSG NA","DFR","Caldera","OPW CES"],
  };
 
 
  const subSubTabsMap = {
    subtab1: ["DFS-EMEA","DFS-US","DFS-Canada","DFS-Brazil","DFS-Order Tracking"],
    subtab2: ["PSG"],
    subtab3: ["OKI-Techon","OKI-Metcal"],
    subtab4: ["ESG"],
    subtab5: ["CPC"],
    subtab6: ["Improseal-US","Improseal-UK"],
    subtab7: ["Fibrelite","Sweden","OES","Midland"],
    subtab8: ["Civacon","RF","PDQ","VWS-PDQ","VWS-Belanger"],
    subtab9: ["VSG-EMEA"],
    subtab10:["TWG"],
    subtab11: ["Destaco B2B"],
    subtab12: ["MAAG"],
    subtab13: ["SWEP"],
    subtab14:["VSGNA"],
    subtab15: ["DFR"],
    subtab16: ["Caldera"],
    subtab17: ["OPW CES","TBD"],
  };
 
 
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="tabs" activeKey={selectedTab} onSelect={handleChange}>
          <Nav.Link eventKey="tab1">Systech</Nav.Link>
          <Nav.Link eventKey="tab2">CDS</Nav.Link>
          <Nav.Link eventKey="tab3">IOT</Nav.Link>
          <Nav.Link eventKey="tab4">EcommerceQA</Nav.Link>
          <Nav.Link eventKey="tab5">Uploads & Archives</Nav.Link>
        </Nav>
        <div className="subtabMain">
        {selectedTab && selectedTab !== "tab5" && (
          <Nav className="subtabs" activeKey={selectedSubTab} onSelect={handleChange}>
            {subTabsMap[selectedTab].map((subTab, index) => (
              <Nav.Link key={index} eventKey={`subtab${index + 1}`}>
                {subTab}
              </Nav.Link>
            ))}
          </Nav>
        )}
        {selectedSubTab && selectedTab === "tab4" && (
          <Nav className="subsubtabs" activeKey={selectedSubSubTab} onSelect={handleChange}>
            {subSubTabsMap[selectedSubTab].map((subSubTab, index) => (
              <Nav.Link key={index} eventKey={`subsubtab${index + 1}`}>
                {subSubTab}
              </Nav.Link>
            ))}
          </Nav>
        )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
 };
 
 
 export default Header;
 
 
 
 
 
    /*<Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav activeKey={selectedTab} onSelect={handleChange}>
          <Nav.Link eventKey="tab1">Systech</Nav.Link>
          <Nav.Link eventKey="tab2">Ecommerce</Nav.Link>
          <Nav.Link eventKey="tab3">platform1</Nav.Link>
          <Nav.Link eventKey="tab4">platform2</Nav.Link>
          <Nav.Link eventKey="tab5">platform3</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>*/
       
       
       
       /*<Navbar bg="light" expand="lg">
       <Navbar.Toggle aria-controls="basic-navbar-nav" />
       <Navbar.Collapse id="basic-navbar-nav">
         <Nav activeKey={selectedTab} onSelect={handleChange}>
           <NavDropdown title="Dropdown" id="nav-dropdown">
           <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
           <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
            <NavDropdown.Divider />
           <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
            </NavDropdown>
           <Nav.Link eventKey="tab1">Systech</Nav.Link>
           <Nav.Link eventKey="tab2">Ecommerce</Nav.Link>
           <Nav.Link eventKey="tab3">platform1</Nav.Link>
           <Nav.Link eventKey="tab4">platform2</Nav.Link>
           <Nav.Link eventKey="tab5">platform3</Nav.Link>
           <Dropdown>
      <Dropdown.Toggle>Click to see more…</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>Hello there!</Dropdown.Item>
        <Dropdown.Item>Hello e!</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
         </Nav>
       </Navbar.Collapse>
     </Navbar>*/
/*<Navbar bg="light" expand="lg">
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav activeKey={selectedTab} onSelect={handleChange}>
      <Nav.Link eventKey="tab1">
        Systech
        {selectedTab === "tab1" && (
          <div className="subtabs1">
            <Nav.Link eventKey="subtab1">Subtab 1</Nav.Link>
            <Nav.Link eventKey="subtab2">Subtab 2</Nav.Link>
          </div>
        )}
      </Nav.Link>
      <Nav.Link eventKey="tab2">
        IOT
        {selectedTab === "tab2" && (
          <div className="subtabs2">
            <Nav.Link eventKey="subtab1">Subtab 1</Nav.Link>
            <Nav.Link eventKey="subtab2">Subtab 2</Nav.Link>
          </div>
        )}
      </Nav.Link>
      <Nav.Link eventKey="tab3">
        Ecommerce
        {selectedTab === "tab3" && (
          <div className="subtabs3">
            <Nav.Link eventKey="subtab1">Subtab 1</Nav.Link>
            <Nav.Link eventKey="subtab2">Subtab 2</Nav.Link>
           
          </div>
        )}
        </Nav.Link>
          <Nav.Link eventKey="tab4">
            platform1
            {selectedTab === "tab4" && (
          <div className="subtabs4">
            <Nav.Link eventKey="subtab1">Subtab 1</Nav.Link>
            <Nav.Link eventKey="subtab2">Subtab 2</Nav.Link>
           
          </div>
        )}
        </Nav.Link>
          <Nav.Link eventKey="tab5">
            platform2
            {selectedTab === "tab5" && (
          <div className="subtabs5">
            <Nav.Link eventKey="subtab1">Subtab 1</Nav.Link>
            <Nav.Link eventKey="subtab2">Subtab 2</Nav.Link>
           
          </div>
        )}
        </Nav.Link>
          <Nav.Link eventKey="tab6">
            platform3
            {selectedTab === "tab6" && (
          <div className="subtabs6">
            <Nav.Link eventKey="subtab1">Subtab 1</Nav.Link>
            <Nav.Link eventKey="subtab2">Subtab 2</Nav.Link>
           
          </div>
        )}
        </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
 
new ones
<Nav.Link eventKey="tab4">platform1</Nav.Link>
            <Nav.Link eventKey="tab5">platform2</Nav.Link>
            <Nav.Link eventKey="tab6">platform3</Nav.Link>
               {selectedTab === "tab4" && (
            <Nav activeKey={selectedSubTab} onSelect={handleSubTabChange}>
              <Nav.Link eventKey="subtab1" className="subtab-nav-link">Subtab 1</Nav.Link>
              <Nav.Link eventKey="subtab2" className="subtab-nav-link">Subtab 2</Nav.Link>
              {/* Add more subtabs as needed }
              </Nav>
              )}
              {selectedTab === "tab5" && (
                <Nav activeKey={selectedSubTab} onSelect={handleSubTabChange}>
                  <Nav.Link eventKey="subtab1" className="subtab-nav-link">Subtab 1</Nav.Link>
                  <Nav.Link eventKey="subtab2" className="subtab-nav-link">Subtab 2</Nav.Link>
                  {/* Add more subtabs as needed }
                </Nav>
              )}
              {selectedTab === "tab6" && (
                <Nav activeKey={selectedSubTab} onSelect={handleSubTabChange}>
                  <Nav.Link eventKey="subtab1"className="subtab-nav-link">Subtab 1</Nav.Link>
                  <Nav.Link eventKey="subtab2" className="subtab-nav-link">Subtab 2</Nav.Link>
                  {/* Add more subtabs as needed }
                </Nav>
              )}
*/