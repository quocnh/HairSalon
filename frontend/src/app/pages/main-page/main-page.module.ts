import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MainPageComponent } from 'app/pages/main-page/main-page.component';
import { NavbarComponent } from 'app/shared/navbar/navbar.component';

@NgModule({
    imports: [ 
        // NavbarComponent
    ],
    declarations: [ 
        MainPageComponent ,
    ],
    exports: [ MainPageComponent ]
})

export class MainPageModule {}
