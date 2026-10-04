import './App.css'
import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import Header from '../sections/header.jsx'
import Products from '../sections/products.jsx'
import { products } from '../data/products.js'
import Footer from '../sections/footer.jsx'
import ProductOverview from '../pages/product_overview.jsx'
import ReactGA from 'react-ga4'
import usePageMetadata from './usePageMetadata.js'

ReactGA.initialize("G-2JTJY4X8CZ");
ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });

function ProductRoute({ onBack, onAddToCart, onCustomOrder, theme, onToggleTheme }) {
  const { productId } = useParams()
  const product = products.find((item) => item.id === productId)

  if (!product) return <Navigate to="/" replace />

  return (
    <ProductOverview
      product={product}
      onBack={onBack}
      onAddToCart={onAddToCart}
      onCustomOrder={onCustomOrder}
      theme={theme}
      onToggleTheme={onToggleTheme}
    />
  )
}

function App() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const currentProduct = products.find(
    (product) => pathname === `/producto/${encodeURIComponent(product.id)}`,
  )
  const [cartItems, setCartItems] = useState([])
  const [theme, setTheme] = useState(() =>
    window.localStorage.getItem('aurea-theme') === 'dark' ? 'dark' : 'light',
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('aurea-theme', theme)
  }, [theme])

  usePageMetadata(currentProduct)

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
    ReactGA.event('click_on_product', {
      category: 'Productos',
      label: product.name,
    })

    navigate(`/producto/${encodeURIComponent(product.id)}`)
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
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
        }
      />
      <Route
        path="/producto/:productId"
        element={
          <ProductRoute
            onBack={() => navigate('/')}
            onAddToCart={addToCart}
            onCustomOrder={requestCustomOrder}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
