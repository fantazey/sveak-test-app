import React from 'react';

const FailIndicator = props =>
    <div className='alert alert-danger mt-4'>{props.text || 'Error'}</div>;

export default FailIndicator;
