import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonButton,
  IonTextarea,
} from '@ionic/angular/standalone';
import { FireBaseServiceService } from '../services/fire-base-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonButton,
    IonTextarea,
  ],
})
export class Tab2Page {
  title: string = '';
  description: string = '';
  content: string = '';
  date: string = '';

  constructor(private fireBaseService: FireBaseServiceService) {}

  async handleAddNewsBtn() {
    if (this.title && this.description && this.content && this.date) {
      try {
        await this.fireBaseService.pushNewEntry(
          this.title,
          this.description,
          this.content,
          new Date(this.date)
        );
        // Reset form after successful submission
        this.title = '';
        this.description = '';
        this.content = '';
        this.date = '';
      } catch (error) {
        console.error('Error adding news:', error);
      }
    } else {
      console.log('Please fill all fields');
    }
  }
}
