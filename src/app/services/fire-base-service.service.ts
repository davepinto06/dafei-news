import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  doc,
  deleteDoc,
  getFirestore,
  collection,
  getDocs,
  addDoc,
  Timestamp,
} from 'firebase/firestore';
import { app } from 'src/environments/firebaseconfig';
import { News } from 'src/types/types';

@Injectable({
  providedIn: 'root',
})
export class FireBaseServiceService {
  constructor() {}

  private newsSubject = new BehaviorSubject<News[]>([]);
  news$ = this.newsSubject.asObservable();

  async fetchCollections(): Promise<void> {
    try {
      const db = getFirestore(app);
      const newsCollectionRef = collection(db, 'news');
      const snapshot = await getDocs(newsCollectionRef);

      const news = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as News),
      }));
      this.newsSubject.next(news);
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  }

  async pushNewEntry(
    title: string,
    description: string,
    content: string,
    date: Date
  ): Promise<void> {
    try {
      const db = getFirestore(app);

      // Add a new document with a generated id
      const docRef = await addDoc(collection(db, 'news'), {
        title: title,
        description: description,
        content: content,
        date: Timestamp.fromDate(date),
      });

      console.log('Document written with ID: ', docRef.id);

      // Refresh the news collection after adding a new entry
      await this.fetchCollections();
    } catch (error) {
      console.error('Error adding document: ', error);
      throw error;
    }
  }

  async deleteEntry(id: string): Promise<void> {
    try {
      const db = getFirestore(app);
      await deleteDoc(doc(db, 'news', id));
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
    await this.fetchCollections();
  }
}
