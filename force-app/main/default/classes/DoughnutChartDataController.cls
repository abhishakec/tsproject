public with sharing class DoughnutChartDataController {
    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getData(String objectName, String labelName, String fieldName, String groupByVal) {
        try {
            if (String.isBlank(objectName) || String.isBlank(labelName) || String.isBlank(fieldName) || String.isBlank(groupByVal)) {
                throw new AuraHandledException('One or more parameters are missing or empty.');
            }

            // Build and execute the query
            String query = 'SELECT ' + groupByVal + '(' + labelName + ') LabelValue, COUNT(' + fieldName + ') RecordCount FROM ' + objectName + ' ' +
                           'GROUP BY ' + groupByVal + '(' + labelName + ') ' +
                           'ORDER BY ' + groupByVal + '(' + labelName + ') DESC';
            return Database.query(query);
        } catch (Exception e) {
            throw new AuraHandledException('An error occurred: ' + e.getMessage());
        }
    }
}