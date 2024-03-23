


import React, { useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import '../App.css';
import Dropdown from 'react-bootstrap/Dropdown';
import NavDropdown from 'react-bootstrap/NavDropdown';



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




const Header = ({ selectedTab, handleChange, selectedSubTab, handleSubTabChange }) => {
  useEffect(() => {
    if (selectedTab) {
      const subtabs = document.getElementById(`subtabs${selectedTab}`);
      if (subtabs) {
        subtabs.style.display = 'block';
      }
    }
  }, [selectedTab]);


  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="tabs">
          <Nav activeKey={selectedTab} onSelect={handleChange}>
            <Nav.Link eventKey="tab1" className="tab-nav-link">Systech</Nav.Link>
            <Nav.Link eventKey="tab2">IOT</Nav.Link>
            <Nav.Link eventKey="tab3">Ecommerce</Nav.Link>
            <Nav.Link eventKey="tab5">Uploads</Nav.Link>
          </Nav>
        </div>
        
        <div className="subtabs" id={`subtabs${selectedTab}`}>
          {selectedTab === "tab1" && (
            <Nav activeKey={selectedSubTab} onSelect={handleSubTabChange}>
              <Nav.Link eventKey="subtab1" className="subtab-nav-link">Insight</Nav.Link>
              <Nav.Link eventKey="subtab2" className="subtab-nav-link">Uniseries</Nav.Link>
              <Nav.Link eventKey="subtab3" className="subtab-nav-link">Unisecure</Nav.Link>
              <Nav.Link eventKey="subtab4" className="subtab-nav-link">SupplySense</Nav.Link>
              <Nav.Link eventKey="subtab5" className="subtab-nav-link">Uni360</Nav.Link>
              <Nav.Link eventKey="subtab6" className="subtab-nav-link">Rego</Nav.Link>
              {/* Add more subtabs as needed */}
            </Nav>
          )}
          {selectedTab === "tab2" && (
            <Nav activeKey={selectedSubTab} onSelect={handleSubTabChange}>
              <Nav.Link eventKey="subtab1" className="subtab-nav-link">Hydro</Nav.Link>
              <Nav.Link eventKey="subtab2" className="subtab-nav-link">Civacon</Nav.Link>
              <Nav.Link eventKey="subtab3" className="subtab-nav-link">Mosaic</Nav.Link>
              <Nav.Link eventKey="subtab4" className="subtab-nav-link">Genesis</Nav.Link>
              {/* Add more subtabs as needed */}
            </Nav>
          )}
          {selectedTab === "tab3" && (
            <Nav activeKey={selectedSubTab} onSelect={handleSubTabChange}>
                <Nav.Link eventKey="subtab1" className="subtab-nav-link">Subtab 1</Nav.Link>
              <Nav.Link eventKey="subtab2" className="subtab-nav-link">Subtab 2</Nav.Link>
              <Nav.Link eventKey="subtab1" className="subtab-nav-link">Subtab 3</Nav.Link>
              <Nav.Link eventKey="subtab2" className="subtab-nav-link">Subtab 4</Nav.Link>
              {/* Add more subtabs as needed */}
            </Nav>
          )}
       
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};


export default Header;



