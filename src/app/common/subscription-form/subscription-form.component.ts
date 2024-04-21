import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Sub } from 'src/app/models/sub';
import { SubscribersService } from 'src/app/services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent {

  constructor(private subscriptionService: SubscribersService) {}

  onSubmit( formData: any) {
    const subscriptionData: Sub = {
      name: formData.name,
      email: formData.email
    }
    firstValueFrom(this.subscriptionService.checkSubscriber(subscriptionData.email)).then(subscriberList => {
      this.subscriptionService.addSubscriber(subscriptionData, subscriberList);
    })
    
  }
}
