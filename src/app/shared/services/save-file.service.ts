import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { stringify } from 'querystring';

// Menu
export interface saveImg {
	title: string;
	subTitle: string;
	// image?: Blob;
	image: string;
}

@Injectable({
	providedIn: 'root'
})

export class SaveImgService {

	constructor() { }

	saveFile(saveImg: saveImg) {
		let result = {
			success: false,
			error: ''
		};

		try {
			saveAs(saveImg.image, saveImg.title)
			result.success =  true;
		} catch (error) {
			result.success = false;
			result.error = error;
		}
		return result;
	}
}
