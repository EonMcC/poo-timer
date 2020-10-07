import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, NavParams, AlertController } from "@ionic/angular";
import { Auth } from 'aws-amplify';
import { AuthService } from './auth.service';
import { DataServiceService } from '../home/data-service.service';
import { APIService } from '../API.service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['auth.component.scss'],
})
export class AuthComponent {

  constructor( 
    public navCtrl: NavController,
    // public navParams: NavParams,
    public alertController: AlertController,
    public cognitoService: AuthService,
    private router: Router,
    private dataService: DataServiceService,
    private apiService: APIService
    ) {
      Auth.currentAuthenticatedUser({bypassCache: false}).then(user => {
        this.router.navigate(['/home'])
      })
     }

  isLoginMode = true;
  password: string;;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email.slice();
    this.password = form.value.password;

    if (this.isLoginMode) {
      Auth.signIn(email, this.password).then(user => {
        this.router.navigate(['/home'])
      })
    } else {
      console.log('signup with:', email, this.password)
      Auth.signUp(email, this.password, email).then(
        res => {
          console.log('return from signup', res)
          const id = res.userSub;
          console.log('details going to createUser', res.userSub, email);
          this.apiService.CreateUser({id, email}).then((user) => {
            try {
              console.log('added user to DB')
            } catch (err) {
              console.log(res.userSub, email);
              console.log('creating user error', err);
            }
          })
          this.promptVerificationCode(email);
        },
        err => {
          console.log('signup err:', err)
        }
      )
    }
    form.reset();
  }

  async promptVerificationCode(email) {
    console.log('in ver code')
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
            console.log('1', email)
            this.verifyUser(email, data.VerificationCode);
          }
        }
      ]
    });
     await alert.present();
  }

  verifyUser(email, verificationCode) {
    console.log('email', email, 'verCode', verificationCode)
    Auth.confirmSignUp(email, verificationCode).then(
      res => {
        console.log(res)
        this.isLoginMode = true;
      },
      err => {
        console.log(err);
      }
    )
  }


}