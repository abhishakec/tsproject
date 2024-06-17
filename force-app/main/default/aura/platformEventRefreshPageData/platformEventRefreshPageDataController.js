({
    handleRefreshPageData : function(component, event, helper) {
        //$A.get('e.force:refreshView').fire();
        window.location.reload();
    },

    recordId : function() {
        return this.get('v.recordId');
    }
})