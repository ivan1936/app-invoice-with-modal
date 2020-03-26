import React, { useCallback, useReducer } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useDispatch } from 'react-redux';

import * as itemsActions from '../../../redux/invoice/invoice.actions';
import Input from '../../../components/common/Input';
import CustomButton from '../../../components/common/custom-button/custom-button.component';

import {
    selectInvoiceItems
  } from '../../../redux/invoice/invoice.selectors';

import { 
  InvoiceNewUpdateContainer, 
  RemoveButtonContainer, 
  CustomButtonContainer 
} from './invoice-new-update.styles';
  

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const InvoiceNewUpdatePage = (props) => {

  const itemId = props.id 
  const editedItem = props.invoiceItems.filter(item => item.id === +itemId)[0]  
  const dispatch = useDispatch();
  
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      otkuda: editedItem ? editedItem.otkuda : '',
      kuda: editedItem ? editedItem.kuda : '',
      poluchatel: editedItem ? editedItem.poluchatel : '',
      status: editedItem ? editedItem.status : ''
    },
    inputValidities: {
      otkuda: editedItem ? true : false,
      kuda: editedItem ? true : false,
      poluchatel: editedItem ? true : false,
      status: editedItem ? true : false
    },
    formIsValid: editedItem ? true : false
  });

  const submitHandler = useCallback( () => {
    if (!formState.formIsValid) {
      alert('Ошибка заполнения формы!')
      return;
    }
    if (editedItem) {
      dispatch(
        itemsActions.updateInvoice(
          itemId,
          formState.inputValues.checked,
          formState.inputValues.otkuda,
          formState.inputValues.kuda,
          formState.inputValues.poluchatel,
          formState.inputValues.status
        )
      );
    } else {
      let itemId = new Date().getTime()
      dispatch(
        itemsActions.createInvoice(
          itemId,
          false,
          formState.inputValues.otkuda,
          formState.inputValues.kuda,
          formState.inputValues.poluchatel,
          formState.inputValues.status
        )
      );
    }
      props.hide()
    
  }, [dispatch, itemId, formState, editedItem, props]);
  
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  const inputStyles = {
    fontSize: '18px'
  }
  const colorLabel = {
    fontSize: '16px',
    color: 'forestgreen'
  }

  return (
    <InvoiceNewUpdateContainer>
      <Input style={inputStyles}
        id="otkuda"
        label="Откуда"
        colorLabel={colorLabel}
        errorText="Пожалуйста, введите пункт отправки!"
        onInputChange={inputChangeHandler}
        initialValue={editedItem ? editedItem.otkuda : ''}
        initiallyValid={!!editedItem}
        required
      />
      <Input style={inputStyles}
        id="kuda"
        label="Куда"
        colorLabel={colorLabel}
        errorText="Пожалуйста, введите пункт назначения!"
        onInputChange={inputChangeHandler}
        initialValue={editedItem ? editedItem.kuda : ''}
        initiallyValid={!!editedItem}
        required
      />
      <Input style={inputStyles}
        id="poluchatel"
        label="Получатель"
        colorLabel={colorLabel}
        errorText="Пожалуйста, введите получателя!"
        onInputChange={inputChangeHandler}
        initialValue={editedItem ? editedItem.poluchatel : ''}
        initiallyValid={!!editedItem}
        required
      />
      <Input style={inputStyles}
        id="status"
        label="Статус"
        colorLabel={colorLabel}
        errorText="Пожалуйста, введите статус!"
        onInputChange={inputChangeHandler}
        initialValue={editedItem ? editedItem.status : ''}
        initiallyValid={!!editedItem}
        required
      />       
      <CustomButtonContainer>
        <CustomButton
          type='button'
          onClick={()=>{submitHandler()}}
        >
          Сохранить
        </CustomButton>
      </CustomButtonContainer>           
    </InvoiceNewUpdateContainer>       
  );
};

const mapStateToProps = createStructuredSelector({
    invoiceItems: selectInvoiceItems
});

export default connect(mapStateToProps)(InvoiceNewUpdatePage);