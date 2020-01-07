import React from 'react';

const ModalTitle = ({ title }: { title: string }) => (
  <h1
    style={{
      fontSize: '14px',
      fontWeight: 700,
      margin: 0,
    }}
  >
    {title}
  </h1>
);

export default ModalTitle;
