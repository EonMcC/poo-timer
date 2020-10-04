import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from "@ionic/angular";

import { CognitoServiceService } from "../provider/cognito-service.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  email: string;
  password: string;

  constructor( 
    public navCtrl: NavController,
    // public navParams: NavParams,
    public alertController: AlertController,
    public CognitoService: CognitoServiceService) { }

  ngOnInit() {
  }

  register() {
    this.CognitoService.signUp(this.email, this.password).then(
      res => {
        this.promptVerificationCode();
      },
      err => {
        console.log(err);
      }
    );
  }

  async promptVerificationCode() {
    let alert = await this.alertController.create({
      header: "Enter Verfication Code",
      inputs: [
        {
          name: "VerificationCode",
          placeholder: "Verification Code"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Verify",
          handler: data => {
            this.verifyUser(data.VerificationCode);
          }
        }
      ]
    });
     await alert.present();
  }

  verifyUser(verificationCode) {
    this.CognitoService.confirmUser(verificationCode, this.email).then(
      res => {
        console.log(res);
      },
      err => {
        alert(err.message);
      }
    );
  }

}
