import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
    imports: [ 
        RouterModule, 
        CommonModule, 
        NgbModule,
        AutocompleteLibModule,        
    ],
    declarations: [ 
        NavbarComponent ,        
    ],
    exports: [ NavbarComponent ]
})

export class NavbarModule {}
