import { useState } from 'react';
import ProductCarousel from '../components/ProductCarousel.jsx';

const defaultProduct = {
  name: 'Jarrón Origen',
  category: 'Objeto escultórico',
  price: 2400,
  images: [
    {
      src: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=85',
      alt: 'Jarrón decorativo de líneas orgánicas',
    },
  ],
  alt: 'Jarrón decorativo de líneas orgánicas',
  description:
    'Una pieza decorativa de formas suaves y carácter atemporal. Su silueta aporta textura y calidez a mesas, repisas y rincones del hogar, con flores o como objeto escultórico por sí mismo.',
  material: 'Biopolímero mineral',
  dimensions: '18 × 18 × 24 cm',
  finishes: ['Arena', 'Terracota', 'Piedra'],
};

export default function ProductOverview({
  product = defaultProduct,
  onBack,
  onAddToCart,
  theme = 'light',
  onToggleTheme,
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedFinish, setSelectedFinish] = useState(product.finishes?.[0] || '');
  const [added, setAdded] = useState(false);

  function addToCart() {
    onAddToCart(product, quantity, selectedFinish);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  }

  return (
    <main className="min-h-screen bg-[#fcfbf9] px-6 py-12 text-[#1a1a1a] md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="text-xs uppercase tracking-[0.2em] text-[#78716c] transition-colors hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#78716c]"
            >
              ← Volver a la colección
            </button>
          ) : <span />}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
            title={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
            className="min-h-10 border border-[#d6d3cd] px-3 text-xs uppercase tracking-wider transition-colors hover:border-black"
          >
            {theme === 'light' ? 'Oscuro' : 'Claro'}
          </button>
        </div>

        <p className="mb-8 text-xs uppercase tracking-[0.2em] text-[#78716c]">
          Aurea Labs <span className="mx-2">/</span> Colección 01
        </p>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductCarousel
            images={product.images || [{ src: product.image, alt: product.alt }]}
            productName={product.name}
            badge={product.category}
            imageClassName="aspect-[4/5]"
          />

          <section className="flex flex-col justify-center py-2" aria-labelledby="product-title">
            <p className="text-xs uppercase tracking-[0.2em] text-[#78716c]">
              {product.category}
            </p>

            <h1
              id="product-title"
              className="mt-3 text-4xl font-light uppercase tracking-tight sm:text-5xl"
            >
              {product.name}
            </h1>

            <p className="mt-5 text-2xl font-light">
              ${Number(product.price).toLocaleString('es-MX')} MXN
            </p>

            <p className="mt-8 max-w-xl text-base leading-7 text-[#57534e]">
              {product.description || defaultProduct.description}
            </p>

            <div className="mt-8 border-t border-[#e5e2dc] pt-6">
              <p className="mb-3 text-xs uppercase tracking-widest">Acabado</p>
              <div className="flex flex-wrap gap-3">
                {(product.finishes || []).map((finish) => (
                  <button
                    key={finish}
                    type="button"
                    onClick={() => setSelectedFinish(finish)}
                    aria-pressed={selectedFinish === finish}
                    className={`border px-4 py-2 text-sm transition-colors ${
                      selectedFinish === finish
                        ? 'border-[#111110] bg-[#111110] text-white'
                        : 'border-[#d6d3cd] hover:border-[#111110]'
                    }`}
                  >
                    {finish}
                  </button>
                ))}
                {(!product.finishes || product.finishes.length === 0) && (
                  <p className="text-sm text-[#78716c]">Acabado único</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="product-quantity"
                className="mb-3 block text-xs uppercase tracking-widest"
              >
                Cantidad
              </label>
              <div className="inline-flex items-center border border-[#d6d3cd]">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  aria-label="Reducir cantidad"
                  className="px-4 py-2 hover:bg-[#f0ede6]"
                >
                  −
                </button>
                <span id="product-quantity" className="min-w-10 text-center text-sm" aria-live="polite">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  aria-label="Aumentar cantidad"
                  className="px-4 py-2 hover:bg-[#f0ede6]"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={addToCart}
              className="mt-8 cursor-pointer w-full bg-[#111110] px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#333] focus:outline-none focus:ring-2 focus:ring-[#78716c] focus:ring-offset-2 sm:w-auto"
            >
              {added ? 'Añadido al carrito ✓' : 'Añadir al carrito'}
            </button>

            <button
                type="button"
                onClick={() => window.location.href = 'mailto:?subject=Quiero%20una%20pieza%20de%20Aurea%20Labs&body=Hola,%20me%20interesa%20hacer%20un%20pedido.'}
                className="mt-2 cursor-pointer w-full bg-[#111110] px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#333] focus:outline-none focus:ring-2 focus:ring-[#78716c] focus:ring-offset-2 sm:w-auto"
            >
            Quiero una versión personalizada
            </button>

            <p className="mt-3 text-sm text-[#78716c]" aria-live="polite">
              {added ? 'La pieza se agregó a tu carrito.' : 'Fabricado bajo pedido en México.'}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-[#e5e2dc] pt-6 text-sm">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#78716c]">Material</p>
                <p className="mt-2">{product.material || defaultProduct.material}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[#78716c]">Medidas</p>
                <p className="mt-2">{product.dimensions || defaultProduct.dimensions}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[#78716c]">Origen</p>
                <p className="mt-2">Diseñado en México</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[#78716c]">Acabado elegido</p>
                <p className="mt-2">{selectedFinish}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}