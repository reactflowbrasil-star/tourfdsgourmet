import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/canal360-original.png.asset.json";
import { AGENCY_OPENING_SESSION_KEY, AGENCY_WHATSAPP_URL, scheduleOpeningEnd } from "@/lib/agency-opening";

function AgencyLogo({ className }: { className: string }) {
  const [failed, setFailed] = useState(false);
  return failed ? <span className="agency-logo-fallback">Canal360° Agência</span> : (
    <img src={logo.url} alt="Canal360° Agência" width={1774} height={887} className={className} onError={() => setFailed(true)} />
  );
}

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.85 11.85 0 0 0 12.06 0C5.48 0 .12 5.35.12 11.94c0 2.1.55 4.16 1.6 5.97L0 24l6.25-1.64a11.9 11.9 0 0 0 5.8 1.48h.01C18.65 23.84 24 18.49 24 11.9c0-3.18-1.23-6.18-3.48-8.42ZM12.06 21.83a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.71.97.99-3.62-.24-.37a9.88 9.88 0 0 1-1.51-5.28c0-5.48 4.46-9.94 9.95-9.94a9.88 9.88 0 0 1 7.03 2.91 9.88 9.88 0 0 1 2.91 7.03c0 5.49-4.46 9.89-10.03 9.89Zm5.45-7.41c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.77-1.65-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" /></svg>;
}

export function AgencyOpening({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(true);
  const contactRef = useRef<HTMLAnchorElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(AGENCY_OPENING_SESSION_KEY)) {
        setVisible(false);
        return;
      }
      sessionStorage.setItem(AGENCY_OPENING_SESSION_KEY, "1");
    } catch { /* Storage restrictions must not prevent the timed dismissal. */ }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    contactRef.current?.focus({ preventScroll: true });
    const cancel = scheduleOpeningEnd(() => {
      setVisible(false);
      document.body.style.overflow = previousOverflow;
      requestAnimationFrame(() => contentRef.current?.querySelector<HTMLElement>("a, button")?.focus({ preventScroll: true }));
    });
    return () => {
      cancel();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return <>
    <div ref={contentRef} inert={visible}>{children}</div>
    {visible && <div className="agency-opening" role="dialog" aria-modal="true" aria-label="Canal360° Agência — abertura">
      <div className="agency-opening-content">
        <div className="agency-opening-logo"><AgencyLogo className="agency-logo" /></div>
        <p className="agency-opening-label">AGÊNCIA OFICIAL</p>
        <Button asChild variant="ghost" size="icon" className="agency-whatsapp">
          <a ref={contactRef} href={AGENCY_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Falar com a Canal360° pelo WhatsApp (abre em nova aba)" title="WhatsApp Canal360°" onKeyDown={(event) => { if (event.key === "Tab") { event.preventDefault(); contactRef.current?.focus(); } }}><WhatsAppIcon /></a>
        </Button>
      </div>
    </div>}
  </>;
}

export function AgencySignature() {
  return <div className="agency-signature">
    <AgencyLogo className="agency-signature-logo" />
    <div className="agency-signature-credits">
      <p>© 2026 Canal360° Agência. Todos os direitos reservados.</p>
      <p>Desenvolvido por Canal360° Agência.</p>
    </div>
  </div>;
}