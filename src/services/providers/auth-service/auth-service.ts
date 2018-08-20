import { Http, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ENV } from '@env';
import { token } from 'model/token';
import { Storage } from '@ionic/storage';
import { Global } from '../../../env/global';
/*
  Generated class for the AuthService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService {
  apiurl: string = Global.ServerPath;
  currentUser: token;

  constructor(public http: Http, private storage: Storage) { }

  public login(credentials) {
    if (credentials.username == null || credentials.password == null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        let userdata = `grant_type=password&username=${credentials.username}&password=${credentials.password}`;
        // let userdata = JSON.stringify({
        //   grant_type: "password",
        //   username: credentials.username,
        //   password: credentials.password
        // });
        //var headerOptions = new Headers({ 'Content-Type': 'application/json' });
        var headerOptions = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });

        this.http.post(this.apiurl + 'Token', userdata, requestOptions).toPromise().then(res => {
          let body = (<any>res).json();
          if (body) {
            this.currentUser = <token>body;
            this.storage.set("token", JSON.stringify(this.currentUser));
            observer.next(true);
          } else {
            observer.next(false);
          }
          observer.complete();
        }).catch((error: Response | any) => {
          observer.next(false);
          observer.complete();
        });
      })
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo(): Promise<string> {
    return this.storage.get("token");
  }

  public logout(): Promise<void> {
    return this.storage.clear();
  }
}
