export const AGENCY_OPENING_DURATION_MS = 7_000;
export const AGENCY_OPENING_SESSION_KEY = "canal360-opening-seen";
export const AGENCY_WHATSAPP_URL = "https://wa.me/5562981321845";

export function scheduleOpeningEnd(onEnd: () => void) {
  const timer = window.setTimeout(onEnd, AGENCY_OPENING_DURATION_MS);
  return () => window.clearTimeout(timer);
}