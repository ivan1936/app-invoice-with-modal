import InvoiceActionTypes from './invoice.types';
import { updateItem, updateItems, deleteItems } from './invoice.utils';

const INITIAL_STATE = {
  invoices: [
    {
      "id": 30,
      "checked": false,
      "otkuda": "Москва",
      "kuda": "Харьков",
      "poluchatel": "Иванов И И",
      "status": "В пути"
    },
    {
      "id": 31,
      "checked": false,
      "otkuda": "Москва",
      "kuda": "Тверь",
      "poluchatel": "Петров И И",
      "status": "Принят на склад"
    },{
      "id": 32,
      "checked": false,
      "otkuda": "Иркутск",
      "kuda": "Харьков",
      "poluchatel": "Яснов ИА",
      "status": "Доставлено"
    },{
      "id": 33,
      "checked": false,
      "otkuda": "Омск",
      "kuda": "Москва",
      "poluchatel": "Сергеев С П",
      "status": "Возвращен"
    },{
      "id": 34,
      "checked": false,
      "otkuda": "Самара",
      "kuda": "Омск",
      "poluchatel": "Иванов И И",
      "status": "Ожидает отправки"
    }
  ] 
};

const invoiceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case InvoiceActionTypes.CLEAR_ITEM:
      return {
        ...state,
        invoices: state.invoices.filter(
          invoice => invoice.id !== action.payload.id
        )
      };
    case InvoiceActionTypes.SELECT_ITEM:
        return {
          ...state,
          invoices: updateItem(state.invoices, action.isSelect, action.itemId)
        };  
    case InvoiceActionTypes.SELECT_ALL:
      return {
        ...state,
        invoices: updateItems(state.invoices, action.isSelectAll)
      };
    case InvoiceActionTypes.DELETE_ALL_SELECT:
      return {
        ...state,
        invoices: deleteItems(state.invoices)
      };


      case InvoiceActionTypes.CREATE_ITEM:
        const newInvoice = ({
          id: action.payload.id,
          checked: action.payload.checked,
          otkuda: action.payload.otkuda,
          kuda: action.payload.kuda,
          poluchatel: action.payload.poluchatel,
          status: action.payload.status
        });
        return {
          ...state,
          invoices: state.invoices.concat(newInvoice)
        };


      case InvoiceActionTypes.UPDATE_ITEM:
        const itemIndex = state.invoices.findIndex(
          item => item.id === +action.payload.id          
        );
        const updatedItem = ({
          id: +action.payload.id,
          checked: action.payload.checked,
          otkuda: action.payload.otkuda,
          kuda: action.payload.kuda,
          poluchatel: action.payload.poluchatel,
          status: action.payload.status
        });
        const updatedItems = [...state.invoices]
        updatedItems[itemIndex] = updatedItem
        return {
          ...state,
          invoices: updatedItems
        };  
    default:
      return state;
  }
};

export default invoiceReducer;
