'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import CollectionPointCard from '../components/CollectionPointCard';
import { Search, Leaf, X, Filter, Layers } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

export default function PontosDeColetaPage() {
  const [pontos, setPontos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [map, setMap] = useState(null);

  const fetchPontos = (tipo = '') => {
    setLoading(true);
    let url = 'http://localhost:8080/api/collection-points';
    if (tipo) url += `/search/by-type?tipoResiduo=${tipo}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPontos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchPontos();
    import('leaflet').then(L => {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    });
  }, []);

  const centralizarNoMapa = (lat, lng) => {
    if (map) map.flyTo([lat, lng], 15);
  };

  return (
    <div className="relative w-full h-screen bg-white font-sans overflow-hidden">
      
      {/* MAPA EM TELA CHEIA */}
      <div className="absolute inset-0 z-0">
        <MapContainer 
          center={[-8.0539, -34.8811]} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
          ref={setMap}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          {pontos.map(ponto => (
            <Marker key={ponto.id} position={[ponto.latitude, ponto.longitude]}>
              <Popup className="custom-popup">
                <div className="p-2 min-w-[150px]">
                  <h4 className="font-bold text-slate-900 m-0 text-sm">{ponto.nomeUnidade}</h4>
                  <p className="text-[10px] text-slate-500 m-0 mb-2">{ponto.endereco}</p>
                  <div className="flex flex-wrap gap-1">
                    {ponto.tiposResiduosAceitos.split(',').map((t, i) => (
                      <span key={i} className="text-[8px] bg-slate-100 text-[#7fa17e] px-1.5 py-0.5 rounded font-black uppercase">
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* BARRA LATERAL FLUTUANTE */}
      <aside className="absolute top-4 left-4 bottom-4 w-full max-w-[420px] z-[1000] flex flex-col pointer-events-none">
        <div className="bg-white/95 backdrop-blur-sm rounded-[32px] shadow-2xl shadow-slate-900/10 flex flex-col h-full pointer-events-auto overflow-hidden border border-white/50">
          
          {/* Header */}
          <div className="p-8 pb-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                <div className="w-10 h-10 bg-[#7fa17e] rounded-[14px] flex items-center justify-center text-white shadow-md shadow-[#7fa17e]/32">
                  <Leaf size={20} strokeWidth={2.5} />
                </div>
                EcoCiclo
              </h1>
              <div className="p-2 bg-slate-100 rounded-full text-slate-400">
                <Layers size={18} />
              </div>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); fetchPontos(searchTerm); }} className="relative group">
              <input
                type="text"
                placeholder="Filtrar por tipo (ex: vidro, papel...)"
                className="w-full pl-12 pr-12 py-4 bg-slate-100 border-2 border-transparent rounded-2xl text-sm font-bold text-slate-700 placeholder:text-slate-400 focus:bg-white focus:border-[#7fa17e] focus:ring-0 transition-all shadow-inner"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (e.target.value === '') fetchPontos('');
                }}
              />
              <Search className="absolute left-4 top-4 text-slate-400 group-focus-within:text-[#7fa17e] transition-colors" size={20} />
              {searchTerm && (
                <button type="button" onClick={() => { setSearchTerm(''); fetchPontos(''); }} className="absolute right-4 top-4 text-slate-300 hover:text-rose-500">
                  <X size={20} />
                </button>
              )}
            </form>
          </div>

          {/* Lista de Cards */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
            <div className="flex justify-between items-center mb-4 px-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Unidades de Coleta</span>
              <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-1 rounded-md">{pontos.length} ATIVOS</span>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-300 animate-pulse">
                <div className="w-10 h-10 border-4 border-[#7fa17e] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-xs font-bold uppercase tracking-widest">Sincronizando Banco...</p>
              </div>
            ) : pontos.length > 0 ? (
              pontos.map(ponto => (
                <CollectionPointCard 
                  key={ponto.id} 
                  point={ponto} 
                  onSelect={() => centralizarNoMapa(ponto.latitude, ponto.longitude)}
                />
              ))
            ) : (
              <div className="bg-slate-50 rounded-3xl p-10 text-center border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-bold text-sm">Nenhum ponto encontrado para "{searchTerm}"</p>
              </div>
            )}
          </div>

          {/* Footer Informativo */}
          <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
            <button className="flex items-center gap-2 text-[11px] font-black text-[#7fa17e] uppercase tracking-widest hover:opacity-80 transition-colors">
              <Filter size={14} /> Refinar Busca
            </button>
            <span className="text-[10px] text-slate-300 font-medium italic">EcoCiclo v1.0</span>
          </div>
        </div>
      </aside>
    </div>
  );
}