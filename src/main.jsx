import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const WHATSAPP_NUMBER = '558587382458';
const WHATSAPP_DISPLAY = '+55 85 8738-2458';
const WHATSAPP_MESSAGE = 'Olá Pai Júlio, entendi que a consulta é 100% online e paga. Gostaria de consultar os valores e horários.';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const Icon = ({ name, size = 22 }) => {
  const paths = {
    shield: <><path d="M12 3 4.5 6v5.2c0 4.8 3.2 8.4 7.5 9.8 4.3-1.4 7.5-5 7.5-9.8V6L12 3Z"/><path d="m9 12 2 2 4-4"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>,
    eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></>,
    spark: <><path d="m12 3-1.4 4.2L6.5 9l4.1 1.8L12 15l1.4-4.2L17.5 9l-4.1-1.8L12 3Z"/><path d="m5 15-.8 2.2L2 18l2.2.8L5 21l.8-2.2L8 18l-2.2-.8L5 15Z"/></>,
    candle: <><path d="M9 21h6V10H9v11Z"/><path d="M12 2c2 2.2 2.4 3.8 0 6-2.4-2.2-2-3.8 0-6Z"/><path d="M7 21h10"/></>,
    compass: <><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/></>,
    message: <><path d="M21 12a8 8 0 0 1-9 8 9 9 0 0 1-4-.9L3 21l1.7-4.5A8.5 8.5 0 1 1 21 12Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    arrow: <><path d="M5 12h14"/><path d="m14 7 5 5-5 5"/></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
    whatsapp: <><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4.1Z"/><path d="M8.2 7.8c.2-.5.4-.5.8-.5h.5c.2 0 .4.1.5.4l.8 1.9c.1.3.1.5-.1.7l-.6.8c-.2.2-.1.4 0 .6.5.9 1.2 1.6 2.1 2.1.2.1.4.2.6 0l.9-1c.2-.2.4-.2.7-.1l1.8.9c.3.1.4.3.4.5 0 .3-.1 1.4-.8 2-.6.6-1.5.8-2.4.6-1.2-.3-2.8-1-4.4-2.5-1.3-1.2-2.2-2.8-2.4-3.8-.3-1.2.2-2.1.6-2.6Z"/></>,
  };
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
};

const CTA = ({ children = 'Agendar minha consulta', className = '', icon = true }) => (
  <a className={`button ${className}`} href={WHATSAPP_URL} target="_blank" rel="noreferrer">
    {icon && <Icon name="message" size={19} />}
    <span className="button-copy"><strong>{children}</strong><small>100% online • atendimento pago</small></span>
    <Icon name="arrow" size={18} />
  </a>
);

const services = [
  { icon: 'heart', tag: 'Relacionamentos', title: 'União de casais', text: 'Orientação para compreender conflitos afetivos e avaliar caminhos de reconexão com mais consciência.', benefits: ['Escuta sem julgamentos', 'Direcionamento individual'], image: '/assets/pai-julio-sobre.webp', position: '72% 42%' },
  { icon: 'candle', tag: 'Vida amorosa', title: 'Harmonia no amor', text: 'Acolhimento para quem deseja entender melhor seus sentimentos e viver as relações com mais equilíbrio.', benefits: ['Clareza emocional', 'Atendimento reservado'], image: '/assets/pai-julio-hero.webp', position: '84% 36%', featured: true },
  { icon: 'spark', tag: 'Renovação', title: 'Limpeza espiritual', text: 'Práticas espirituais voltadas à renovação das energias e ao fortalecimento do seu bem-estar interior.', benefits: ['Avaliação personalizada', 'Cuidado espiritual'], image: '/assets/pai-julio-sobre.webp', position: '56% 58%' },
  { icon: 'shield', tag: 'Equilíbrio', title: 'Proteção espiritual', text: 'Direcionamento para atravessar períodos de instabilidade e buscar mais firmeza no dia a dia.', benefits: ['Orientação cuidadosa', 'Processo explicado'], image: '/assets/pai-julio-hero.webp', position: '73% 52%' },
  { icon: 'users', tag: 'Convivência', title: 'Conflitos e afastamentos', text: 'Uma leitura acolhedora sobre relações desgastadas, intrigas, rivalidades e distanciamentos.', benefits: ['Visão da situação', 'Próximos passos'], image: '/assets/pai-julio-sobre.webp', position: '82% 32%' },
  { icon: 'compass', tag: 'Direcionamento', title: 'Jogo de búzios', text: 'Leitura espiritual para trazer clareza sobre decisões, ciclos e possibilidades do seu caminho.', benefits: ['Consulta individual', 'Respostas com clareza'], image: '/assets/pai-julio-hero.webp', position: '62% 45%' },
];

const homeServices = services.slice(0, 4);

const faqs = [
  ['Como funciona a consulta espiritual?', 'O atendimento começa com uma conversa reservada para compreender o seu momento. A partir daí, Pai Júlio realiza a orientação espiritual de forma personalizada e explica os próximos passos com clareza.'],
  ['A consulta pode ser feita online?', 'Sim. O atendimento online permite receber a orientação com privacidade, de onde você estiver. O formato é combinado no momento do agendamento.'],
  ['Tudo o que eu falar fica em sigilo?', 'Sim. Discrição e respeito fazem parte de todo o atendimento. A sua história é acolhida sem julgamentos e tratada com confidencialidade.'],
  ['Quanto tempo dura o atendimento?', 'O tempo pode variar conforme a necessidade de cada pessoa. Antes da consulta, você recebe as informações do atendimento de forma transparente.'],
  ['Como faço para agendar?', 'Clique em qualquer botão de WhatsApp da página, envie sua mensagem e combine o melhor horário diretamente com a equipe.'],
];

const testimonialVideos = [
  '/assets/depoimentos/depoimento-1.mp4',
  '/assets/depoimentos/depoimento-2.mp4',
  '/assets/depoimentos/depoimento-3.mp4',
  '/assets/depoimentos/depoimento-4.mp4',
];

const VideoTestimonialCard = ({ video, index, onPlay }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const poster = index % 2 === 0 ? '/assets/pai-julio-sobre-mobile.webp' : '/assets/pai-julio-hero-mobile.webp';

  const startVideo = () => {
    const player = videoRef.current;
    if (!player) return;
    player.play().catch(() => setIsPlaying(false));
  };

  const handlePlay = (event) => {
    setIsPlaying(true);
    onPlay?.(event);
  };

  return (
    <article className="video-testimonial-card">
      <div className={`video-frame ${isPlaying ? 'is-playing' : ''}`}>
        <video ref={videoRef} className="testimonial-video" src={video} poster={poster} controls playsInline preload="none" onPlay={handlePlay} onPause={() => setIsPlaying(false)} aria-label={`Depoimento em vídeo ${index + 1}`}>Seu navegador não suporta vídeos.</video>
        {!isPlaying && <button className="video-play" type="button" onClick={startVideo} aria-label={`Reproduzir depoimento em vídeo ${index + 1}`}><span className="video-play-symbol" aria-hidden="true">▶</span><span>Assistir depoimento</span></button>}
        <span className="video-badge"><span></span> Depoimento {index + 1}</span>
      </div>
      <div className="video-card-meta"><strong>Relato de atendimento</strong><small>Experiências individuais podem variar</small></div>
    </article>
  );
};

const sitelinkPages = {
  '/consulta-espiritual/': { type: 'consulta', kicker: 'Consulta espiritual', title: 'Um atendimento reservado para compreender seu momento.', lead: 'Converse com Pai Júlio com privacidade e receba uma orientação individual, 100% online, particular e paga.' },
  '/sobre-pai-julio/': { type: 'sobre', kicker: 'Conheça Pai Júlio', title: 'Experiência espiritual com escuta, respeito e verdade.', lead: 'Uma trajetória dedicada a acolher pessoas e famílias que procuram mais clareza, equilíbrio e direcionamento.' },
  '/trabalhos-espirituais/': { type: 'trabalhos', kicker: 'Trabalhos espirituais', title: 'Orientação para diferentes momentos da sua vida.', lead: 'Conheça os atendimentos disponíveis e encontre o caminho mais adequado para conversar sobre a sua situação.' },
  '/depoimentos/': { type: 'depoimentos', kicker: 'Experiências compartilhadas', title: 'Conheça relatos sobre o atendimento.', lead: 'Assista aos depoimentos em vídeo e veja comentários sobre acolhimento, clareza e discrição durante as consultas.' },
  '/perguntas-frequentes/': { type: 'faq', kicker: 'Perguntas frequentes', title: 'Entenda tudo antes de agendar.', lead: 'Veja como funciona a consulta, quais são os formatos de atendimento e como receber todas as informações pelo WhatsApp.' },
};

const SubpageHeader = ({ menuOpen, setMenuOpen }) => (
  <header className="site-header is-scrolled subpage-header">
      <a href="/" className="brand"><span className="brand-mark">PJ</span><span><strong>Pai Júlio</strong><small>Orientação espiritual</small></span></a>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu" aria-expanded={menuOpen}><span></span><span></span><span></span></button>
      <nav className={menuOpen ? 'open' : ''} aria-label="Navegação principal">
        <a href="/consulta-espiritual/">Consulta</a>
        <a href="/sobre-pai-julio/">Sobre</a>
        <a href="/trabalhos-espirituais/">Atendimentos</a>
        <a href="/depoimentos/">Depoimentos</a>
        <a href="/perguntas-frequentes/">Dúvidas</a>
        <CTA className="button-small" icon={false}>Agendar agora</CTA>
      </nav>
  </header>
);

const SubpageFooter = () => (
  <footer className="footer">
    <div className="container footer-grid">
      <a href="/" className="brand footer-brand"><span className="brand-mark">PJ</span><span><strong>Pai Júlio</strong><small>Orientação espiritual</small></span></a>
      <div className="footer-contact"><p>Atendimento espiritual com respeito, discrição e acolhimento.</p><a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={15}/>{WHATSAPP_DISPLAY}</a></div>
      <nav><a href="/consulta-espiritual/">Consulta</a><a href="/trabalhos-espirituais/">Atendimentos</a><a href="/perguntas-frequentes/">Dúvidas</a></nav>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} Pai Júlio. Todos os direitos reservados.</span><span>Serviços espirituais não substituem acompanhamento médico, psicológico ou jurídico.</span></div>
  </footer>
);

function SitelinkPage({ page }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const handleVideoPlay = (event) => document.querySelectorAll('.testimonial-video').forEach((video) => { if (video !== event.currentTarget) video.pause(); });

  const serviceCards = (
    <div className="services-grid">
      {services.map((service, i) => (
        <article className={`service-card ${service.featured ? 'featured' : ''}`} key={service.title}>
          <div className="service-media" style={{ backgroundImage: `linear-gradient(180deg, rgba(20,18,14,.08), rgba(20,18,14,.88)), url(${service.image})`, backgroundPosition: service.position }}>
            <span className="service-tag">{service.tag}</span>{service.featured && <span className="service-highlight">Mais procurado</span>}
            <div className="service-media-title"><span className="service-icon"><Icon name={service.icon}/></span><span className="service-number">0{i + 1}</span></div>
          </div>
          <div className="service-body"><h3>{service.title}</h3><p>{service.text}</p><ul>{service.benefits.map((benefit) => <li key={benefit}><Icon name="check" size={14}/>{benefit}</li>)}</ul><a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><span><strong>Consultar disponibilidade</strong><small>100% online • atendimento pago</small></span><Icon name="arrow" size={17}/></a></div>
        </article>
      ))}
    </div>
  );

  return (
    <div className="site-shell subpage-shell">
      <SubpageHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <main className="subpage-main">
        <section className={`subpage-hero subpage-hero-${page.type}`}>
          <div className="container subpage-hero-content"><span className="eyebrow"><span></span>{page.kicker}</span><h1>{page.title}</h1><p>{page.lead}</p><CTA>Falar com Pai Júlio</CTA><div className="subpage-paid"><Icon name="lock" size={15}/> Atendimento particular e pago. Valores informados antes de agendar.</div></div>
        </section>

        {page.type === 'consulta' && <section className="subpage-section section"><div className="container"><div className="section-heading"><span className="kicker">Como funciona</span><h2>Uma conversa simples, individual e confidencial.</h2><p>Você recebe todas as informações com antecedência e só agenda depois de esclarecer suas dúvidas.</p></div><div className="subpage-feature-grid"><article><Icon name="message"/><h3>Primeiro contato</h3><p>Envie uma mensagem e conte brevemente o que está acontecendo.</p></article><article><Icon name="clock"/><h3>Horário combinado</h3><p>Escolha o melhor horário para seu atendimento 100% online.</p></article><article><Icon name="compass"/><h3>Orientação individual</h3><p>Converse com privacidade e receba um direcionamento explicado com clareza.</p></article></div><div className="subpage-info-panel"><div><span className="kicker">O que você encontra</span><h2>Acolhimento sem julgamentos.</h2><ul className="check-list"><li><span><Icon name="check" size={17}/></span>Sigilo e respeito à sua história</li><li><span><Icon name="check" size={17}/></span>Atendimento personalizado</li><li><span><Icon name="check" size={17}/></span>Explicação transparente dos próximos passos</li></ul></div><aside><Icon name="lock" size={28}/><strong>Consulta particular</strong><p>Este não é um serviço gratuito. O atendimento é online e os valores são informados antes do agendamento.</p><CTA>Consultar valores</CTA></aside></div></div></section>}

        {page.type === 'sobre' && <section className="subpage-section section"><div className="container about-grid"><div className="about-visual"><img src="/assets/pai-julio-sobre.webp" srcSet="/assets/pai-julio-sobre-mobile.webp 700w, /assets/pai-julio-sobre.webp 1000w" sizes="(max-width: 720px) calc(100vw - 28px), 55vw" width="1000" height="488" loading="lazy" decoding="async" alt="Pai Júlio durante uma cerimônia espiritual"/><div className="experience-card"><strong>30+</strong><span>anos de experiência<br/>e dedicação espiritual</span></div></div><div className="about-copy"><span className="kicker">Uma trajetória de dedicação</span><h2>Escuta, respeito e orientação para cada história.</h2><p>Pai Júlio acolhe pessoas que procuram respostas, proteção e equilíbrio para momentos delicados da vida.</p><p>Cada atendimento considera a história e o momento de quem chega, sem fórmulas prontas e com respeito à fé de cada pessoa.</p><ul className="check-list"><li><span><Icon name="check" size={17}/></span>Conversa reservada e confidencial</li><li><span><Icon name="check" size={17}/></span>Orientação explicada com clareza</li><li><span><Icon name="check" size={17}/></span>Atendimento para todo o Brasil</li></ul><CTA>Agendar uma conversa</CTA></div></div></section>}

        {page.type === 'trabalhos' && <section className="services subpage-section section"><div className="container"><div className="section-heading light"><span className="kicker">Atendimentos disponíveis</span><h2>Escolha o tema que mais se aproxima da sua necessidade.</h2><p>Se ainda tiver dúvidas, explique sua situação pelo WhatsApp e receba as informações antes de decidir.</p></div><div className="service-assurance"><div><Icon name="lock" size={18}/><span><strong>Atendimento particular</strong><small>Consulta individual e sigilosa</small></span></div><div><Icon name="message" size={18}/><span><strong>Informação antecipada</strong><small>Valores enviados antes de agendar</small></span></div><div className="paid-alert"><Icon name="lock" size={20}/><span><strong>Atendimento particular e pago</strong><small>Sem cobranças antes da confirmação.</small></span></div></div>{serviceCards}<p className="mobile-scroll-hint">Deslize para conhecer todos os atendimentos <span>→</span></p></div></section>}

        {page.type === 'depoimentos' && <section className="testimonials subpage-section section"><div className="container"><div className="section-heading"><span className="kicker">Experiências compartilhadas</span><h2>Depoimentos em vídeo.</h2><p>Assista aos relatos e conheça a experiência de quem já conversou com Pai Júlio.</p></div><div className="video-testimonials"><div className="video-testimonials-grid">{testimonialVideos.map((video, index) => <VideoTestimonialCard key={video} video={video} index={index} onPlay={handleVideoPlay}/>)}</div><p className="video-scroll-hint">Deslize para assistir aos outros vídeos <span>→</span></p></div></div></section>}

        {page.type === 'faq' && <section className="faq subpage-section section"><div className="container faq-grid"><div className="faq-intro"><span className="kicker">Informação transparente</span><h2>Suas principais dúvidas, respondidas.</h2><p>Não encontrou sua pergunta? Fale diretamente pelo WhatsApp antes de agendar.</p><CTA className="button-outline">Fazer uma pergunta</CTA></div><div className="faq-list">{faqs.map(([question, answer], i) => <div className={`faq-item ${openFaq === i ? 'active' : ''}`} key={question}><button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}><span>{question}</span><b>{openFaq === i ? '−' : '+'}</b></button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></div></section>}

        <section className="subpage-final"><div className="container"><span className="kicker">Atendimento 100% online e pago</span><h2>Pronto para dar o próximo passo?</h2><p>Fale pelo WhatsApp, tire suas dúvidas e receba valores e condições antes de agendar.</p><CTA>Conversar pelo WhatsApp</CTA></div></section>
      </main>
      <SubpageFooter/>
      <a className="whatsapp-float" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><span className="whatsapp-icon"><Icon name="whatsapp" size={29}/></span><span className="whatsapp-copy"><strong>Fale no WhatsApp</strong><small>{WHATSAPP_DISPLAY} • serviço pago</small></span></a>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const handleVideoPlay = (event) => {
    document.querySelectorAll('.testimonial-video').forEach((video) => {
      if (video !== event.currentTarget) video.pause();
    });
  };

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a href="#inicio" className="brand" onClick={closeMenu}>
          <span className="brand-mark">PJ</span>
          <span><strong>Pai Júlio</strong><small>Orientação espiritual</small></span>
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu" aria-expanded={menuOpen}>
          <span></span><span></span><span></span>
        </button>
        <nav className={menuOpen ? 'open' : ''} aria-label="Navegação principal">
          <a href="#sobre" onClick={closeMenu}>Sobre</a>
          <a href="#servicos" onClick={closeMenu}>Atendimentos</a>
          <a href="#processo" onClick={closeMenu}>Como funciona</a>
          <a href="#duvidas" onClick={closeMenu}>Dúvidas</a>
          <CTA className="button-small" icon={false}>Falar no WhatsApp</CTA>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-bg" aria-hidden="true"></div>
          <div className="hero-content container">
            <div className="hero-copy">
              <div className="eyebrow"><span></span> Atendimento 100% online</div>
              <h1>Orientação espiritual para o momento que você está vivendo.</h1>
              <p className="hero-lead">Converse com Pai Júlio com privacidade, explique sua situação e receba um direcionamento individual, com respeito à sua história.</p>
              <div className="hero-actions">
                <CTA>Falar com Pai Júlio</CTA>
                <a href="#processo" className="text-link">Como funciona <Icon name="arrow" size={18}/></a>
              </div>
              <div className="payment-notice">
                <span><Icon name="lock" size={17}/></span>
                <p><strong>Atendimento particular</strong><small>Consultas e serviços são pagos. Valores informados antes do agendamento.</small></p>
              </div>
            </div>
            <div className="hero-proof">
              <span className="proof-number">30</span>
              <span>anos de experiência<br/>e dedicação espiritual</span>
            </div>
          </div>
        </section>

        <section className="trust-bar" aria-label="Diferenciais">
          <div className="container trust-grid">
            <div><Icon name="shield"/><span><strong>Sigilo absoluto</strong><small>Sua história protegida</small></span></div>
            <div><Icon name="clock"/><span><strong>Horário flexível</strong><small>Atendimento 100% online</small></span></div>
            <div><Icon name="heart"/><span><strong>Acolhimento real</strong><small>Escuta sem julgamentos</small></span></div>
            <div><Icon name="compass"/><span><strong>Orientação clara</strong><small>Direcionamento pessoal</small></span></div>
          </div>
        </section>

        <section className="about section" id="sobre">
          <div className="container about-grid">
            <div className="about-visual">
              <img src="/assets/pai-julio-sobre.webp" srcSet="/assets/pai-julio-sobre-mobile.webp 700w, /assets/pai-julio-sobre.webp 1000w" sizes="(max-width: 720px) calc(100vw - 28px), 55vw" width="1000" height="488" loading="lazy" decoding="async" alt="Pai Júlio durante uma cerimônia espiritual" />
              <div className="experience-card"><strong>30+</strong><span>anos orientando<br/>pessoas e famílias</span></div>
            </div>
            <div className="about-copy">
              <span className="kicker">Quem vai orientar você</span>
              <h2>Experiência espiritual com escuta, respeito e verdade.</h2>
              <p>Eu sou <strong>Pai Júlio</strong>. Há mais de 30 anos, acolho pessoas em busca de respostas, proteção e equilíbrio para momentos delicados da vida.</p>
              <p>Cada atendimento é individual, reservado e conduzido com respeito à sua história e à sua fé.</p>
              <ul className="check-list">
                <li><span><Icon name="check" size={17}/></span>Conversa reservada e confidencial</li>
                <li><span><Icon name="check" size={17}/></span>Orientação explicada com clareza</li>
                <li><span><Icon name="check" size={17}/></span>Atendimento online para todo o Brasil</li>
              </ul>
              <CTA>Conversar com Pai Júlio</CTA>
            </div>
          </div>
        </section>

        <section className="services section" id="servicos">
          <div className="container">
            <div className="section-heading light">
              <span className="kicker">Atendimentos espirituais</span>
              <h2>Escolha o atendimento mais próximo da sua necessidade.</h2>
              <p>Explique brevemente o que está vivendo e receba as informações antes de decidir.</p>
            </div>
            <div className="services-grid home-services-grid">
              {homeServices.map((service, i) => (
                <article className={`service-card ${service.featured ? 'featured' : ''}`} key={service.title}>
                  <div className="service-media" style={{ backgroundImage: `linear-gradient(180deg, rgba(20,18,14,.08), rgba(20,18,14,.88)), url(${service.image})`, backgroundPosition: service.position }}>
                    <span className="service-tag">{service.tag}</span>
                    {service.featured && <span className="service-highlight">Mais procurado</span>}
                    <div className="service-media-title"><span className="service-icon"><Icon name={service.icon}/></span><span className="service-number">0{i + 1}</span></div>
                  </div>
                  <div className="service-body">
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <ul>{service.benefits.map((benefit) => <li key={benefit}><Icon name="check" size={14}/>{benefit}</li>)}</ul>
                    <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                      <span><strong>Consultar disponibilidade</strong><small>100% online • atendimento pago</small></span><Icon name="arrow" size={17}/>
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <p className="mobile-scroll-hint">Deslize para conhecer todos os atendimentos <span>→</span></p>
            <div className="services-note"><Icon name="lock" size={20}/><span><strong>Atendimento particular e pago.</strong> Valores e condições são informados antes da confirmação.</span></div>
            <a className="services-more" href="/trabalhos-espirituais/">Ver todos os atendimentos <Icon name="arrow" size={16}/></a>
          </div>
        </section>

        <section className="steps section" id="processo">
          <div className="container">
            <div className="section-heading">
              <span className="kicker">Como funciona</span>
              <h2>Um primeiro contato simples e sem pressão.</h2>
            </div>
            <div className="steps-grid">
              <article><span className="step-index" aria-hidden="true">01</span><Icon name="message" size={28}/><h3>Envie uma mensagem</h3><p>Conte, no seu tempo, o que você está vivendo e o tipo de orientação que busca.</p></article>
              <article><span className="step-index" aria-hidden="true">02</span><Icon name="clock" size={28}/><h3>Escolha o horário</h3><p>Combine um horário para seu atendimento 100% online.</p></article>
              <article><span className="step-index" aria-hidden="true">03</span><Icon name="compass" size={28}/><h3>Receba orientação</h3><p>Tenha uma conversa individual para compreender seu momento e enxergar possibilidades.</p></article>
            </div>
            <div className="center"><CTA>Dar o primeiro passo</CTA><small>Você recebe valores e condições antes de confirmar.</small></div>
          </div>
        </section>

        <section className="testimonials section" id="depoimentos">
          <div className="container">
            <div className="section-heading testimonial-heading">
              <span className="kicker">Experiências compartilhadas</span>
              <h2>Veja como é ser atendido.</h2>
              <p>Relatos em vídeo sobre acolhimento, clareza e discrição durante a orientação.</p>
            </div>
            <div className="video-testimonials">
              <div className="video-section-title"><span><Icon name="message" size={17}/></span><div><strong>Depoimentos em vídeo</strong><small>Toque para assistir aos relatos</small></div></div>
              <div className="video-testimonials-grid">
                {testimonialVideos.slice(0, 3).map((video, index) => (
                  <VideoTestimonialCard key={video} video={video} index={index} onPlay={handleVideoPlay}/>
                ))}
              </div>
              <p className="video-scroll-hint">Deslize para assistir aos outros vídeos <span>→</span></p>
            </div>
            <div className="testimonials-footer"><span><Icon name="lock" size={14}/> Atendimento reservado e individual</span><a href="/depoimentos/">Ver todos os depoimentos <Icon name="arrow" size={15}/></a></div>
          </div>
        </section>

        <section className="faq section" id="duvidas">
          <div className="container faq-grid">
            <div className="faq-intro">
              <span className="kicker">Perguntas frequentes</span>
              <h2>Tire suas dúvidas antes de agendar.</h2>
              <p>Se a sua pergunta não estiver aqui, envie uma mensagem. Teremos prazer em orientar você.</p>
              <CTA className="button-outline">Fazer uma pergunta</CTA>
            </div>
            <div className="faq-list">
              {faqs.map(([question, answer], i) => (
                <div className={`faq-item ${openFaq === i ? 'active' : ''}`} key={question}>
                  <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    <span>{question}</span><b>{openFaq === i ? '−' : '+'}</b>
                  </button>
                  <div className="faq-answer"><p>{answer}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="final-bg" aria-hidden="true"></div>
          <div className="container final-content">
            <span className="kicker">Próximo passo</span>
            <h2>Converse sobre o que você está vivendo.</h2>
            <p>Envie uma mensagem, tire suas dúvidas e receba as informações do atendimento antes de decidir.</p>
            <CTA>Falar pelo WhatsApp</CTA>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="brand footer-brand"><span className="brand-mark">PJ</span><span><strong>Pai Júlio</strong><small>Orientação espiritual</small></span></div>
          <div className="footer-contact"><p>Atendimento espiritual com respeito, discrição e acolhimento.</p><a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={15}/>{WHATSAPP_DISPLAY}</a></div>
          <nav><a href="/sobre-pai-julio/">Sobre</a><a href="/trabalhos-espirituais/">Atendimentos</a><a href="/depoimentos/">Depoimentos</a><a href="/perguntas-frequentes/">Dúvidas</a></nav>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Pai Júlio. Todos os direitos reservados.</span><span>Serviços espirituais não substituem acompanhamento médico, psicológico ou jurídico.</span></div>
      </footer>

      <a className="whatsapp-float" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
        <span className="whatsapp-icon"><Icon name="whatsapp" size={29}/></span>
        <span className="whatsapp-copy"><strong>Fale no WhatsApp</strong><small>{WHATSAPP_DISPLAY} • serviço pago</small></span>
      </a>

    </div>
  );
}

const normalizedPath = `${window.location.pathname.replace(/\/$/, '')}/`;
const currentSitelinkPage = sitelinkPages[normalizedPath];

createRoot(document.getElementById('root')).render(currentSitelinkPage ? <SitelinkPage page={currentSitelinkPage}/> : <App />);
