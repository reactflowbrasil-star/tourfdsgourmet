import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { AgencySignature } from "@/components/agency-identity";
import InversionCircleScrollAnimation from "@/components/ui/inversion-circle-scroll-animation";
import {
  UtensilsCrossed,
  Beer,
  Music,
  Baby,
  Car,
  Users,
  MapPin,
  CalendarDays,
  Phone,
  Mail,
  Globe,
  X,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  ArrowUp,
  Check,
  Instagram,
  Heart,
  Store,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FDS Gourmet 2027 | Gastronomia, música e cultura" },
      {
        name: "description",
        content:
          "Um fim de semana para celebrar sabores, música e cultura. Entrada gratuita, gastronomia local, shows, espaço kids e experiências para toda a família.",
      },
      { property: "og:title", content: "FDS Gourmet 2027 | Tour Brasil" },
      {
        property: "og:description",
        content:
          "O festival que conecta gastronomia, entretenimento e comunidade. Entrada gratuita. Experiências para todos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WHATSAPP_URL =
  "https://wa.me/5562982195886?text=Ol%C3%A1!%20Tenho%20interesse%20em%20participar%20do%20FDS%20Gourmet%202027.";
const VIDEO_URL = "https://growmoneydigital.com.br/conferflow/video.mp4";
type VideoEdition = { title: string; city: string; videoId?: string; start?: number; externalUrl?: string };

const VIDEO_EDITIONS: VideoEdition[] = [
  { title: "Edição Araxá", city: "Araxá – MG", externalUrl: "https://globoplay.globo.com/v/6077204/" },
  { title: "Edição Buriti Shopping", city: "Goiânia – GO", videoId: "aWa9Laq2plY" },
  { title: "Edição Brasil Park Shopping", city: "Anápolis – GO", videoId: "Odnd-T6512c", start: 27 },
  { title: "Edição Uberaba Shopping", city: "Uberaba – MG", videoId: "3UTRof8YVNQ", start: 10 },
  { title: "Edição Centro Cultural Oscar Niemeyer", city: "Goiânia – GO", videoId: "xBKNsqVE-0" },
  { title: "Edição Buriti Shopping", city: "Goiânia – GO", videoId: "HvpVp4a280U" },
];

const NAV = [
  { label: "O festival", href: "#sobre" },
  { label: "Experiências", href: "#experiencias" },
  { label: "Para a cidade", href: "#cidade" },
  { label: "Tour 2027", href: "#tour" },
  { label: "Galeria", href: "#galeria" },
  { label: "FAQ", href: "#faq" },
];

const STATS = [
  { value: "2015", label: "ano de criação" },
  { value: "500+", label: "eventos realizados" },
  { value: "100+", label: "cidades percorridas" },
  { value: "1M+", label: "pessoas alcançadas" },
];

const EXPERIENCES = [
  {
    icon: UtensilsCrossed,
    title: "Gastronomia local",
    text: "Restaurantes e empreendedores da cidade apresentam seus pratos, sabores e histórias ao público.",
  },
  {
    icon: Music,
    title: "Música e apresentações",
    text: "Artistas locais e bandas convidadas animam o festival. As atrações variam conforme cada cidade.",
  },
  {
    icon: Beer,
    title: "Cerveja artesanal",
    text: "Um espaço dedicado a diferentes opções de bebidas e ao festival de cerveja artesanal.",
  },
  {
    icon: Baby,
    title: "Espaço Kids",
    text: "Diversão para as crianças e tranquilidade para toda a família aproveitar o evento.",
  },
  {
    icon: Car,
    title: "Exposição de veículos",
    text: "Carros antigos, supermáquinas e motos em uma área especial do festival.",
  },
  {
    icon: Users,
    title: "Cultura e comunidade",
    text: "Uma programação que celebra a identidade, os talentos e as iniciativas locais.",
  },
];

const BENEFITS = [
  "Incentivo à participação de empresas locais",
  "Mais movimento para o comércio e os serviços da região",
  "Divulgação do município e de seus empreendedores",
  "Oportunidades de trabalho direto e indireto",
  "Programação gratuita para moradores e visitantes",
  "Gastronomia, música, cultura e lazer para toda a família",
];

const FAQS = [
  {
    question: "A entrada é gratuita?",
    answer: "Sim. O evento é gratuito e aberto ao público.",
  },
  {
    question: "O festival é indicado para famílias?",
    answer:
      "Sim. A programação inclui atrações para diferentes públicos e espaço dedicado às crianças.",
  },
  {
    question: "Quais atrações estarão disponíveis na minha cidade?",
    answer:
      "A programação pode variar conforme a cidade, a logística e a disponibilidade das atrações. Acompanhe os canais oficiais para consultar os detalhes da sua edição.",
  },
  {
    question: "Como faço para participar como expositor?",
    answer:
      "Empresas e empreendedores interessados podem entrar em contato com a organização para consultar vagas e condições de participação.",
  },
  {
    question: "Onde encontro as datas e os locais?",
    answer:
      "As informações confirmadas serão publicadas nesta página e nos canais oficiais do FDS Gourmet.",
  },
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
  const [activeVideo, setActiveVideo] = useState<VideoEdition | null>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    if (!video.muted) void video.play();
    setMuted(video.muted);
  }, []);



  return (
    <div className="min-h-screen bg-[#f8f4ec] font-sans text-[#202326]">
      <header className="sticky top-0 z-40 border-b border-[#2023261f] bg-[#f8f4ec]/90 backdrop-blur">
        <div className="mx-auto flex min-h-16 max-w-[1180px] items-center justify-between gap-4 px-4 py-2">
          <a href="#top" className="flex shrink-0 items-center gap-2" aria-label="FDS Gourmet, início">
            <img src="/assets/mascote-fds-gourmet.png" alt="" className="h-10 w-10 object-contain" />
            <span className="font-serif text-lg font-bold leading-tight">
              FDS <span className="text-[#008b96]">Gourmet</span>
            </span>
          </a>
          <nav className="hidden items-center gap-5 lg:flex" aria-label="Navegação principal">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium text-[#666b70] transition-colors hover:text-[#008b96]">
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#expositor" className="inline-flex items-center gap-2 rounded-full bg-[#ff6a00] px-4 py-2 text-sm font-semibold text-white shadow transition-colors hover:bg-[#d95500]">
            <Store className="h-4 w-4" />
            <span className="hidden sm:inline">Quero expor</span>
            <span className="sm:hidden">Expor</span>
          </a>
        </div>
      </header>

      <main>
        <InversionCircleScrollAnimation
          kicker="Tour Brasil 2027"
          title="FDS GOURMET 2027"
          subtitle="Um fim de semana para celebrar sabores, música e cultura."
        />
        <section id="top" className="relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-[#008b96]/10 blur-3xl" />
            <div className="absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-[#ff6a00]/10 blur-3xl" />
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 select-none font-serif text-[22vw] font-bold leading-none tracking-tight text-[#008b96]/5">
              2027
            </span>
          </div>
          <div className="relative mx-auto grid max-w-[1180px] items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-24">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff6a00] to-[#d95500] px-5 py-2 text-sm font-extrabold uppercase tracking-[0.2em] text-white shadow-lg shadow-[#ff6a00]/30">
                  FDS Gourmet 2027
                </span>
                <span className="rounded-full bg-[#dff4f5] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#008b96]">
                  Entrada gratuita
                </span>
              </div>
              <h1 className="mt-6 font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Um fim de semana para celebrar{" "}
                <span className="text-[#008b96]">sabores, música e cultura.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#666b70]">
                O festival que conecta gastronomia, entretenimento e comunidade chega com uma nova
                proposta: valorizar os negócios locais e criar experiências para toda a família.
              </p>
              <p className="mt-4 font-semibold text-[#202326]">Entrada gratuita. Experiências para todos.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#tour" className="inline-flex items-center gap-2 rounded-full bg-[#008b96] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#006f78]">
                  Quero participar
                </a>
                <a href="#expositor" className="inline-flex items-center gap-2 rounded-full border border-[#2023261f] bg-white px-6 py-3 text-sm font-semibold text-[#202326] transition-colors hover:border-[#008b96] hover:text-[#008b96]">
                  <Store className="h-4 w-4" />
                  Tenho um negócio e quero expor
                </a>
              </div>
            </div>
            <div className="relative">
              <span className="absolute -top-5 right-6 z-10 rotate-3 rounded-full bg-[#008b96] px-5 py-2 font-serif text-lg font-bold text-white shadow-xl">
                Tour Brasil 2027
              </span>
              <div className="relative overflow-hidden rounded-[34px] ring-1 ring-[#2023261f] shadow-[0_24px_70px_#0000001f]">
                <video ref={videoRef} src={VIDEO_URL} autoPlay loop muted playsInline className="aspect-video w-full object-cover" aria-label="Momentos do FDS Gourmet" />
                <button onClick={toggleSound} aria-label={muted ? "Ativar som do vídeo" : "Desativar som do vídeo"} className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-black/80">
                  {muted ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  {muted ? "Ativar som" : "Desativar som"}
                </button>
              </div>
              <img src="/assets/mascote-fds-gourmet-02.png" alt="" className="absolute -bottom-8 -left-8 hidden w-28 rotate-[-8deg] drop-shadow-xl md:block" />
            </div>
          </div>
        </section>

        <section className="bg-[#008b96] py-12 text-white" aria-label="História do festival em números">
          <div className="mx-auto max-w-[1180px] px-4">
            <p className="text-center font-serif text-2xl font-bold md:text-3xl">Mais que um festival. Um encontro com a cidade.</p>
            <div className="mt-9 grid grid-cols-2 gap-8 md:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-serif text-4xl font-bold md:text-5xl">{stat.value}</div>
                  <div className="mt-2 text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="sobre" className="py-20">
          <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-4 md:grid-cols-2">
            <div>
              <SectionHeadingLeft kicker="Sobre o festival" title="Uma jornada feita de encontros, sabores e histórias." />
              <p className="mt-6 leading-relaxed text-[#666b70]">
                Criado em 2015, o FDS Gourmet já realizou mais de 500 eventos, passou por mais de
                100 cidades e reuniu um público estimado em mais de 1 milhão de pessoas.
              </p>
              <p className="mt-4 leading-relaxed text-[#666b70]">
                Em 2027, o festival continua sua jornada pelo Brasil com uma proposta especial:
                aproximar o público dos sabores, talentos e empreendedores de cada cidade.
              </p>
              <a href="#experiencias" className="mt-7 inline-flex items-center gap-2 font-semibold text-[#008b96] hover:text-[#006f78]">
                Descubra o que vem por aí <ChevronRight className="h-4 w-4" />
              </a>
            </div>
            <img src="/assets/fds-2027-02.jpg" alt="Público e experiências de uma edição do FDS Gourmet" loading="lazy" className="w-full rounded-[24px] shadow-[0_24px_70px_#0000001f]" />
          </div>
        </section>

        <section id="experiencias" className="bg-white py-20">
          <div className="mx-auto max-w-[1180px] px-4">
            <SectionHeading kicker="O que você vai encontrar" title="Um festival, muitas experiências" text="Uma programação diversa para aproveitar com amigos, descobrir talentos locais e curtir em família." />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {EXPERIENCES.map((item, index) => (
                <article key={item.title} className="group rounded-[24px] border border-[#2023261f] bg-[#f8f4ec] p-8 transition-shadow hover:shadow-[0_24px_70px_#0000001f]">
                  <div className="flex items-center justify-between">
                    <item.icon className="h-8 w-8 text-[#008b96]" />
                    <span className="font-serif text-3xl font-bold text-[#ff6a00]/40">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#666b70]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="cidade" className="py-20">
          <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-4 md:grid-cols-2">
            <img src="/assets/fds-2027-18.jpg" alt="Empreendedores e visitantes reunidos no festival" loading="lazy" className="w-full rounded-[24px] shadow-[0_24px_70px_#0000001f]" />
            <div>
              <SectionHeadingLeft kicker="A cidade no centro do festival" title="O melhor da sua cidade, reunido em um só lugar." />
              <p className="mt-6 leading-relaxed text-[#666b70]">
                O FDS Gourmet dá espaço para restaurantes, comércios e empreendedores locais
                participarem de um evento de grande alcance. A iniciativa ajuda a apresentar os
                negócios da região para novos públicos e movimenta diferentes setores da economia.
              </p>
              <p className="mt-4 leading-relaxed text-[#666b70]">
                O festival também oferece treinamento e capacitação para os participantes, com
                orientações sobre atendimento, gestão e logística em grandes eventos.
              </p>
              <a href="#expositor" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#008b96] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#006f78]">
                Conheça as oportunidades <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="bg-[#202326] py-20 text-white">
          <div className="mx-auto max-w-[1180px] px-4 [&_h2]:!text-white [&_p]:!text-white/70">
            <SectionHeading kicker="Benefícios para a cidade" title="Uma experiência que movimenta a cidade inteira" text="O festival reúne lazer gratuito e oportunidades para a economia local." />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BENEFITS.map((benefit) => (
                <div key={benefit} className="flex items-start gap-4 rounded-[16px] border border-white/10 bg-white/5 p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff6a00]">
                    <Check className="h-5 w-5 text-white" />
                  </span>
                  <span className="font-medium leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#008b96] py-16 text-white">
          <div className="mx-auto grid max-w-[1180px] items-center gap-8 px-4 md:grid-cols-[1fr_auto]">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#ffd3b4]">Entrada gratuita</span>
              <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">Um evento para toda a população</h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-white/85">
                Reúna amigos e família, conheça novos sabores, prestigie artistas e aproveite
                atrações em um ambiente preparado para diferentes idades.
              </p>
            </div>
            <a href="#tour" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#008b96] transition-colors hover:bg-[#f8f4ec]">
              Quero acompanhar a programação
            </a>
          </div>
        </section>

        <section id="expositor" className="py-20">
          <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-4 md:grid-cols-2">
            <div>
              <SectionHeadingLeft kicker="Para empresas e empreendedores" title="Leve sua marca para o FDS Gourmet." />
              <p className="mt-6 leading-relaxed text-[#666b70]">
                Restaurantes, bares, comércios e empreendedores locais podem fazer parte do
                festival e apresentar seus produtos e serviços ao público.
              </p>
              <p className="mt-4 leading-relaxed text-[#666b70]">
                A participação pode incluir visibilidade no evento, contato direto com visitantes
                e integração com uma iniciativa que valoriza a economia local.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#666b70]">
                As condições, vagas e formatos de participação devem ser confirmados com a organização.
              </p>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#ff6a00] px-6 py-3 text-sm font-semibold text-white shadow transition-colors hover:bg-[#d95500]">
                Tenho interesse em participar <ChevronRight className="h-4 w-4" />
              </a>
            </div>
            <img src="/assets/fds-2027-17.jpg" alt="Área de expositores e empreendedores do FDS Gourmet" loading="lazy" className="w-full rounded-[24px] shadow-[0_24px_70px_#0000001f]" />
          </div>
        </section>

        <section id="tour" className="bg-white py-20">
          <div className="mx-auto max-w-[1180px] px-4">
            <SectionHeading kicker="Tour Brasil 2027" title="O FDS Gourmet está percorrendo o Brasil" text="A Tour 2027 poderá passar por novas cidades e estados. A programação e o calendário serão divulgados pelos canais oficiais do festival." />
            <div className="mx-auto mt-10 max-w-3xl rounded-[24px] border border-[#2023261f] bg-[#f8f4ec] p-8 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#dff4f5]">
                <MapPin className="h-7 w-7 text-[#008b96]" />
              </span>
              <h3 className="mt-5 font-serif text-2xl font-bold">Novas cidades em breve</h3>
              <p className="mt-3 leading-relaxed text-[#666b70]">As cidades, datas e locais confirmados serão publicados aqui. Acompanhe as novidades pelos canais oficiais.</p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#666b70]">
                <CalendarDays className="h-4 w-4 text-[#ff6a00]" />
                Calendário 2027 em atualização
              </div>
              <div className="mt-7">
                <a href="https://www.instagram.com/fdsgourmetbrasil" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#008b96] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#006f78]">
                  <Instagram className="h-4 w-4" /> Ver próximas edições
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="galeria" className="py-20">
          <div className="mx-auto max-w-[1180px] px-4">
            <SectionHeading kicker="Galeria" title="Recordações de edições anteriores" text="Reviva momentos do FDS Gourmet em diferentes cidades. Selecione uma edição para assistir ao vídeo." />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {VIDEO_EDITIONS.map((edition, index) => {
                const cover = edition.videoId
                  ? "https://img.youtube.com/vi/" + edition.videoId + "/hqdefault.jpg"
                  : "https://s01.video.glbimg.com/x720/6077204.jpg";
                const content = (
                  <>
                    <div className="relative aspect-video overflow-hidden bg-[#202326]">
                      <img src={cover} alt={"Capa do vídeo: " + edition.title + ", " + edition.city} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/15 transition-colors group-hover:bg-black/30">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ff0000] text-white shadow-xl">
                          <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-1 h-6 w-6 fill-current"><path d="M8 5v14l11-7z" /></svg>
                        </span>
                      </span>
                      <span className="absolute left-3 top-3 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold text-white">
                        {edition.externalUrl ? "GloboPlay" : "YouTube"}
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#ff6a00]">{edition.city}</p>
                      <h3 className="mt-2 font-serif text-lg font-bold text-[#202326]">{edition.title}</h3>
                      <p className="mt-2 text-sm text-[#666b70]">{edition.externalUrl ? "Assistir no GloboPlay" : "Assistir ao vídeo"}</p>
                    </div>
                  </>
                );
                return edition.externalUrl ? (
                  <a key={edition.title + edition.city + index} href={edition.externalUrl} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-[20px] border border-[#2023261f] bg-white text-left transition-shadow hover:shadow-[0_24px_70px_#0000001f]" aria-label={"Abrir no GloboPlay: " + edition.title + ", " + edition.city}>
                    {content}
                  </a>
                ) : (
                  <button key={edition.title + edition.city + index} type="button" onClick={() => setActiveVideo(edition)} className="group overflow-hidden rounded-[20px] border border-[#2023261f] bg-white text-left transition-shadow hover:shadow-[0_24px_70px_#0000001f]" aria-label={"Assistir: " + edition.title + ", " + edition.city}>
                    {content}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-white py-20">
          <div className="mx-auto max-w-[900px] px-4">
            <SectionHeading kicker="Perguntas frequentes" title="Tudo o que você precisa saber" />
            <div className="mt-10 space-y-3">
              {FAQS.map((item) => (
                <details key={item.question} className="group rounded-2xl border border-[#2023261f] bg-[#f8f4ec] p-5 open:bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:hidden">
                    {item.question}
                    <ChevronRight className="h-5 w-5 shrink-0 text-[#008b96] transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-4 pr-8 text-sm leading-relaxed text-[#666b70]">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#ff6a00] py-16 text-white">
          <div className="mx-auto max-w-[1000px] px-4 text-center">
            <Heart className="mx-auto h-8 w-8" />
            <h2 className="mt-4 font-serif text-3xl font-bold md:text-4xl">Sua cidade merece viver essa experiência</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/90">
              Prepare-se para um fim de semana de gastronomia, música, cultura e diversão para toda a família.
            </p>
            <p className="mt-3 font-semibold">Entrada gratuita. Comércio local em destaque.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href="https://www.instagram.com/fdsgourmetbrasil" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#d95500] transition-colors hover:bg-[#fff4eb]">
                <Instagram className="h-4 w-4" /> Acompanhar novidades
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                Quero ser expositor
              </a>
            </div>
          </div>
        </section>

        <section id="contato" className="bg-[#008b96] py-16 text-white">
          <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-4 md:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#ffd3b4]">Fale com a organização</span>
              <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">Vamos nos encontrar no festival?</h2>
              <p className="mt-4 leading-relaxed text-white/85">Acompanhe os canais oficiais e fale com a equipe para saber sobre programação e participação como expositor.</p>
              <div className="mt-7 space-y-4">
                <a href="tel:+5562982195886" className="flex items-center gap-3 hover:text-white/80"><Phone className="h-5 w-5" /><span>(62) 98219-5886</span></a>
                <a href="mailto:fdsgourmetbrasil@gmail.com" className="flex items-center gap-3 hover:text-white/80"><Mail className="h-5 w-5" /><span>fdsgourmetbrasil@gmail.com</span></a>
                <a href="https://www.fdsgourmet.com.br" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white/80"><Globe className="h-5 w-5" /><span>fdsgourmet.com.br</span></a>
              </div>
            </div>
            <div className="flex flex-col items-center gap-5">
              <img src="/assets/mascote-fds-gourmet.png" alt="Mascote FDS Gourmet" className="w-52 drop-shadow-2xl md:w-64" />
              <a href="https://www.instagram.com/fdsgourmetbrasil" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 font-semibold transition-colors hover:bg-white/25">
                <Instagram className="h-5 w-5" /> @fdsgourmetbrasil
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#202326] py-8 text-white">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-5 px-4 text-center md:flex-row md:text-left">
          <div className="flex items-center gap-3">
            <img src="/assets/mascote-fds-gourmet.png" alt="" className="h-9 w-9 object-contain" />
            <div>
              <p className="text-sm font-semibold">FDS Gourmet — Tour Brasil 2027</p>
              <p className="text-xs text-white/70">Gastronomia, música, cultura e experiências para toda a família.</p>
            </div>
          </div>
          <div className="max-w-xl text-xs leading-relaxed text-white/60">
            As atrações, datas e cidades podem sofrer alterações. Consulte os canais oficiais para obter as informações atualizadas.
          </div>
          <a href="#top" className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white">
            <ArrowUp className="h-4 w-4" /> Voltar ao topo
          </a>
        </div>
        <AgencySignature />
      </footer>

      {showTop ? (
        <a href="#top" aria-label="Voltar ao topo" className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#ff6a00] text-white shadow-lg transition-colors hover:bg-[#d95500]">
          <ArrowUp className="h-5 w-5" />
        </a>
      ) : null}

      {activeVideo ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setActiveVideo(null)} role="dialog" aria-modal="true" aria-label={"Vídeo " + activeVideo.title}>
          <button type="button" aria-label="Fechar vídeo" onClick={() => setActiveVideo(null)} className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
            <X className="h-6 w-6" />
          </button>
          <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="aspect-video">
              <iframe
                src={"https://www.youtube-nocookie.com/embed/" + activeVideo.videoId + "?autoplay=1&rel=0" + (activeVideo.start ? "&start=" + activeVideo.start : "")}
                title={activeVideo.title + " — " + activeVideo.city}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="px-5 py-4 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#ff9b54]">{activeVideo.city}</p>
              <h2 className="mt-1 font-serif text-xl font-bold">{activeVideo.title}</h2>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SectionHeadingLeft({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div>
      <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff6a00]">{kicker}</span>
      <h2 className="mt-3 font-serif text-3xl font-bold text-[#202326] md:text-4xl">{title}</h2>
    </div>
  );
}
