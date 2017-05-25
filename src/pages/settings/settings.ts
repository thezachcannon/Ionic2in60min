import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RedditService } from '../../app/services/reddit.service';
import { RedditsPage } from '../reddits/reddits';
import {BarcodeScanner} from 'ionic-native';
import { Geolocation } from 'ionic-native';

@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  category: any;
  limit: any;
  barcode: any;
  latitude: any;
  longitude: any;
  watch: any;
  geoEnabled: boolean;

  constructor(public navCtrl: NavController, private redditService: RedditService) {
    this.geoEnabled = false;
    this.getDefaults();
  }


  getDefaults() {
    if (localStorage.getItem('category') != null) {
      this.category = localStorage.getItem('category');
    }
    else {
      this.category = 'sports';
    }
    if (localStorage.getItem('limit') != null) {
      this.limit = localStorage.getItem('limit');
    }
    else {
      this.limit = '10';
    }
  }

  scanBarcode(){
BarcodeScanner.scan().then((barcodeData) => {
 // Success! Barcode data is here
   this.barcode = barcodeData.text
}, (err) => {
    // An error occurred
});
  }

  enableGeoLocation(){
    this.watch= Geolocation.watchPosition();
    this.geoEnabled = true;
    this.watch.subscribe((data) => {
      this.latitude = data.coords.latitude;
      this.longitude = data.coords.longitude;
  })
}

disableGeoLocation(){
  this.latitude = null;
  this.longitude = null;
  this.geoEnabled = false;
}

toggleGeoLocation(){
  if(this.geoEnabled)
  {
    this.disableGeoLocation();
  }
  else
  {
    this.enableGeoLocation();
  }
}
  

  setDefaults() {
    localStorage.setItem('category', this.category);
    localStorage.setItem('limit', this.limit);
    this.navCtrl.push(RedditsPage);
  }


}
