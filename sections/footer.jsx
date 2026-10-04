import { createWhatsAppLink } from '../utils/whatsapp.js';

export default function Footer({ onCustomOrder }) {
  const orderLink = createWhatsAppLink(
    'Hola, me interesa una pieza personalizada de Aurea Labs. ¿Podrían darme más información?',
  );

  return (
    <footer
      id="contacto"
      className="bg-[#fcfbf9] px-6 text-[#1a1a1a]"
      aria-labelledby="footer-title"
    >
      <div className="mx-auto max-w-7xl border-t border-[#e5e2dc] py-16 md:py-20">
        <div className="grid gap-12 text-center md:grid-cols-3 md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#78716c]">
              Aurea Labs
            </p>
            <h2
              id="footer-title"
              className="mt-3 text-xl font-light uppercase tracking-wide"
            >
              Diseñado para tu espacio
            </h2>
            <p className="mt-3 text-sm text-[#78716c]">
              Formas <span className="px-1">•</span> Materiales{' '}
              <span className="px-1">•</span> Texturas
            </p>
          </div>

          <div className="border-y border-[#e5e2dc] py-8 md:border-y-0 md:border-x md:py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#78716c]">
              Fabricado bajo pedido
            </p>
            <p className="mt-3 text-sm font-medium">Diseñado en México</p>
            <p className="mt-1 text-sm text-[#78716c]">
              Fabricado mediante manufactura aditiva
            </p>
          </div>

          <div>
            <a
              href={orderLink}
              target="_blank"
              rel="noreferrer"
              onClick={() => onCustomOrder?.()}
              className="inline-flex items-center justify-center border border-[#111110] bg-[#111110] px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#111110] focus:outline-none focus:ring-2 focus:ring-[#78716c] focus:ring-offset-2"
            >
              Quiero una pieza personalizada
              <span className="ml-3" aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="mt-16 border-t border-[#e5e2dc] pt-6 text-center text-[10px] uppercase tracking-widest text-[#a8a29e]">
          © {new Date().getFullYear()} Aurea Labs
        </div>
      </div>
    </footer>
  );
}