import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Button } from '@folio/stripes/components';
import { IfPermission } from '@folio/stripes/core';

import DataProvider from './providers/DataProvider';
import CreateRecordsWrapper from './CreateRecordsWrapper';

const CreateRecordsPlugin = ({
  buttonStyle,
  buttonVisible,
  open,
  onOpen,
  onClose,
  renderTrigger,
}) => {
  const [isModalOpen, toggleModal] = useState(false);

  const openModal = useCallback(() => {
    toggleModal(true);

    if (onOpen) {
      onOpen();
    }
  }, [onOpen]);

  const closeModal = useCallback((...args) => {
    toggleModal(false);

    if (onClose) {
      onClose(...args);
    }
  }, [onClose]);

  useEffect(() => toggleModal(open), [open]);

  const triggerProps = {
    'data-test-add-inventory-records': true,
    id: 'add-inventory-record-trigger-btn',
    onClick: openModal,
  };

  return (
    <IfPermission perm="ui-plugin-create-inventory-records.create">
      {
        !isModalOpen &&
          (buttonVisible || renderTrigger) && // if either are true, the plugin is responsible for rendering
          (renderTrigger ? renderTrigger(triggerProps) : (
            <Button
              buttonStyle={buttonStyle}
              marginBottom0
              {...triggerProps}
            >
              <FormattedMessage id="ui-plugin-create-inventory-records.fastAddLabel" />
            </Button>
          ))
      }
      {isModalOpen &&
        <DataProvider>
          <CreateRecordsWrapper onClose={closeModal} />
        </DataProvider>
      }
    </IfPermission>
  );
};

CreateRecordsPlugin.defaultProps = {
  buttonVisible: true,
  open: false,
};

CreateRecordsPlugin.propTypes = {
  buttonStyle: PropTypes.string,
  buttonVisible: PropTypes.bool,
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  renderTrigger: PropTypes.func,
};

export default CreateRecordsPlugin;
