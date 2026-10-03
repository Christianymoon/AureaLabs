import { useState } from 'react';

export default function Header({
  cartItems = [],
  onUpdateQuantity,
  onRemoveFromCart,
  theme = 'light',
  onToggleTheme,
}) {
  const [cartOpen, setCartOpen] = useState(false);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const orderBody = cartItems
    .map((item) => `${item.quantity} × ${item.name} (${item.finish}) — $${(item.price * item.quantity).toLocaleString('es-MX')} MXN`)
    .join('\n');
  const orderLink = `mailto:?subject=${encodeURIComponent('Pedido Aurea Labs')}&body=${encodeURIComponent(`Hola, quiero realizar este pedido:\n\n${orderBody}\n\nTotal: $${cartTotal.toLocaleString('es-MX')} MXN`)}`;

  return (
    <header className="w-full bg-[#fcfbf9] text-[#1a1a1a] min-h-screen flex flex-col justify-between">
      {/* Barra de navegación superior */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-[#e5e2dc]">
        <div className="flex items-center gap-2">
          {/* Logo temporal minimalista */}
          <span className="text-xl font-bold tracking-widest uppercase font-mono">
            Aurea<span className="text-[#7c7873] font-light">Labs</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-[#57534e]">
          <a href="#coleccion" className="hover:text-black transition-colors">Colección</a>
          {/* <a href="#estudio" className="hover:text-black transition-colors">Estudio</a> */}
          <a href="#contacto" className="hover:text-black transition-colors">Contacto</a>
        </div>

        <div className="relative flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
            title={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
            className="inline-flex min-h-10 items-center justify-center border border-[#d6d3cd] px-3 text-xs uppercase tracking-wider transition-colors hover:border-black"
          >
            {theme === 'light' ? 'Oscuro' : 'Claro'}
          </button>
          <a
            href="#contacto"
            className="hidden border border-black px-4 py-2 text-xs uppercase tracking-wider transition-all duration-300 hover:bg-black hover:text-white sm:inline-flex"
          >
            Contacto
          </a>
          <button
            type="button"
            onClick={() => setCartOpen((open) => !open)}
            aria-expanded={cartOpen}
            aria-controls="header-cart"
            className="inline-flex min-h-10 items-center gap-2 border border-[#d6d3cd] px-3 text-xs uppercase tracking-wider transition-colors hover:border-black"
          >
            <span aria-hidden="true">Carrito</span>
            <span className="inline-flex min-w-5 items-center justify-center bg-[#111110] px-1.5 py-1 text-[10px] text-white">
              {itemCount}
            </span>
          </button>

          {cartOpen && (
            <div
              id="header-cart"
              className="absolute right-0 top-full z-30 mt-3 w-[min(22rem,calc(100vw-2rem))] border border-[#e5e2dc] bg-[#fcfbf9] p-5 shadow-lg"
            >
              <div className="flex items-center justify-between border-b border-[#e5e2dc] pb-3">
                <h2 className="text-xs uppercase tracking-[0.2em]">Tu carrito</h2>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  aria-label="Cerrar carrito"
                  className="px-2 py-1 text-lg leading-none text-[#78716c] hover:text-black"
                >
                  ×
                </button>
              </div>

              {cartItems.length === 0 ? (
                <p className="py-6 text-sm text-[#78716c]">Aún no agregas piezas.</p>
              ) : (
                <>
                  <ul className="max-h-64 divide-y divide-[#e5e2dc] overflow-y-auto">
                    {cartItems.map((item) => (
                      <li key={item.cartKey} className="py-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">{item.name}</p>
                            <p className="mt-1 text-xs text-[#78716c]">Acabado: {item.finish}</p>
                            <p className="mt-1 text-xs text-[#57534e]">
                              ${(item.price * item.quantity).toLocaleString('es-MX')} MXN
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveFromCart(item.cartKey)}
                            className="text-xs text-[#78716c] underline underline-offset-4 hover:text-black"
                            aria-label={`Quitar ${item.name} del carrito`}
                          >
                            Quitar
                          </button>
                        </div>
                        <div className="mt-3 inline-flex items-center border border-[#d6d3cd]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.cartKey, -1)}
                            aria-label={`Reducir cantidad de ${item.name}`}
                            className="px-3 py-1.5 hover:bg-[#f0ede6]"
                          >
                            −
                          </button>
                          <span className="min-w-8 text-center text-xs" aria-live="polite">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.cartKey, 1)}
                            aria-label={`Aumentar cantidad de ${item.name}`}
                            className="px-3 py-1.5 hover:bg-[#f0ede6]"
                          >
                            +
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-between border-t border-[#e5e2dc] pt-4 text-sm">
                    <span className="uppercase tracking-wider">Total</span>
                    <span className="font-medium">${cartTotal.toLocaleString('es-MX')} MXN</span>
                  </div>
                  <a
                    href={orderLink}
                    className="mt-4 flex min-h-12 items-center justify-center bg-[#111110] px-5 py-3 text-center text-xs uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#333]"
                  >
                    Hacer pedido
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="w-full max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1">
        {/* Contenido textual */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#78716c] font-medium">
              Edición 01 / Interiorismo & Geometría
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] uppercase text-[#111110]">
              Objetos que cambian <br />
              <span className="font-serif italic font-normal">el espacio.</span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-[#57534e] font-light max-w-md leading-relaxed">
            Diseño contemporáneo fabricado en México.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="#coleccion"
              className="px-8 py-4 bg-[#111110] text-white text-xs uppercase tracking-widest hover:bg-[#333] transition-colors duration-300"
            >
              Ver Colección
            </a>
            {/* <a
              href="#proceso"
              className="px-8 py-4 border border-[#d6d3cd] text-xs uppercase tracking-widest text-[#111110] hover:border-black transition-colors duration-300"
            >
              Conoce el Estudio
            </a> */}
          </div>

          {/* Ficha técnica minimalista */}
          <div className="pt-8 border-t border-[#e5e2dc] grid grid-cols-2 gap-4 text-xs text-[#78716c]">
            <div>
              <p className="font-mono uppercase text-[10px] text-[#a8a29e]">Materialidad</p>
              <p className="font-medium text-[#292524] mt-1">Biopolímeros</p>
            </div>
            <div>
              <p className="font-mono uppercase text-[10px] text-[#a8a29e]">Origen</p>
              <p className="font-medium text-[#292524] mt-1">León Guanajuato</p>
            </div>
          </div>
        </div>

        {/* Fotografía / Render 3D del objeto */}
        <div className="lg:col-span-6 h-full flex items-center justify-center">
          <div className="relative w-full aspect-[4/5] max-h-[580px] bg-[#f0ede6] overflow-hidden rounded-sm group">
            <img
              src="https://makerworld.bblmw.com/makerworld/model/USbb62ad6d2258eb/design/beccaea815356dd0.png?x-oss-process=image/resize,w_1000/format,webp"
              alt="Objeto escultórico de diseño contemporáneo para el hogar"
              className="w-full h-full object-cover object-center grayscale contrast-105 hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end p-3 bg-white/80 backdrop-blur-sm text-[11px] text-[#44403c] uppercase font-mono">
              <span>Fig. 04 — Reno de Decoración</span>
              <span>Edición Limitada</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}