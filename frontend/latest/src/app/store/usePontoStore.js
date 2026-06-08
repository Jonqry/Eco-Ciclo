import { create } from 'zustand';

export const usePontoStore = create((set) => ({
  searchTerm: '',
  pontoSelecionadoId: null,
  mapMode: 'default',
  mapCenter: [-8.0539, -34.8811],
  mapZoom: 13,
  
  setSearchTerm: (term) => set({ searchTerm: term }),
  setPontoSelecionadoId: (id) => set({ pontoSelecionadoId: id }), 
  clearSearch: () => set({ searchTerm: '' }),
  
  toggleMapMode: () => set((state) => ({ 
    mapMode: state.mapMode === 'default' ? 'satellite' : 'default' 
  })),

  setMapPosition: (center, zoom) => set({ mapCenter: center, mapZoom: zoom }),
}));