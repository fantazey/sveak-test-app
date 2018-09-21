import React from 'react';
import PropTypes from 'prop-types';

const BaseLayout = props =>
    <div className='container'>
        <div className='navigation'>
            {props.navigation}
        </div>
        <div className='content-block'>
            {props.content}
        </div>
    </div>
;

BaseLayout.propTypes = {
    navigation: PropTypes.oneOfType( [ PropTypes.func, PropTypes.element ] ).isRequired,
    content: PropTypes.oneOfType( [ PropTypes.func, PropTypes.element ] ).isRequired
};

export default BaseLayout;
