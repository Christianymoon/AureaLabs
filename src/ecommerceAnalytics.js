export function createEcommerceItem(product, quantity = 1, finish) {
  const item = {
    item_id: product.id || product.name,
    item_name: product.name,
    quantity,
  }

  if (product.category) item.item_category = product.category
  if (finish) item.item_variant = finish

  if (product.price !== undefined && product.price !== null && product.price !== '') {
    const price = Number(product.price)
    if (Number.isFinite(price)) item.price = price
  }

  return item
}

export function createEcommerceParams(items) {
  const params = { items }

  if (items.every((item) => Number.isFinite(item.price))) {
    params.currency = 'MXN'
    params.value = items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return params
}