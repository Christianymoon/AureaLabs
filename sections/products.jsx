import ProductCarousel from '../components/ProductCarousel.jsx';

const products = [
  {
    id: 'colgador',
    name: 'Colgador con bloqueo automatico, Gancho de pared para toallas.',
    category: 'Hogar y decoración',
    price: 50,
    images: [
      {
        src: 'https://makerworld.bblmw.com/makerworld/model/USc05b7824e37a44/design/2025-11-27_ea4e1ac2bd5808.jpg?x-oss-process=image%2Fformat%2Cwebp',
        alt: 'Colgador con bloqueo automático, Gancho de pared para toallas',
      },
      {
        src: 'https://makerworld.bblmw.com/makerworld/model/USc05b7824e37a44/design/2025-11-27_c6720654e7daf.jpg?x-oss-process=image/resize,w_1000/format,webp',
        alt: 'Detalle de un colgador con bloqueo automático, Gancho de pared para toallas',
      },
      {
        src: 'https://makerworld.bblmw.com/makerworld/model/USc05b7824e37a44/design/2025-11-27_9291ba4cdd1b48.jpg?x-oss-process=image/resize,w_1000/format,webp',
        alt: 'Detalle de un colgador con bloqueo automático, Gancho de pared para toallas',
      },
    ],
    alt: 'Colgador con bloqueo automático, Gancho de pared para toallas',
    description: 'Un colgador con bloqueo automático, ideal para usar en baños o áreas húmedas. Su diseño funcional y estético lo convierte en una excelente opción para organizar y almacenar toallas.',
    material: 'Acido Polilactico',
    dimensions: '3.3 × 2.8 × 6.6 cm',
    finishes: ['Arcilla', 'Negro', 'Blanco'],
  },
  {
    id: 'jarron-origen',
    name: 'Jarrón Japandi Shizu',
    category: 'Hogar y decoración',
    price: 250,
    images: [
      {
        src: 'https://makerworld.bblmw.com/makerworld/model/US5c25d8e674ed1f/design/2025-08-03_22ec4b76775e48.png?x-oss-process=image/resize,w_1000/format,webp',
        alt: 'Jarrón japandi Shizu de diseño minimalista',
      },
      {
        src: 'https://makerworld.bblmw.com/makerworld/model/US5c25d8e674ed1f/design/2025-08-03_9b745d1977221.png?x-oss-process=image/resize,w_1000/format,webp',
        alt: 'Jarrón decorativo visto en un interior sereno',
      },
      {
        src: 'https://makerworld.bblmw.com/makerworld/model/US5c25d8e674ed1f/design/2025-08-03_7d8398c3811ee8.jpg?x-oss-process=image/resize,w_1000/format,webp',
        alt: 'Jarrón decorativo visto en un interior sereno',
      },
    ],
    alt: 'Jarrón de diseño minimalista para decoración del hogar',
    description:
      'Un objeto escultórico de formas orgánicas y carácter atemporal. Su silueta destaca con flores o como pieza independiente.',
    material: 'Acido Polilactico',
    dimensions: '10.5 × 10.5 × 17.7 cm',
    finishes: ['Caramel', 'Negro', 'Blanco'],
  },
  {
    id: 'lampara-bola',
    name: 'Lámpara de bola',
    category: 'Iluminación',
    price: 180,
    images: [
      {
        src: 'https://makerworld.bblmw.com/makerworld/model/USc86a687dc75b62/design/2095604291bb734d.png?x-oss-process=image/resize,w_1000/format,webp',
        alt: 'Objeto decorativo de cerámica sobre una mesa',
      },
      {
        src: 'https://makerworld.bblmw.com/makerworld/model/USc86a687dc75b62/design/ab4c502c128323d8.png?x-oss-process=image/resize,w_1000/format,webp',
        alt: 'Pieza decorativa de formas orgánicas',
      },
      {
        src: 'https://makerworld.bblmw.com/makerworld/model/USc86a687dc75b62/design/57cdcdd986b5eb5c.png?x-oss-process=image/resize,w_1000/format,webp',
        alt: 'Pieza decorativa de formas orgánicas',
      },
      {
        src: 'https://makerworld.bblmw.com/makerworld/model/USc86a687dc75b62/design/14d40f5334caf6ff.jpeg?x-oss-process=image/resize,w_1000/format,webp',
        alt: 'Pieza decorativa de formas orgánicas',
      },
    ],
    alt: 'Objeto decorativo de cerámica sobre una mesa',
    description:
      'Una lámpara de diseño minimalista que combina funcionalidad y estética. Su forma esférica y acabado mate la convierten en un elemento decorativo versátil para cualquier espacio interior.',
    material: 'Acido Polilactico',
    dimensions: '17.3 × 17.3 × 14.9 cm',
  },
  {
    id: 'reno-decoracion',
    name: 'Reno de Decoración',
    category: 'Hogar y decoración',
    price: 100,
    images: [
      {
        src: 'https://makerworld.bblmw.com/makerworld/model/USbb62ad6d2258eb/design/a4297b97b30388c8.jpeg?x-oss-process=image/resize,w_1000/format,webp',
        alt: 'Reno de Decoración',
      },
      {
        src: 'https://makerworld.bblmw.com/makerworld/model/USbb62ad6d2258eb/design/1361950a8b5732ff.jpeg?x-oss-process=image/resize,w_1000/format,webp',
        alt: 'Detalle de un reno de decoración',
      },
      {
        src: 'https://makerworld.bblmw.com/makerworld/model/USbb62ad6d2258eb/design/beccaea815356dd0.png?x-oss-process=image/resize,w_1000/format,webp',
        alt: 'Detalle de un reno de decoración',
      },
    ],
    alt: 'Reno de Decoración',
    description: 'Reno decorativo de invierno, adorno versatil para interiores. Ideal para mesas, repisas y rincones del hogar.',
    material: 'Acido Polilactico',
    dimensions: '8.5 × 10 × 18 cm',
    finishes: ['Arcilla', 'Blanco'],
  },
  {
    id: 'Soporte para gafas de sol y lentes de lectura',
    name: 'Soporte para gafas de sol y lentes de lectura',
    category: 'Hogar y decoración',
    // price: 100,
    images: [
      {
        src: 'https://makerworld.bblmw.com/makerworld/model/US51600a5e583c65/design/fb1c73db77c45dd0.jpg?x-oss-process=image/resize,w_1000/format,webp',
        alt: 'Soporte para gafas de sol y lentes de lectura',
      },
      {
        src: 'https://makerworld.bblmw.com/makerworld/model/US51600a5e583c65/design/9244dc07588f7844.jpg?x-oss-process=image/resize,w_1000/format,webp',
        alt: 'Detalle de un soporte para gafas de sol y lentes de lectura',
      },
      {
        src: 'https://makerworld.bblmw.com/makerworld/model/US51600a5e583c65/design/a8a68ac7fe456a12.png?x-oss-process=image/resize,w_1000/format,webp',
        alt: 'Detalle de un soporte para gafas de sol y lentes de lectura',
      },
    ],
    alt: 'Soporte para gafas de sol y lentes de lectura',
    description: 'Soporte para gafas de sol y lentes de lectura.',
    material: 'Acido Polilactico',
    dimensions: '20 × 1 × 18.2 cm',
    finishes: ['Negro', 'Blanco', 'Madera'],
  },
  {
    id: 'organizador-de-joyeria',
    name: 'Organizador de Joyería',
    category: 'Hogar y decoración',
    // price: 100,
    images: [
      {
        src: 'https://makerworld.bblmw.com/makerworld/model/USb0c490f3b93ecd/design/2025-12-02_997eb790a0368.jpg?x-oss-process=image/resize,w_1000/format,webp',
        alt: 'Organizador de Joyería',
      },
      {
        src: 'https://makerworld.bblmw.com/makerworld/model/USb0c490f3b93ecd/design/2025-12-02_3f1c4b05c800b8.jpg?x-oss-process=image/resize,w_1000/format,webp',
        alt: 'Detalle de un organizar de joyería',
      },
      {
        src: 'https://makerworld.bblmw.com/makerworld/model/USb0c490f3b93ecd/design/2025-12-02_176be553082f08.jpg?x-oss-process=image/resize,w_1000/format,webp',
        alt: 'Detalle de un organizar de joyería',
      },
    ],
    alt: 'Organizador de Joyería',
    description: 'Organizador de joyería de diseño minimalista, perfecto para mantener tus accesorios ordenados y protegidos.',
    material: 'Acido Polilactico',
    dimensions: '20 × 1 × 18.2 cm',
  },
  {
    id: 'organizador-de-corse',
    name: 'Organizador de Maquillaje de Corsé Gótico Soporte para Brochas',
    category: 'Hogar y decoración',
    // price: 100,
    images: [
      {
        src: 'https://makerworld.bblmw.com/makerworld/model/US19801637f2fc39/design/1bebe07d4aa98b10.png?x-oss-process=image/resize,w_1000/format,webp',
        alt: 'Organizador de Maquillaje de Corsé Gótico Soporte para Brochas',
      },
      {
        src: 'https://makerworld.bblmw.com/makerworld/model/US19801637f2fc39/design/1bebe07d4aa98b10.png?x-oss-process=image/resize,w_1000/format,webp',
        alt: 'Detalle de un organizador de maquillaje de corsé gótico',
      },
      {
        src: 'https://makerworld.bblmw.com/makerworld/model/US19801637f2fc39/design/6ba0be952bd069d4.png?x-oss-process=image/resize,w_1000/format,webp',
        alt: 'Detalle de un organizador de maquillaje de corsé gótico',
      },
    ],
    alt: 'Organizador de Maquillaje de Corsé Gótico Soporte para Brochas',
    description: 'Organizador de maquillaje de corsé gótico, soporte para brochas.',
    material: 'Acido Polilactico',
    dimensions: '20 × 1 × 18.2 cm',
  },
  
];

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
  );
}