public with sharing class MemberController {
    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getMemberCountsByCountry() {
        return [SELECT Country__c, COUNT(Id) recordCount FROM Member__c GROUP BY Country__c];
    }
}