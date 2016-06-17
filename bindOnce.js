function globalBindOnce(triggerName, selector, fn) {
    if(typeof selector === 'function') {
        fn = selector;
        selector = undefined;
    }
    function handlerExists(triggerName, selector, theHandler) {
        function getFunctionName(fn) {
            var rgx = /^function\s+([^\(\s]+)/
            var matches = rgx.exec(fn.toString());
            return matches ? matches[1] : "(anonymous)"
        }
        var exists = false, existFn;

        var handlerName = getFunctionName(theHandler);
        var handlerStr = theHandler.toString();
        if ($(document).data('events') !== undefined) {
            var event = $(document).data('events')[triggerName];
            if (event !== undefined) {
                $.each(event, function(i, handler) {
                    if(handler && handler.selector === selector
                        && handlerStr == handler.fn.toString()) {
                        exists = true;
                        existFn = handler.fn;
                    }
                });
            }
        }
        return {exists: exists, existFn : existFn};
    }

    var existInfo = handlerExists(triggerName, selector, fn);
    if (existInfo.exists && existInfo.existFn) {
        console.log('triggerName:',triggerName, ' has already bind on document , auto unbind ');
        $(document).off(triggerName, selector, existInfo.existFn);
    }

    $(document).on(triggerName, selector, fn);
    var events = $(document).data('events') || {};
    events[triggerName] = events[triggerName] || [];
    events[triggerName].push( { selector: selector, fn: fn });
    $(document).data('events', events);
}

function globalClick(e) {
    console.log('globalClick',e);
}

globalBindOnce('click','.ee-project-dashboard-left-main-nav-item',function(event) {
    console.log('child click');
    event.stopPropagation();
});

globalBindOnce('click','.ee-project-dashboard-nav',function(event) {
    console.log('parent click');
    event.stopPropagation();
});

globalBindOnce('click','.nav-menu-eff',globalClick);
globalBindOnce('click','.nav-menu-eff',function() {
    console.log('aaaaaaaaaaaaa');
});
globalBindOnce('click','.nav-menu-eff',function() {
    console.log('bbbbbbbbbbbbbb');
});
globalBindOnce('click','.nav-menu-eff',function() {
    console.log('bbbbbbbbbbbbbb');
});
