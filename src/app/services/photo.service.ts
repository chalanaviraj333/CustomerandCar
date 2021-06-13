import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { LoadingController, Platform } from '@ionic/angular';
import { base64StringToBlob } from 'blob-util';
import { CustomerData } from '../customer-data';



@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  public photos: UserPhoto[] = [];
  private photoID: string = '';
  private PHOTO_STORAGE: string = 'photos';

  constructor(private platform: Platform,
    private storage: AngularFireStorage,
    private router: Router,
    public loadingController: LoadingController) {
    }

  public async addNewToGallery() {

    // clear previous photos from Array
    this.photos = [];

    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 100, // highest quality (0 to 100)
    });

    const savedImageFile = await this.savePicture(capturedPhoto);

    this.photoID= await this.readAsBase64(capturedPhoto);
   
    // Add new photo to Photos array
    this.photos.unshift(savedImageFile);
    // Cache all photo data for future retrieval
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });
  }

  // Save picture to file on device
  private async savePicture(cameraPhoto: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(cameraPhoto);

  
    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    if (this.platform.is('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath,
      };
    }
  }

  // Read camera photo into base64 format based on the platform the app is running on
  private async readAsBase64(cameraPhoto: Photo) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: cameraPhoto.path,
      });

      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(cameraPhoto.webPath!);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

  // Delete picture by removing it from reference data and the filesystem
  public async deletePicture(photo: UserPhoto, position: number) {
    // Remove this photo from the Photos reference data array
    this.photos.splice(position, 1);

    // Update photos array cache by overwriting the existing photo array
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });

    // delete photo file from filesystem
    const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data,
    });
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });



    async uploadPhotoIdFrontPage(customerData: CustomerData, carJob: boolean) {

      const newCustomer: CustomerData = customerData;
      const SelectediscarJob = carJob;

      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Uploading Photo ID',
        backdropDismiss: false
      });
      await loading.present();

      const contenttype = 'image/png';

      const b64Data = this.photoID.split(',').pop();

      const blob = base64StringToBlob(b64Data, contenttype);

      const filename = newCustomer.customerFirstName +  newCustomer.customerLastName + newCustomer.phoneNumber;
    
      const uploadTask = this.storage.upload('customerPhotoID-Front/' + filename, blob);

      uploadTask.percentageChanges().subscribe(changes => {

        if (changes == 100 && SelectediscarJob == true){
          this.router.navigateByUrl('addphotoIDBack/'
          + newCustomer.customerFirstName + '/' + newCustomer.customerLastName + '/' + newCustomer.phoneNumber + '/' + newCustomer.jobType + '/' + newCustomer.carRego);
          loading.dismiss();
          this.clearallphotos();
        }
        else if (changes == 100 && SelectediscarJob == false){
          this.router.navigateByUrl('addphotoIDBack/' + newCustomer.customerFirstName + '/' + newCustomer.customerLastName + '/' + newCustomer.phoneNumber + '/' + newCustomer.jobType );
          loading.dismiss();
          this.clearallphotos();
        }
      });

  }




  async uploadPhotoIdBackPage(customerData: CustomerData, carJob: boolean) {

    const newCustomer: CustomerData = customerData;
    const SelectediscarJob = carJob;

    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Uploading Photo ID',
      backdropDismiss: false
    });
    await loading.present();

    const contenttype = 'image/png';

    const b64Data = this.photoID.split(',').pop();

    const blob = base64StringToBlob(b64Data, contenttype);

    const filename = newCustomer.customerFirstName +  newCustomer.customerLastName + newCustomer.phoneNumber;
  
    const uploadTask = this.storage.upload('customerPhotoID-Back/' + filename, blob);

    uploadTask.percentageChanges().subscribe(changes => {

      if (changes == 100 && SelectediscarJob == true){
        this.router.navigateByUrl('detailviewpage/'+ newCustomer.customerFirstName + '/' + newCustomer.customerLastName + '/' + newCustomer.phoneNumber + '/' + newCustomer.jobType + '/' + newCustomer.carRego );
        loading.dismiss();
        this.clearallphotos();
      }
      else if (changes == 100 && SelectediscarJob == false){
        this.router.navigateByUrl('detailviewpage/'+ newCustomer.customerFirstName + '/' + newCustomer.customerLastName + '/' + newCustomer.phoneNumber + '/' + newCustomer.jobType );
        loading.dismiss();
        this.clearallphotos();

      }
    });

}

  clearallphotos() {
    this.photos = [];
  }

    
}

export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}
