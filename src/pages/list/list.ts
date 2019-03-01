import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HistoryQrCodeProvider } from '../../providers/history-qr-code/history-qr-code';
import { QrCode } from '../../models/qrCode';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  private qrCodes: object;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private history :HistoryQrCodeProvider) {
      this.history.getAllQRCode()
      .then((qrCodes)=>{
        this.qrCodes = qrCodes;
      });
  }
}
