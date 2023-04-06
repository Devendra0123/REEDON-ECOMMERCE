import { create } from 'zustand'
import { persist } from 'zustand/middleware';

const shippingStore = (set: any) => ({
  shippingDetails: null, 
  addShippingDetails: (shippingDetails: any) => set({ shippingDetails: shippingDetails }),
});

const useShippingStore = create((
  persist(shippingStore, {
    name: 'shipping',
  })
));

export default useShippingStore;