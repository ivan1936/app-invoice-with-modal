import * as R from 'ramda'

  export const sortByColumn = column => R.sortBy(R.prop(column));
  export const sortByColumnDescend = column => R.compose(R.reverse, R.sortBy(R.prop(column)));
  
  export const updateItem = (items, isSelect, itemId) => (
    items.map(item =>
      item.id === itemId
        ? { ...item, checked: item.checked = !item.checked}
        : item
    )
  )
  
  export const updateItems = (items, isSelectAll) => (
    items.map(item => ( {...item, checked: item.checked = isSelectAll} ))
  )

  export const deleteItems = (items) => (
    items.filter(item => item.checked !== true)
  )