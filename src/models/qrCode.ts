export class QrCode {
    private text: string;
    private url: string;
    private date: string;

    constructor(text: string, url: string){
        this.text = text;
        this.url = url;
        this.date = new Date().toLocaleDateString('France');
    }
}