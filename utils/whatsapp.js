const whatsappPhone = '523348985103'

export function createWhatsAppLink(message) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`
}