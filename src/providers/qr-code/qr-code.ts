import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import QRCode from 'qrcode';
import jsQR from "jsqr";

@Injectable()
export class QrCodeProvider {

  constructor(public http: HttpClient, private barcodeScanner: BarcodeScanner) {

  }

  public generate(text: string){
    const qrcode = QRCode;
    return new Promise((resolve,reject)=>{
      qrcode.toDataURL(text, { errorCorrectionLevel: 'H' }, function (err, url) {
        if(err) reject(err);
        resolve(url);
      })
    })
  }

  public startScan = () =>{
    return new Promise((resolve,reject)=>{
      this.barcodeScanner.scan().then(barcodeData => {
          resolve(barcodeData);
       }).catch(err => {
          console.log('Error', err);
       });
    }); 
  }

  public decodePictureQRCode = (url: string) =>{
    return new Promise((resolve, reject) =>{
      this.getImageDataFromUrl(url)
      .then((img)=>{
        const qrcode = jsQR(img['data'], img['width'], img['height']);
        if (qrcode && qrcode.data !== undefined) {
             resolve(qrcode.data);
        }
      });
    });
  }

  private getImageDataFromUrl = (url) =>{
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        image.onload = () => {
            try {
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0);
            } catch (e) {
                reject(e);
            }

            const data = context.getImageData(0, 0, canvas.width, canvas.height);

            return resolve(data);
        };

        image.onerror = (error: ErrorEvent) => {
            return reject(error);
        };
    });
}

}
