import { createSelector } from 'reselect';

const selectInvoices = state => state.invoices;

export const selectInvoiceItems = createSelector(
  [selectInvoices],
  invoices => invoices.invoices
);
