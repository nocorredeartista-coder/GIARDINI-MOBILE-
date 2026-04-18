/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Smartphone, 
  ShieldCheck, 
  Truck, 
  BadgeCheck, 
  MessageCircle, 
  Users, 
  ArrowRight, 
  Clock, 
  CheckCircle2,
  Menu,
  X,
  CreditCard,
  Target
} from "lucide-react";
import React, { useState, useEffect } from "react";

const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/DD9hPkQRo4kAvbhb7VO75g";

const getWhatsAppLink = (product?: Product) => {
  const phone = "5511952074547";
  const baseUrl = "https://api.whatsapp.com/send";
  
  if (!product) {
    const text = encodeURIComponent("Olá Felipe! Vim pelo site da Giardini Mobile e gostaria de iniciar um atendimento.");
    return `${baseUrl}?phone=${phone}&text=${text}`;
  }
  
  const condition = product.type === "Seminovo" ? "Seminovo (Bateria 85-95%)" : "Novo Lacrado";
  const message = `Olá Felipe! Tenho interesse no ${product.name} ${product.storage} ${condition} que vi no site por R$ ${product.price}. Ainda está disponível?`;
  const text = encodeURIComponent(message);
  
  return `${baseUrl}?phone=${phone}&text=${text}`;
};

interface Product {
  name: string;
  storage: string;
  price: string;
  type: "Seminovo" | "Lacrado";
  battery?: string;
}

const USED_IPHONES: Product[] = [
  { name: "iPhone 16 Pro Max", storage: "512GB", price: "5.700,00", type: "Seminovo" },
  { name: "iPhone 16 Pro Max", storage: "256GB", price: "5.450,00", type: "Seminovo" },
  { name: "iPhone 16 Pro Max", storage: "512GB", price: "5.900,00", type: "Seminovo" },
  { name: "iPhone 16 Pro Max", storage: "256GB", price: "5.400,00", type: "Seminovo" },
  { name: "iPhone 16 Pro", storage: "128GB", price: "4.550,00", type: "Seminovo" },
  { name: "iPhone 15 Pro", storage: "128GB", price: "3.599,00", type: "Seminovo" },
  { name: "iPhone 15", storage: "128GB", price: "3.000,00", type: "Seminovo" },
  { name: "iPhone 14 Pro", storage: "128GB", price: "3.200,00", type: "Seminovo" },
  { name: "iPhone 14 Plus", storage: "128GB", price: "2.500,00", type: "Seminovo" },
  { name: "iPhone 14", storage: "128GB", price: "2.150,00", type: "Seminovo" },
];

const SEALED_IPHONES: Product[] = [
  { name: "iPhone 17 Pro Max", storage: "512GB", price: "9.500,00", type: "Lacrado" },
  { name: "iPhone 17 Pro Max", storage: "256GB", price: "8.600,00", type: "Lacrado" },
  { name: "iPhone 17 Pro", storage: "256GB", price: "7.650,00", type: "Lacrado" },
  { name: "iPhone 17 E", storage: "256GB", price: "4.200,00", type: "Lacrado" },
  { name: "iPhone 17", storage: "256GB", price: "5.500,00", type: "Lacrado" },
  { name: "iPhone 16 Plus", storage: "256GB", price: "5.600,00", type: "Lacrado" },
  { name: "iPhone 16", storage: "128GB", price: "4.650,00", type: "Lacrado" },
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen selection:bg-accent/30 selection:text-white overflow-x-hidden relative">
      <div className="atmosphere" />
      {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass-morphism py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Smartphone className="text-zinc-950 w-6 h-6" />
            </div>
            <span className="text-xl font-display font-bold tracking-tighter uppercase italic">
              Giardini <span className="text-zinc-400">Mobile</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("seminovos")} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Seminovos</button>
            <button onClick={() => scrollToSection("lacrados")} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Lacrados</button>
            <button onClick={() => scrollToSection("seguranca")} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Segurança</button>
            <a 
              href={WHATSAPP_GROUP_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-white text-zinc-950 font-bold text-sm rounded-full hover:bg-zinc-200 transition-all"
            >
              ENTRAR NO GRUPO
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 glass-morphism p-6 flex flex-col gap-6 md:hidden"
          >
            <button onClick={() => scrollToSection("seminovos")} className="text-lg font-medium text-zinc-400">Seminovos</button>
            <button onClick={() => scrollToSection("lacrados")} className="text-lg font-medium text-zinc-400">Lacrados</button>
            <button onClick={() => scrollToSection("seguranca")} className="text-lg font-medium text-zinc-400">Segurança</button>
            <a 
              href={WHATSAPP_GROUP_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-4 bg-white text-zinc-950 font-bold text-center rounded-xl"
            >
              GRUPO DE PROMOÇÕES
            </a>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Oportunidade única
            </div>
            
            <h1 className="text-5xl md:text-8xl font-display font-extrabold tracking-tighter mb-6 leading-[0.9]">
              IPHONES COM <br />
              <span className="text-gradient-accent uppercase">OPORTUNIDADE</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Modelos seminovos e lacrados, com <span className="text-white font-medium">garantia total</span> e entrega segura. O seu próximo iPhone está aqui.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href={WHATSAPP_GROUP_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-whatsapp text-black font-black text-lg rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(37,211,102,0.2)]"
              >
                ENTRAR NO GRUPO <ArrowRight size={20} />
              </a>
              <button 
                onClick={() => window.open(getWhatsAppLink(), '_blank', 'noopener,noreferrer')}
                className="w-full sm:w-auto px-8 py-4 bg-[#25D366] text-white font-bold text-lg rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all cursor-pointer"
              >
                <MessageCircle size={20} /> FALAR NO WHATSAPP
              </button>
            </div>

            <p className="mt-8 text-sm text-zinc-500">
              Receba as melhores ofertas antes de todo mundo no grupo.
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      </section>

      {/* Urgency Banner */}
      <div className="urgency-banner-gradient border-y border-glass-border py-4 overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee gap-10 items-center">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-accent font-bold uppercase tracking-widest text-[11px] flex items-center gap-2">
                <Clock size={14} /> OFERTAS LIMITADAS
              </span>
              <span className="text-zinc-700">•</span>
              <span className="text-accent font-bold uppercase tracking-widest text-[11px] flex items-center gap-2">
                 QUEM ENTRA NO GRUPO COMPRA PRIMEIRO
              </span>
              <span className="text-zinc-700">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Products Sections */}
      <main className="container mx-auto px-6 py-20 space-y-32">
        
        {/* Used section */}
        <section id="seminovos" className="scroll-mt-32">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 italic">IPHONES SEMINOVOS</h2>
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-zinc-400">
              <p className="text-lg">Bateria entre 85% e 95%, aparelhos revisados e com 30 dias de garantia.</p>
              <div className="hidden md:block h-6 w-px bg-zinc-800"></div>
              <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-xs font-bold text-zinc-200">GRADE A+ PERFORMANCE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {USED_IPHONES.map((product, index) => (
              <ProductCard 
                key={index} 
                product={product} 
                onOpenDetails={() => setSelectedProduct(product)} 
              />
            ))}
          </div>
        </section>

        {/* Sealed section */}
        <section id="lacrados" className="scroll-mt-32">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 italic">IPHONES LACRADOS</h2>
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-zinc-400">
              <p className="text-lg">Aparelhos novos, lacrados e com 1 ano de garantia Apple.</p>
              <div className="hidden md:block h-6 w-px bg-zinc-800"></div>
              <span className="px-3 py-1 bg-white/10 border border-white/20 rounded text-xs font-bold text-white">100% ORIGINAL APPLE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SEALED_IPHONES.map((product, index) => (
              <ProductCard 
                key={index} 
                product={product} 
                onOpenDetails={() => setSelectedProduct(product)} 
              />
            ))}
          </div>
        </section>

        <AnimatePresence>
          {selectedProduct && (
            <ProductDetailsModal 
              product={selectedProduct} 
              onClose={() => setSelectedProduct(null)} 
            />
          )}
        </AnimatePresence>

        {/* Trust/Security Section */}
        <section id="seguranca" className="scroll-mt-32 py-20 glass-morphism rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10 blur-xl pointer-events-none">
            <ShieldCheck size={300} strokeWidth={1} />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 italic">COMPRA SEGURA DE VERDADE</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white">
                  <BadgeCheck size={32} />
                </div>
                <h3 className="font-bold text-xl uppercase tracking-tight">Garantia Total</h3>
                <p className="text-zinc-400 leading-relaxed font-light">1 ano de garantia Apple nos lacrados e 30 dias de confiança total nos seminovos.</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white">
                  <Truck size={32} />
                </div>
                <h3 className="font-bold text-xl uppercase tracking-tight">Entrega com Seguro</h3>
                <p className="text-zinc-400 leading-relaxed font-light">Motoboy com seguro. Em caso de acidente ou roubo, você é 100% ressarcido.</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="font-bold text-xl uppercase tracking-tight">Segurança Total</h3>
                <p className="text-zinc-400 leading-relaxed font-light">Reputação impecável. Transacionamos confiança antes de aparelhos.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-10 italic">POR QUE ESCOLHER A <br />GIARDINI MOBILE?</h2>
            <div className="space-y-6">
              {[
                "Preços consideravelmente abaixo do mercado",
                "Aparelhos rigorosamente revisados e selecionados",
                "Promoções exclusivas para membros do grupo",
                "Facilidade de pagamento com as melhores taxas",
                "Atendimento ultra rápido via WhatsApp"
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-zinc-900 transition-colors">
                  <CheckCircle2 className="text-white mt-1 shrink-0" size={24} />
                  <span className="text-lg text-zinc-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square">
            <div className="absolute inset-0 bg-linear-to-br from-zinc-800 to-zinc-950 rounded-[4rem] border border-zinc-800"></div>
            <div className="absolute inset-10 flex flex-col justify-center items-center text-center gap-4">
               <Target size={64} className="text-zinc-500 mb-4" />
               <p className="text-3xl font-display font-medium tracking-tight">"Oportunidades que não ficam disponíveis por muito tempo."</p>
               <p className="text-zinc-500 uppercase tracking-widest text-sm font-bold mt-4">Quem chega primeiro, compra melhor.</p>
            </div>
          </div>
        </section>

         {/* Final CTA Section */}
        <section className="py-20 text-center glass-morphism rounded-[2rem] p-10 md:p-24 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent rounded-full blur-[100px]">
             </div>
           </div>
           
           <h2 className="text-4xl md:text-7xl font-display font-extrabold mb-8 uppercase tracking-tighter">
             AS MELHORES PROMOÇÕES <br />
             <span className="text-gradient-accent uppercase">NÃO FICAM NO SITE</span>
           </h2>
           <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto">
             Entre agora no grupo e receba ofertas exclusivas <br className="hidden md:block" /> antes de todo mundo ser avisado.
           </p>
           
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <a 
               href={WHATSAPP_GROUP_LINK} 
               target="_blank" 
               rel="noopener noreferrer"
               className="w-full sm:w-auto px-10 py-5 bg-whatsapp text-black font-black text-xl rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(37,211,102,0.2)]"
             >
               ENTRAR NO GRUPO AGORA <ArrowRight size={24} />
             </a>
             <a 
               href={getWhatsAppLink()} 
               target="_blank" 
               rel="noopener noreferrer"
               className="w-full sm:w-auto px-10 py-5 bg-transparent border border-glass-border text-white font-bold text-xl rounded-xl flex items-center justify-center gap-2 hover:bg-glass transition-colors"
             >
               <MessageCircle size={24} /> CHAMAR NO WHATSAPP
             </a>
           </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-20 border-t border-zinc-900 text-center">
        <div className="flex flex-col items-center gap-8">
           <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center">
              <Smartphone className="text-white w-4 h-4" />
            </div>
            <span className="text-lg font-display font-bold tracking-tighter uppercase italic">
              Giardini <span className="text-zinc-500">Mobile</span>
            </span>
          </div>
          <p className="text-zinc-500 text-sm max-w-md">
            Giardini Mobile © 2024. Todos os direitos reservados. <br />
            Preços e estoque sujeitos a alteração sem aviso prévio.
          </p>
          <div className="flex items-center gap-6">
            <CreditCard size={20} className="text-zinc-600" />
            <span className="text-zinc-600 text-xs font-bold uppercase tracking-widest">Aceitamos Cartão em até 18x</span>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-[100] scale-90 sm:scale-100">
        <a 
          href={WHATSAPP_GROUP_LINK} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 bg-white text-zinc-950 rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 transition-transform relative group"
          title="Entrar no Grupo"
        >
          <Users size={24} />
          <span className="absolute right-full mr-4 px-3 py-1 bg-zinc-900 text-white text-[10px] uppercase tracking-widest font-black rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 pointer-events-none border border-zinc-800 shadow-xl">
            Ver Ofertas
          </span>
        </a>
        <a 
          href={getWhatsAppLink()} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 transition-transform relative group"
          title="Chamar no WhatsApp"
        >
          <MessageCircle size={24} />
          <span className="absolute right-full mr-4 px-3 py-1 bg-zinc-900 text-white text-[10px] uppercase tracking-widest font-black rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 pointer-events-none border border-zinc-800 shadow-xl">
            Atendimento
          </span>
        </a>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </div>
  );
}

function ProductDetailsModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const handleWhatsAppAction = (e: React.MouseEvent) => {
    // Fallback manual em caso de bloqueio de link no iframe
    const url = getWhatsAppLink(product);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Mapping specs based on product name
  const getSpecs = (name: string) => {
    if (name.includes("17 Pro Max")) return { screen: "6.9\" ProMotion OLED", chip: "A19 Pro", cameras: "48MP + 48MP + 48MP", finish: "Polished Titanium" };
    if (name.includes("17 Pro")) return { screen: "6.3\" ProMotion OLED", chip: "A19 Pro", cameras: "48MP + 48MP + 48MP", finish: "Polished Titanium" };
    if (name.includes("17")) return { screen: "6.1\" Super Retina", chip: "A19", cameras: "48MP + 12MP", finish: "Aero Aluminum" };
    if (name.includes("16 Pro Max")) return { screen: "6.9\" LTPO OLED", chip: "A18 Pro", cameras: "48MP + 48MP + 12MP", finish: "Titanium" };
    if (name.includes("16 Pro")) return { screen: "6.3\" LTPO OLED", chip: "A18 Pro", cameras: "48MP + 48MP + 12MP", finish: "Titanium" };
    if (name.includes("16 Plus")) return { screen: "6.7\" Super Retina", chip: "A18", cameras: "48MP + 12MP", finish: "Aero Aluminum" };
    if (name.includes("16")) return { screen: "6.1\" Super Retina", chip: "A18", cameras: "48MP + 12MP", finish: "Aero Aluminum" };
    if (name.includes("15 Pro")) return { screen: "6.1\" LTPO OLED", chip: "A17 Pro", cameras: "48MP + 12MP + 12MP", finish: "Titanium" };
    if (name.includes("15")) return { screen: "6.1\" Super Retina", chip: "A16 Bionic", cameras: "48MP + 12MP", finish: "Aluminum/Glass" };
    if (name.includes("14 Pro")) return { screen: "6.1\" LTPO OLED", chip: "A16 Bionic", cameras: "48MP + 12MP + 12MP", finish: "Steel/Glass" };
    if (name.includes("14 Plus")) return { screen: "6.7\" Super Retina", chip: "A15 Bionic", cameras: "12MP + 12MP", finish: "Aluminum/Glass" };
    return { screen: "6.1\" Super Retina", chip: "A15 Bionic", cameras: "12MP + 12MP", finish: "Aluminum/Glass" };
  };

  const specs = getSpecs(product.name);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-10">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md"
      ></motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl glass-morphism rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8 md:p-12">
          <div className="mb-10">
            <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
              {product.type} • Especificações Oficiais
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-white leading-none">
              {product.name}
            </h2>
            <p className="text-2xl text-zinc-500 font-display font-bold mt-2">{product.storage}</p>
          </div>

          <div className="grid grid-cols-2 gap-y-10 gap-x-6 mb-12">
            <div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Processador</div>
              <div className="text-white font-medium flex items-center gap-2">
                <CheckCircle2 size={16} className="text-accent" />
                {specs.chip}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Tela</div>
              <div className="text-white font-medium flex items-center gap-2">
                <CheckCircle2 size={16} className="text-accent" />
                {specs.screen}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Câmeras</div>
              <div className="text-white font-medium flex items-center gap-2">
                <CheckCircle2 size={16} className="text-accent" />
                {specs.cameras}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Acabamento</div>
              <div className="text-white font-medium flex items-center gap-2">
                <CheckCircle2 size={16} className="text-accent" />
                {specs.finish}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Condição</div>
              <div className="text-white font-medium flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${product.type === "Seminovo" ? "bg-green-500 animate-pulse" : "bg-accent"}`}></div>
                {product.type === "Seminovo" ? "Saúde 85-95%" : "Lacrado / Garantia Apple"}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Investimento</div>
              <div className="flex items-baseline justify-end gap-1">
                <span className="text-accent text-sm font-bold">R$</span>
                <span className="text-4xl font-display font-black text-white tracking-tighter">{product.price}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={handleWhatsAppAction}
              className="w-full py-5 bg-[#25D366] text-white text-center font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(37,211,102,0.2)] cursor-pointer"
            >
              <MessageCircle size={24} /> Conversar no WhatsApp
            </button>
            <p className="text-xs text-zinc-500 text-center px-10">
              Ao clicar, abriremos o WhatsApp do Felipe para você tirar suas dúvidas.
            </p>
          </div>
        </div>

        {/* Branding Accent */}
        <div className="p-4 bg-zinc-900/50 border-t border-white/5 flex justify-center items-center gap-3">
           <Smartphone size={14} className="text-zinc-600" />
           <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 italic">Giardini Mobile • Genuine Products</span>
        </div>
      </motion.div>
    </div>
  );
}

function ProductCard({ product, onOpenDetails }: { product: Product; key?: React.Key; onOpenDetails: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass-morphism rounded-2xl p-8 flex flex-col gap-6 hover:border-accent/40 transition-all group relative overflow-hidden"
    >
      <div className="flex justify-between items-start">
        <div>
          <span className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest mb-3 inline-block ${
            product.type === "Seminovo" ? "bg-zinc-800 text-zinc-400" : "bg-accent/20 text-accent"
          }`}>
            {product.type}
          </span>
          <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-white group-hover:text-accent transition-colors">
            {product.name}
          </h3>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Capacidade</div>
          <div className="text-xl font-display font-bold text-white tracking-tight">{product.storage}</div>
        </div>
      </div>

      <div className="h-px bg-linear-to-r from-glass-border to-transparent w-full"></div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
            {product.type}
          </div>
          <div className="flex items-center gap-2 text-white font-medium text-sm">
            {product.type === "Seminovo" ? (
              <>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                Média Bateria 85% a 95%
              </>
            ) : (
              <>
                <BadgeCheck size={16} className="text-accent" />
                Lacrado Apple
              </>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Investimento</div>
          <div className="flex items-baseline justify-end gap-1">
            <span className="text-accent text-xs font-bold">R$</span>
            <span className="text-3xl font-display font-black text-white tracking-tighter">{product.price}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <button 
          onClick={onOpenDetails}
          className="w-full py-4 bg-white text-black text-center font-black text-[10px] uppercase tracking-[0.15em] rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
        >
          Quero mais detalhes do aparelho <ArrowRight size={16} />
        </button>
        <p className="text-[10px] text-accent/60 font-bold uppercase tracking-widest text-center">
          <MessageCircle size={12} className="inline mr-1 mb-0.5" />
          Você será direcionado para o WhatsApp do Felipe
        </p>
      </div>

      {/* Decorative Spec Icon */}
      <div className="absolute -bottom-6 -right-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
        <Smartphone size={120} strokeWidth={1} />
      </div>
    </motion.div>
  );
}
