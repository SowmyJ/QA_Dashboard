import React, { useState } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
// import AnotherComponent from './AnotherComponent';
import Insight from './Insight';
import UploadsArchives from './UploadsArchives';

const Header = ({ tabData }) => {
  const [activeTab, setActiveTab] = useState(Object.keys(tabData)[0]);
  const [activeSubTab, setActiveSubTab] = useState(tabData[activeTab][0]);
  const [showAnotherComponent, setShowAnotherComponent] = useState(false);
  const [error, setError] = useState(null); // State to track errors

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setActiveSubTab(tabData[tabName][0]);
    setShowAnotherComponent(false);
    setError(null); // Reset error state when switching tabs
  };

  const handleSubTabClick = (subTabName) => {
    setActiveSubTab(subTabName);
  };

  return (
    <div>
      <Nav className="tabs navbar">
        {Object.keys(tabData).map(tabName => (
          <Nav.Item key={tabName}>
            <Nav.Link
              className={activeTab === tabName ? 'nav-link active' : 'nav-link'}
              onClick={() => handleTabClick(tabName)}
            >
              {tabName}
            </Nav.Link>
          </Nav.Item>
        ))}
        <Nav.Item>
          <Nav.Link onClick={() => setShowAnotherComponent(true)}>UploadsArchives</Nav.Link>
        </Nav.Item>
      </Nav>

      <Nav className="sub-tabs subnavbar">
        {!showAnotherComponent && tabData[activeTab].map(subTabName => (
          <Nav.Item key={subTabName}>
            <Nav.Link
              className={activeSubTab === subTabName ? 'subnav-link active' : 'subnav-link'}
              onClick={() => handleSubTabClick(subTabName)}
            >
              {subTabName}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      <div className="tab-content">
        {!showAnotherComponent && (
          <div className="sub-tabs-content active">
            {error ? (
              <p>Failed to fetch data. Please try again later.</p>
            ) : (
                <Insight a={[activeTab,activeSubTab]} />
            )}
          </div>
        )}
      </div>

      {showAnotherComponent && <UploadsArchives />}
    </div>
  );
}

export default Header;
