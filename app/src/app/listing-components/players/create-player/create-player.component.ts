import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { MyAuth0Service } from 'src/app/services/auth0Service.service';

import { AwsService } from 'src/app/services/aws.service';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css'],
})
export class CreatePlayerComponent {
  constructor(
    private aws: AwsService,
    private router: Router,
    public auth0: AuthService,
    private myAuth0: MyAuth0Service
  ) {}

  ngOnInit() {
    let profile_selector = localStorage.getItem('username');
    if (profile_selector) {
      this.username = profile_selector;
    }
  }

  username: string = '';
  loginRedirect() {
    this.auth0.loginWithRedirect();
  }

  selectedImage!: File;
  base64Image: string = '';
  image_url = '';
  selectedRank: number = 0;
  rankConvertion = ['C', 'B', 'A', 'S', 'SS', 'SSS'];
  convertedRank = this.rankConvertion[this.selectedRank];
  nick = '';
  name = '';
  author = '';
  position = '';
  public = true;

  updateRank() {
    this.convertedRank = this.rankConvertion[this.selectedRank];
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    this.imageToBase64();
  }

  imageToBase64() {
    let reader = new FileReader();
    reader.onload = (event) => {
      if (event.target) {
        this.base64Image = event.target.result as string;
      }
    };
    reader.readAsDataURL(this.selectedImage);
  }

  async onSubmitPlayer(form: NgForm) {
    let send_public = 'false';
    if (this.public == true) {
      send_public = 'true';
    } else if (this.public == false) {
      send_public = 'false';
    }
    if (this.selectedImage) {
      this.aws
        .upload_image_to_s3(this.base64Image, this.nick, this.username)
        .subscribe((result) => {
          this.image_url =
            'https://ie-db-images.s3.eu-west-1.amazonaws.com/' +
            result.response;
          this.aws
            .upload_player_to_rds(
              this.nick,
              this.name,
              this.username,
              this.position,
              this.convertedRank,
              this.image_url,
              send_public
            )
            .subscribe((result) => {
              console.log(result);
              this.router.navigate(['/user-players']);
            });
        });
    } else {
      console.log('Uploading default image since no image was provided');
      //this.aws.uploadtoS3("Prueba", file)
    }
  }
}
