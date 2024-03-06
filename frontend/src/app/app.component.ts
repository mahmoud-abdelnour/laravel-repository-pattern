import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'src/shared/services/theme.service';
import { RegisteredIcons } from './registered-icons';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private translateService:TranslateService,
    private themeService:ThemeService,
  public  userService:UserService,

  ) {
    
    this.changeLangView(this.translateService.defaultLang)
    this.translateService.onLangChange.subscribe( r => {
      // this.changeLangView(r.lang);
      localStorage.setItem('lang' , r.lang);
      window.location.reload();
    })


    for(let icon of RegisteredIcons) {
      this.matIconRegistry.addSvgIcon(
        icon.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path)
      );
    }

  }

  changeLangView(lang) {
    document.body.dir = lang == 'ar' ? 'rtl' : 'ltr';
    document.dir = lang == 'ar' ? 'rtl' : 'ltr';
  }
}
