import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useDispatch } from 'react-redux'

import InvoiceItem from '../item/invoice-item';
import { sortByColumn, sortByColumnDescend } from '../../../redux/invoice/invoice.utils';
import CustomSpan from '../../../components/common/custom-span'
import CustomButton from '../../../components/common/custom-button/custom-button.component';
import InvoiceNewUpdatePage from '../new-update/invoice-new-update'

import {
  selectInvoiceItems
} from '../../../redux/invoice/invoice.selectors';

import {
  InvoicePageContainer,
  InvoiceHeaderContainer,
  HeaderBlockContainer,
  CustomButtonContainer
} from './invoice-list.styles';

import { Modal, useModal } from '../../../components/modal'

const InvoiceListPage = ({ invoices, history }) =>{
  const {isShowing, toggle} = useModal();

  const [isDesc, setIsDesc] = useState(false)
  const [isDescCol, setIsDescCol] = useState([
    {otkuda: false},
    {kuda: false},
    {poluchatel: false},
    {status: true}
  ])
    
  const [colName, setColName] = useState('status')

  const [isSelect, setIsSelect] = useState(true)
  const [isSelectAll, setIsSelectAll] = useState(true)
  
  const sortItems = sortByColumn(colName)(invoices)
  const sortItemsDesc = sortByColumnDescend(colName)(invoices)

  const dispatch = useDispatch()

  const setSort = useCallback(
    (col) => {
      setIsDesc(!isDesc)
      setIsDescCol({...isDescCol, [col]: !isDescCol[col]})
      //setIsDescCol({...item, checked: !item.checked})
      setColName(col)
    }, [isDesc, isDescCol]
  );
  
  const onSelect = useCallback(
    (itemId) => {
      setIsSelect(!isSelect)
      dispatch({type: 'SELECT_ITEM', isSelect: isSelect, itemId: itemId})
    },
    [isSelect, dispatch]
  )

  const onSelectAll = useCallback(
    () => {
      setIsSelectAll(!isSelectAll)
      dispatch({type: 'SELECT_ALL', isSelectAll: isSelectAll})
    },
    [isSelectAll, dispatch]
  )

  const onDeleteAllSelect = useCallback(
    () => {
      dispatch({type: 'DELETE_ALL_SELECT'})
    },
    [dispatch]
  )

  return (    
    <InvoicePageContainer>  
      
      <Modal
        isShowing={isShowing}
        hide={toggle}
      >
        <InvoiceNewUpdatePage hide={toggle}/>
      </Modal>

      <CustomButtonContainer>
        <CustomButton
          type='button'
          onClick={toggle}
        >
          Создать накладную
        </CustomButton> 
      </CustomButtonContainer>
          
      <InvoiceHeaderContainer>
        <HeaderBlockContainer>
          <input type='checkbox' onChange={()=>{onSelectAll()}} />        
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>откуда</span>
          <CustomSpan isDescCol={isDescCol.otkuda} onClick={()=>setSort('otkuda')}/>
        </HeaderBlockContainer><HeaderBlockContainer>
          <span>куда </span>
          <CustomSpan isDescCol={isDescCol.kuda} onClick={()=>setSort('kuda')}/>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>получатель </span>
          <CustomSpan isDescCol={isDescCol.poluchatel} onClick={()=>setSort('poluchatel')}/>        
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>статус</span>
          <CustomSpan isDescCol={isDescCol.status} onClick={()=>setSort('status')}/> 
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>действия</span>        
        </HeaderBlockContainer>
      </InvoiceHeaderContainer>
      {
        (isDesc ? sortItemsDesc : sortItems)
        .map(invoiceItem => (
          <InvoiceItem 
            key={invoiceItem.id} 
            invoiceItem={invoiceItem} 
            onChange={onSelect}
            history={history}
          />
        ))
      }
      <CustomButtonContainer>
        <CustomButton
          type='button'
          onClick={()=>{onDeleteAllSelect()}}
        >
          Применить
        </CustomButton> 
      </CustomButtonContainer>
       
    </InvoicePageContainer>
)}

const mapStateToProps = createStructuredSelector({
  invoices: selectInvoiceItems
});

export default connect(mapStateToProps)(InvoiceListPage);
