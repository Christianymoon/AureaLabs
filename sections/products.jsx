import ProductCarousel from '../components/ProductCarousel.jsx'
import { products } from '../data/products.js'

export default function Products({ onSelectProduct }) {
  return (
    <section
      id="coleccion"
      className="bg-[#fcfbf9] px-6 py-20 md:py-28 text-[#1a1a1a]"
      aria-labelledby="products-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-3 border-b border-[#e5e2dc] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#78716c]">
              Aurea Labs / Objetos para el hogar
            </p>
            <h2
              id="products-title"
              className="font-light uppercase tracking-tight text-3xl sm:text-4xl"
            >
              Colección 01
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#78716c]">
            Piezas de inspiración japandi para darle carácter y calidez a tus espacios.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <article key={product.id}>
              <ProductCarousel
                images={product.images}
                productName={product.name}
                badge={`Pieza 0${index + 1}`}
                imageClassName="aspect-[4/5]"
                onImageClick={() => onSelectProduct(product)}
              />
              <button
                type="button"
                onClick={() => onSelectProduct(product)}
                className="mt-5 flex w-full items-start justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#78716c] focus-visible:ring-offset-4"
                aria-label={`Ver detalles de ${product.name}`}
              >
                <span>
                  <span className="block text-base font-medium">{product.name}</span>
                  <span className="mt-1 block text-sm text-[#78716c]">{product.category}</span>
                </span>
                <span className="shrink-0 text-sm font-medium">
                  {product.price ? `$ ${product.price.toLocaleString('es-MX')} MXN` : ''}
                </span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}