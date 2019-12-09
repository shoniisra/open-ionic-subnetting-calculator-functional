import { Component, OnInit } from "@angular/core";

import { AlertController } from "@ionic/angular";

import { ToastController } from "@ionic/angular";
@Component({
  selector: "app-lista",
  templateUrl: "./lista.page.html",
  styleUrls: ["./lista.page.scss"]
})
export class ListaPage {
  ipAdress;
  tipo = "";
  firstNetmask;
  listahost = "";
  calculate_button = 0;
  ipvalida = true;
  finvalida = true;

  equivalencias = [
    1,
    2,
    4,
    8,
    16,
    32,
    64,
    128,
    256,
    512,
    1024,
    2048,
    4096,
    8192,
    16384,
    32768,
    65536,
    131072,
    262144,
    524288,
    1048576
  ];

  cambio = 0;
  total;
  vali;
  val;
  octetos;
  hsolitados = [];
  myvalor = [];
  direccion;
  mascara = 0;

  constructor(
    public alertController: AlertController,
    public toastController: ToastController
  ) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Autor:",

      message:
        ' Hecho con <ion-icon name="heart"></ion-icon> ',
      buttons: ["OK"]
    });

    await alert.present();
  }

  async presentErrorAlert(mystr) {
    const alert = await this.alertController.create({
      header: "Error al Calcular",

      message: mystr,
      buttons: ["Aceptar"]
    });

    await alert.present();
  }

  async toastIp() {
    const toast = await this.toastController.create({
      message: "La dirección Ip que desea subnetear, ejemplo: 192.168.4.32",
      mode: "ios",
      color: "dark",
      duration: 2000
    });
    toast.present();
  }
  async toastRed() {
    const toast = await this.toastController.create({
      message:
        "Este campo es llenado automáticamente por la aplicación. Las redes disponibles son: A < 127, B < 191, C < 223.",
      mode: "ios",
      color: "dark",
      duration: 2000
    });
    toast.present();
  }
  async toastNetInicio() {
    const toast = await this.toastController.create({
      message:
        "Este campo es llenado automáticamente por la aplicación según su dirección ip",
      mode: "ios",
      color: "dark",
      duration: 2000
    });
    toast.present();
  }
  async toastNetFin() {
    const toast = await this.toastController.create({
      message: "El numero de host decide el tamaño de cada subred.",
      mode: "ios",
      color: "dark",
      duration: 2000
    });
    toast.present();
  }

  validaListaHost() {
    if (this.listahost == "") {
      this.finvalida = true;
    } else {
      if (!/[^0-9,]/.test(this.listahost)) {
        this.finvalida = false;
      } else {
        this.finvalida = true;
      }
    }

    var mylista: any = this.listahost.split(",");
    mylista = mylista.join("");
  }

  getIpNetmask() {
    this.validaListaHost();
    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        this.ipAdress
      )
    ) {
      this.ipvalida = false;
    } else {
      this.ipvalida = true;
    }
    var myipAdress = this.ipAdress.split(".");
    if (myipAdress[0] > 0 && myipAdress[0] < 127) {
      this.firstNetmask = 8;
      this.tipo = "Clase A";
    } else if (myipAdress[0] >= 128 && myipAdress[0] < 191) {
      this.firstNetmask = 16;
      this.tipo = "Clase B";
    } else if (myipAdress[0] >= 192 && myipAdress[0] < 223) {
      this.firstNetmask = 24;
      this.tipo = "Clase C";
    } else {
      this.tipo = "No soportado";
      this.ipvalida = true;
      //  this.firstNetmask = "No soportado";
    }
    // this.firstNetmask.min=this.firstNetmask;
    // this.finalNetmask.min=this.firstNetmask;
    //el mínimo de la netmask de destino es la netmask por default
  }
  inicializar() {
    this.total = 1; //variable que dice cuántas redes hay
    this.vali = 0;
    this.cambio = 0;
    this.direccion = [];
    this.mascara = 0;
  }
  Limpiar() {
    //Variables Front End
    this.ipAdress = "0.0.0.0";
    this.tipo = "";
    this.listahost = "";
    this.firstNetmask = 0;
    this.myvalor = [];
    this.ipvalida = true;
    this.finvalida = true;
    this.inicializar();
  }
  CalcularDireccionRed(ipactual, salto) {
    // if(salto>256){
    //   var espacio=salto%255;
    // }
    if(salto>255){
      var diferencia=Math.trunc(salto/256);
      var mysalto=salto%256;
      // console.log(salto+"  "+diferencia+"  "+mysalto);
      for (let index = 1; index <= diferencia; index++) {      
        ipactual[3] += 256;
        if (ipactual[3] > 255) {
          this.val = ipactual[3] / 256;
          ipactual[2] += Math.round(this.val);
          ipactual[3] = 0;
        }
        if (ipactual[2] > 255) {
          this.val = ipactual[2] / 256;
          ipactual[1] += Math.round(this.val);
          ipactual[2] = 0;
          ipactual[3] = 0;
        }
        if (ipactual[1] > 255) {
          this.val = ipactual[1] / 256;
          ipactual[0] += Math.round(this.val);
          ipactual[1] = 0;
          ipactual[2] = 0;
          ipactual[3] = 0;
        }
        // console.log("vuelta "+index+" "+ipactual);
      }
      ipactual[3] += mysalto;
      if (ipactual[3] > 255) {
        this.val = ipactual[3] / 256;
        ipactual[2] += Math.round(this.val);
        ipactual[3] = 0;
      }
      if (ipactual[2] > 255) {
        this.val = ipactual[2] / 256;
        ipactual[1] += Math.round(this.val);
        ipactual[2] = 0;
        ipactual[3] = 0;
      }
      if (ipactual[1] > 255) {
        this.val = ipactual[1] / 256;
        ipactual[0] += Math.round(this.val);
        ipactual[1] = 0;
        ipactual[2] = 0;
        ipactual[3] = 0;
      }
    }else{
      ipactual[3] += salto;
      if (ipactual[3] > 255) {
        this.val = ipactual[3] / 256;
        ipactual[2] += Math.round(this.val);
        ipactual[3] = 0;
      }
      if (ipactual[2] > 255) {
        this.val = ipactual[2] / 256;
        ipactual[1] += Math.round(this.val);
        ipactual[2] = 0;
        ipactual[3] = 0;
      }
      if (ipactual[1] > 255) {
        this.val = ipactual[1] / 256;
        ipactual[0] += Math.round(this.val);
        ipactual[1] = 0;
        ipactual[2] = 0;
        ipactual[3] = 0;
      }
    }
    
    return ipactual;
  }

  Calcular() {
    this.getIpNetmask();
    if (
      this.tipo == "No soportado" ||
      this.ipvalida == true ||
      this.finvalida == true ||
      this.listahost == ""
    ) {
      this.presentErrorAlert("Datos erróneos, No se puede calcular");
      return;
    }
    this.octetos = this.ipAdress.split(".").map(function(item) {
      return parseInt(item, 10);
    });
    this.hsolitados = this.listahost.split(",").map(function(item) {
      return parseInt(item, 10);
    }); //transformo 123,123,123 a array

    var suma = 0;
    this.hsolitados.forEach(function(numero) {
      suma += numero;
    });
    if (suma >= 16581375) {
      this.presentErrorAlert("Los Host Solicitados Exceden al máximo disponibles");
      return;
    }
    this.hsolitados = this.hsolitados.sort((a, b) => b - a); //ordeno de mayor a menor
    this.inicializar();
    this.direccion = this.octetos;
    this.cambio = 0;
    for (let index = 0; index < this.hsolitados.length; index++) {
      for (let i = 0; i < this.equivalencias.length; i++) {
        if (this.hsolitados[index] <= this.equivalencias[i] - 2) {
          //numero--hsolicitados--hencontrados--direcciondered -- mascara-- primeraip--ultimaip
          // console.log(this.direccion);
          // console.log(this.cambio);
          this.direccion = this.CalcularDireccionRed(
            [...this.direccion],
            this.cambio
          );
          var aux = this.CalcularDireccionRed([...this.direccion], 1);
          this.cambio = this.equivalencias[i];
          this.mascara = this.firstNetmask;
          var nuevamascara = 32 - i;

          var aux2 = this.CalcularDireccionRed(
            [...this.direccion],
            this.cambio - 2
          );
          var aux3 = this.CalcularDireccionRed(
            [...this.direccion],
            this.cambio - 1
          );
          this.myvalor[index] = [
            index + 1,
            this.hsolitados[index],
            this.equivalencias[i] - 2,
            this.direccion.join("."),
            nuevamascara,
            aux.join("."),
            aux2.join("."),
            aux3.join(".")
          ];
          break;
        }
      }
    }
    // console.log(this.myvalor);
  }
}
