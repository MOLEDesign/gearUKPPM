// JavaScript Document

function getSessionStorage() {
    try {
        if( !! window.sessionStorage ) return window.sessionStorage;
        else return undefined;
    } catch(e) {
        return undefined;
    }
}

var chosenoperator = getSessionStorage() || dispError('Local Storage not supported.');

function setChosenOperator (opcode) {
	if (opcode !== '') {
		chosenOperator.setItem('opcode', opcode);
	} else {
		chosenOperator.setItem('opcode', 25);
	};
}