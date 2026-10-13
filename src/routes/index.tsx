import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  UtensilsCrossed,
  Beer,
  Music,
  Baby,
  Car,
  TrendingUp,
  Briefcase,
  Megaphone,
  Users,
  Phone,
  Mail,
  Globe,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Volume2,
  VolumeX,
  ArrowUp,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FDS Gourmet Festival | Evento gastronômico para cidades" },
      {
        name: "description",
        content:
          "FDS Gourmet Festival: evento gratuito para toda a família, com gastronomia, shows, espaço kids, bares, cerveja artesanal, exposição de carros e valorização do comércio local.",
      },
      { property: "og:title", content: "FDS Gourmet Festival | Evento gastronômico para cidades" },
      {
        property: "og:description",
        content:
          "FDS Gourmet Festival: evento gratuito para toda a família, com gastronomia, shows, espaço kids, bares, cerveja artesanal, exposição de carros e valorização do comércio local.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "FDS Gourmet Festival | Evento gastronômico para cidades" },
      {
        name: "twitter:description",
        content:
          "FDS Gourmet Festival: evento gratuito para toda a família, com gastronomia, shows, espaço kids, bares, cerveja artesanal, exposição de carros e valorização do comércio local.",
      },
    ],
  }),
  component: Index,
});

const WHATSAPP_URL =
  "https://wa.me/5562982195886?text=Ol%C3%A1!%20Quero%20levar%20o%20FDS%20Gourmet%20Festival%20para%20minha%20cidade.";
const PDF_URL = "/assets/FDS-GOURMET-apresentacao.pdf";
const VIDEO_URL = "https://growmoneydigital.com.br/conferflow/video.mp4";
const GALLERY_PAGES = Array.from({ length: 20 }, (_, i) => i + 1);
const pad = (n: number) => String(n).padStart(2, "0");

const NAV = [
  { label: "Projeto", href: "#projeto" },
  { label: "Atrativos", href: "#atrativos" },
  { label: "Para cidades", href: "#cidades" },
  { label: "Galeria", href: "#galeria" },
  { label: "Contato", href: "#contato" },
];

const STATS = [
  { value: "2015", label: "ano de criação do projeto" },
  { value: "500+", label: "eventos realizados" },
  { value: "100+", label: "cidades atendidas" },
  { value: "1M+", label: "público estimado" },
];

const ATRATIVOS = [
  {
    icon: UtensilsCrossed,
    num: "01",
    title: "Praça de alimentação",
    text: "Espaço gastronômico com empresas locais, fortalecendo restaurantes e empreendedores da cidade.",
  },
  {
    icon: Beer,
    num: "02",
    title: "Bar central",
    text: "Bebidas variadas e festival de cerveja artesanal para ampliar o mix de consumo do evento.",
  },
  {
    icon: Music,
    num: "03",
    title: "Shows e cultura",
    text: "Apresentações de artistas locais e bandas nacionais, conforme logística e disponibilidade.",
  },
  {
    icon: Baby,
    num: "04",
    title: "Espaço kids",
    text: "Área dedicada às crianças, tornando o festival uma opção de lazer para pais, filhos e famílias.",
  },
  {
    icon: Car,
    num: "05",
    title: "Exposição automotiva",
    text: "Carros antigos, super máquinas, motos e atrações visuais que aumentam o fluxo de visitantes.",
  },
];

const DIFERENCIAIS = [
  "Evento 100% gratuito para a população",
  "Treinamento e capacitação dos empresários",
  "Premiação para o melhor prato do festival",
  "Junção de gastronomia, shows, exposições e cultura",
];

const CONTRAPARTIDA = [
  {
    icon: TrendingUp,
    title: "Economia local",
    text: "Participação de comerciantes da própria cidade e aquecimento de negócios locais.",
  },
  {
    icon: Briefcase,
    title: "Empregos diretos e indiretos",
    text: "Movimentação de equipe, fornecedores, montagem, atendimento e prestação de serviços.",
  },
  {
    icon: Megaphone,
    title: "Divulgação ampla",
    text: "Presença em redes sociais, imprensa, rádio, TV e canais de comunicação parceiros.",
  },
  {
    icon: Users,
    title: "Atração familiar",
    text: "Evento de qualidade para uma população carente de opções de lazer abertas e acessíveis.",
  },
];

const EDICOES = [
  "Edição Araxá - MG",
  "Goiânia - Buriti Shopping",
  "Brasil Park Shopping",
  "Uberaba Shopping",
  "Centro Cultural Oscar Niemeyer",
];

function SectionHeading({
  kicker,
  title,
  text,
}: {
  kicker: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff6a00]">
        {kicker}
      </span>
      <h2 className="mt-3 font-serif text-3xl font-bold text-[#202326] md:text-4xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-relaxed text-[#666b70]">{text}</p> : null}
    </div>
  );
}

function Index() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleSound = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted) void v.play();
    setMuted(v.muted);
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const stepLightbox = useCallback((dir: number) => {
    setLightbox((cur) =>
      cur === null ? cur : (cur + dir + GALLERY_PAGES.length) % GALLERY_PAGES.length,
    );
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") stepLightbox(1);
      if (e.key === "ArrowLeft") stepLightbox(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox, stepLightbox]);

  return (
    <div className="min-h-screen bg-[#f8f4ec] font-sans text-[#202326]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#2023261f] bg-[#f8f4ec]/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-4">
          <a href="#top" className="flex items-center gap-2">
            <img src="/assets/mascote-fds-gourmet.png" alt="Mascote FDS Gourmet" className="h-10 w-10 object-contain" />
            <span className="font-serif text-lg font-bold leading-tight">
              FDS <span className="text-[#008b96]">Gourmet</span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[#666b70] transition-colors hover:text-[#008b96]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={PDF_URL}
            download
            className="hidden items-center gap-2 rounded-full bg-[#ff6a00] px-4 py-2 text-sm font-semibold text-white shadow transition-colors hover:bg-[#d95500] md:inline-flex"
          >
            <Download className="h-4 w-4" />
            Apresentação de negócio
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        {/* decorative background */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-[#008b96]/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-[#ff6a00]/10 blur-3xl" />
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 select-none font-serif text-[22vw] font-bold leading-none tracking-tight text-[#008b96]/5">
            2027
          </span>
        </div>
        <div className="relative mx-auto grid max-w-[1180px] items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#ff6a00] to-[#d95500] px-5 py-2 text-sm font-extrabold uppercase tracking-[0.2em] text-white shadow-lg shadow-[#ff6a00]/30">
                <span className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                Tour Brasil 2027
              </span>
              <span className="inline-block rounded-full bg-[#dff4f5] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#008b96]">
                Apresentação de negócio
              </span>
            </div>
            <h1 className="mt-6 font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Leve o <span className="text-[#008b96]">FDS Gourmet Festival</span> para sua cidade{" "}
              <span className="relative inline-block whitespace-nowrap text-[#ff6a00]">
                em 2027
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M3 9C60 3 140 3 197 8"
                    stroke="#ff6a00"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>
              </span>
              .
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#666b70]">
              Um evento gratuito, familiar e estruturado para movimentar a economia local com
              gastronomia, entretenimento, comércio, cultura e experiências para toda a população.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#008b96] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#006f78]"
              >
                Quero levar para minha cidade
              </a>
              <a
                href={PDF_URL}
                download
                className="inline-flex items-center gap-2 rounded-full border border-[#2023261f] bg-white px-6 py-3 text-sm font-semibold text-[#202326] transition-colors hover:border-[#008b96] hover:text-[#008b96]"
              >
                <Download className="h-4 w-4" />
                Baixar apresentação
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="relative overflow-hidden rounded-[34px] shadow-[0_24px_70px_#0000001f]">
              <video
                ref={videoRef}
                src={VIDEO_URL}
                autoPlay
                loop
                muted
                playsInline
                className="aspect-video w-full object-cover"
              />
              <button
                onClick={toggleSound}
                className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-black/80"
              >
                {muted ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                {muted ? "Ativar som" : "Desativar som"}
              </button>
            </div>
            <img
              src="/assets/mascote-fds-gourmet-02.png"
              alt="Mascote do festival"
              className="absolute -bottom-8 -left-8 hidden w-28 rotate-[-8deg] drop-shadow-xl md:block"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#008b96] py-14 text-white">
        <div className="mx-auto max-w-[1180px] px-4">
          <p className="text-center font-serif text-2xl font-bold md:text-3xl">
            Vamos levar esse sabor para sua cidade?
          </p>
          <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-serif text-4xl font-bold md:text-5xl">{s.value}</div>
                <div className="mt-2 text-sm text-white/80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projeto */}
      <section id="projeto" className="py-20">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-4 md:grid-cols-2">
          <div>
            <SectionHeadingLeft
              kicker="Projeto FDS Gourmet"
              title="Um festival criado para unir gastronomia, comércio local e lazer familiar."
            />
            <p className="mt-6 leading-relaxed text-[#666b70]">
              O FDS Gourmet, também conhecido como Fim de Semana Gourmet, nasceu em 2015 e já
              percorreu estados como Goiás, Minas Gerais, Mato Grosso, Tocantins e Maranhão.
            </p>
            <p className="mt-4 leading-relaxed text-[#666b70]">
              A proposta é oferecer uma estrutura completa para restaurantes, comércio varejista,
              empreendedores e comunidade participarem de um evento de alto impacto local.
            </p>
          </div>
          <img
            src="/assets/pages/page-02.webp"
            alt="Apresentação do projeto FDS Gourmet"
            className="w-full rounded-[24px] shadow-[0_24px_70px_#0000001f]"
          />
        </div>
      </section>

      {/* Atrativos */}
      <section id="atrativos" className="bg-white py-20">
        <div className="mx-auto max-w-[1180px] px-4">
          <SectionHeading
            kicker="Atrativos do festival"
            title="5 experiências em um só evento."
            text="O formato reúne alimentação, bebidas, música, diversão infantil e exposição automotiva em uma estrutura pensada para toda a família."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ATRATIVOS.map((a) => (
              <div
                key={a.num}
                className="group rounded-[24px] border border-[#2023261f] bg-[#f8f4ec] p-8 transition-shadow hover:shadow-[0_24px_70px_#0000001f]"
              >
                <div className="flex items-center justify-between">
                  <a.icon className="h-8 w-8 text-[#008b96]" />
                  <span className="font-serif text-3xl font-bold text-[#ff6a00]/40">{a.num}</span>
                </div>
                <h3 className="mt-5 font-serif text-xl font-bold">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#666b70]">{a.text}</p>
              </div>
            ))}
            <div className="flex flex-col justify-center rounded-[24px] bg-[#008b96] p-8 text-white">
              <h3 className="font-serif text-2xl font-bold">Evento para todos</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/85">
                Festival para incluir toda a família, com áreas de alimentação, bares e espaço
                kids.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Evento para todos */}
      <section className="py-20">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-4 md:grid-cols-2">
          <img
            src="/assets/pages/page-04.webp"
            alt="Estrutura do festival para toda a família"
            className="w-full rounded-[24px] shadow-[0_24px_70px_#0000001f]"
          />
          <div>
            <SectionHeadingLeft
              kicker="Evento para todos"
              title="Festival para incluir toda a família."
            />
            <p className="mt-6 leading-relaxed text-[#666b70]">
              O modelo combina áreas de alimentação, bares e espaço kids, criando uma experiência
              completa para diferentes perfis de público.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Ambiente familiar e gratuito.",
                "Participação de empresas locais.",
                "Programação com entretenimento e atrações culturais.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#dff4f5]">
                    <Check className="h-4 w-4 text-[#008b96]" />
                  </span>
                  <span className="text-[#202326]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="bg-[#202326] py-20 text-white">
        <div className="mx-auto max-w-[1180px] px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff6a00]">
              Diferenciais
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
              Um evento pensado para gerar movimento real.
            </h2>
            <p className="mt-4 text-white/70">
              O FDS Gourmet Festival foi estruturado com pontos fortes que aumentam o impacto para
              a cidade, para os empresários participantes e para o público.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {DIFERENCIAIS.map((d) => (
              <div
                key={d}
                className="flex items-center gap-4 rounded-[16px] border border-white/10 bg-white/5 p-6"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff6a00]">
                  <Check className="h-5 w-5 text-white" />
                </span>
                <span className="font-medium">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contrapartida / Para cidades */}
      <section id="cidades" className="py-20">
        <div className="mx-auto max-w-[1180px] px-4">
          <SectionHeading
            kicker="Contrapartida para a cidade"
            title="Por que levar o evento para sua cidade?"
            text="Além da atração para toda a população, o festival ajuda a ativar a cadeia produtiva local, com impacto em alimentação, hotelaria, beleza, supermercados, vestuário, logística e serviços."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CONTRAPARTIDA.map((c) => (
              <div
                key={c.title}
                className="rounded-[24px] border border-[#2023261f] bg-white p-8 text-center transition-shadow hover:shadow-[0_24px_70px_#0000001f]"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#dff4f5]">
                  <c.icon className="h-7 w-7 text-[#008b96]" />
                </span>
                <h3 className="mt-5 font-serif text-lg font-bold">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#666b70]">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mídia */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-4 md:grid-cols-2">
          <div>
            <SectionHeadingLeft
              kicker="Mídia e reportagens"
              title="Presença em diferentes canais de divulgação."
            />
            <p className="mt-6 leading-relaxed text-[#666b70]">
              As edições do FDS Gourmet já tiveram parcerias e cobertura em TV, rádio, jornal,
              redes sociais e portais de notícias.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://www.instagram.com/fdsgourmetbrasil"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#dff4f5] px-4 py-2 text-sm font-semibold text-[#008b96] transition-colors hover:bg-[#008b96] hover:text-white"
              >
                @fdsgourmetbrasil
              </a>
              <a
                href="https://www.fdsgourmet.com.br"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#dff4f5] px-4 py-2 text-sm font-semibold text-[#008b96] transition-colors hover:bg-[#008b96] hover:text-white"
              >
                www.fdsgourmet.com.br
              </a>
            </div>
            <ul className="mt-8 space-y-2">
              {EDICOES.map((e) => (
                <li key={e} className="flex items-center gap-3 text-sm text-[#666b70]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff6a00]" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <img
            src="/assets/pages/page-05.webp"
            alt="Cobertura de mídia do FDS Gourmet"
            className="w-full rounded-[24px] shadow-[0_24px_70px_#0000001f]"
          />
        </div>
      </section>

      {/* Galeria */}
      <section id="galeria" className="py-20">
        <div className="mx-auto max-w-[1180px] px-4">
          <SectionHeading
            kicker="Galeria do projeto"
            title="Imagens e páginas da apresentação."
            text="Clique em qualquer imagem para ampliar. A galeria utiliza as páginas da apresentação como material visual da landing page."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {GALLERY_PAGES.map((n, idx) => (
              <button
                key={n}
                onClick={() => setLightbox(idx)}
                className="group overflow-hidden rounded-[16px] border border-[#2023261f] bg-white transition-shadow hover:shadow-[0_24px_70px_#0000001f]"
              >
                <img
                  src={`/assets/thumbs/page-${pad(n)}.webp`}
                  alt={`Página ${n} da apresentação FDS Gourmet`}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="bg-[#008b96] py-20 text-white">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-4 md:grid-cols-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff6a00]">
              Informações
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
              Fale com a organização.
            </h2>
            <p className="mt-4 leading-relaxed text-white/85">
              Entre em contato para apresentar o projeto à sua cidade, avaliar estrutura, agenda,
              contrapartidas e formato ideal de implantação.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-semibold">Alexandre Camargo</div>
                  <div className="text-sm text-white/80">(62) 98219-5886</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-semibold">E-mail</div>
                  <a href="mailto:fdsgourmetbrasil@gmail.com" className="text-sm text-white/80 hover:text-white">
                    fdsgourmetbrasil@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                  <Globe className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-semibold">Site</div>
                  <a
                    href="https://www.fdsgourmet.com.br"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/80 hover:text-white"
                  >
                    www.fdsgourmet.com.br
                  </a>
                </div>
              </div>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ff6a00] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#d95500]"
            >
              Chamar no WhatsApp
            </a>
          </div>
          <div className="flex justify-center">
            <img
              src="/assets/mascote-fds-gourmet.png"
              alt="Mascote FDS Gourmet"
              className="w-64 drop-shadow-2xl md:w-80"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#202326] py-8 text-white">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <div className="flex items-center gap-2">
            <img src="/assets/mascote-fds-gourmet.png" alt="" className="h-8 w-8 object-contain" />
            <span className="text-sm text-white/80">
              FDS Gourmet Festival - Gastronomia, entretenimento e comércio local.
            </span>
          </div>
          <a
            href="#top"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            <ArrowUp className="h-4 w-4" />
            Voltar ao topo
          </a>
        </div>
      </footer>

      {/* Back to top floating */}
      {showTop ? (
        <a
          href="#top"
          aria-label="Voltar ao topo"
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#ff6a00] text-white shadow-lg transition-colors hover:bg-[#d95500]"
        >
          <ArrowUp className="h-5 w-5" />
        </a>
      ) : null}

      {/* Lightbox */}
      {lightbox !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <button
            aria-label="Fechar"
            onClick={closeLightbox}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            aria-label="Anterior"
            onClick={(e) => {
              e.stopPropagation();
              stepLightbox(-1);
            }}
            className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <img
            src={`/assets/pages/page-${pad(GALLERY_PAGES[lightbox] ?? 1)}.webp`}
            alt={`Página ${GALLERY_PAGES[lightbox]} da apresentação ampliada`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
          />
          <button
            aria-label="Próxima"
            onClick={(e) => {
              e.stopPropagation();
              stepLightbox(1);
            }}
            className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      ) : null}
    </div>
  );
}

function SectionHeadingLeft({
  kicker,
  title,
}: {
  kicker: string;
  title: string;
}) {
  return (
    <div>
      <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff6a00]">{kicker}</span>
      <h2 className="mt-3 font-serif text-3xl font-bold text-[#202326] md:text-4xl">{title}</h2>
    </div>
  );
}
