var elt = document.getElementById('calculator');
var calculator = Desmos.GraphingCalculator(elt)
// var tmpState = calculator.getState();
var cloudvars = calculator.HelperExpression({ latex: 'c_{loudvars}' });
var socket = io();
addCloud();

socket.emit('getCloud', (response) => {
  if ( String(response) != 'null') {
    calculator.setExpression({ id: 'cloud', latex: 'c_{loudvars}=[' + String(response) + ']' });
  }
})

// tmpState.expressions.list[0] = ({ id: '1', type: 'text', text: 'Welcome to Cloudmos!' });
// tmpState.expressions.list[1] = ({ id: '2', type: 'text', text: 'To start, click the button in the top-right to add cloud variables!' });
// tmpState.expressions.list[2] = ({ id: '3', type: 'text', text: 'This will create an array that is on the cloud!' });
// calculator.setState(tmpState);

// function popup() {
//   document.getElementById("popup-bg").style = "display: inline;"
//   document.getElementById("popup").style = "display: inline;"
// }

// function close() {
//   document.getElementById("popup-bg").style.display = 'none'
//   document.getElementById("popup").style.display = 'none'
// }

function addCloud() {
  if (!(calculator.getState().expressions.list.find((x) => x.id === 'cloud' && x.latex.substr(0,13) === "c_{loudvars}="))) {
    calculator.setExpression({ id: 'cloud', latex: 'c_{loudvars}=[]' });
  }
}

function download() {
  var downloadElement = document.createElement('a')
  var fileName = window.prompt('File name WITHOUT extention:')
  if (fileName === null) {
    return
  }
  if (fileName === '') {
    fileName = 'Untitled Graph'
  }
  var file = new Blob([JSON.stringify(calculator.getState())], {
      type: "text/plain",
    });
  downloadElement.href = URL.createObjectURL(file);
  downloadElement.target = '_blank'
  downloadElement.download = fileName + '.txt'
  downloadElement.click()
}

function upload() {
  var uploadElement = document.createElement('input')
  uploadElement.type = "file"
  uploadElement.click()
  uploadElement.addEventListener('change', function() {
    var fr = new FileReader();
    fr.onload = function(){
        calculator.setState(fr.result)
    }
    fr.readAsText(uploadElement.files[0]);
  })
}

socket.on('cloudvar', function(msg) {
  if ( String(msg) != 'null') {
    calculator.setExpression({ id: 'cloud', latex: 'c_{loudvars}=[' + String(msg) + ']' });
  }
});

cloudvars.observe('listValue', function() {
  socket.emit('cloudvar', cloudvars.listValue);
});
