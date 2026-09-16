import React, { useEffect, useState } from 'react';
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

const faqs = [
  ['Como funciona a consulta espiritual?', 'O atendimento começa com uma conversa reservada para compreender o seu momento. A partir daí, Pai Júlio realiza a orientação espiritual de forma personalizada e explica os próximos passos com clareza.'],
  ['A consulta pode ser feita online?', 'Sim. O atendimento online permite receber a orientação com privacidade, de onde você estiver. O formato é combinado no momento do agendamento.'],
  ['Tudo o que eu falar fica em sigilo?', 'Sim. Discrição e respeito fazem parte de todo o atendimento. A sua história é acolhida sem julgamentos e tratada com confidencialidade.'],
  ['Quanto tempo dura o atendimento?', 'O tempo pode variar conforme a necessidade de cada pessoa. Antes da consulta, você recebe as informações do atendimento de forma transparente.'],
  ['Como faço para agendar?', 'Clique em qualquer botão de WhatsApp da página, envie sua mensagem e combine o melhor horário diretamente com a equipe.'],
];

const activityNotifications = [
  { name: 'Bruno', message: 'acabou de realizar uma consulta', time: 'há 2 minutos' },
  { name: 'Maria', message: 'acabou de voltar com seu amor', time: 'há 4 minutos' },
  { name: 'Juliana', message: 'recebeu uma orientação espiritual', time: 'há 7 minutos' },
  { name: 'Rafael', message: 'iniciou um atendimento online', time: 'há 9 minutos' },
  { name: 'Camila', message: 'solicitou informações pelo WhatsApp', time: 'há 12 minutos' },
];

const testimonialComments = [
  { name: 'Marlene Silva', initials: 'MS', color: '#754737', time: '2 sem', likes: 18, text: 'Cheguei muito nervosa e sem saber o que fazer. Pai Júlio me ouviu com muita calma e explicou tudo de um jeito que consegui entender. Saí bem mais tranquila da consulta.', reply: 'Obrigado pela confiança, Marlene. Que você siga seu caminho com serenidade.' },
  { name: 'Ana Paula', initials: 'AP', color: '#425a78', time: '3 sem', likes: 12, text: 'Fiz a consulta online porque moro em outra cidade e me senti muito à vontade. O atendimento foi reservado, pontual e sem julgamentos. Gostei bastante.' },
  { name: 'Sandra Ribeiro', initials: 'SR', color: '#694b2b', time: '1 mês', likes: 24, text: 'O que mais gostei foi a sinceridade. Não ficou prometendo milagre e nem tentando me pressionar. Explicou as possibilidades com clareza e respeitou meu tempo.' },
  { name: 'Luciana Alves', initials: 'LA', color: '#75658f', time: '1 mês', likes: 9, text: 'Demorei para criar coragem de chamar, mas fui muito bem recebida desde a primeira mensagem. A conversa me ajudou a organizar meus pensamentos e olhar a situação de outra forma.' },
  { name: 'Carlos Henrique', initials: 'CH', color: '#4e8278', time: '2 meses', likes: 15, text: 'Atendimento direto e muito respeitoso. Tirei minhas dúvidas antes de agendar, recebi todas as informações e o valor certinho. Recomendo pela seriedade.' },
  { name: 'Beatriz Moreira', initials: 'BM', color: '#9a5e6a', time: '2 meses', likes: 21, text: 'Passando para agradecer pelo acolhimento. Eu estava vivendo uma fase confusa e precisava conversar com alguém que entendesse sem me julgar. Foi muito importante para mim.' },
];

const testimonialVideos = [
  '/assets/depoimentos/depoimento-1.mp4',
  '/assets/depoimentos/depoimento-2.mp4',
  '/assets/depoimentos/depoimento-3.mp4',
  '/assets/depoimentos/depoimento-4.mp4',
];

const sitelinkPages = {
  '/consulta-espiritual/': { type: 'consulta', kicker: 'Consulta espiritual', title: 'Um atendimento reservado para compreender seu momento.', lead: 'Converse com Pai Júlio com privacidade e receba uma orientação individual, 100% online, particular e paga.' },
  '/sobre-pai-julio/': { type: 'sobre', kicker: 'Conheça Pai Júlio', title: 'Experiência espiritual com escuta, respeito e verdade.', lead: 'Uma trajetória dedicada a acolher pessoas e famílias que procuram mais clareza, equilíbrio e direcionamento.' },
  '/trabalhos-espirituais/': { type: 'trabalhos', kicker: 'Trabalhos espirituais', title: 'Orientação para diferentes momentos da sua vida.', lead: 'Conheça os atendimentos disponíveis e encontre o caminho mais adequado para conversar sobre a sua situação.' },
  '/depoimentos/': { type: 'depoimentos', kicker: 'Experiências compartilhadas', title: 'Conheça relatos sobre o atendimento.', lead: 'Assista aos depoimentos em vídeo e veja comentários sobre acolhimento, clareza e discrição durante as consultas.' },
  '/perguntas-frequentes/': { type: 'faq', kicker: 'Perguntas frequentes', title: 'Entenda tudo antes de agendar.', lead: 'Veja como funciona a consulta, quais são os formatos de atendimento e como receber todas as informações pelo WhatsApp.' },
};

const SubpageHeader = ({ menuOpen, setMenuOpen }) => (
  <>
    <div className="promo-bar" role="status"><Icon name="clock" size={14}/><span><strong>Atenção:</strong> Esta promoção se encerra hoje</span></div>
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
  </>
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

        {page.type === 'sobre' && <section className="subpage-section section"><div className="container about-grid"><div className="about-visual"><img src="/assets/pai-julio-sobre.webp" srcSet="/assets/pai-julio-sobre-mobile.webp 700w, /assets/pai-julio-sobre.webp 1000w" sizes="(max-width: 720px) calc(100vw - 28px), 55vw" width="1000" height="488" alt="Pai Júlio durante uma cerimônia espiritual"/><div className="experience-card"><strong>30+</strong><span>anos de experiência<br/>e dedicação espiritual</span></div></div><div className="about-copy"><span className="kicker">Uma trajetória de dedicação</span><h2>Escuta, respeito e orientação para cada história.</h2><p>Pai Júlio acolhe pessoas que procuram respostas, proteção e equilíbrio para momentos delicados da vida.</p><p>Cada atendimento considera a história e o momento de quem chega, sem fórmulas prontas e com respeito à fé de cada pessoa.</p><ul className="check-list"><li><span><Icon name="check" size={17}/></span>Conversa reservada e confidencial</li><li><span><Icon name="check" size={17}/></span>Orientação explicada com clareza</li><li><span><Icon name="check" size={17}/></span>Atendimento para todo o Brasil</li></ul><CTA>Agendar uma conversa</CTA></div></div></section>}

        {page.type === 'trabalhos' && <section className="services subpage-section section"><div className="container"><div className="section-heading light"><span className="kicker">Atendimentos disponíveis</span><h2>Escolha o tema que mais se aproxima da sua necessidade.</h2><p>Se ainda tiver dúvidas, explique sua situação pelo WhatsApp e receba as informações antes de decidir.</p></div><div className="service-assurance"><div><Icon name="lock" size={18}/><span><strong>Atendimento particular</strong><small>Consulta individual e sigilosa</small></span></div><div><Icon name="message" size={18}/><span><strong>Informação antecipada</strong><small>Valores enviados antes de agendar</small></span></div><div className="paid-alert"><Icon name="lock" size={20}/><span><strong>Atendimento particular e pago</strong><small>Sem cobranças antes da confirmação.</small></span></div></div>{serviceCards}<p className="mobile-scroll-hint">Deslize para conhecer todos os atendimentos <span>→</span></p></div></section>}

        {page.type === 'depoimentos' && <section className="testimonials subpage-section section"><div className="container"><div className="video-testimonials"><div className="video-section-title"><span><Icon name="message" size={17}/></span><div><strong>Depoimentos em vídeo</strong><small>Toque para assistir aos relatos</small></div></div><div className="video-testimonials-grid">{testimonialVideos.map((video, index) => <article className="video-testimonial-card" key={video}><div className="video-frame"><video className="testimonial-video" src={video} poster={index % 2 === 0 ? '/assets/pai-julio-sobre-mobile.webp' : '/assets/pai-julio-hero-mobile.webp'} controls playsInline preload="none" onPlay={handleVideoPlay} aria-label={`Depoimento em vídeo ${index + 1}`}>Seu navegador não suporta vídeos.</video><span className="video-badge"><span></span> Depoimento {index + 1}</span></div><div className="video-card-meta"><strong>Relato de atendimento</strong><small>Toque no vídeo para assistir</small></div></article>)}</div><p className="video-scroll-hint">Deslize para assistir aos outros vídeos <span>→</span></p></div><div className="comments-divider"><span>Comentários escritos</span></div><div className="comments-panel"><div className="comments-toolbar"><div><strong>Comentários</strong><small>Experiências compartilhadas</small></div></div><div className="comments-list">{testimonialComments.slice(0,4).map((comment) => <article className="social-comment" key={comment.name}><span className="comment-avatar" style={{background:comment.color}}>{comment.initials}</span><div className="comment-main"><div className="comment-bubble"><div className="comment-name">{comment.name}<span>✓</span></div><p>{comment.text}</p></div><div className="comment-actions"><button>Curtir</button><span>{comment.time}</span></div></div></article>)}</div><div className="comments-disclaimer"><Icon name="eye" size={15}/><span>Experiências individuais podem variar.</span></div></div></div></section>}

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
  const [notificationIndex, setNotificationIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(true);
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNotificationIndex((current) => (current + 1) % activityNotifications.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const handleVideoPlay = (event) => {
    document.querySelectorAll('.testimonial-video').forEach((video) => {
      if (video !== event.currentTarget) video.pause();
    });
  };

  return (
    <div className="site-shell">
      <div className="promo-bar" role="status">
        <Icon name="clock" size={14}/><span><strong>Atenção:</strong> Esta promoção se encerra hoje</span>
      </div>
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
          <a href="#depoimentos" onClick={closeMenu}>Depoimentos</a>
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
              <h1>Encontre <em>clareza</em> para seguir em frente</h1>
              <p className="hero-lead">Orientação espiritual acolhedora para quem vive dúvidas no amor, conflitos pessoais ou sente que precisa reencontrar o próprio caminho.</p>
              <div className="hero-actions">
                <CTA>Quero agendar uma consulta</CTA>
                <a href="#servicos" className="text-link">Conhecer atendimentos <Icon name="arrow" size={18}/></a>
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

        <section className="pain-section section">
          <div className="container pain-grid">
            <div className="section-heading left">
              <span className="kicker">Talvez você esteja vivendo isso agora</span>
              <h2>Quando a mente não encontra respostas, o coração pede direção.</h2>
            </div>
            <div className="pain-list">
              <div><span>01</span><p>Uma relação importante se afastou e você não sabe como agir.</p></div>
              <div><span>02</span><p>As mesmas situações se repetem e parecem bloquear seus caminhos.</p></div>
              <div><span>03</span><p>Você precisa tomar uma decisão, mas sente medo de escolher errado.</p></div>
            </div>
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
              <p>Eu sou <strong>Pai Júlio</strong>. Há mais de 30 anos, acolho pessoas que chegam até mim em busca de respostas, proteção e equilíbrio para momentos delicados da vida.</p>
              <p>Cada história é única. Por isso, o atendimento é feito com atenção individual, sem fórmulas prontas e com total respeito à sua fé e ao seu momento.</p>
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
              <h2>Orientação para o momento que você está vivendo.</h2>
              <p>Escolha o tema que mais se aproxima da sua necessidade. Durante o primeiro contato, você poderá explicar sua situação com tranquilidade.</p>
            </div>
            <div className="service-assurance">
              <div><Icon name="lock" size={18}/><span><strong>Atendimento particular</strong><small>Consulta individual e sigilosa</small></span></div>
              <div><Icon name="message" size={18}/><span><strong>Antes de agendar</strong><small>Você recebe valores e informações pelo WhatsApp</small></span></div>
              <div className="paid-alert"><Icon name="lock" size={20}/><span><strong>Atendimento particular e pago</strong><small>Você recebe os valores antes de confirmar o agendamento.</small></span></div>
            </div>
            <div className="services-grid">
              {services.map((service, i) => (
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
            <div className="services-note"><Icon name="shield" size={20}/><span><strong>Não sabe qual atendimento escolher?</strong> Conte brevemente o que está acontecendo. Sua situação será ouvida com cuidado e você receberá as informações e valores antes de decidir.</span></div>
          </div>
        </section>

        <section className="steps section">
          <div className="container">
            <div className="section-heading">
              <span className="kicker">Simples, humano e confidencial</span>
              <h2>Seu atendimento começa em três passos.</h2>
            </div>
            <div className="steps-grid">
              <article><span className="step-index" aria-hidden="true">01</span><Icon name="message" size={28}/><h3>Envie uma mensagem</h3><p>Conte, no seu tempo, o que você está vivendo e o tipo de orientação que busca.</p></article>
              <article><span className="step-index" aria-hidden="true">02</span><Icon name="clock" size={28}/><h3>Escolha o horário</h3><p>Combine um horário para seu atendimento 100% online.</p></article>
              <article><span className="step-index" aria-hidden="true">03</span><Icon name="compass" size={28}/><h3>Receba orientação</h3><p>Tenha uma conversa individual para compreender seu momento e enxergar possibilidades.</p></article>
            </div>
            <div className="center"><CTA>Dar o primeiro passo</CTA><small>Você receberá todas as informações antes de agendar.</small></div>
          </div>
        </section>

        <section className="testimonials section" id="depoimentos">
          <div className="container">
            <div className="section-heading testimonial-heading">
              <span className="kicker">Experiências compartilhadas</span>
              <h2>O que as pessoas dizem sobre o atendimento.</h2>
              <p>Mais do que respostas, cada pessoa procura ser ouvida com atenção, respeito e sinceridade.</p>
            </div>
            <div className="video-testimonials">
              <div className="video-section-title"><span><Icon name="message" size={17}/></span><div><strong>Depoimentos em vídeo</strong><small>Assista aos relatos enviados após o atendimento</small></div></div>
              <div className="video-testimonials-grid">
                {testimonialVideos.map((video, index) => (
                  <article className="video-testimonial-card" key={video}>
                    <div className="video-frame">
                      <video className="testimonial-video" src={video} poster={index % 2 === 0 ? '/assets/pai-julio-sobre-mobile.webp' : '/assets/pai-julio-hero-mobile.webp'} controls playsInline preload="none" onPlay={handleVideoPlay} aria-label={`Depoimento em vídeo ${index + 1}`}>Seu navegador não suporta vídeos.</video>
                      <span className="video-badge"><span></span> Depoimento {index + 1}</span>
                    </div>
                    <div className="video-card-meta"><strong>Relato de atendimento</strong><small>Toque no vídeo para assistir</small></div>
                  </article>
                ))}
              </div>
              <p className="video-scroll-hint">Deslize para assistir aos outros vídeos <span>→</span></p>
            </div>
            <div className="comments-divider"><span>Comentários escritos</span></div>
            <div className="comments-panel">
              <div className="comments-toolbar">
                <div><strong>{testimonialComments.length} comentários</strong><small>Comentários demonstrativos</small></div>
                <button><span>Mais relevantes</span><b>⌄</b></button>
              </div>
              <div className="comments-list">
                {testimonialComments.map((comment, index) => (
                  <article className={`social-comment ${index >= 3 && !showAllComments ? 'comment-mobile-extra' : ''}`} key={comment.name}>
                    <span className="comment-avatar" style={{ background: comment.color }}>{comment.initials}</span>
                    <div className="comment-main">
                      <div className="comment-bubble">
                        <div className="comment-name">{comment.name}<span title="Perfil verificado">✓</span></div>
                        <p>{comment.text}</p>
                        {comment.likes > 14 && <span className="reaction-count"><span>👍</span><span>❤</span>{comment.likes}</span>}
                      </div>
                      <div className="comment-actions"><button>Curtir</button><button>Responder</button><span>{comment.time}</span></div>
                      {comment.reply && (
                        <div className="comment-reply">
                          <span className="reply-avatar">PJ</span>
                          <div><div className="comment-bubble"><div className="comment-name">Pai Júlio <span>✓</span></div><p>{comment.reply}</p></div><div className="comment-actions"><button>Curtir</button><button>Responder</button><span>2 sem</span></div></div>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
              <button className="load-comments" onClick={() => setShowAllComments(!showAllComments)}>{showAllComments ? 'Mostrar menos comentários' : 'Ver mais comentários'}</button>
              <div className="comments-disclaimer"><Icon name="eye" size={15}/><span><strong>Conteúdo ilustrativo para demonstração visual.</strong> Substitua estes exemplos por avaliações reais antes da publicação. Experiências individuais podem variar.</span></div>
            </div>
          </div>
        </section>

        <section className="conversion section">
          <div className="container conversion-card">
            <div>
              <span className="kicker">Você não precisa continuar carregando essa dúvida</span>
              <h2>Uma conversa pode ajudar você a enxergar o próximo passo.</h2>
              <p>Fale diretamente pelo WhatsApp. O primeiro contato é simples, discreto e sem compromisso.</p>
            </div>
            <div className="conversion-action">
              <CTA>Quero falar com Pai Júlio</CTA>
              <small className="conversion-paid"><Icon name="lock" size={14}/> Atendimento particular e pago • valores informados no WhatsApp</small>
            </div>
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
            <span className="kicker">Seu novo caminho pode começar hoje</span>
            <h2>Permita-se buscar a clareza que você merece.</h2>
            <p>Conte o que está acontecendo e agende sua conversa com Pai Júlio.</p>
            <CTA>Agendar pelo WhatsApp</CTA>
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

      {showNotification && (
        <aside className="activity-notification" key={notificationIndex} aria-live="polite">
          <span className="activity-status"><Icon name="check" size={21}/></span>
          <span className="activity-copy">
            <strong>{activityNotifications[notificationIndex].name} {activityNotifications[notificationIndex].message}</strong>
            <small>{activityNotifications[notificationIndex].time} • ambiente de estudo</small>
          </span>
          <button onClick={() => setShowNotification(false)} aria-label="Fechar notificação">×</button>
        </aside>
      )}
    </div>
  );
}

const normalizedPath = `${window.location.pathname.replace(/\/$/, '')}/`;
const currentSitelinkPage = sitelinkPages[normalizedPath];

createRoot(document.getElementById('root')).render(currentSitelinkPage ? <SitelinkPage page={currentSitelinkPage}/> : <App />);
