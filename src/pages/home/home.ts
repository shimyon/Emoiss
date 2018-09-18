import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, Nav, App } from 'ionic-angular';
import { AuthService } from '../../services/providers/auth-service/auth-service';
import { userdata } from 'model/users';
import { AboutPage } from '../about/about';
import { LevelPage } from '../level/level';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  rootPage: any = AboutPage;

  @ViewChild(Nav) nav: Nav;

  pages: Array<{ title: string, component: any }>;

  username = '';
  MENU = {
    DEFAULT: 'menu-components',
    MATERIAL: 'menu-material',
    AVATAR: 'menu-avatar',
  };

  constructor(private app: App,private navCtrl: NavController, private auth: AuthService, public menuCtrl: MenuController) {
    this.pages = [{
      title: 'Home',
      component: AboutPage
    }, {
      title: 'Level',
      component: LevelPage
    }];

    this.auth.getUserInfo().then(info => {
      let data: userdata = JSON.parse(info);
      this.username = data.userName;
    }).catch(t => {

    });
  }

  public logout() {
    this.auth.logout().then(succ => {
      window.location.reload();
    }).catch(e => {
      window.location.reload();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    //this.app.getActiveNav().setRoot(page.component);
  }
}
