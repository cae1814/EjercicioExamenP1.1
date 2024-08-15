main();

function main() {
    // Agregando evento al boton Limpiar //
    btonLimpiar.addEventListener("click", limpiar);

    // Agregando evento al boton Calcular //
    btonCalcular.addEventListener("click", calcular);
}

function limpiar() {
    document.getElementById("inputPrecio1").value = 0;
    document.getElementById("inputPrecio2").value = 0;
    document.getElementById("inputPrecio3").value = 0;
    document.getElementById("inputPrecio4").value = 0;
    document.getElementById("inputPrecio5").value = 0;
    document.getElementById("inputCantidad1").value = 1;
    document.getElementById("inputCantidad2").value = 1;
    document.getElementById("inputCantidad3").value = 1;
    document.getElementById("inputCantidad4").value = 1;
    document.getElementById("inputCantidad5").value = 1;
    document.getElementById("inputSubTotal1").value = 0;
    document.getElementById("inputSubTotal2").value = 0;
    document.getElementById("inputSubTotal3").value = 0;
    document.getElementById("inputSubTotal4").value = 0;
    document.getElementById("inputSubTotal5").value = 0;
    document.getElementById("inputSubTotal").value = 0;
    document.getElementById("inputTotal").value = 0;
    document.getElementById("inputTotalDescuento").value = 0;
    document.getElementById("inputDescuento").value = ""; 
}

function calcular(idinput) {
    
    let precio = parseInt(document.getElementById("inputPrecio" + idinput).value);
    let cantidad = parseInt(document.getElementById("inputCantidad" + idinput).value);
   
    if (document.getElementById("inputPrecio" + idinput).value == "") {
        document.getElementById("error-inputPrecio"+idinput).removeAttribute("hidden");
        showAlert("El precio ingresado es incorrecto, ingresa una cantidad v&aacute;lida");
    } else {
        document.getElementById("error-inputPrecio"+idinput).setAttribute("hidden", "");
    }

    if (document.getElementById("inputCantidad" + idinput).value == "") {
        document.getElementById("error-inputCantidad"+idinput).removeAttribute("hidden");
        showAlert("El valor ingresado es incorrecto, ingresa una cantidad v&aacute;lida");
    } else {
        document.getElementById("error-inputCantidad"+idinput).setAttribute("hidden", "");
    }

    let subtotal = parseInt(precio * cantidad);
  
    document.getElementById("inputSubTotal" + idinput).value = subtotal.toFixed(2);
    totales();
}

function getDescuento(total) {
    let valor = 0;

    if (total > 0 && total <= 999.99){
        valor = 0;
    } else if (total >= 1000 && total <= 4999.99){
        valor = 10;
    } else if (total >= 5000 && total <= 8999.99){
        valor = 20;
    } else if (total >= 9000 && total <= 12999.99){
        valor = 30;
    } else if (total >= 13000){
        valor = 40;
    }

    return valor;
}

function totales() {
    let subt1 = parseInt(document.getElementById("inputSubTotal1").value);
    let subt2 = parseInt(document.getElementById("inputSubTotal2").value);
    let subt3 = parseInt(document.getElementById("inputSubTotal3").value);
    let subt4 = parseInt(document.getElementById("inputSubTotal4").value);
    let subt5 = parseInt(document.getElementById("inputSubTotal5").value);
    let subtotal = subt1 + subt2 + subt3 + subt4 + subt5;
    let descuento = getDescuento(subtotal);
    let totaldescuento = (subtotal * descuento)/100;

    document.getElementById("inputSubTotal").value = (subtotal).toFixed(2);
    document.getElementById("inputTotalDescuento").value = (totaldescuento).toFixed(2);
    document.getElementById("inputDescuento").value = "Descuento "+descuento+"%";
    document.getElementById("inputTotal").value = (subtotal - totaldescuento ).toFixed(2);
}


function showAlert(msg) {
    alertify.defaults = {
        // dialogs defaults
        autoReset: true,
        basic: false,
        closable: true,
        closableByDimmer: true,
        invokeOnCloseOff: false,
        frameless: false,
        defaultFocusOff: false,
        maintainFocus: true, // <== global default not per instance, applies to all dialogs
        maximizable: true,
        modal: true,
        movable: true,
        moveBounded: false,
        overflow: true,
        padding: true,
        pinnable: true,
        pinned: true,
        preventBodyShift: false, // <== global default not per instance, applies to all dialogs
        resizable: true,
        startMaximized: false,
        transition: 'pulse',
        transitionOff: false,
        tabbable: 'button:not(:disabled):not(.ajs-reset),[href]:not(:disabled):not(.ajs-reset),input:not(:disabled):not(.ajs-reset),select:not(:disabled):not(.ajs-reset),textarea:not(:disabled):not(.ajs-reset),[tabindex]:not([tabindex^="-"]):not(:disabled):not(.ajs-reset)',  // <== global default not per instance, applies to all dialogs

        // notifier defaults
        notifier: {
            // auto-dismiss wait time (in seconds)  
            delay: 5,
            // default position
            position: 'bottom-right',
            // adds a close button to notifier messages
            closeButton: false,
            // provides the ability to rename notifier classes
            classes: {
                base: 'alertify-notifier',
                prefix: 'ajs-',
                message: 'ajs-message',
                top: 'ajs-top',
                right: 'ajs-right',
                bottom: 'ajs-bottom',
                left: 'ajs-left',
                center: 'ajs-center',
                visible: 'ajs-visible',
                hidden: 'ajs-hidden',
                close: 'ajs-close'
            }
        },

        // language resources 
        glossary: {
            // dialogs default title
            title: 'T1201 Programacion Web I',
            // ok button text
            ok: 'OK',
            // cancel button text
            cancel: 'Cancel'
        },

        // theme settings
        theme: {
            // class name attached to prompt dialog input textbox.
            input: 'ajs-input',
            // class name attached to ok button
            ok: 'ajs-ok',
            // class name attached to cancel button 
            cancel: 'ajs-cancel'
        },
        // global hooks
        hooks: {
            // invoked before initializing any dialog
            preinit: function (instance) { },
            // invoked after initializing any dialog
            postinit: function (instance) { },
        },
    };

    alertify.alert(msg, function () { alertify.message('OK'); });
}

function loadTableFetch1() {
    let i = 0;
    fetch("https://api.escuelajs.co/api/v1/users").then(response => response.json()).then(data => {
        let tabla = '<tr><th>Id</th><th></th><th>Name</th><th>Email</th><th>Rol</th><th>Password</th><th>CreationDate</th></tr>';

        for (let user of data) {
            i++;
            tabla += `<tr>
                          <td scope='row'>${user.id}</td>
                          <td><div class="text-center"><img src="${user.avatar}" width="40px" class="rounded" alt="..." onerror="this.onerror=null; this.src='../assets/img/unkuser.jpg';" onclick="loadTableFetch1Verimage(this.src, '${user.name}', '${user.updatedAt}')" style="cursor:pointer;"></div></td>
                          <td>${user.name}</td>
                          <td>${user.email}</td>
                          <td>${user.role}</td>                          
                          <td>${user.password}</td> 
                          <td>${user.creationAt}</td>
                     </tr>`
        }

        document.getElementById("userstable").innerHTML = tabla;
    });
}