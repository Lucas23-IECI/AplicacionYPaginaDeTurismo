import React, { useState, useEffect } from 'react';

function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#f9f9f8]/70 dark:bg-slate-950/70 backdrop-blur-xl shadow-sm dark:shadow-none transition-colors duration-300">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tight text-[#004D40] dark:text-teal-400 font-headline">
          The Curated Path
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a className="text-[#004D40] dark:text-teal-400 font-bold border-b-2 border-[#004D40] dark:border-teal-400 pb-1 font-headline text-sm tracking-wide" href="#experiencias">Experiencias</a>
          <a className="text-slate-600 dark:text-slate-400 hover:text-[#004D40] dark:hover:text-teal-400 transition-all duration-300 font-headline text-sm tracking-wide font-medium" href="#destinos">Destinos</a>
          <a className="text-slate-600 dark:text-slate-400 hover:text-[#004D40] dark:hover:text-teal-400 transition-all duration-300 font-headline text-sm tracking-wide font-medium" href="#eventos">Eventos</a>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
            aria-label="Toggle dark mode"
          >
            <span className="material-symbols-outlined">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <a className="text-slate-600 dark:text-slate-400 hover:text-[#004D40] dark:hover:text-teal-400 font-headline text-sm font-medium px-4 py-2 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-full transition-all" href="#">Login</a>
          <button className="bg-primary dark:bg-teal-600 text-on-primary px-6 py-2.5 rounded-full font-headline text-sm font-bold tracking-wide scale-95 active:scale-90 transition-transform hover:bg-primary/90 dark:hover:bg-teal-500">
            Anunciantes
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero({ onSearch, isSearching }: { onSearch: (query: string) => void, isSearching: boolean }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <section className="relative px-8 pt-12 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <span className="inline-block px-4 py-1.5 bg-secondary-container dark:bg-teal-900/30 text-on-secondary-container dark:text-teal-300 rounded-full text-xs font-bold tracking-widest uppercase mb-6">Redescubre lo local</span>
            <h1 className="text-6xl md:text-7xl font-headline font-extrabold tracking-tight text-primary dark:text-teal-50 leading-tight mb-8">
              Experiencias que <br /> <span className="italic text-secondary dark:text-teal-400">dejan huella.</span>
            </h1>
            <p className="text-lg text-on-surface-variant dark:text-slate-300 max-w-lg mb-12 leading-relaxed">
              Acceso exclusivo a los secretos mejor guardados de España. Curado por expertos locales, diseñado para el viajero exigente.
            </p>
          </div>
          <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <img className="w-full h-full object-cover" alt="Luxurious infinity pool overlooking the Mediterranean coast at sunrise with golden warm lighting and calm atmosphere" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaJwZPx_AQ0mT-OnDsI4XCc_ZO1XAJ8Nb-9jKtDqjDsbVmo9uXTKtxGzP-b5KBwuOaOeqtuwHViAwx5IlAlVWw-R8e_ahtRwT6rPejas5rLof7w8NQIgSLHvqOt24DqnOYNxQgizag2wBEwWr9zlDVKC8QTFlLyA0Fq6lEssCPigx03PqelJI2zOcbM5H0OnQB-Cn7QO8FNO69nWWL9rMomsTcNtqOnG4eP3IVKaWKAzycJbzX2b4E6Dt1h9wQdNShl5dFzqRdGUCq" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 dark:from-slate-900/80 to-transparent"></div>
          </div>
        </div>
        {/* Visual Search Experience Module */}
        <div className="mt-[-80px] relative z-20 max-w-5xl mx-auto">
          <div className="bg-surface-container-lowest dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl flex flex-col md:flex-row items-center gap-6 border border-slate-200 dark:border-slate-700">
            <div className="flex-1 w-full space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-outline dark:text-slate-400 px-1">Ubicación</label>
              <div className="flex items-center bg-surface-container-low dark:bg-slate-900 px-4 py-3 rounded-lg group focus-within:bg-surface-container-lowest dark:focus-within:bg-slate-800 focus-within:ring-2 ring-primary/30 dark:ring-teal-500/50 transition-all border border-transparent dark:border-slate-700">
                <span className="material-symbols-outlined text-outline dark:text-slate-500 group-focus-within:text-primary dark:group-focus-within:text-teal-400 transition-colors">location_on</span>
                <input 
                  className="bg-transparent border-none focus:ring-0 w-full text-on-surface dark:text-slate-200 placeholder:text-outline-variant dark:placeholder:text-slate-500 font-medium outline-none ml-2" 
                  placeholder="¿A dónde quieres ir?" 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
            <div className="w-full md:w-32 space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-outline dark:text-slate-400 px-1">Radio</label>
              <div className="flex items-center bg-surface-container-low dark:bg-slate-900 px-4 py-3 rounded-lg focus-within:ring-2 ring-primary/30 dark:ring-teal-500/50 transition-all border border-transparent dark:border-slate-700">
                <select className="bg-transparent border-none focus:ring-0 w-full text-on-surface dark:text-slate-200 font-medium outline-none cursor-pointer">
                  <option>10 km</option>
                  <option>25 km</option>
                  <option>50 km</option>
                  <option>100 km</option>
                </select>
              </div>
            </div>
            <div className="w-full md:w-44 space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-outline dark:text-slate-400 px-1">Fecha</label>
              <div className="flex items-center bg-surface-container-low dark:bg-slate-900 px-4 py-3 rounded-lg focus-within:ring-2 ring-primary/30 dark:ring-teal-500/50 transition-all border border-transparent dark:border-slate-700">
                <span className="material-symbols-outlined text-outline dark:text-slate-500">calendar_today</span>
                <input className="bg-transparent border-none focus:ring-0 w-full text-on-surface dark:text-slate-200 font-medium text-sm outline-none ml-2 cursor-pointer dark:[color-scheme:dark]" type="date" />
              </div>
            </div>
            <div className="w-full md:w-44 space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-outline dark:text-slate-400 px-1">Categoría</label>
              <div className="flex items-center bg-surface-container-low dark:bg-slate-900 px-4 py-3 rounded-lg focus-within:ring-2 ring-primary/30 dark:ring-teal-500/50 transition-all border border-transparent dark:border-slate-700">
                <span className="material-symbols-outlined text-outline dark:text-slate-500">category</span>
                <select className="bg-transparent border-none focus:ring-0 w-full text-on-surface dark:text-slate-200 font-medium outline-none ml-2 cursor-pointer">
                  <option>Todas</option>
                  <option>Gastronomía</option>
                  <option>Aventura</option>
                  <option>Cultura</option>
                  <option>Relax</option>
                </select>
              </div>
            </div>
            <button 
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-primary dark:bg-teal-600 text-on-primary px-10 py-4 rounded-full font-bold shadow-lg shadow-primary/20 dark:shadow-teal-900/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center min-w-[140px]"
            >
              {isSearching ? (
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
              ) : (
                'Buscar'
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBlock() {
  return (
    <section className="bg-surface-container-low py-12 mb-24">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-surface-container-lowest rounded-full flex items-center justify-center text-primary shadow-sm">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
          </div>
          <div>
            <h3 className="font-headline font-bold text-xl text-primary">Calidad garantizada</h3>
            <p className="text-on-surface-variant text-sm">Cada experiencia es revisada personalmente por nuestro equipo de conserjes digitales.</p>
          </div>
        </div>
        <div className="h-px md:h-12 w-full md:w-px bg-outline-variant/30"></div>
        <div className="flex items-center gap-4 text-secondary font-bold font-headline">
          <span className="material-symbols-outlined">star</span>
          <span className="text-2xl">4.9/5</span>
          <span className="text-on-surface-variant font-normal text-sm">Valoración media de usuarios</span>
        </div>
      </div>
    </section>
  );
}

function FeaturedExperiences({ filterQuery }: { filterQuery: string }) {
  const allExperiences = [
    {
      category: "GASTRONOMÍA",
      distance: "3.2 km",
      date: "15 Oct, 2024",
      title: "Cata Privada en Bodega Subterránea",
      location: "Madrid, España",
      price: "120€",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCheAp2ZjTcFvgoSLePWArdlPGGbzlacz6PEbamD0UeQ_8BjLdTs0Wbel233jtO3fFzwxs1201VboyOgyvxcxKChtPxcz80WedcWsj3XXw6x7nelaKdRVjXHJapgDSq7v9_QCncBaIzlPASCAaioQU2MCQgiuzxN7vsuiFP0xno1m_mMPBEzMwEvZeMT1imY5uygowi3LtVTrtRQ4D--6nDnI-0Kev-fnPL0KEFgzQHYrSrOYn1o7XjHTOvWI5h4FTmHWZ_BgeKUipm"
    },
    {
      category: "CULTURA",
      distance: "0.8 km",
      date: "18 Oct, 2024",
      title: "Tour Nocturno: Mitos y Leyendas",
      location: "Sevilla, España",
      price: "45€",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJtAADBINFlJqd-u7fX4P2WvyGlXrEry4Aw3bKd6YE9HUP3wcgIYKu5slmm7UXoUJa19HT-WvxYNFJ-L39kxDDWSNfSSVE8yJcXbd7NXvG8Tzh7-RxgjjXtxd9sBgsy6HzoJXbp93WZu-W5Jv5TzWhKmrmEA4sYXqqgSlg1F8X0AIjyRiasKTXKt9zQocEWmKcgMUrAe9uhuI7eWmns3lxxZyePkD25qCKsy-nNm7wxjmHTtW_dS-OiX0GELcxNO8OXeSsW0SQEO9-"
    },
    {
      category: "AVENTURA",
      distance: "15 km",
      date: "20 Oct, 2024",
      title: "Senderismo al Amanecer en Sierra Nevada",
      location: "Granada, España",
      price: "60€",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBS3rCK6MHm-MfneYAPJKA38_rNxKjw9rh-Oq0V_za8CUmM5-VlfkmWPlsznZMUI7-nArlcYxqRMal17n5PmpehyHUzc3SL7lpRO9O9-_4vp7oHRv7-h_EsvRoFcUkz7R89F5vJCmIZ9lXLQMNDn1HZk_Yv1ostsrrfxvBQH2PDLnPPhKRCGe7NPVee4uJ8vW5ZAS7fORQHImQ-qr09XDrBuhH7p50IULEIApJ9oDWLlDoKMCoueLW7R_TxE9qP0YTmX7QfpB9-J9NI"
    }
  ];

  const experiences = filterQuery 
    ? allExperiences.filter(exp => 
        exp.title.toLowerCase().includes(filterQuery.toLowerCase()) || 
        exp.location.toLowerCase().includes(filterQuery.toLowerCase()) ||
        exp.category.toLowerCase().includes(filterQuery.toLowerCase())
      )
    : allExperiences;

  return (
    <section id="experiencias" className="px-8 mb-32 max-w-7xl mx-auto scroll-mt-32">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-headline font-extrabold text-primary dark:text-teal-400 mb-4 tracking-tight">Experiencias Destacadas</h2>
          <p className="text-on-surface-variant dark:text-slate-400 max-w-md">Una selección de las actividades más exclusivas para este fin de semana.</p>
        </div>
        <a className="text-primary dark:text-teal-400 font-bold border-b-2 border-primary/20 dark:border-teal-400/30 hover:border-primary dark:hover:border-teal-400 transition-all pb-1 mb-2" href="#">Ver todas</a>
      </div>
      
      {experiences.length === 0 ? (
        <div className="text-center py-20 bg-surface-container-lowest dark:bg-slate-800/50 rounded-xl border border-dashed border-outline-variant dark:border-slate-700">
          <span className="material-symbols-outlined text-6xl text-outline-variant dark:text-slate-600 mb-4">search_off</span>
          <h3 className="text-xl font-bold text-on-surface dark:text-slate-300 mb-2">No se encontraron experiencias</h3>
          <p className="text-on-surface-variant dark:text-slate-500">Intenta con otra ubicación o categoría.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, idx) => (
            <div key={idx} className="bg-surface-container-lowest dark:bg-slate-800 rounded-xl overflow-hidden group hover:shadow-2xl dark:hover:shadow-teal-900/20 transition-all duration-500 flex flex-col h-full border border-transparent dark:border-slate-700">
              <div className="relative h-64 overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={exp.title} src={exp.image} />
                <div className="absolute top-4 left-4 px-3 py-1 bg-surface-bright/90 dark:bg-slate-900/90 backdrop-blur text-[10px] font-bold tracking-widest uppercase rounded-full text-primary dark:text-teal-400">{exp.category}</div>
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-tertiary-fixed dark:bg-teal-900 text-on-tertiary-fixed dark:text-teal-100 text-[10px] font-bold rounded-full">{exp.distance}</div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-xs text-outline dark:text-slate-400 mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">calendar_today</span> {exp.date}
                </p>
                <h4 className="text-xl font-headline font-bold text-primary dark:text-teal-50 mb-2">{exp.title}</h4>
                <p className="text-on-surface-variant dark:text-slate-400 text-sm mb-6">{exp.location}</p>
                <div className="mt-auto flex justify-between items-center border-t border-surface-container-low dark:border-slate-700 pt-4">
                  <span className="text-secondary dark:text-teal-400 font-bold">{exp.price} <span className="text-xs font-normal text-outline dark:text-slate-500">/ persona</span></span>
                  <span className="material-symbols-outlined text-outline dark:text-slate-500 hover:text-primary dark:hover:text-teal-400 transition-colors cursor-pointer">favorite</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function CalendarPreview() {
  const days = [
    { day: "Hoy", date: "12", month: "Octubre", active: true },
    { day: "Dom", date: "13", month: "Octubre", active: false },
    { day: "Lun", date: "14", month: "Octubre", active: false },
    { day: "Mar", date: "15", month: "Octubre", active: false },
    { day: "Mié", date: "16", month: "Octubre", active: false },
    { day: "Jue", date: "17", month: "Octubre", active: false },
  ];

  return (
    <section className="bg-surface-container-low py-24 mb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-headline font-extrabold text-primary mb-6">Tu Agenda de Ocio</h2>
            <p className="text-on-surface-variant mb-8">Navega por fechas y descubre qué sucede a tu alrededor. El tiempo es el lujo más valioso.</p>
            <button className="bg-surface-container-highest text-primary px-8 py-3 rounded-full font-bold hover:bg-primary hover:text-on-primary transition-all flex items-center gap-2 group">
              Explorar Calendario <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
          <div className="md:w-2/3 flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
            {days.map((d, idx) => (
              <div key={idx} className={`flex-none w-28 p-6 rounded-xl text-center flex flex-col gap-2 transition-all cursor-pointer ${d.active ? 'bg-surface-container-lowest border-2 border-primary' : 'bg-surface-container-lowest hover:bg-primary/5'}`}>
                <span className="text-[10px] uppercase font-bold tracking-widest text-outline">{d.day}</span>
                <span className={`text-4xl font-headline font-extrabold ${d.active ? 'text-primary' : 'text-on-surface'}`}>{d.date}</span>
                <span className={`text-sm font-medium ${d.active ? 'text-secondary' : 'text-outline'}`}>{d.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Destinations() {
  const destinations = [
    {
      name: "Barcelona",
      count: "42 Experiencias",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3NNU8WfSxraTgTHMvnb1JXOJIh1isFTFuSp4igkrn0eOANK0vBIUDtrmJXv-sBmMNpZ_8-1mLUBvVkF0oDyNmjfhUPqwk0EpOwmgHkAD53yE83NUrfpZxqkSp-A9F6nA620zEHMRh6yISgdqDM7wUWCt2W0U2lEWNa5OxLkk8xkLsOEU_l62hOhbj8_Lba4PGPGK78wgph5Yc6O9TXDDoViDwADZ1YjsCmpdMRyr80RG-DxrQG6NxkWAZFUsw77Z-lLuTkU3iJzsY"
    },
    {
      name: "Madrid",
      count: "68 Experiencias",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaaDvZUpVhD_bvXsqVU38cCtU5z-Z8ljlfjvvYAS1LagSNIEf7rkasnR1nWvvG9-4gJXrZCAfL0PkJ9QPZBY_VOcCfVs-2gmOjmXcpVNpH2SqGt8BE2r3-MWqyTsvsTIzOeviW-gbZvTXqFFIztL2sYWVnFFOVK82zqTJhq-lFx4bvy04j1SMAWb4yzhAQivlABPGPOWgimGBsOWlIjVE08X-IPkRogvhdI1ykZEXPdH77Fp0GQF3ConEg7LItM5dJy4468ENvyyZG"
    },
    {
      name: "Andalucía",
      count: "124 Experiencias",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9Ao3ImWUi7sx2kvCdPgu99rZh-rQLX0ZAuFGISEWvduh46RoJaXhmJOzDpNvpvdRcitvAsYn3uALi-iJxFm9bagnAxNp2mqRKDKoChsgjCPNjclUGqmB6N_bnD3HJJ_h9QTu37hXVtNnBGj0MRkIILxgiz6pBdXRdGOVQE4u9AZENqweVp-owj69yQpBMboTuNdQeB72xHerXzAk6nbLVQG5ni_GvoKpsjQNPVxEACPADLocuE-8WpYqcsT6qcAoDtDFo7anKdLr3"
    },
    {
      name: "Islas Baleares",
      count: "35 Experiencias",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuByfOg-S5G3BQUtAuvWlBtgfJ5UcD_4l4KHxZEm8nwzWEHo2np14Sh3b7BzfhGN6sQwQ15dnDhVVqL-yzZbRVQ1PRGerpyUyIHVCr8ytznYKBzhNWcmqDlvh6SXY_2FV0xdiT9U_f-V4K-akxuP9HocW2E7XbmEDGVSb8AEAUZR8hAMeZsTsRJac9vGLYiyNlei-HEGm4I1rkXYiOBKJ4t-bPn4wb6FnWXHwiISIRSpw7HHK-8ygSHcON97uwII-sWK99wwhQLsFCBV"
    }
  ];

  return (
    <section id="destinos" className="max-w-7xl mx-auto px-8 mb-32 scroll-mt-32">
      <h2 className="text-3xl font-headline font-extrabold text-primary dark:text-teal-400 mb-12 tracking-tight">Nuestros Destinos Preferidos</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {destinations.map((dest, idx) => (
          <a key={idx} className="group relative h-80 rounded-xl overflow-hidden" href="#">
            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={dest.name} src={dest.image} />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
            <div className="absolute bottom-6 left-6">
              <h5 className="text-white text-2xl font-bold font-headline">{dest.name}</h5>
              <p className="text-white/80 text-sm">{dest.count}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function FeaturedEvent() {
  return (
    <section id="eventos" className="px-8 mb-32 scroll-mt-32">
      <div className="max-w-7xl mx-auto bg-primary dark:bg-teal-900 rounded-xl overflow-hidden relative min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img className="w-full h-full object-cover opacity-60" alt="Jazz festival" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqZsBUQKqwY9ZkoY0DvoPgT6WBgO3-L8fZq_66vCFO5haPn4wgFWYWT9dk7Ls0Nj9ImUwbjrstTqO3P0kIkpGr0wL9-IfoYpBNSYSDfRH9K-a16ruzSDRqwf73YuvYe8FGaQqDjDvmruiaXYH43t5zjlNudJO1_xFTY_Esu4ujy2ungt5mobvA3gfAHUkU2qEjIo78gQmwYSgSYBS2AFQDKOph-8HBmGEUEmxs_Zgr1anSa0DRpsLMCrYcoTP3mtFulMRVcE4aaL02" />
        </div>
        <div className="relative z-10 p-12 md:p-24 max-w-2xl">
          <span className="inline-block px-4 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-xs font-bold mb-6">EVENTO DEL MES</span>
          <h2 className="text-5xl md:text-6xl font-headline font-extrabold text-white mb-8 leading-tight">Jazz en los Viñedos: <br />Edición Otoño</h2>
          <p className="text-white/80 text-lg mb-10 leading-relaxed">
            Una velada mágica que combina el mejor jazz contemporáneo con una cena maridada en el corazón de la Rioja Alavesa. Solo 50 plazas disponibles.
          </p>
          <div className="flex flex-wrap gap-8 items-center">
            <button className="bg-white text-primary px-10 py-4 rounded-full font-bold hover:scale-105 active:scale-95 transition-all">
              Reservar mi plaza
            </button>
            <div className="flex items-center gap-4 text-white">
              <span className="material-symbols-outlined text-3xl">map</span>
              <div>
                <p className="text-xs uppercase opacity-70">Ubicación</p>
                <p className="font-bold">Haro, La Rioja</p>
              </div>
            </div>
          </div>
        </div>
        {/* Map Preview Overlay (Glassmorphism) */}
        <div className="absolute bottom-8 right-8 hidden lg:block w-80 h-80 rounded-xl overflow-hidden border border-white/20 backdrop-blur-xl bg-white/10 shadow-2xl">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover grayscale opacity-40" alt="Map of Haro" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCogp6lgoCAOfOqF8s9dqX2TW6RTMOTelnWUVNNmJgbCGfBEBz6LGWtJtvwP2fpwwXY-99zDRBdjLoyYrMt961jtoBUoL4YBhH2Qp_bdBZp8Q-AwGGnD9Sdc1ZcQD8-bQP5YFcPAGE99HtDrxK9FHv6KJzQnhJ18YKa7acW4KNyb9GFxmwi4mW8l-qmYbwZDC7OV4Ml_mQMcqyKF0LDwW8_vynV3W73FK9HbABEZ6lb3axBChTsxP0FM7rAryE3AO-3ljxut_GEW1fB" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-4 h-4 bg-primary-fixed ring-8 ring-primary-fixed/30 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-white text-xs font-bold uppercase tracking-widest">Punto de encuentro</p>
            <p className="text-white/80 text-[10px]">Bodegas Marqués del Siglo, Haro</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function OrganizerCTA() {
  return (
    <section className="max-w-5xl mx-auto px-8 mb-32">
      <div className="bg-surface-container-high rounded-xl p-12 text-center relative overflow-hidden">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-secondary/5 rounded-full blur-3xl"></div>
        <h3 className="text-3xl font-headline font-extrabold text-primary mb-6">¿Eres organizador de experiencias?</h3>
        <p className="text-on-surface-variant max-w-2xl mx-auto mb-10 text-lg">
          Únete a la red más exclusiva de anfitriones locales. Publica tus actividades y llega a un público que valora la autenticidad y la excelencia.
        </p>
        <button className="bg-primary text-on-primary px-12 py-4 rounded-full font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
          Publica tu experiencia
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#f3f4f3] dark:bg-slate-900 w-full mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8 py-16 max-w-7xl mx-auto">
        <div className="space-y-6">
          <div className="text-xl font-bold text-[#004D40] dark:text-teal-400 font-headline">The Curated Path</div>
          <p className="text-slate-500 dark:text-slate-400 font-body text-sm leading-relaxed max-w-xs">
            Tu conserje digital para las experiencias más exclusivas y auténticas. Redefiniendo el turismo de lujo a través de la curaduría local.
          </p>
          <div className="flex gap-4">
            <a className="w-10 h-10 bg-surface-container-high rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all" href="#">
              <span className="material-symbols-outlined text-lg">share</span>
            </a>
            <a className="w-10 h-10 bg-surface-container-high rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all" href="#">
              <span className="material-symbols-outlined text-lg">mail</span>
            </a>
          </div>
        </div>
        <div>
          <h6 className="text-[#004D40] font-semibold font-headline mb-6">Explorar</h6>
          <ul className="space-y-4 font-body text-sm">
            <li><a className="text-slate-500 dark:text-slate-400 hover:text-[#004D40] dark:hover:text-teal-400 underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity" href="#">Experiencias Populares</a></li>
            <li><a className="text-slate-500 dark:text-slate-400 hover:text-[#004D40] dark:hover:text-teal-400 underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity" href="#">Destinos Premium</a></li>
            <li><a className="text-slate-500 dark:text-slate-400 hover:text-[#004D40] dark:hover:text-teal-400 underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity" href="#">Eventos de Temporada</a></li>
            <li><a className="text-slate-500 dark:text-slate-400 hover:text-[#004D40] dark:hover:text-teal-400 underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity" href="#">Guía para Anfitriones</a></li>
          </ul>
        </div>
        <div>
          <h6 className="text-[#004D40] font-semibold font-headline mb-6">Legal & Soporte</h6>
          <ul className="flex flex-wrap gap-x-8 gap-y-4 font-body text-sm">
            <li><a className="text-slate-500 dark:text-slate-400 hover:text-[#004D40] dark:hover:text-teal-400 underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity" href="#">Mapa del sitio</a></li>
            <li><a className="text-slate-500 dark:text-slate-400 hover:text-[#004D40] dark:hover:text-teal-400 underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity" href="#">Contacto</a></li>
            <li><a className="text-slate-500 dark:text-slate-400 hover:text-[#004D40] dark:hover:text-teal-400 underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity" href="#">Aviso Legal</a></li>
            <li><a className="text-slate-500 dark:text-slate-400 hover:text-[#004D40] dark:hover:text-teal-400 underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity" href="#">Privacidad</a></li>
            <li><a className="text-slate-500 dark:text-slate-400 hover:text-[#004D40] dark:hover:text-teal-400 underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity" href="#">Términos</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 py-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-xs">© 2024 The Curated Path. Digital Concierge Excellence.</p>
        <div className="flex gap-6">
          <span className="material-symbols-outlined text-outline">language</span>
          <span className="text-xs text-outline font-medium">ESPAÑOL (ES)</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [filterQuery, setFilterQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    setIsSearching(true);
    // Simulate network request
    setTimeout(() => {
      setFilterQuery(query);
      setIsSearching(false);
      // Scroll to experiences section
      document.getElementById('experiencias')?.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  };

  return (
    <div className="bg-surface dark:bg-slate-950 text-on-surface dark:text-slate-200 font-body selection:bg-primary-fixed-dim selection:text-primary-container min-h-screen transition-colors duration-300">
      <Navbar />
      <main className="pt-24">
        <Hero onSearch={handleSearch} isSearching={isSearching} />
        <TrustBlock />
        <FeaturedExperiences filterQuery={filterQuery} />
        <CalendarPreview />
        <Destinations />
        <FeaturedEvent />
        <OrganizerCTA />
      </main>
      <Footer />
    </div>
  );
}
