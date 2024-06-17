public with sharing class FetchAccountData {
    // Inner class marked for use with Salesforce Flow. Each instance represents a single record's data.
    public class ResultWrapper {
        @InvocableVariable
        public String year;
        
        @InvocableVariable
        public Integer count;
    }

    // Fetches aggregate data from Accounts and structures it for use in Salesforce Flow as a collection of records.
    @InvocableMethod(label='Fetch Account Data' description='Returns account data aggregated by year.')
    public static List<List<ResultWrapper>> getAccounts() {
        // The outer list corresponds to batches of data, supporting bulk operations in Flow.
        // The inner list represents a collection of records for a single operation.
        List<List<ResultWrapper>> results = new List<List<ResultWrapper>>();
        
        // Ensures user has read access to the Account object to respect org's security model.
        if (!Schema.sObjectType.Account.isAccessible()) {
            // Early exit if user lacks access, returning an empty list to signify no data.
            return results;
        }

        List<ResultWrapper> wrappers = new List<ResultWrapper>();
        
        // Aggregate query to fetch required data.
        for(AggregateResult ar : [SELECT CALENDAR_YEAR(CreatedDate) Year, COUNT(Id) RecordCount 
                                  FROM Account GROUP BY CALENDAR_YEAR(CreatedDate)]) {
            ResultWrapper wrapper = new ResultWrapper();
            wrapper.year = String.valueOf(ar.get('Year')); // Stores the year as a string.
            wrapper.count = (Integer)ar.get('RecordCount'); // Stores the record count.
            wrappers.add(wrapper);
        }
        
        results.add(wrappers); // Adds the collection of records as a single batch.
        return results; // Returns the batched records to Flow.
    }
}
