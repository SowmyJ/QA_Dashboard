// HeaderTab.js
import React from 'react';
import Tab from '@material-ui/core/Tab';

const HeaderTab = ({ value, label, selectedTab, handleChange }) => {
  return (
    <Tab
      value={value}
      label={label}
      onClick={() => handleChange(value)}
      style={{ fontWeight: selectedTab === value ? 'bold' : 'normal' }}
    />
  );
};

export default HeaderTab;