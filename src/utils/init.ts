import { initSentry } from './sentry';
import { initFirebase } from './firebase';

export function initializeApp() {
  console.log('Initializing app services...');
  
  initSentry();
  initFirebase();
  
  console.log('App services initialized');
}
