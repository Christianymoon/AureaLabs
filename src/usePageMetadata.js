import { useEffect } from 'react'
import { products } from '../data/products.js'

const defaultTitle = 'Objetos decorativos de diseño mexicano | Aurea Labs'
const defaultDescription =
  'Objetos decorativos de diseño contemporáneo, fabricados bajo pedido en México. Descubre la colección de Aurea Labs.'

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

export default function usePageMetadata(product) {
  useEffect(() => {
    const title = product ? `${product.name} | Aurea Labs` : defaultTitle
    const description = product?.description || defaultDescription
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`
    const image = product?.images?.[0]?.src || products[0].images[0].src
    const pageType = product ? 'product' : 'website'
    const structuredData = product
      ? {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description,
          image: product.images?.map((item) => item.src),
          category: product.category,
          brand: { '@type': 'Brand', name: 'Aurea Labs' },
          ...(product.price
            ? {
                offers: {
                  '@type': 'Offer',
                  price: product.price,
                  priceCurrency: 'MXN',
                  url: canonicalUrl,
                },
              }
            : {}),
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Aurea Labs',
          description: defaultDescription,
          url: canonicalUrl,
          inLanguage: 'es-MX',
        }

    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', pageType)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:image', image)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl

    let schema = document.getElementById('page-structured-data')
    if (!schema) {
      schema = document.createElement('script')
      schema.id = 'page-structured-data'
      schema.type = 'application/ld+json'
      document.head.appendChild(schema)
    }
    schema.textContent = JSON.stringify(structuredData)
  }, [product])
}