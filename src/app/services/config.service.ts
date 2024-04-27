import { Injectable, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { ConfigData } from '../models/config-data';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements OnInit {
  configData: ConfigData = {
    defaultPostImgPath: environment.defaultPostImgPath,
    newsletterUrl: environment.newsletterUrl,
    linkedinProfileUrl: environment.linkedinProfileUrl,
    githubProfileUrl: environment.githubProfileUrl
  }

  constructor(private firestore: Firestore) { 
  }

  ngOnInit(): void {
    this.fetchConfigData().subscribe(fetchedConfigData => {
      this.configData = fetchedConfigData;
    })
  }

  fetchConfigData(): Observable<ConfigData>{
    const configInstance = collection(this.firestore, 'configData');
    return collectionData(configInstance, { idField: 'id' }).pipe(
      map((configData: any) => {
        return {
          defaultPostImgPath: configData.defaultPostImgPath,
          newsletterUrl: configData.newsletterUrl,
          linkedinProfileUrl: configData.linkedinProfileUrl
        } as ConfigData
      })
    );
  }

  getDefaultPostImgURL(pathPrefix: string) {
      return pathPrefix + this.configData.defaultPostImgPath;
  }

  getNewsletterURL() {
      return this.configData.newsletterUrl;
  }

  getLinkedinProfileURL() {
    return this.configData.linkedinProfileUrl;
  }

  getGithubProfileUrl() {
    return this.configData.githubProfileUrl;
  }
}
