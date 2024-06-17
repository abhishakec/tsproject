import { LightningElement, api } from 'lwc';
import LinkedIn_Icon from '@salesforce/resourceUrl/linkedinIcon';

export default class FlowSocialLinks extends LightningElement {
    @api linkedInUrl;
    @api title;
    @api enableLinkedIn = false;

    LinkedInIcon = LinkedIn_Icon;

    get setLinkedInURL() {
        // Check if linkedInUrl is already a complete URL
        if (this.linkedInUrl && (this.linkedInUrl.startsWith('http://') || this.linkedInUrl.startsWith('https://'))) {
            return this.linkedInUrl;
        } else {
            return `https://${this.linkedInUrl}`;
        }
    }

}