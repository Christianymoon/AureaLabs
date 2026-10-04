import './App.css'
import { useEffect, useState } from 'react'
import Header from '../sections/header.jsx'
import Products from '../sections/products.jsx'
import Footer from '../sections/footer.jsx'
import ProductOverview from '../pages/product_overview.jsx'
import ReactGA from 'react-ga4'

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [theme, setTheme] = useState(() =>
    window.localStorage.getItem('aurea-theme') === 'dark' ? 'dark' : 'light',
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('aurea-theme', theme)
  }, [theme])

  useEffect(() => {
    function handleHistoryChange(event) {
      setSelectedProduct(event.state?.view === 'product' ? event.state.product : null)
    }

    window.addEventListener('popstate', handleHistoryChange)
    return () => window.removeEventListener('popstate', handleHistoryChange)
  }, [])

  useEffect(() => {
    if (!selectedProduct) return

    ReactGA.event('select_item', {
      item_list_name: 'Colección 01',
      items: [
        {
          item_id: selectedProduct.id,
          item_name: selectedProduct.name,
          item_category: selectedProduct.category,
          ...(selectedProduct.price
            ? { price: selectedProduct.price, currency: 'MXN' }
            : {}),
        },
      ],
    })
  }, [selectedProduct])

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  function addToCart(product, quantity, finish) {
    const cartKey = `${product.id}:${finish}`
    const hasPrice = Number.isFinite(Number(product.price))

    ReactGA.event('add_to_cart', {
      ...(hasPrice ? { currency: 'MXN', value: Number(product.price) * quantity } : {}),
      items: [
        {
          item_id: product.id || product.name,
          item_name: product.name,
          item_category: product.category,
          item_variant: finish,
          quantity,
          ...(hasPrice ? { price: Number(product.price) } : {}),
        },
      ],
    })

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.cartKey === cartKey)

      if (existingItem) {
        return currentItems.map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }

      return [...currentItems, { ...product, cartKey, finish, quantity }]
    })
  }

  function beginCheckout() {
    const hasPrices = cartItems.every((item) => Number.isFinite(Number(item.price)))

    ReactGA.event('begin_checkout', {
      ...(hasPrices
        ? {
            currency: 'MXN',
            value: cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0),
          }
        : {}),
      items: cartItems.map((item) => ({
        item_id: item.id || item.name,
        item_name: item.name,
        item_category: item.category,
        item_variant: item.finish,
        quantity: item.quantity,
        ...(Number.isFinite(Number(item.price)) ? { price: Number(item.price) } : {}),
      })),
    })
  }

  function requestCustomOrder(product) {
    ReactGA.event('request_custom_order', {
      method: 'email',
      ...(product
        ? {
            items: [
              {
                item_id: product.id || product.name,
                item_name: product.name,
                item_category: product.category,
              },
            ],
          }
        : {}),
    })
  }

  function updateCartQuantity(cartKey, change) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  function removeFromCart(cartKey) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.cartKey !== cartKey),
    )
  }

  function openProduct(product) {
    window.history.pushState(
      { view: 'product', product },
      '',
      `#producto/${encodeURIComponent(product.id)}`,
    )
    setSelectedProduct(product)
  }

  if (selectedProduct) {
    return (
      <ProductOverview
        product={selectedProduct}
        onBack={() => window.history.back()}
        onAddToCart={addToCart}
        onCustomOrder={requestCustomOrder}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    )
  }

  return (
    <>
      <Header
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveFromCart={removeFromCart}
        onBeginCheckout={beginCheckout}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <Products onSelectProduct={openProduct} />
      <Footer onCustomOrder={requestCustomOrder} />
    </>
  )
}

export default App
