import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QrCodeProvider } from '../../providers/qr-code/qr-code';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private qrDecode: object;

  constructor(public navCtrl: NavController, 
    private qrCode: QrCodeProvider,
    private camera: Camera) {
      
  }

  private scanQRCode = () =>{
    this.qrCode.startScan()
    .then((decode)=>{
      this.qrDecode = decode['text'];
    });
  }

  private scanPictureQRCode = () =>{
    this.camera.getPicture({
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }).then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.qrCode.decodePictureQRCode(base64Image)
        .then((decode)=>{
          this.qrDecode = decode;
        });
     }, (err) => {
        console.log(err);
     });
  }
}
