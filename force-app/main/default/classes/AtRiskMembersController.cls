public with sharing class AtRiskMembersController {
    @AuraEnabled(cacheable=true)
    public static List<Member__c> getAtRiskMembers() {
        return [
            SELECT Id, Name, Email_Address__c, Days_in_Program__c, At_Risk_Date__c 
            FROM Member__c
            WHERE At_Risk__c = TRUE
            WITH USER_MODE
            ORDER BY At_Risk_Date__c DESC
            LIMIT 10
        ];
    }
}