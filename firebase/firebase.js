import {initializeApp} from 'firebase/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// importaciones necesarias para firestore
import {initializeFirestore} from 'firebase/firestore';

import firebaseConfig from './config';

class Firebase {
  constructor() {
    const firebaseApp = initializeApp(firebaseConfig);

    this.db = initializeFirestore(firebaseApp, {
      experimentalForceLongPolling: true,
    });
  }
}

export default Firebase;
