import { Injectable } from '@angular/core';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from 'src/environments/firebaseconfig';
import { News } from 'src/types/types';

@Injectable({
  providedIn: 'root',
})
export class FireBaseServiceService {
  constructor() {}

  async fetchCollections(): Promise<News[]> {
    try {
      const db = getFirestore(app);
      const newsCollectionRef = collection(db, 'news');
      const snapshot = await getDocs(newsCollectionRef);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as News),
      }));
    } catch (error) {
      console.error('Error fetching collections:', error);
      return [];
    }
  }
}
