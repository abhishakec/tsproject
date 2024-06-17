import { api } from 'lwc';

export default class MyModal extends LightningModal {
    @api flowApiName;

    // Return a custom value when the modal is closed with the Close button.
    // If no value is returned in the close method, then undefined is returned(Same as closing with the X button).
    closeModal() {
        this.close('return value');
    }

    handleStatusChange(event) {
        if (event.detail.status === 'FINISHED') {
            this.close('return value');
        }
    }
}