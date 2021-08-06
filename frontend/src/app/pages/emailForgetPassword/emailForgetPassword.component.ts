import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SalonUtilsService } from '../../salon-utils.service';
import { HttpClient } from '@angular/common/http';
import { NgbDateStruct, NgbDateParserFormatter, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { SearchService } from 'app/_services/search.service';
import { GlobalConstants } from 'app/module/global-constants';
import User from 'app/module/userAccount';
import { TokenStorageService } from 'app/_services/token-storage.service';
import { ConfirmComponent } from 'app/popup/confirm/confirm.component';
import { ForgetPasswordComponent } from 'app/popup/forget-password/forget-password.component';

@Component({
    selector: 'app-email-forgetPassword',
    moduleId: module.id,
    templateUrl: 'emailForgetPassword.component.html'
})

export class EmailForgetPasswordComponent implements OnInit {

    constructor(
        private salonUtilService: SalonUtilsService,
        private router: Router,
        private route: ActivatedRoute,
        private modalService: NgbModal,
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            const ref = this.modalService.open(ForgetPasswordComponent);      
            ref.componentInstance.username = params.username;
            ref.componentInstance.encryptedData = params.encryptedData;
            ref.result.then(
                (result) => {
                console.log("Update password for " + params.username);
                const ref = this.modalService.open(ConfirmComponent);
                ref.componentInstance.confirmInfo = 'Thay đổi mật khẩu thành công !!!';
                ref.result.then((yes) => {
                    this.router.navigate(['home']);
                },
                    (cancel) => {
                        console.log('cancel click');
                    })        
                },
                (cancel) => {
                //this.isPasswordChanged = false;
                console.log('cancel click');
                })
        });

    }

    
}
