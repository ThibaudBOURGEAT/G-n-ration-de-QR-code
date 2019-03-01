import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { QrCodeProvider } from '../../providers/qr-code/qr-code';
import { HistoryQrCodeProvider } from '../../providers/history-qr-code/history-qr-code';

@Component({
  selector: 'page-generate-qr-code',
  templateUrl: 'generate-qr-code.html',
})
export class GenerateQrCodePage {

  private qrText: string;
  private qrGenerate: string;

  constructor(private qrCode: QrCodeProvider,
    private socialSharing : SocialSharing, private history :HistoryQrCodeProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenerateQrCodePage');
  }

  private generateCode = () =>{
    if(this.qrText != null){
      this.qrCode.generate(this.qrText)
      .then((url)=>{
        this.qrGenerate = url.toString();
        this.history.addQRCode(this.qrText, this.qrGenerate);
      })
      .catch();
    }else{
      return false;
    }
  }

  private displayQrCode = () =>{
    if(this.qrGenerate == null){ 
      return false;
     }else{
       return true;
     }
  }

  private shareQRCode = ()=>{
    this.socialSharing.shareWithOptions(
        {
          message: this.qrText,
          files: [this.qrGenerate]
        }
      );
  }
}
