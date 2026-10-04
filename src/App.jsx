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
import { createEcommerceItem, createEcommerceParams } from './ecommerceAnalytics.js'

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
    ReactGA.event(
      'add_to_cart',
      createEcommerceParams([createEcommerceItem(product, quantity, finish)]),
    )

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

  function requestOrder() {
    ReactGA.event(
      'begin_checkout',
      createEcommerceParams(
        cartItems.map((item) => createEcommerceItem(item, item.quantity, item.finish)),
      ),
    )
  }

  function requestCustomOrder(product) {
    ReactGA.event('custom_order_request', {
      method: 'WhatsApp',
      ...(product
        ? createEcommerceParams([createEcommerceItem(product)])
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
    const removedItem = cartItems.find((item) => item.cartKey === cartKey)
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.cartKey !== cartKey),
    )

    if (removedItem) {
      ReactGA.event(
        'remove_from_cart',
        createEcommerceParams([
          createEcommerceItem(removedItem, removedItem.quantity, removedItem.finish),
        ]),
      )
    }
  }

  function openProduct(product) {
    ReactGA.event('select_item', {
      item_list_name: 'Colección 01',
      items: [createEcommerceItem(product)],
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
              requestOrder={requestOrder}
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
