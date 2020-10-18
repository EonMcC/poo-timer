import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, AlertController, ToastController } from "@ionic/angular";
import { Auth } from 'aws-amplify';
import { DataServiceService } from '../home/data-service.service';
import { APIService } from '../API.service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['auth.component.scss'],
})
export class AuthComponent {

  constructor( 
    public navCtrl: NavController,
    public alertController: AlertController,
    private router: Router,
    private dataService: DataServiceService,
    private apiService: APIService,
    public toastController: ToastController
    ) {
      Auth.currentAuthenticatedUser({bypassCache: false}).then(user => {
        this.router.navigate(['/home'])
      })
     }

  isLoginMode = true;
  password: string;
  checking = false;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    this.checking = true;
    const email = form.value.email.slice();
    this.password = form.value.password;

    if (this.isLoginMode) {
      Auth.signIn(email, this.password).then(cognitoUser => {
        this.apiService.GetUser(cognitoUser.attributes.sub).then((user) => {
          try {
            if (user.firstLogin === true) {
              this.dataService.user = user;
              this.checking = false;
              this.router.navigate(['/initial-setup']);
            } else {
              this.checking = false;
              this.router.navigate(['/home']);
            }   
          } catch (error) {
            console.log(error)
            this.presentToast('Login Faied, please try again.');
          }
        })
      })
    } else {
      console.log('signup with:', email, this.password)
      Auth.signUp(email, this.password, email).then(
        res => {
          console.log('return from signup', res)
          const id = res.userSub;
          console.log('details going to createUser', res.userSub, email);
          const signupDate = moment.now();
          this.apiService.CreateUser({
            id,
            email,
            name: 'User',
            hourlyRate: null,
            currency: null,
            firstLogin: true,
            signupDate,
            longestPooTime: 0,
            shortestPooTime: null,
            numberOfPoos: 0,
            totalPooTime: 0,
            lastPooDate: null,
            pooStreak: 0,
            totalPaid: 0
          }).then((user) => {
            try {
              this.checking = false;
              console.log('added user to DB')
            } catch (err) {
              this.checking = false;
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
    this.checking = true;
    console.log('email', email, 'verCode', verificationCode)
    Auth.confirmSignUp(email, verificationCode).then(
      res => {
        this.checking = false;
        console.log(res)
        this.presentToast('You\'re all signed up, please now login.');
        this.isLoginMode = true;
      },
      err => {
        this.checking = false;
        console.log(err);
      }
    )
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      position: 'middle',
      duration: 2000
    });
    toast.present();
  }


}