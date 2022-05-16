var elt = document.getElementById('calculator');
var calculator = Desmos.GraphingCalculator(elt)
// var tmpState = calculator.getState();
var cloudvars = calculator.HelperExpression({ latex: 'c_{loudvars}' });
var socket = io();

// tmpState.expressions.list[0] = ({ id: '1', type: 'text', text: 'Welcome to Cloudmos!' });
// tmpState.expressions.list[1] = ({ id: '2', type: 'text', text: 'To start, click the button in the top-right to add cloud variables!' });
// tmpState.expressions.list[2] = ({ id: '3', type: 'text', text: 'This will create an array that is on the cloud!' });
// calculator.setState(tmpState);

function addCloud() {
  calculator.setExpression({ id: 'cloud', latex: 'c_{loudvars}=[]' });
}


cloudvars.observe('listValue', function() {
  socket.emit('cloudvar', cloudvars.listValue);
});

socket.on('cloudvar', function(msg) {
  if ( String(msg) != 'null') {
    calculator.setExpression({ id: 'cloud', latex: 'c_{loudvars}=[' + String(msg) + ']' });
  }
  
});