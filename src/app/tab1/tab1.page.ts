import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FireBaseServiceService } from '../services/fire-base-service.service';
import { News } from 'src/types/types';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
} from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonGrid,
    IonCol,
    IonRow,
    IonButton,
  ],
})
export class Tab1Page implements OnInit, OnDestroy {
  allCollections: News[] = [];
  private subscription: Subscription;

  constructor(private fireBaseService: FireBaseServiceService) {
    this.subscription = this.fireBaseService.news$.subscribe((news) => {
      this.allCollections = news;
    });
  }

  async handleDeleteBtn(id: string) {
    if (id) {
      await this.fireBaseService.deleteEntry(id);
    }
  }

  formatDate(date: Timestamp): string {
    return new Date(date.toDate()).toLocaleDateString();
  }

  ngOnInit() {
    this.fireBaseService.fetchCollections();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
