import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

const CustomModal = forwardRef(
  (
    { isOpen, onClose, heading, children, size, modalFooterButtonActions },
    ref
  ) => {
    return (
      <>
        <Modal
          size={size ? size : 'md'}
          initialFocusRef={ref}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{heading}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>{children}</ModalBody>
            <ModalFooter>{modalFooterButtonActions}</ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
);

export default CustomModal;
