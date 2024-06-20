import { Injectable } from '@angular/core';
import { Sub } from '../models/sub';
import { Firestore, addDoc, collection, collectionData, query, where } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private firestore: Firestore, private toastr: ToastrService) { }

  addSubscriber(subscriptionData: Sub, subscriberList: any) {
    if (subscriberList.length > 0) {
      this.toastr.success('Stay tuned for Awesome blog posts.', 'Already Subscribed...!');
      return true;
    } else {
      const subscriptionInstance = collection(this.firestore, 'subscribers');
      return addDoc(subscriptionInstance, subscriptionData).then(() => {
        this.toastr.success('Thank you for subscribing to our newsletter service.', 'Subscribed...!');
        return true;
      }).catch((error) => {
        console.error(error);
        this.toastr.error('Something went wrong! Please try again later...','Oops...');
        return false;
      });
    }
  }

  checkSubscriber(subEmail: string): Observable<any[]> {
    const subscriptionInstance = collection(this.firestore, 'subscribers');
    const subscriptionQuery = query(subscriptionInstance, where('email', '==', subEmail));
    return collectionData(subscriptionQuery);
  }
}
