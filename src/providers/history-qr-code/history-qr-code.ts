import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { QrCode } from '../../models/qrCode';

@Injectable()
export class HistoryQrCodeProvider {

  private qrCodes: QrCode[];

  constructor(public http: HttpClient,
    private storage: Storage) {
      this.qrCodes = new Array();
      this.storage.get('qrCode')
      .then((qrCodes)=>{
        if(qrCodes != null){
          this.qrCodes = qrCodes;
        }
      })
  }

  public addQRCode = (text: string, url: string) =>{
    let qrCode = new QrCode(text,url);
    this.qrCodes.push(qrCode);
    this.storage.set('qrCode', this.qrCodes);
  }

  public getAllQRCode = () =>{
    return new Promise((resolve, reject) =>{
      this.storage.get('qrCode')
      .then((qrCodes)=>{
        resolve(qrCodes);
      })
    })
  }
}
