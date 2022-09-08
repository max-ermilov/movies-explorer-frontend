import React from 'react';

import './SectionHeader.css';

function SectionHeader(props) {
  return (
    <h2 className="section-header">
      {props.children}
    </h2>
  );
}

export default SectionHeader;
