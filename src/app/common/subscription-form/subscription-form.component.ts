import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Sub } from 'src/app/models/sub';
import { ConfigService } from 'src/app/services/config.service';
import { PostsService } from 'src/app/services/posts.service';
import { SubscribersService } from 'src/app/services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent implements OnInit {
  newsletterUrl: string = "#";

  constructor(private subscriptionService: SubscribersService, private postService: PostsService, private configService: ConfigService) {}
  ngOnInit(): void {
    this.newsletterUrl = this.configService.getNewsletterURL();
  }

  onSubmit( formData: any) {
    const subscriptionData: Sub = {
      email: formData.email
    }
    firstValueFrom(this.subscriptionService.checkSubscriber(subscriptionData.email)).then(subscriberList => {
      this.subscriptionService.addSubscriber(subscriptionData, subscriberList);
    })
    
  }
}
