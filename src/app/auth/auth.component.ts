import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { NavController, NavParams, AlertController } from "@ionic/angular";
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  constructor( 
    public navCtrl: NavController,
    // public navParams: NavParams,
    public alertController: AlertController,
    public cognitoService: AuthService
    ) { }


  isLoginMode = true;
  email: string;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.email = form.value.email;
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      console.log('Login with:', email, password)
      this.cognitoService.authenticate(email, password)
      // .then(res =>{
      //   console.log(res);
      // }, err =>{
      //   console.log(err);
      // });
    } else {
      console.log('Signup with:', email, password)
      this.cognitoService.signUp(email, password).then(
        res => {
          this.promptVerificationCode();
        },
        err => {
          console.log(err);
        }
      );
    }

    form.reset();
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
    this.cognitoService.confirmUser(verificationCode, this.email).then(
      res => {
        console.log(res);
      },
      err => {
        alert(err.message);
      }
    );
  }


}