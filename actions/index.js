export const addProduct = (product) => {
  return {
    type: 'addProduct',
    payload: product
  }
}

export const deleteProduct = (product) => {
  return {
    type: 'deleteProduct',
    payload: product
  }
}

export const setProduct = (product) => {
  return {
    type: 'setProduct',
    payload: product
  }
}