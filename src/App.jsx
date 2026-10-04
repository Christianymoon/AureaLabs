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

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  function addToCart(product, quantity, finish) {
    const cartKey = `${product.id}:${finish}`
    ReactGA.event({
      category: 'Carrito',
      action: 'Añadir producto',
      label: product.name,
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
    ReactGA.event({
      category: 'Pedido',
      action: 'Hacer pedido',
      label: cartItems.map((item) => item.name).join(', '),
    })
  }

  function requestCustomOrder(product) {
    ReactGA.event({
      category: 'Pedido personalizado',
      action: 'Solicitar por correo',
      label: product?.name || 'General',
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
    ReactGA.event({
      category: 'Productos',
      action: 'Ver producto',
      label: product.name,
    })

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
