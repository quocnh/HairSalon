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
            //console.log(params);
            this.activateUserAccount(params.username, params.encryptedData);
        });

    }

    activateUserAccount(username: string, encryptedData: string) {
        this.salonUtilService.verifyAccount(username, encryptedData)
            .subscribe((result) => {
                console.log(result);
                const ref = this.modalService.open(ConfirmComponent);
                ref.componentInstance.confirmInfo = 'Xác nhận email thành công. Xin vui lòng đăng nhập !!!';
                ref.result.then((yes) => {
                    this.router.navigate(['home']);
                },
                    (cancel) => {
                        console.log('cancel click');
                    })
            });
    }

}
