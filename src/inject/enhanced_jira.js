!function () {
    console.log('BAM! enhanced injection successful!');

    $(document).on(JIRA.Events.ISSUE_REFRESHED,function(){
        console.log('listen on a catched jira event')
    });
}();
