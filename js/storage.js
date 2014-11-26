// JavaScript Document

function getLocalStorage() {
    try {
        if( !! window.localStorage ) return window.localStorage;
        else return undefined;
    } catch(e) {
        return undefined;
    }
}

function getSessionStorage() {
    try {
        if( !! window.sessionStorage ) return window.sessionStorage;
        else return undefined;
    } catch(e) {
        return undefined;
    }
}

var db_user = getLocalStorage() || dispError('Local Storage not supported.');
var db_server = getLocalStorage() || dispError('Local Storage not supported.');
var db_ppm = getSessionStorage() || dispError('Session Storage not supported');

var element = function(id) { return document.getElementById(id); }
var errorMessage = undefined;

/* Check server is set, if not set to default */
if (!db_server.getItem('server')) {
    db_server.setItem('server', 'http://apps.gwtrains.co.uk/uksummary/');
}

function dbGoServer() {
    if(errorMessage) return;
    var f = element('serversettings');
    db_server.setItem('server', f.elements['server'].value);
    console.log('Saved!');
    $("#server").attr("placeholder", db_user.getItem('server'));
    $( '#serversettings' ).each(function(){
        this.reset();
    });

}