import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Sub } from 'src/app/models/sub';
import { PostsService } from 'src/app/services/posts.service';
import { SubscribersService } from 'src/app/services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent implements OnInit {
  newsletterUrl: string = "#";

  constructor(private subscriptionService: SubscribersService, private postService: PostsService) {}
  ngOnInit(): void {
    this.newsletterUrl = this.postService.getNewsletterURL();
  }

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
