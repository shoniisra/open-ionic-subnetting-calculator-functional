import { Component } from "@angular/core";
import { AlertController } from '@ionic/angular';

import { ToastController } from '@ionic/angular';
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})

export class HomePage {
  ipAdress;
  calculate_button = 0;

  firstNetmask;
  finalNetmask;

  firstBitsHost;
  finalBitsHost;

  firstIpNumber;
  finalIpNumber;

  subnettingNumber;
  subnettingSize;

  subnettingAux1;
  subnettingAux2;
  subnettingAux3;
  subnettingAux4;

  subnetting1;
  subnetting2;
  subnetting3;
  subnetting4;

  firstIpAux1;
  firstIpAux2;
  firstIpAux3;
  firstIpAux4;

  finishIpAux1;
  finishIpAux2;
  finishIpAux3;
  finishIpAux4;

  broadcastAux1;
  broadcastAux2;
  broadcastAux3;
  broadcastAux4;

  total;
  vali;
  val;
  octetos;
  tipo = "";
  myvalor = [];

  constructor(public alertController: AlertController,public toastController: ToastController) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Autor:',
      
      message: ' Hecho con <ion-icon name="heart"></ion-icon> por <a href="https://github.com/shoniisra" color="light">Johnny Villacís</a>',
      buttons: ['OK']
    });

    await alert.present();
  }

  async toastIp() {
    const toast = await this.toastController.create({
      message: 'La dirección Ip que desea subnetear, ejemplo: 192.168.4.32',
      mode:'ios',
      color:'dark',
      duration: 2000
    });
    toast.present();
  }
  async toastRed() {
    const toast = await this.toastController.create({
      message: 'Las redes disponibles son: A < 127, B < 191, C < 223.',
      mode:'ios',
      color:'dark',
      duration: 2000
    });
    toast.present();
  }
  async toastNetInicio() {
    const toast = await this.toastController.create({
      message: 'Este campo es llenado automáticamente por la aplicación según su dirección ip',
      mode:'ios',
      color:'dark',
      duration: 2000
    });
    toast.present();
  }
  async toastNetFin() {
    const toast = await this.toastController.create({
      message: 'La diferencia entre Netmask Final e Inicial es el número exponente que eleva a 2 dando como resultado las subredes a conseguir. Ejem: 2<sup>5</sup> = 32 subredes.',
      mode:'ios',
      color:'dark',
       duration: 2000
    });
    toast.present();
  }

  getIpNetmask() {
    var myipAdress = this.ipAdress.split('.');
    if (myipAdress[0] > 0 && myipAdress[0] < 127)
    {
        this.firstNetmask = 8;
        this.tipo="Clase A";
    }
    else if (myipAdress[0] >= 128 && myipAdress[0] < 191)
    {
        this.firstNetmask = 16;
        this.tipo="Clase B";
    }

    else if (myipAdress[0] >= 192 && myipAdress[0] < 223){
        this.firstNetmask = 24;
        this.tipo="Clase C";
    }
    else{
        this.firstNetmask = "No soportado";
    }
    // this.firstNetmask.min=this.firstNetmask;
    // this.finalNetmask.min=this.firstNetmask;
    //el mínimo de la netmask de destino es la netmask por default
}
Limpiar(){
  this.myvalor = [];

  this.subnettingAux1 = 0;
  this.subnettingAux2 = 0;
  this.subnettingAux3 = 0;
  this.subnettingAux4 = 0;

  this.subnetting1 = 0;
  this.subnetting2 = 0;
  this.subnetting3 = 0;
  this.subnetting4 = 0;

  this.firstIpAux1 = 0;
  this.firstIpAux2 = 0;
  this.firstIpAux3 = 0;
  this.firstIpAux4 = 0;

  this.finishIpAux1 = 0;
  this.finishIpAux2 = 0;
  this.finishIpAux3 = 0;
  this.finishIpAux4 = 0;

  this.broadcastAux1 = 0;
  this.broadcastAux2 = 0;
  this.broadcastAux3 = 0;
  this.broadcastAux4 = 0;

  this.total = 1; //variable que dice cuántas redes hay
  this.vali = 0;
}

  Calcular() {
    this.getIpNetmask();
    if (this.firstNetmask != "No soportado") {
      this.firstBitsHost = 32 - this.firstNetmask;
      this.firstIpNumber = Math.pow(2, this.firstBitsHost);

      this.finalBitsHost = 32 - this.finalNetmask;
      this.finalIpNumber = Math.pow(2, this.finalBitsHost);

      this.subnettingNumber = this.firstIpNumber / this.finalIpNumber;
      this.subnettingSize = this.firstIpNumber / this.subnettingNumber;

      this.Limpiar();
     

      this.octetos = this.ipAdress.split(".");

      for (let i = 1; i <= this.subnettingNumber; i++) {
        this.subnettingAux4 += this.subnettingSize;
        if (this.subnettingAux4 > 255) {
          this.val = this.subnettingAux4 / 256;
          this.subnettingAux3 += Math.round(this.val);
          this.subnettingAux4 = 0;
        }
        if (this.subnettingAux3 > 255) {
          this.val = this.subnettingAux3 / 256;
          this.subnettingAux2 += Math.round(this.val);
          this.subnettingAux3 = 0;
          this.subnettingAux4 = 0;
        }

        // Calculo de Broadcast
        this.broadcastAux1 = this.subnettingAux1;
        this.broadcastAux2 = this.subnettingAux2;
        this.broadcastAux3 = this.subnettingAux3;
        this.broadcastAux4 = this.subnettingAux4 - 1;
        if (this.subnettingAux4 == 0) {
          if (this.subnettingAux3 == 0) {
            this.broadcastAux2 = this.subnettingAux2 - 1;
            this.broadcastAux3 = 255;
            this.broadcastAux4 = 255;
          } else {
            this.broadcastAux3 = this.subnettingAux3 - 1;
            this.broadcastAux4 = 255;
          }
        }

        // Calculo de IpFinal
        this.finishIpAux1 = this.broadcastAux1;
        this.finishIpAux2 = this.broadcastAux2;
        this.finishIpAux3 = this.broadcastAux3;
        this.finishIpAux4 = this.broadcastAux4 - 1;

        this.firstIpAux1 = this.subnetting1;
        this.firstIpAux2 = this.subnetting2;
        this.firstIpAux3 = this.subnetting3;
        this.firstIpAux4 = this.subnetting4 + 1;

        if (this.tipo == "Clase A") {
          if (this.vali == 0)
            this.total =
              (this.finishIpAux2 + 1) *
                (this.finishIpAux3 + 1) *
                (this.finishIpAux4 + 2) -
              2;
          this.vali++;
          this.myvalor[i-1] = [
            i,
            this.octetos[0]+"."+this.subnetting2+"."+this.subnetting3+"."+this.subnetting4,
            this.octetos[0]+"."+this.firstIpAux2+"."+this.firstIpAux3+"."+this.firstIpAux4,
            this.octetos[0]+"."+this.finishIpAux2+"."+this.finishIpAux3+"."+this.finishIpAux4,
            this.octetos[0]+"."+this.broadcastAux2+"."+this.broadcastAux3+"."+this.broadcastAux4,
            this.total
          ];
        } else if (this.tipo == "Clase B") {
          if (this.vali == 0)
            this.total = (this.finishIpAux3 + 1) * (this.finishIpAux4 + 2) - 2;
          this.vali++;
          this.myvalor[i-1] = [
            i,
            this.octetos[0]+"."+this.octetos[1]+"."+this.subnetting3+"."+this.subnetting4,
            this.octetos[0]+"."+this.octetos[1]+"."+this.firstIpAux3+"."+this.firstIpAux4,
            this.octetos[0]+"."+this.octetos[1]+"."+this.finishIpAux3+"."+this.finishIpAux4,
            this.octetos[0]+"."+this.octetos[1]+"."+this.broadcastAux3+"."+this.broadcastAux4,
            this.total
          ];
        } else if (this.tipo == "Clase C") {
          if (this.vali == 0) this.total = this.finishIpAux4 + 2 - 2;
          this.vali++;

          this.myvalor[i-1] = [
            i,
            this.octetos[0]+"."+this.octetos[1]+"."+this.octetos[2]+"."+this.subnetting4,
            this.octetos[0]+"."+this.octetos[1]+"."+this.octetos[2]+"."+this.firstIpAux4,
            this.octetos[0]+"."+this.octetos[1]+"."+this.octetos[2]+"."+this.finishIpAux4,
            this.octetos[0]+"."+this.octetos[1]+"."+this.octetos[2]+"."+this.broadcastAux4,
            this.total
          ];
        } else {
        }
        this.subnetting1 = this.subnettingAux1;
        this.subnetting2 = this.subnettingAux2;
        this.subnetting3 = this.subnettingAux3;
        this.subnetting4 = this.subnettingAux4;
        console.log(this.myvalor[i]);
      }
     
    } else alert("no se puede calcular");
  }
}
