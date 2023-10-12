import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AwsService } from 'src/app/services/aws.service'

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css']
})
export class CreatePlayerComponent {
  
  constructor(private aws: AwsService, private router: Router){
  }

  selectedImage!: File;
  base64Image: string = ""
  image_url = ""
  selectedRank: number = 0
  rankConvertion = ["C", "B", "A", "S", "SS", "SSS"]
  convertedRank = this.rankConvertion[this.selectedRank]
  name = ""
  author = "Admin"
  position = ""



  updateRank(){
    this.convertedRank = this.rankConvertion[this.selectedRank]
  }

  onFileSelected(event: any){
    this.selectedImage = (event.target).files[0] 
    this.imageToBase64()
  }

  imageToBase64(){
    let reader = new FileReader();
    reader.onload = (event) => {
      if (event.target){
        this.base64Image = event.target.result as string;
      }
    };
    reader.readAsDataURL(this.selectedImage);
  }

  onSubmitPlayer(form: NgForm){
    if(this.selectedImage){ 
      this.aws.upload_image_to_s3(this.base64Image).subscribe((result) => {
        this.image_url = "https://ie-db-images.s3.eu-west-1.amazonaws.com/"+result.response
        console.log(this.name, this.author, this.convertedRank, this.position, this.image_url)
        this.aws.upload_player_to_rds(this.name, this.author, this.position, this.convertedRank, this.image_url).subscribe((result) => {
          console.log(result)
          this.router.navigate(['/players']);
        })
    })
    }else{      
      console.log("Uploading default image since no image was provided")
      //this.aws.uploadtoS3("Prueba", file)
    }
  }
}
