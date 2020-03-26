import { combineReducers } from 'redux';

import invoiceReducer from './invoice/invoice.reducer';

const rootReducer = combineReducers({
  invoices: invoiceReducer  
})

export default rootReducer