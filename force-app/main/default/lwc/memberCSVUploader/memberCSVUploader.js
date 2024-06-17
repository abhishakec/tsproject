import { LightningElement, track, api } from 'lwc';
import createMembers from '@salesforce/apex/ExcelSheetUploaderController.createMembers';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { RefreshEvent } from 'lightning/refresh';

export default class MemberCSVUploader extends LightningElement {
    @api recordid;
    @track fileName = '';
    @track numberOfMembers = 0;

    filesUploaded = [];
    fileReader;
    MAX_FILE_SIZE = 1500000;

    // Handle file selection
    handleFilesChange(event) {
        if (event.target.files.length > 0) {
            this.filesUploaded = event.target.files;
            this.fileName = event.target.files[0].name;
        }
    }

    // Handle save button click
    handleCreate() {
        if (this.filesUploaded.length > 0) {
            this.uploadFile();
        } else {
            this.fileName = 'Please select a CSV file to upload!!';
        }
    }

    // Upload the selected file
    uploadFile() {
        const file = this.filesUploaded[0];
        if (file.size > this.MAX_FILE_SIZE) {
            console.log('File Size is too long');
            return;
        }
        this.fileReader = new FileReader();
        this.fileReader.onload = () => {
            const fileContents = this.fileReader.result;
            this.saveFileToServer(fileContents);
        };
        this.fileReader.readAsText(file);
    }

    // Save the file contents to the server
    saveFileToServer(fileContents) {
        createMembers({ base64Data: JSON.stringify(fileContents), cdbId: this.recordid })
            .then(result => {
                // Get the insertedCount and existingCount values from the Apex response
                const insertedCount = result.insertedCount;
                const existingCount = result.existingCount;
                
                console.log('insertedCount:', insertedCount);
                console.log('existingCount:', existingCount);

                // Display different toast messages based on the values of insertedCount and existingCount
                if (insertedCount > 0 && existingCount === 0) {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            message: `${insertedCount} Member record(s) created`,
                            variant: 'success',
                        })
                    );
                } else if (insertedCount === 0 && existingCount > 0) {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            message: `${existingCount} Member record(s) updated`,
                            variant: 'success',
                        })
                    );
                } else if (insertedCount > 0 && existingCount > 0) {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            message: `${insertedCount} Member record(s) created and ${existingCount} Member record(s) updated`,
                            variant: 'success',
                        })
                    );
                }

                //Dispatch the refresh event
                this.dispatchEvent(new RefreshEvent());

            })
            .catch(error => {
                // Display an error toast message
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error while uploading File',
                        message: error.body.message,
                        variant: 'error',
                    })
                );
            });
    }
}