import React, {useState} from 'react';
import { connect } from 'react-redux';

import {
  clearItem
} from '../../../redux/invoice/invoice.actions';

import {
  InvoiceItemContainer,
  TextContainer,
  RemoveButtonContainer,
  UpdateButtonContainer
} from './invoice-item.styles';

import InvoiceNewUpdatePage from '../new-update/invoice-new-update'
import { Modal, useModal } from '../../../components/modal'

const InvoiceItem = ({ invoiceItem, onChange, clearItem }) => {

  const { checked, otkuda, kuda, poluchatel, status } = invoiceItem;
  const [stateChecked] = useState(checked)
  const {isShowing, toggle} = useModal();

  return (
    <InvoiceItemContainer>

      <Modal
        isShowing={isShowing}
        hide={toggle}
      >
        <InvoiceNewUpdatePage id={invoiceItem.id} hide={toggle}/>
      </Modal>

      <TextContainer><input type='checkbox' onChange={()=>{onChange(invoiceItem.id)}} checked={checked ? checked : stateChecked}/></TextContainer>
      <TextContainer>{otkuda}</TextContainer>
      <TextContainer>{kuda}</TextContainer>
      <TextContainer>{poluchatel}</TextContainer>
      <TextContainer>{status}</TextContainer>
      <TextContainer>
        <RemoveButtonContainer onClick={() => clearItem(invoiceItem)}>
          ✂
        </RemoveButtonContainer>
        <UpdateButtonContainer onClick={toggle}>
          ✎
        </UpdateButtonContainer>
      </TextContainer>      
    </InvoiceItemContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItem(item))
});

export default connect(
  null,
  mapDispatchToProps
)(InvoiceItem);
