import { initSentry } from './sentry';
import { initFirebase } from './firebase';

export async function initializeApp() {
  console.log('Initializing app services...');
  
  initSentry();
  await initFirebase();
  
  console.log('App services initialized');
}
