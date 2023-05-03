import { create } from "zustand";

const useStore = create((set) => ({
  clients: [],
  routes: [],
  services: [],
  items: [],
  funerals: [],
}));
