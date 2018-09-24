import Spinner from './spin/spin.js';
import toastr from './toastr/toastr.js';

let currentSpinner = undefined;
class uibase{
   static showProgress(show){
     if(show){
       var opts = {
         lines: 10 // The number of lines to draw
         , length: 9 // The length of each line
         , width: 4 // The line thickness
         , radius: 10 // The radius of the inner circle
         , scale: 1.0 // Scales overall size of the spinner
         , corners: 1 // Corner roundness (0..1)
         , color: '#000000' // #rgb or #rrggbb or array of colors
         , opacity: 0.25 // Opacity of the lines
         , rotate: 0 // The rotation offset
         , direction: 1 // 1: clockwise, -1: counterclockwise
         , speed: 1 // Rounds per second
         , trail: 100 // Afterglow percentage
         , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
         , zIndex: 2e9 // The z-index (defaults to 2000000000)
         , className: 'spinner' // The CSS class to assign to the spinner
         , top: '50%' // Top position relative to parent
         , left: '50%' // Left position relative to parent
         , shadow: true // Whether to render a shadow
         , hwaccel: false // Whether to use hardware acceleration
         , position: 'absolute' // Element positioning
       }

       if(currentSpinner){
         currentSpinner.stop();
         currentSpinner = undefined;
       }

       var target = document.body;
       var spinner = new Spinner(opts).spin(target);
       currentSpinner = spinner;
     }else{
       if(currentSpinner){
         currentSpinner.stop();
         currentSpinner = undefined;
       }
     }
   }

   static showToast(msg){
     if(!msg || msg == ""){
       return;
     }

     toastr.options = {
         closeButton: false,
         closeOnHover: false,
         tapToDismiss: false,
         debug: false,
         progressBar: false,
         positionClass: "toast-center",
         onclick: null,
         showDuration: "300",
         hideDuration: "0",
         timeOut: "2000",
         extendedTimeOut: "1000",
         showEasing: "swing",
         hideEasing: "linear",
         showMethod: "fadeIn",
         hideMethod: "fadeOut"
     };

     toastr.remove();
     toastr.info('<label>' + msg + '</label>');
    }
 }

 module.exports = uibase;
