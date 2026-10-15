import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AgencyOpening } from "@/components/agency-identity";
import { AGENCY_WHATSAPP_URL } from "@/lib/agency-opening";

describe("Agency opening", () => {
  beforeEach(() => { sessionStorage.clear(); vi.useFakeTimers(); });
  afterEach(() => { cleanup(); vi.useRealTimers(); });
  it("keeps the opening until 6999ms and releases the page at 7000ms", () => {
    render(<AgencyOpening><a href="#main">Main page</a></AgencyOpening>);
    act(() => vi.advanceTimersByTime(6999));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByText("Main page").parentElement?.hasAttribute("inert")).toBe(false);
  });
  it("uses the exact agency WhatsApp contact during the opening", () => {
    render(<AgencyOpening>Page</AgencyOpening>);
    expect(AGENCY_WHATSAPP_URL).toBe("https://wa.me/5562981321845");
    expect(screen.getByRole("link")).toHaveAttribute("href", "https://wa.me/5562981321845");
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });
  it("does not repeat when mounted again in the same session", () => {
    const first = render(<AgencyOpening>Page</AgencyOpening>);
    act(() => vi.advanceTimersByTime(7000));
    first.unmount();
    render(<AgencyOpening>Page</AgencyOpening>);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("still releases the page when session storage is unavailable", () => {
    const unavailable = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("Unavailable"); });
    render(<AgencyOpening>Page</AgencyOpening>);
    act(() => vi.advanceTimersByTime(7000));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    unavailable.mockRestore();
  });
});