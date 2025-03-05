import { Component, OnInit } from '@angular/core';
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
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

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
    ExploreContainerComponent,
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
export class Tab1Page implements OnInit {
  allCollections: News[] = [];

  constructor(private fireBaseService: FireBaseServiceService) {}

  async ngOnInit() {
    this.allCollections = await this.fireBaseService.fetchCollections();
  }
}
