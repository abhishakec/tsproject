public with sharing class ChildRecordsFlowController {

    @InvocableMethod(label='Get Junction Child Records')
    global static List<List<Study_Group__c>> getRelatedChild(List<Member__c> members) {
        List<List<Study_Group__c>> relatedStudyGroupsList = new List<List<Study_Group__c>>();
        
        try {
            for (Member__c member : members) {
                List<Study_Group__c> relatedStudyGroups = new List<Study_Group__c>();

                // Query for related Study_Group__c records using the junction object
                List<Study_Group_Membership__c> memberships = [SELECT Study_Group__r.Id, Study_Group__r.Name
                                                             FROM Study_Group_Membership__c
                                                             WHERE Member__c = :member.Id];
                
                // Extract the Study Group records
                for (Study_Group_Membership__c membership : memberships) {
                    relatedStudyGroups.add(membership.Study_Group__r);
                }

                relatedStudyGroupsList.add(relatedStudyGroups);
            }
        } catch (Exception e) {
            // Handle the exception (e.g., log it, throw a custom error, etc.)
            System.debug('An error occurred: ' + e.getMessage());
        }
        
        return relatedStudyGroupsList;
    }
}