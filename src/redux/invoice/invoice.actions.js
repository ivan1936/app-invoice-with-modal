import InvoiceActionTypes from './invoice.types';

export const clearItem = item => ({
  type: InvoiceActionTypes.CLEAR_ITEM,
  payload: item
});

export const createInvoice = (id, checked, otkuda, kuda, poluchatel, status) => ({
  type: InvoiceActionTypes.CREATE_ITEM,
  payload: {
    id,
    checked,
    otkuda,
    kuda,
    poluchatel,
    status
  }
});

export const updateInvoice = (id, checked, otkuda, kuda, poluchatel, status) => ({
  type: InvoiceActionTypes.UPDATE_ITEM,
  payload: {
    id,
    checked,
    otkuda,
    kuda,
    poluchatel,
    status
  }
});


