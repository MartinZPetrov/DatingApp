import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryAction,
  NgxGalleryOptions,
  NgxGalleryAnimation
} from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-detailed',
  templateUrl: './member-detailed.component.html',
  styleUrls: ['./member-detailed.component.css']
})
export class MemberDetailedComponent implements OnInit {
  @ViewChild('memberTabs') memberTabs: TabsetComponent
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryOptions[];

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.data.subscribe(data => {
      this.user = data['user'];
    });

    this.router.queryParams.subscribe(params =>{
      const selectedTab = params['tab'];
      this.memberTabs.tabs[selectedTab > 0  ? selectedTab: 0].active = true;
    })

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }

  getImages() {
    const imagesUrl = [];
    for (let i = 0; i < this.user.photos.length; i++) {
      imagesUrl.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description
      });
    }
    return imagesUrl;
  }
 
  loadUser() {
    this.userService.getUser(+this.router.snapshot.params['id']).subscribe(
      (user: User) => {
        this.user = user;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
  selecTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  } 
}
