import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SLIDERS } from 'data';
import { saveImg, SaveImgService } from 'src/app/shared/services/save-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit, AfterViewInit {
  private image: saveImg;

  @Output()
  imageSave = new EventEmitter<saveImg>();
  constructor(private saveImgService: SaveImgService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    let greeter:HTMLHeadingElement = document.getElementsByClassName("img-ul-upload img-ul-button")[0] as HTMLHeadingElement;;
    greeter.classList.add('btn-load-img');
    greeter = greeter.children[0] as HTMLHeadingElement;
    greeter.innerText = "Seleccionar Imagenes";

    greeter = document.getElementsByClassName("img-ul-drag-box-msg")[0] as HTMLHeadingElement;
    greeter.innerText = "¡Deja tus imágenes aquí!";

  }

  onUploadFinish(event) {
    console.log(event);
    let greeter = document.getElementsByClassName("img-ul-clear img-ul-button")[0] as HTMLHeadingElement;
    greeter.innerText = "Limpiar";

    this.image = {
      image: event.src,
      // image: this.convertB64toBlob(event.src),
      title: event.file.name,
      subTitle: ''
    };

    // this.saveImgService.saveFile(this.image);
    this.imageSave.emit(this.image);

  }

  convertB64toBlob(b64: string): Blob{
    const arrayData = b64.split(';');
    const type = arrayData[0].split(':')[1];
    const data = arrayData[1].split('base64,')[1];
    const byteCharacters = atob(data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], {type: type});
  }
}
