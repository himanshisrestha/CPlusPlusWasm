import PropTypes from 'prop-types';
import React from 'react';
import { RUIProvider as RUIProviderOriginal } from '@react-ui-org/react-ui';
import { RENDER_MODAL_PORTAL_ID } from '../../constants/ui';

const RUIProviderComponent = ({
  children,
}) => {
  const globalProps = {
    Modal: {
      portalId: RENDER_MODAL_PORTAL_ID,
      size: 'auto',
    },
  };

  return (
    <RUIProviderOriginal globalProps={globalProps}>
      {children}
    </RUIProviderOriginal>
  );
};

RUIProviderComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RUIProviderComponent;
