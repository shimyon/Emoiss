import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userdata } from 'model/users';
import { Global } from 'env/global';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  apiurl: string = Global.apiPath;
  currentUser: userdata;

  constructor(public http: Http) { }

  public login(credentials) {
    if (credentials.username == null || credentials.password == null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        let userdata = JSON.stringify({ UserName: credentials.username, userPass: credentials.password });
        var headerOptions = new Headers({ 'Content-Type': 'application/json' });
        var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });

        this.http.post(this.apiurl + 'Users/Get', userdata, requestOptions).toPromise().then(res => {
          let body = (<any>res).json();
          if (body) {
            this.currentUser = <userdata>body;
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

  public getUserInfo(): userdata {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
