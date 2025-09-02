
import { defineStore } from 'pinia';


export const useMapStore = defineStore('mapStore', () => ({
  
  activeGroup: '',
  panelState: 'open',
  activeTool: 'legend',
  
}
));
