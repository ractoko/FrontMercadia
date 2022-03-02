import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    let greeter:HTMLHeadingElement = document.getElementsByClassName("img-ul-upload img-ul-button")[0].children[0] as HTMLHeadingElement;
    greeter.innerText = "Seleccionar Imagenes";

    greeter = document.getElementsByClassName("img-ul-drag-box-msg")[0] as HTMLHeadingElement;
    greeter.innerText = "¡Deja tus imágenes aquí!";

  }

  onUploadFinish(event) {
    console.log(event);
    let greeter = document.getElementsByClassName("img-ul-clear img-ul-button")[0] as HTMLHeadingElement;
    greeter.innerText = "Limpiar";
  }

}
