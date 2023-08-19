var s;
var arr = [];
var delarr = [];

// unsecured services ajax
function generateInvoice(){
    var invoice_id = $("#unique_id").val();
    var ip_address = $("#ipaddress").val();
    var left_company_name = $("#companyName").val();
    var left_name = $("#contactName").val();
    var left_email = $("#email").val();
    var country_code = $("#areaCode").val();
    var country_codeR = $("#areaCodeR").val();
    var left_phone = $("#phone").val();
    var left_address = $("#address").val();
    var right_company_name = $("#rCompanyName").val();
    var right_name = $("#rName").val();
    var right_email = $("#rEmail").val();
    var right_phone = $("#rPhone").val();
    var right_address = $("#rAddress").val();
    var totalTax = $("#tax").val();
    var subTotal = $("#subTotal").val();
    var discount = $("#discount").val();
    if(discount==null) {discount="0"};
    var grand_total = $("#grandTotal").val();
    var notes = $("#notes").val();
    var currencySelect = $("#currencySelect").val();
    var date = $("#date").val();
    var termsStr = $("#terms").val();  
    var custm_ph = "";
    left_phone!=""? custm_ph = "+" + country_code + left_phone: "";
    var custmR_ph ="";
    right_phone!=""? custmR_ph = "+" + country_codeR  + right_phone:"";
    if(currencySelect==="IND") {
        currencySelect ="₹"
    } else {
        currencySelect ="$"
    }
    for(let itemCount=1;itemCount<=s_no;itemCount++) {
        if(delarr.includes(itemCount) === false) {
        var itemname = document.getElementById("description" + itemCount);
        var amount = document.getElementById("amount" + itemCount);
        var quantity = document.getElementById("quantity" + itemCount);
        var result = document.getElementById("txtResult"+ itemCount);            
        arr.push({
            name: itemname.value,
            quantity: quantity.value,
            total: result.value,
            unitPrice: amount.value
            })
        }
    }
    var xmlhttp1;
        try {
            xmlhttp1 = new XMLHttpRequest();
        } catch (e) {
            try {
                xmlhttp1 = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlhttp1 = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) {
                    alert("BROWSER BROKE");
                    return false;
                }
            }
        }    
        xmlhttp1.open("POST", baseurl + "/invoicegeneration/generateinvoice", true);
        xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xmlhttp1.onreadystatechange = function () {
        var res = JSON.parse(this.responseText).response
        if (  this.status == 200 && this.responseText != null &&  this.responseText != ""  ) {
        var res = JSON.parse(this.responseText); 
        var s = res.rspnsMsg;
            var s = s.replace(/[{}]/g, "");
            let pairs = s.split(', ')
            let obj = pairs.reduce((obj, data) => {
                let [k, v] = data.split('=')
                obj[k] = v
                return obj
            }, {})      
            if (left_company_name == null || left_company_name == "") {
                var error = document.getElementById("msgSenderCompanyName");
                error.innerHTML = "This field is mandatory";
                document.getElementById('companyName').focus();
                return false;
            }
            else if (obj["companyName"] == "Invalid Sender's Company Name!!") {
                var error = document.getElementById("msgSenderCompanyName");
                error.innerHTML = obj["companyName"];
                document.getElementById('companyName').focus();
                return false;
            }
            if (left_name == null || left_name == "") {
                var error = document.getElementById("msgSenderContactName");
                error.innerHTML = "This field is mandatory";
                document.getElementById('contactName').focus();
                return false;
            }
            else if (obj["contactName"] == "Invalid Sender's Company Name!!") {
                var error = document.getElementById("msgSenderContactName");
                error.innerHTML = obj["contactName"];
                document.getElementById('contactName').focus();
                return false;
            }            
            if (left_email == null || left_email == "") {
                var error = document.getElementById("msgSenderMail");
                error.innerHTML = "This field is mandatory";
                document.getElementById('email').focus();
                return false;
            }
            else if (obj["email"] == "Invalid Sender's Mail!!") {
                var error = document.getElementById("msgSenderMail");
                error.innerHTML = obj["email"];
                document.getElementById('email').focus();
                return false;
            }
            if (obj["phone"] == "Invalid Sender's Phone!!") {
                var error = document.getElementById("msgSenderPhone");
                error.innerHTML = obj["phone"];
                document.getElementById('phone').focus();
                return false;
            }
            /*receiver*/
            if (right_company_name == null || right_company_name == "") {
                var error = document.getElementById("msgReceiverCompanyName");
                error.innerHTML = "This field is mandatory";
                document.getElementById('rCompanyName').focus();
                return false;
            }
            else if (obj["rCompanyName"] == "Invalid Receiver's Company Name!!") {
                var error = document.getElementById("msgReceiverCompanyName");
                error.innerHTML = obj["rCompanyName"];
                document.getElementById('rCompanyName').focus();
                return false;
            }
            if (right_name == null || right_name == "") {
                var error = document.getElementById("msgReceiverContactName");
                error.innerHTML = "This field is mandatory";
                document.getElementById('rName').focus();
                return false;
            }
            else if (obj["rName"] == "Invalid Receiver's Name!!") {
                var error = document.getElementById("msgReceiverContactName");
                error.innerHTML = obj["rName"];
                document.getElementById('rName').focus();
                return false;
            }            
            if (right_email == null || right_email == "") {
                var error = document.getElementById("msgReceiverMail");
                error.innerHTML = "This field is mandatory";
                document.getElementById('rEmail').focus();
                return false;
            }
            else if (obj["rEmail"] == "Invalid Receiver's Mail!!") {
                var error = document.getElementById("msgReceiverMail");
                error.innerHTML = obj["rEmail"];
                document.getElementById('rEmail').focus();
                return false;
            }
            if (obj["rPhone"] == "Invalid Receiver's Phone!!") {
                var error = document.getElementById("msgReceiverPhone");
                error.innerHTML = obj["rPhone"];
                document.getElementById('rPhone').focus();
                return false;
            }
            if (res.rspnsMsg == "GOOD") {
                window.location='success.html';
            }
        }
    }
    xmlhttp1.send(JSON.stringify({
        "invoiceId": invoice_id,
        "invoiceItems": arr,
        "ipAddress": ip_address,
        "receiver": {
            "rAddress": right_address,
            "rCompanyName": right_company_name,
            "rContactName": right_name,
            "rPhone": custmR_ph
        },
        "invoiceValues": {
            "comment": notes!="" ? notes : "",
            "currency": currencySelect!="" ? currencySelect : "",
            "date": date!="" ? date : "",
            "discount": discount!="" ? discount : "0",
            "grandTotal": grand_total,          
            "subTotal": subTotal!="" ? subTotal : "",
            "terms": termsStr!="" ? termsStr : "",
            "totalTax": totalTax!="" ? totalTax : "0"            
        },
        "receiverEmail": right_email,
        "sender": {
          "address": left_address,
          "companyName": left_company_name,
          "contactName": left_name,
          "phone": custm_ph
        },
        "senderEmail": left_email              
      })
    )
    arr=[]
    delarr=[]
    return true;
}

function generateWorkOrder(){
    var wo_invoice = $("#wo_unique_id").val();
    var ip_address = $("#ipaddress").val();
    var left_company_name = $("#companyName").val();
    var left_name = $("#contactName").val();    
    var left_email = $("#email").val();
    var left_phone = $("#phone").val();
    var left_address = $("#address").val();
    var right_company_name = $("#rCompanyName").val();
    var right_name = $("#rName").val();
    var right_email = $("#rEmail").val();
    var right_phone = $("#rPhone").val();
    var right_address = $("#rAddress").val();
    var country_code = $("#areaCode").val();
    var country_codeR = $("#areaCodeR").val();
    var subTotal = $("#subTotal").val();
    var currencySelect = $("#currencySelect").val();
    var notes = $("#notes").val();
    var date = $("#workorderDate").val();
    var termsStr = $("#terms").val();
    var dayCount = $("#dayCount").val();
    var custm_ph = "";
    left_phone!=""? custm_ph = "+" + country_code + left_phone: "";
    var custmR_ph ="";
    right_phone!=""? custmR_ph = "+" + country_codeR  + right_phone:"";
    if(currencySelect==="IND") {
        currencySelect ="₹"
    } else {
        currencySelect ="$"
    }
    for(let itemCount=1;itemCount<=s_no;itemCount++) {
        if(delarr.includes(itemCount) === false) {
        var itemname = document.getElementById("description" + itemCount);
        var amount = document.getElementById("amount" + itemCount);
        var quantity = document.getElementById("quantity" + itemCount);
        var result = document.getElementById("txtResult"+ itemCount);            
        var notes = $("#notes").val();           
        arr.push({
            name: itemname.value,
            quantity: quantity.value,
            total: result.value,
            unitPrice: amount.value,
            })
        }
    }
    var xmlhttp1;
        try {
            xmlhttp1 = new XMLHttpRequest();
        } catch (e) {
            try {
                xmlhttp1 = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlhttp1 = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) {
                    alert("BROWSER BROKE");
                    return false;
                }
            }
        }
    
        xmlhttp1.open("POST", baseurl + "/invoicegeneration/generateworkorder", true);
        xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xmlhttp1.onreadystatechange = function () {
        var res = JSON.parse(this.responseText).response
        if (  this.status == 200 && this.responseText != null &&  this.responseText != ""  ) {
            var res = JSON.parse(this.responseText); 
            var s = res.rspnsMsg;
                var s = s.replace(/[{}]/g, "");
                let pairs = s.split(', ')
                let obj = pairs.reduce((obj, data) => {
                    let [k, v] = data.split('=')
                    obj[k] = v
                    return obj
                }, {})      
                if (left_company_name == null || left_company_name == "") {
                    var error = document.getElementById("msgSenderCompanyName");
                    error.innerHTML = "This field is mandatory";
                    document.getElementById('companyName').focus();
                    return false;
                }
                else if (obj["companyName"] == "Invalid Sender's Company Name!!") {
                    var error = document.getElementById("msgSenderCompanyName");
                    error.innerHTML = obj["companyName"];
                    document.getElementById('companyName').focus();
                    return false;
                }
                if (left_name == null || left_name == "") {
                    var error = document.getElementById("msgSenderContactName");
                    error.innerHTML = "This field is mandatory";
                    document.getElementById('contactName').focus();
                    return false;
                }
                else if (obj["contactName"] == "Invalid Sender's Company Name!!") {
                    var error = document.getElementById("msgSenderContactName");
                    error.innerHTML = obj["contactName"];
                    document.getElementById('contactName').focus();
                    return false;
                }            
                if (left_email == null || left_email == "") {
                    var error = document.getElementById("msgSenderMail");
                    error.innerHTML = "This field is mandatory";
                    document.getElementById('email').focus();
                    return false;
                }
                else if (obj["email"] == "Invalid Sender's Mail!!") {
                    var error = document.getElementById("msgSenderMail");
                    error.innerHTML = obj["email"];
                    document.getElementById('email').focus();
                    return false;
                }
                if (obj["phone"] == "Invalid Sender's Phone!!") {
                    var error = document.getElementById("msgSenderPhone");
                    error.innerHTML = obj["phone"];
                    document.getElementById('phone').focus();
                    return false;
                }
                /*receiver*/
                if (right_company_name == null || right_company_name == "") {
                    var error = document.getElementById("msgReceiverCompanyName");
                    error.innerHTML = "This field is mandatory";
                    document.getElementById('rCompanyName').focus();
                    return false;
                }
                else if (obj["rCompanyName"] == "Invalid Receiver's Company Name!!") {
                    var error = document.getElementById("msgReceiverCompanyName");
                    error.innerHTML = obj["rCompanyName"];
                    document.getElementById('rCompanyName').focus();
                    return false;
                }
                if (right_name == null || right_name == "") {
                    var error = document.getElementById("msgReceiverContactName");
                    error.innerHTML = "This field is mandatory";
                    document.getElementById('rName').focus();
                    return false;
                }
                else if (obj["rName"] == "Invalid Receiver's Name!!") {
                    var error = document.getElementById("msgReceiverContactName");
                    error.innerHTML = obj["rName"];
                    document.getElementById('rName').focus();
                    return false;
                }            
                if (right_email == null || right_email == "") {
                    var error = document.getElementById("msgReceiverMail");
                    error.innerHTML = "This field is mandatory";
                    document.getElementById('rEmail').focus();
                    return false;
                }
                else if (obj["rEmail"] == "Invalid Receiver's Mail!!") {
                    var error = document.getElementById("msgReceiverMail");
                    error.innerHTML = obj["rEmail"];
                    document.getElementById('rEmail').focus();
                    return false;
                }
               if (obj["rPhone"] == "Invalid Receiver's Phone!!") {
                    var error = document.getElementById("msgReceiverPhone");
                    error.innerHTML = obj["rPhone"];
                    document.getElementById('rPhone').focus();
                    return false;
                }
                if (res.rspnsMsg == "GOOD") {
                    window.location='success.html';
                }
            }
    }
    xmlhttp1.send(JSON.stringify({
        "invoiceId": wo_invoice,
        "invoiceItems": arr,
        "ipAddress": ip_address,
        "receiver": {
            "rAddress": right_address,
            "rCompanyName": right_company_name,
            "rContactName": right_name,
            "rPhone": custmR_ph
        },
        "invoiceValues": {
            "comment": notes!="" ? notes : "",
            "currency": currencySelect!="" ? currencySelect : "",
            "date": date!="" ? date : "",
            "subTotal": subTotal!="" ? subTotal : "",
            "terms": termsStr!="" ? termsStr : "",           
            "validity": dayCount
          },
        "receiverEmail": right_email,
        "sender": {
          "address": left_address,
          "companyName": left_company_name,
          "contactName": left_name,
          "phone": custm_ph
        },
        "senderEmail": left_email
      })
    )
    arr=[]
    delarr=[]
    return true;
}

function previewInvoice(){
    var invoice_id = $("#unique_id").val(); 
    var left_company_name = $("#companyName").val();
    var country_code = $("#areaCode").val();
    var country_codeR =$("#areaCodeR").val();
    var left_name = $("#contactName").val();
    var left_email = $("#email").val();
    var left_phone = $("#phone").val();
    var currencySelect = $("#currencySelect").val();
    var left_address = $("#address").val();
    var right_company_name = $("#rCompanyName").val();
    var right_name = $("#rName").val();
    var right_email = $("#rEmail").val();
    var right_phone = $("#rPhone").val();
    var right_address = $("#rAddress").val();
    var totalTax = $("#tax").val();
    var subTotal = $("#subTotal").val();
    var discount = $("#discount").val();
    var grand_total = $("#grandTotal").val();
    var ip_address = $("#ipaddress").val();
    var notes = $("#notes").val();
    var date = $("#date").val();
    var termsStr = $("#terms").val();
    var custm_ph = "";
    left_phone!=""? custm_ph = "+" + country_code + left_phone: "";
    var custmR_ph ="";
    right_phone!=""? custmR_ph = "+" + country_codeR  + right_phone:"";
    if(currencySelect==="IND") {currencySelect ="₹"}
    else {currencySelect ="$"}
    for(let itemCount=1;itemCount<=s_no;itemCount++) {
        if(delarr.includes(itemCount) === false) {
        var itemname = document.getElementById("description" + itemCount);
        var amount = document.getElementById("amount" + itemCount);
        var quantity = document.getElementById("quantity" + itemCount);
        var result = document.getElementById("txtResult"+ itemCount);            
        arr.push({
            name: itemname.value,
            quantity: quantity.value,
            total: result.value,
            unitPrice: amount.value
            })
        }
    }
 
    var xmlhttp1;
        try {
            xmlhttp1 = new XMLHttpRequest();
        } catch (e) {
            try {
                xmlhttp1 = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlhttp1 = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) {
                    alert("BROWSER BROKE");
                    return false;
                }
            }
        }    
        xmlhttp1.open("POST", baseurl + "/invoicegeneration/previewinvoice", true);
        xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xmlhttp1.onreadystatechange = function () {
        var res = JSON.parse(this.responseText).response
        error_less();
        if (  this.status == 200 && this.responseText != null &&  this.responseText != ""  ) {
        var res = JSON.parse(this.responseText); 
        var s = res.rspnsMsg;
            var s = s.replace(/[{}]/g, "");
            let pairs = s.split(', ')
            let obj = pairs.reduce((obj, data) => {
                let [k, v] = data.split('=')
                obj[k] = v
                return obj
            }, {}) 
            if (left_company_name == null || left_company_name == "") {
                var error = document.getElementById("msgSenderCompanyName");
                error.innerHTML = "This field is mandatory";
                document.getElementById('companyName').focus();
                return false;
            }
            else if (obj["companyName"] == "Invalid Sender's Company Name!!") {
                var error = document.getElementById("msgSenderCompanyName");
                error.innerHTML = obj["companyName"];
                document.getElementById('companyName').focus();
                return false;
            }
            if (left_name == null || left_name == "") {
                var error = document.getElementById("msgSenderContactName");
                error.innerHTML = "This field is mandatory";
                document.getElementById('contactName').focus();
                return false;
            }
            else if (obj["contactName"] == "Invalid Sender's Name!!") {
                var error = document.getElementById("msgSenderContactName");
                error.innerHTML = obj["contactName"];
                document.getElementById('contactName').focus();
                return false;
            }            
            if (left_email == null || left_email == "") {
                var error = document.getElementById("msgSenderMail");
                error.innerHTML = "This field is mandatory";
                document.getElementById('email').focus();
                return false;
            }
            else if (obj["email"] == "Invalid Sender's Mail!!") {
                var error = document.getElementById("msgSenderMail");
                error.innerHTML = obj["email"];
                document.getElementById('email').focus();
                return false;
            }
            // if (custm_ph == null || custm_ph == "") {
            //     var error = document.getElementById("msgSenderPhone");
            //     error.innerHTML = "This field is mandatory";
            //     document.getElementById('phone').focus();
            //     return false;
            // }
            // else
             if (obj["phone"] == "Invalid Sender's Phone!!") {
                var error = document.getElementById("msgSenderPhone");
                error.innerHTML = obj["phone"];
                document.getElementById('phone').focus();
                return false;
            }
            /*receiver*/
            if (right_company_name == null || right_company_name == "") {
                var error = document.getElementById("msgReceiverCompanyName");
                error.innerHTML = "This field is mandatory";
                document.getElementById('rCompanyName').focus();
                return false;
            }
            else if (obj["rCompanyName"] == "Invalid Receiver's Company Name!!") {
                var error = document.getElementById("msgReceiverCompanyName");
                error.innerHTML = obj["rCompanyName"];
                document.getElementById('rCompanyName').focus();
                return false;
            }
            if (right_name == null || right_name == "") {
                var error = document.getElementById("msgReceiverContactName");
                error.innerHTML = "This field is mandatory";
                document.getElementById('rName').focus();
                return false;
            }
            else if (obj["rName"] == "Invalid Receiver's Name!!") {
                var error = document.getElementById("msgReceiverContactName");
                error.innerHTML = obj["rName"];
                document.getElementById('rName').focus();
                return false;
            }            
            if (right_email == null || right_email == "") {
                var error = document.getElementById("msgReceiverMail");
                error.innerHTML = "This field is mandatory";
                document.getElementById('rEmail').focus();
                return false;
            }
            else if (obj["rEmail"] == "Invalid Receiver's Mail!!") {
                var error = document.getElementById("msgReceiverMail");
                error.innerHTML = obj["rEmail"];
                document.getElementById('rEmail').focus();
                return false;
            }
            // if (custmR_ph == null || custmR_ph == "") {
            //     var error = document.getElementById("msgReceiverPhone");
            //     error.innerHTML = "This field is mandatory";
            //     document.getElementById('rPhone').focus();
            //     return false;
            // }
            // else 
            if (obj["rPhone"] == "Invalid Receiver's Phone!!") {
                var error = document.getElementById("msgReceiverPhone");
                error.innerHTML = obj["rPhone"];
                document.getElementById('rPhone').focus();
                return false;
            }
            if (res.rspnsMsg == "GOOD") {
                document.getElementsByTagName("footer")[0].style.display = "none";
                document.getElementById("previewP").innerHTML = res.response;
            }
        }       
    }
    xmlhttp1.send(JSON.stringify({
        "invoiceId": invoice_id,
        "invoiceItems": arr,
        "ipAddress": ip_address,
        "receiver": {
            "rAddress": right_address,
            "rCompanyName": right_company_name,
            "rContactName": right_name,
            "rPhone": custmR_ph
        },
        "invoiceValues": {
            "comment": notes!="" ? notes : "",
            "currency": currencySelect!="" ? currencySelect : "",
            "date": date!="" ? date : "",
            "discount": discount!="" ? discount : "0",
            "grandTotal": grand_total,          
            "subTotal": subTotal!="" ? subTotal : "",
            "terms": termsStr!="" ? termsStr : "",
            "totalTax": totalTax!="" ? totalTax : "0"            
        },
        "receiverEmail": right_email,
        "sender": {
          "address": left_address,
          "companyName": left_company_name,
          "contactName": left_name,
          "phone": custm_ph
        },
        "senderEmail": left_email      
      })
    )
    arr=[]
    return true;
}

function previewWorkOrder(){
    var wo_invoice = $("#wo_unique_id").val();
    var ip_address = $("#ipaddress").val();
    var left_company_name = $("#companyName").val();
    var left_name = $("#contactName").val();    
    var left_email = $("#email").val();
    var left_phone = $("#phone").val();
    var left_address = $("#address").val();
    var right_company_name = $("#rCompanyName").val();
    var right_name = $("#rName").val();
    var right_email = $("#rEmail").val();
    var right_phone = $("#rPhone").val();
    var right_address = $("#rAddress").val();
    var country_code = $("#areaCode").val();
    var country_codeR = $("#areaCodeR").val();
    var subTotal = $("#subTotal").val();
    var currencySelect = $("#currencySelect").val();
    var notes = $("#notes").val();
    var date = $("#workorderDate").val();
    var termsStr = $("#terms").val();
    var dayCount = $("#dayCount").val();
    var custm_ph = "";
    left_phone!=""? custm_ph = "+" + country_code + left_phone: "";
    var custmR_ph ="";
    right_phone!=""? custmR_ph = "+" + country_codeR  + right_phone:"";
    // terms = termsStr.split("/\r?\ n/");
    if(currencySelect==="IND") {currencySelect ="₹"}
    else {currencySelect ="$"}
    for(let itemCount=1;itemCount<=s_no;itemCount++) {
        if(delarr.includes(itemCount) === false) {
        var itemname = document.getElementById("description" + itemCount);
        var amount = document.getElementById("amount" + itemCount);
        var quantity = document.getElementById("quantity" + itemCount);
        var result = document.getElementById("txtResult"+ itemCount);            
        arr.push({
            name: itemname.value,
            quantity: quantity.value,
            total: result.value,
            unitPrice: amount.value
            })
        }
    }
    var xmlhttp1;
        try {
            xmlhttp1 = new XMLHttpRequest();
        } catch (e) {
            try {
                xmlhttp1 = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlhttp1 = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) {
                    alert("BROWSER BROKE");
                    return false;
                }
            }
        }
        xmlhttp1.open("POST", baseurl + "/invoicegeneration/previewworkorder", true);
        xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xmlhttp1.onreadystatechange = function () {
        var res = JSON.parse(this.responseText).response
        workorderErrorLess();
        if (  this.status == 200 && this.responseText != null &&  this.responseText != ""  ) {
            var res = JSON.parse(this.responseText); 
            var s = res.rspnsMsg;
                var s = s.replace(/[{}]/g, "");
                let pairs = s.split(', ')
                let obj = pairs.reduce((obj, data) => {
                    let [k, v] = data.split('=')
                    obj[k] = v
                    return obj
                }, {}) 
                if (left_company_name == null || left_company_name == "") {
                    var error = document.getElementById("msgSenderCompanyName");
                    error.innerHTML = "This field is mandatory";
                    document.getElementById('companyName').focus();
                    return false;
                }
                else if (obj["companyName"] == "Invalid Sender's Company Name!!") {
                    var error = document.getElementById("msgSenderCompanyName");
                    error.innerHTML = obj["companyName"];
                    document.getElementById('companyName').focus();
                    return false;
                }
                if (left_name == null || left_name == "") {
                    var error = document.getElementById("msgSenderContactName");
                    error.innerHTML = "This field is mandatory";
                    document.getElementById('contactName').focus();
                    return false;
                }
                else if (obj["contactName"] == "Invalid Sender's Name!!") {
                    var error = document.getElementById("msgSenderContactName");
                    error.innerHTML = obj["contactName"];
                    document.getElementById('contactName').focus();
                    return false;
                }            
                if (left_email == null || left_email == "") {
                    var error = document.getElementById("msgSenderMail");
                    error.innerHTML = "This field is mandatory";
                    document.getElementById('email').focus();
                    return false;
                }
                else if (obj["email"] == "Invalid Sender's Mail!!") {
                    var error = document.getElementById("msgSenderMail");
                    error.innerHTML = obj["email"];
                    document.getElementById('email').focus();
                    return false;
                }
                // if (custm_ph == null || custm_ph == "") {
                //     var error = document.getElementById("msgSenderPhone");
                //     error.innerHTML = "This field is mandatory";
                //     document.getElementById('phone').focus();
                //     return false;
                // }
                // else 
                if (obj["phone"] == "Invalid Sender's Phone!!") {
                    var error = document.getElementById("msgSenderPhone");
                    error.innerHTML = obj["phone"];
                    document.getElementById('phone').focus();
                    return false;
                }
                /*receiver*/
                if (right_company_name == null || right_company_name == "") {
                    var error = document.getElementById("msgReceiverCompanyName");
                    error.innerHTML = "This field is mandatory";
                    document.getElementById('rCompanyName').focus();
                    return false;
                }
                else if (obj["rCompanyName"] == "Invalid Receiver's Company Name!!") {
                    var error = document.getElementById("msgReceiverCompanyName");
                    error.innerHTML = obj["rCompanyName"];
                    document.getElementById('rCompanyName').focus();
                    return false;
                }
                if (right_name == null || right_name == "") {
                    var error = document.getElementById("msgReceiverContactName");
                    error.innerHTML = "This field is mandatory";
                    document.getElementById('rName').focus();
                    return false;
                }
                else if (obj["rName"] == "Invalid Receiver's Name!!") {
                    var error = document.getElementById("msgReceiverContactName");
                    error.innerHTML = obj["rName"];
                    document.getElementById('rName').focus();
                    return false;
                }            
                if (right_email == null || right_email == "") {
                    var error = document.getElementById("msgReceiverMail");
                    error.innerHTML = "This field is mandatory";
                    document.getElementById('rEmail').focus();
                    return false;
                }
                else if (obj["rEmail"] == "Invalid Receiver's Mail!!") {
                    var error = document.getElementById("msgReceiverMail");
                    error.innerHTML = obj["rEmail"];
                    document.getElementById('rEmail').focus();
                    return false;
                }
                // if (custmR_ph == null || custmR_ph == "") {
                //     var error = document.getElementById("msgReceiverPhone");
                //     error.innerHTML = "This field is mandatory";
                //     document.getElementById('rPhone').focus();
                //     return false;
                // }
                // else 
                if (obj["rPhone"] == "Invalid Receiver's Phone!!") {
                    var error = document.getElementById("msgReceiverPhone");
                    error.innerHTML = obj["rPhone"];
                    document.getElementById('rPhone').focus();
                    return false;
                }
                if (res.rspnsMsg == "GOOD") {
                    document.getElementsByTagName("footer")[0].style.display = "none";
                    document.getElementById("previewP").innerHTML = res.response;            
                    return true;
                }
            }       
        }
    xmlhttp1.send(JSON.stringify({
        "invoiceId": wo_invoice,
        "invoiceItems": arr,
        "ipAddress": ip_address,
        "receiver": {
            "rAddress": right_address,
            "rCompanyName": right_company_name,
            "rContactName": right_name,
            "rPhone": custmR_ph
        },
        "invoiceValues": {
            "comment": notes!="" ? notes : "",
            "currency": currencySelect!="" ? currencySelect : "",
            "date": date!="" ? date : "",
            "subTotal": subTotal!="" ? subTotal : "",
            "terms": termsStr!="" ? termsStr : "",           
            "validity": dayCount
          },
        "receiverEmail": right_email,
        "sender": {
          "address": left_address,
          "companyName": left_company_name,
          "contactName": left_name,
          "phone": custm_ph
        },
        "senderEmail": left_email        
      })
    )
    arr=[]
    return true;
}

function registerEmail() {
    var email = $("#email").val();
    var password = $("#confirm_password").val();
  
    var xmlhttp;
    try {
      xmlhttp = new XMLHttpRequest();
    } catch (e) {
      try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
          alert("BROWSER BROKE");
          return false;
        }
      }
    }
  
    var url = baseurl + "/invoicegeneration/companyemailregister";
    var webURL = window.location.protocol + "//" + window.location.host+"/"+"verifyOTP.html";
    xmlhttp.open("POST", url + "?" + "webUrl="+ webURL + "&password=" + password+ "&emailID="+email, true);
    xmlhttp.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) 
         {
          var res = JSON.parse(xmlhttp.responseText);
            if(res.response === "Email ID already exists") {
             alert("Email ID already Exists");
            }
            else if (res.response === "MAIL SENT") {
              var successModal = `<div style="display: block; position: fixed; z-index: 1050; padding-top: 10px; left: 0; top: 0; width: 100%; height: 100%; overflow: auto;"><div style="background-color: #069A8E; margin: auto; padding: 10px; border: 1px solid #888; width: 300px; border-radius: 5px;"><h5 style="margin-top: 0; font-weight: bold; color: #FFFFFF;">Success</h5><p style="font-weight: bold; color: #FFFFFF;">Check your mail.</p></div></div>`;
              document.body.innerHTML += successModal; 
              setTimeout(function() {
              window.location.href = 'verifyOTP.html?emailID='+email;
            }, 3000);
          }
        }
      
    };
  
    xmlhttp.send();
}

function verifymail() {
    var otp = $("#otp").val();
    var email = getQueryParam('emailID');
    
    var xmlhttp;
    try {
      xmlhttp = new XMLHttpRequest();
    } catch (e) {
      try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
          alert("BROWSER BROKE");
          return false;
        }
      }
    }
  
    var url = baseurl + "/invoicegeneration/verifymail";
    var params = "&otp=" + otp + "&emailID=" + email;
    var webURL = window.location.protocol + "//" + window.location.host + "/" +'login.html';  
    xmlhttp.open("GET", url + "?"+"webUrl="+ webURL + params, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) 
           {
            var res = JSON.parse(xmlhttp.responseText);
           if (res.response != "GOOD") {
               var successModal = `<div style="display: block; position: fixed; z-index: 1050; padding-top: 10px; left: 0; top: 0; width: 100%; height: 100%; overflow: auto;"><div style="background-color: #069A8E; margin: auto; padding: 10px; border: 1px solid #888; width: 300px; border-radius: 5px;"><h5 style="margin-top: 0; font-weight: bold; color: #FFFFFF;">OTP Verified</h5><p style="font-weight: bold; color: #FFFFFF;">Redirecting to Login page....</p></div></div>`;
            document.body.innerHTML += successModal; 
            setTimeout(function() {
              window.location.href = 'login.html';
            }, 3000);
            }
          }
          else if(xmlhttp.status === 500) {
            var res = JSON.parse(xmlhttp.responseText);
            if(res.rspnsMsg  === "403 FORBIDDEN") {
                alert("Invalid OTP");
            } else {
                window.location.href = 'error.html';
            }
          }
        
      };
  
    xmlhttp.send();
}

// secured services ajax
function previewInvoiceSecured(){
    var invoice_id = $("#unique_id").val(); 
    var left_company_name = $("#companyName").val();
    var country_code = $("#areaCode").val();
    var country_codeR =$("#areaCodeR").val();
    var left_name = $("#contactName").val();
    var left_email = $("#email").val();
    var left_phone = $("#phone").val();
    var currencySelect = $("#currencySelect").val();
    var left_address = $("#address").val();
    var right_company_name = $("#rCompanyName").val();
    var right_name = $("#rName").val();
    var right_email = $("#rEmail").val();
    var right_phone = $("#rPhone").val();
    var right_address = $("#rAddress").val();
    var totalTax = $("#tax").val();
    var subTotal = $("#subTotal").val();
    var discount = $("#discount").val();
    var grand_total = $("#grandTotal").val();
    var ip_address = $("#ipaddress").val();
    var notes = $("#notes").val();
    var date = $("#date").val();
    var termsStr = $("#terms").val();
    var custm_ph = "";
    left_phone!=""? custm_ph = "+" + country_code + left_phone: "";
    var custmR_ph ="";
    right_phone!=""? custmR_ph = "+" + country_codeR  + right_phone:"";
    if(currencySelect==="IND") {currencySelect ="₹"}
    else {currencySelect ="$"}
    for(let itemCount=1;itemCount<=s_no;itemCount++) {
        if(delarr.includes(itemCount) === false) {
        var itemname = document.getElementById("description" + itemCount);
        var amount = document.getElementById("amount" + itemCount);
        var quantity = document.getElementById("quantity" + itemCount);
        var result = document.getElementById("txtResult"+ itemCount);            
        arr.push({
            name: itemname.value,
            quantity: quantity.value,
            total: result.value,
            unitPrice: amount.value
            })
        }
    }
 
    var xmlhttp1;
        try {
            xmlhttp1 = new XMLHttpRequest();
        } catch (e) {
            try {
                xmlhttp1 = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlhttp1 = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) {
                    alert("BROWSER BROKE");
                    return false;
                }
            }
        }    
        xmlhttp1.open("POST", baseurl + "/invoicegeneration/previewinvoice", true);
        xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xmlhttp1.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
        xmlhttp1.onreadystatechange = function () {
        var res = JSON.parse(this.responseText).response
        error_less();
        if (  this.status == 200 && this.responseText != null &&  this.responseText != ""  ) {
        var res = JSON.parse(this.responseText); 
        var s = res.rspnsMsg;
            var s = s.replace(/[{}]/g, "");
            let pairs = s.split(', ')
            let obj = pairs.reduce((obj, data) => {
                let [k, v] = data.split('=')
                obj[k] = v
                return obj
            }, {}) 
            if (left_company_name == null || left_company_name == "") {
                var error = document.getElementById("msgSenderCompanyName");
                error.innerHTML = "This field is mandatory";
                document.getElementById('companyName').focus();
                return false;
            }
            else if (obj["companyName"] == "Invalid Sender's Company Name!!") {
                var error = document.getElementById("msgSenderCompanyName");
                error.innerHTML = obj["companyName"];
                document.getElementById('companyName').focus();
                return false;
            }
            if (left_name == null || left_name == "") {
                var error = document.getElementById("msgSenderContactName");
                error.innerHTML = "This field is mandatory";
                document.getElementById('contactName').focus();
                return false;
            }
            else if (obj["contactName"] == "Invalid Sender's Name!!") {
                var error = document.getElementById("msgSenderContactName");
                error.innerHTML = obj["contactName"];
                document.getElementById('contactName').focus();
                return false;
            }            
            if (left_email == null || left_email == "") {
                var error = document.getElementById("msgSenderMail");
                error.innerHTML = "This field is mandatory";
                document.getElementById('email').focus();
                return false;
            }
            else if (obj["email"] == "Invalid Sender's Mail!!") {
                var error = document.getElementById("msgSenderMail");
                error.innerHTML = obj["email"];
                document.getElementById('email').focus();
                return false;
            }
            // if (custm_ph == null || custm_ph == "") {
            //     var error = document.getElementById("msgSenderPhone");
            //     error.innerHTML = "This field is mandatory";
            //     document.getElementById('phone').focus();
            //     return false;
            // }
            // else
             if (obj["phone"] == "Invalid Sender's Phone!!") {
                var error = document.getElementById("msgSenderPhone");
                error.innerHTML = obj["phone"];
                document.getElementById('phone').focus();
                return false;
            }
            /*receiver*/
            if (right_company_name == null || right_company_name == "") {
                var error = document.getElementById("msgReceiverCompanyName");
                error.innerHTML = "This field is mandatory";
                document.getElementById('rCompanyName').focus();
                return false;
            }
            else if (obj["rCompanyName"] == "Invalid Receiver's Company Name!!") {
                var error = document.getElementById("msgReceiverCompanyName");
                error.innerHTML = obj["rCompanyName"];
                document.getElementById('rCompanyName').focus();
                return false;
            }
            if (right_name == null || right_name == "") {
                var error = document.getElementById("msgReceiverContactName");
                error.innerHTML = "This field is mandatory";
                document.getElementById('rName').focus();
                return false;
            }
            else if (obj["rName"] == "Invalid Receiver's Name!!") {
                var error = document.getElementById("msgReceiverContactName");
                error.innerHTML = obj["rName"];
                document.getElementById('rName').focus();
                return false;
            }            
            if (right_email == null || right_email == "") {
                var error = document.getElementById("msgReceiverMail");
                error.innerHTML = "This field is mandatory";
                document.getElementById('rEmail').focus();
                return false;
            }
            else if (obj["rEmail"] == "Invalid Receiver's Mail!!") {
                var error = document.getElementById("msgReceiverMail");
                error.innerHTML = obj["rEmail"];
                document.getElementById('rEmail').focus();
                return false;
            }
            // if (custmR_ph == null || custmR_ph == "") {
            //     var error = document.getElementById("msgReceiverPhone");
            //     error.innerHTML = "This field is mandatory";
            //     document.getElementById('rPhone').focus();
            //     return false;
            // }
            // else 
            if (obj["rPhone"] == "Invalid Receiver's Phone!!") {
                var error = document.getElementById("msgReceiverPhone");
                error.innerHTML = obj["rPhone"];
                document.getElementById('rPhone').focus();
                return false;
            }
            if (res.rspnsMsg == "GOOD") {
                document.getElementsByTagName("footer")[0].style.display = "none";
                document.getElementById("previewP").innerHTML = res.response;
            }
        }       
    }
    xmlhttp1.send(JSON.stringify({
        "invoiceId": invoice_id,
        "invoiceItems": arr,
        "ipAddress": ip_address,
        "receiver": {
            "rAddress": right_address,
            "rCompanyName": right_company_name,
            "rContactName": right_name,
            "rPhone": custmR_ph
        },
        "invoiceValues": {
            "comment": notes!="" ? notes : "",
            "currency": currencySelect!="" ? currencySelect : "",
            "date": date!="" ? date : "",
            "discount": discount!="" ? discount : "0",
            "grandTotal": grand_total,          
            "subTotal": subTotal!="" ? subTotal : "",
            "terms": termsStr!="" ? termsStr : "",
            "totalTax": totalTax!="" ? totalTax : "0"            
        },
        "receiverEmail": right_email,
        "sender": {
          "address": left_address,
          "companyName": left_company_name,
          "contactName": left_name,
          "phone": custm_ph
        },
        "senderEmail": left_email      
      })
    )
    arr=[]
    return true;
}

function previewWorkOrderSecured(){
    var wo_invoice = $("#wo_unique_id").val();
    var ip_address = $("#ipaddress").val();
    var left_company_name = $("#companyName").val();
    var left_name = $("#contactName").val();    
    var left_email = $("#email").val();
    var left_phone = $("#phone").val();
    var left_address = $("#address").val();
    var right_company_name = $("#rCompanyName").val();
    var right_name = $("#rName").val();
    var right_email = $("#rEmail").val();
    var right_phone = $("#rPhone").val();
    var right_address = $("#rAddress").val();
    var country_code = $("#areaCode").val();
    var country_codeR = $("#areaCodeR").val();
    var subTotal = $("#subTotal").val();
    var currencySelect = $("#currencySelect").val();
    var notes = $("#notes").val();
    var date = $("#workorderDate").val();
    var termsStr = $("#terms").val();
    var dayCount = $("#dayCount").val();
    var custm_ph = "";
    left_phone!=""? custm_ph = "+" + country_code + left_phone: "";
    var custmR_ph ="";
    right_phone!=""? custmR_ph = "+" + country_codeR  + right_phone:"";
    // terms = termsStr.split("/\r?\ n/");
    if(currencySelect==="IND") {currencySelect ="₹"}
    else {currencySelect ="$"}
    for(let itemCount=1;itemCount<=s_no;itemCount++) {
        if(delarr.includes(itemCount) === false) {
        var itemname = document.getElementById("description" + itemCount);
        var amount = document.getElementById("amount" + itemCount);
        var quantity = document.getElementById("quantity" + itemCount);
        var result = document.getElementById("txtResult"+ itemCount);            
        arr.push({
            name: itemname.value,
            quantity: quantity.value,
            total: result.value,
            unitPrice: amount.value
            })
        }
    }
    var xmlhttp1;
        try {
            xmlhttp1 = new XMLHttpRequest();
        } catch (e) {
            try {
                xmlhttp1 = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlhttp1 = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) {
                    alert("BROWSER BROKE");
                    return false;
                }
            }
        }
        xmlhttp1.open("POST", baseurl + "/invoicegeneration/previewworkorder", true);
        xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xmlhttp1.onreadystatechange = function () {
        var res = JSON.parse(this.responseText).response
        workorderErrorLess();
        if (  this.status == 200 && this.responseText != null &&  this.responseText != ""  ) {
            var res = JSON.parse(this.responseText); 
            var s = res.rspnsMsg;
                var s = s.replace(/[{}]/g, "");
                let pairs = s.split(', ')
                let obj = pairs.reduce((obj, data) => {
                    let [k, v] = data.split('=')
                    obj[k] = v
                    return obj
                }, {}) 
                if (left_company_name == null || left_company_name == "") {
                    var error = document.getElementById("msgSenderCompanyName");
                    error.innerHTML = "This field is mandatory";
                    document.getElementById('companyName').focus();
                    return false;
                }
                else if (obj["companyName"] == "Invalid Sender's Company Name!!") {
                    var error = document.getElementById("msgSenderCompanyName");
                    error.innerHTML = obj["companyName"];
                    document.getElementById('companyName').focus();
                    return false;
                }
                if (left_name == null || left_name == "") {
                    var error = document.getElementById("msgSenderContactName");
                    error.innerHTML = "This field is mandatory";
                    document.getElementById('contactName').focus();
                    return false;
                }
                else if (obj["contactName"] == "Invalid Sender's Name!!") {
                    var error = document.getElementById("msgSenderContactName");
                    error.innerHTML = obj["contactName"];
                    document.getElementById('contactName').focus();
                    return false;
                }            
                if (left_email == null || left_email == "") {
                    var error = document.getElementById("msgSenderMail");
                    error.innerHTML = "This field is mandatory";
                    document.getElementById('email').focus();
                    return false;
                }
                else if (obj["email"] == "Invalid Sender's Mail!!") {
                    var error = document.getElementById("msgSenderMail");
                    error.innerHTML = obj["email"];
                    document.getElementById('email').focus();
                    return false;
                }
                // if (custm_ph == null || custm_ph == "") {
                //     var error = document.getElementById("msgSenderPhone");
                //     error.innerHTML = "This field is mandatory";
                //     document.getElementById('phone').focus();
                //     return false;
                // }
                // else 
                if (obj["phone"] == "Invalid Sender's Phone!!") {
                    var error = document.getElementById("msgSenderPhone");
                    error.innerHTML = obj["phone"];
                    document.getElementById('phone').focus();
                    return false;
                }
                /*receiver*/
                if (right_company_name == null || right_company_name == "") {
                    var error = document.getElementById("msgReceiverCompanyName");
                    error.innerHTML = "This field is mandatory";
                    document.getElementById('rCompanyName').focus();
                    return false;
                }
                else if (obj["rCompanyName"] == "Invalid Receiver's Company Name!!") {
                    var error = document.getElementById("msgReceiverCompanyName");
                    error.innerHTML = obj["rCompanyName"];
                    document.getElementById('rCompanyName').focus();
                    return false;
                }
                if (right_name == null || right_name == "") {
                    var error = document.getElementById("msgReceiverContactName");
                    error.innerHTML = "This field is mandatory";
                    document.getElementById('rName').focus();
                    return false;
                }
                else if (obj["rName"] == "Invalid Receiver's Name!!") {
                    var error = document.getElementById("msgReceiverContactName");
                    error.innerHTML = obj["rName"];
                    document.getElementById('rName').focus();
                    return false;
                }            
                if (right_email == null || right_email == "") {
                    var error = document.getElementById("msgReceiverMail");
                    error.innerHTML = "This field is mandatory";
                    document.getElementById('rEmail').focus();
                    return false;
                }
                else if (obj["rEmail"] == "Invalid Receiver's Mail!!") {
                    var error = document.getElementById("msgReceiverMail");
                    error.innerHTML = obj["rEmail"];
                    document.getElementById('rEmail').focus();
                    return false;
                }
                // if (custmR_ph == null || custmR_ph == "") {
                //     var error = document.getElementById("msgReceiverPhone");
                //     error.innerHTML = "This field is mandatory";
                //     document.getElementById('rPhone').focus();
                //     return false;
                // }
                // else 
                if (obj["rPhone"] == "Invalid Receiver's Phone!!") {
                    var error = document.getElementById("msgReceiverPhone");
                    error.innerHTML = obj["rPhone"];
                    document.getElementById('rPhone').focus();
                    return false;
                }
                if (res.rspnsMsg == "GOOD") {
                    document.getElementsByTagName("footer")[0].style.display = "none";
                    document.getElementById("previewP").innerHTML = res.response;            
                    return true;
                }
            }       
        }
    xmlhttp1.send(JSON.stringify({
        "invoiceId": wo_invoice,
        "invoiceItems": arr,
        "ipAddress": ip_address,
        "receiver": {
            "rAddress": right_address,
            "rCompanyName": right_company_name,
            "rContactName": right_name,
            "rPhone": custmR_ph
        },
        "invoiceValues": {
            "comment": notes!="" ? notes : "",
            "currency": currencySelect!="" ? currencySelect : "",
            "date": date!="" ? date : "",
            "subTotal": subTotal!="" ? subTotal : "",
            "terms": termsStr!="" ? termsStr : "",           
            "validity": dayCount
          },
        "receiverEmail": right_email,
        "sender": {
          "address": left_address,
          "companyName": left_company_name,
          "contactName": left_name,
          "phone": custm_ph
        },
        "senderEmail": left_email        
      })
    )
    arr=[]
    return true;
}

function generateInvoiceSecured(){
    var invoice_id = $("#unique_id").val();
    var ip_address = $("#ipaddress").val();
    var left_company_name = $("#companyName").val();
    var left_name = $("#contactName").val();
    var left_email = $("#email").val();
    var country_code = $("#areaCode").val();
    var country_codeR = $("#areaCodeR").val();
    var left_phone = $("#phone").val();
    var left_address = $("#address").val();
    var right_company_name = $("#rCompanyName").val();
    var right_name = $("#rName").val();
    var right_email = $("#rEmail").val();
    var right_phone = $("#rPhone").val();
    var right_address = $("#rAddress").val();
    var totalTax = $("#tax").val();
    var subTotal = $("#subTotal").val();
    var discount = $("#discount").val();
    if(discount==null) {discount="0"};
    var grand_total = $("#grandTotal").val();
    var notes = $("#notes").val();
    var currencySelect = $("#currencySelect").val();
    var date = $("#date").val();
    var termsStr = $("#terms").val();  
    var custm_ph = "";
    left_phone!=""? custm_ph = "+" + country_code + left_phone: "";
    var custmR_ph ="";
    right_phone!=""? custmR_ph = "+" + country_codeR  + right_phone:"";
    if(currencySelect==="IND") {
        currencySelect ="₹"
    } else {
        currencySelect ="$"
    }
    for(let itemCount=1;itemCount<=s_no;itemCount++) {
        if(delarr.includes(itemCount) === false) {
        var itemname = document.getElementById("description" + itemCount);
        var amount = document.getElementById("amount" + itemCount);
        var quantity = document.getElementById("quantity" + itemCount);
        var result = document.getElementById("txtResult"+ itemCount);            
        arr.push({
            name: itemname.value,
            quantity: quantity.value,
            total: result.value,
            unitPrice: amount.value
            })
        }
    }
    var xmlhttp1;
        try {
            xmlhttp1 = new XMLHttpRequest();
        } catch (e) {
            try {
                xmlhttp1 = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlhttp1 = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) {
                    alert("BROWSER BROKE");
                    return false;
                }
            }
        }    
        xmlhttp1.open("POST", baseurl + "/invoicesecured/generateinvoicesecured", true);
        xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xmlhttp1.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
        xmlhttp1.onreadystatechange = function () {
        var res = JSON.parse(this.responseText).response
        if (  this.status == 200 && this.responseText != null &&  this.responseText != ""  ) {
        var res = JSON.parse(this.responseText); 
        var s = res.rspnsMsg;
            var s = s.replace(/[{}]/g, "");
            let pairs = s.split(', ')
            let obj = pairs.reduce((obj, data) => {
                let [k, v] = data.split('=')
                obj[k] = v
                return obj
            }, {})      
            if (left_company_name == null || left_company_name == "") {
                var error = document.getElementById("msgSenderCompanyName");
                error.innerHTML = "This field is mandatory";
                document.getElementById('companyName').focus();
                return false;
            }
            else if (obj["companyName"] == "Invalid Sender's Company Name!!") {
                var error = document.getElementById("msgSenderCompanyName");
                error.innerHTML = obj["companyName"];
                document.getElementById('companyName').focus();
                return false;
            }
            if (left_name == null || left_name == "") {
                var error = document.getElementById("msgSenderContactName");
                error.innerHTML = "This field is mandatory";
                document.getElementById('contactName').focus();
                return false;
            }
            else if (obj["contactName"] == "Invalid Sender's Company Name!!") {
                var error = document.getElementById("msgSenderContactName");
                error.innerHTML = obj["contactName"];
                document.getElementById('contactName').focus();
                return false;
            }            
            if (left_email == null || left_email == "") {
                var error = document.getElementById("msgSenderMail");
                error.innerHTML = "This field is mandatory";
                document.getElementById('email').focus();
                return false;
            }
            else if (obj["email"] == "Invalid Sender's Mail!!") {
                var error = document.getElementById("msgSenderMail");
                error.innerHTML = obj["email"];
                document.getElementById('email').focus();
                return false;
            }
            if (obj["phone"] == "Invalid Sender's Phone!!") {
                var error = document.getElementById("msgSenderPhone");
                error.innerHTML = obj["phone"];
                document.getElementById('phone').focus();
                return false;
            }
            /*receiver*/
            if (right_company_name == null || right_company_name == "") {
                var error = document.getElementById("msgReceiverCompanyName");
                error.innerHTML = "This field is mandatory";
                document.getElementById('rCompanyName').focus();
                return false;
            }
            else if (obj["rCompanyName"] == "Invalid Receiver's Company Name!!") {
                var error = document.getElementById("msgReceiverCompanyName");
                error.innerHTML = obj["rCompanyName"];
                document.getElementById('rCompanyName').focus();
                return false;
            }
            if (right_name == null || right_name == "") {
                var error = document.getElementById("msgReceiverContactName");
                error.innerHTML = "This field is mandatory";
                document.getElementById('rName').focus();
                return false;
            }
            else if (obj["rName"] == "Invalid Receiver's Name!!") {
                var error = document.getElementById("msgReceiverContactName");
                error.innerHTML = obj["rName"];
                document.getElementById('rName').focus();
                return false;
            }            
            if (right_email == null || right_email == "") {
                var error = document.getElementById("msgReceiverMail");
                error.innerHTML = "This field is mandatory";
                document.getElementById('rEmail').focus();
                return false;
            }
            else if (obj["rEmail"] == "Invalid Receiver's Mail!!") {
                var error = document.getElementById("msgReceiverMail");
                error.innerHTML = obj["rEmail"];
                document.getElementById('rEmail').focus();
                return false;
            }
            if (obj["rPhone"] == "Invalid Receiver's Phone!!") {
                var error = document.getElementById("msgReceiverPhone");
                error.innerHTML = obj["rPhone"];
                document.getElementById('rPhone').focus();
                return false;
            }
            if (res.rspnsMsg == "GOOD") {
                window.location='success.html';
            }
        }
    }
    xmlhttp1.send(JSON.stringify({
        "invoiceId": invoice_id,
        "invoiceItems": arr,
            "invoiceValues": {
                "comment": notes!="" ? notes : "",
                "currency": currencySelect!="" ? currencySelect : "",
                "date": date!="" ? date : "",
                "discount": discount!="" ? discount : "0",
                "grandTotal": grand_total,          
                "subTotal": subTotal!="" ? subTotal : "",
                "terms": termsStr!="" ? termsStr : "",
                "totalTax": totalTax!="" ? totalTax : "0" 
            },
        "ipAddress": ip_address,
            "receiver": {
                "rAddress": right_address,
                "rCompanyName": right_company_name,
                "rContactName": right_name,
                "rPhone": custmR_ph
            },
        "receiverEmail": right_email,
            "sender": {
                "address": left_address,
                "companyName": left_company_name,
                "contactName": left_name,
                "phone": custm_ph
            },
        "senderEmail": left_email 
    })
    )
    arr=[]
    delarr=[]
    return true;
}

function generateWorkOrderSecured(){
    var wo_invoice = $("#wo_unique_id").val();
    var ip_address = $("#ipaddress").val();
    var left_company_name = $("#companyName").val();
    var left_name = $("#contactName").val();    
    var left_email = $("#email").val();
    var left_phone = $("#phone").val();
    var left_address = $("#address").val();
    var right_company_name = $("#rCompanyName").val();
    var right_name = $("#rName").val();
    var right_email = $("#rEmail").val();
    var right_phone = $("#rPhone").val();
    var right_address = $("#rAddress").val();
    var country_code = $("#areaCode").val();
    var country_codeR = $("#areaCodeR").val();
    var subTotal = $("#subTotal").val();
    var currencySelect = $("#currencySelect").val();
    var notes = $("#notes").val();
    var date = $("#workorderDate").val();
    var termsStr = $("#terms").val();
    var dayCount = $("#dayCount").val();
    var custm_ph = "";
    left_phone!=""? custm_ph = "+" + country_code + left_phone: "";
    var custmR_ph ="";
    right_phone!=""? custmR_ph = "+" + country_codeR  + right_phone:"";
    if(currencySelect==="IND") {
        currencySelect ="₹"
    } else {
        currencySelect ="$"
    }
    for(let itemCount=1;itemCount<=s_no;itemCount++) {
        if(delarr.includes(itemCount) === false) {
        var itemname = document.getElementById("description" + itemCount);
        var amount = document.getElementById("amount" + itemCount);
        var quantity = document.getElementById("quantity" + itemCount);
        var result = document.getElementById("txtResult"+ itemCount);            
        var notes = $("#notes").val();           
        arr.push({
            name: itemname.value,
            quantity: quantity.value,
            total: result.value,
            unitPrice: amount.value,
            //notes: notes.value,
            //currency,date,terms,validity
            })
        }
    }
    var xmlhttp1;
        try {
            xmlhttp1 = new XMLHttpRequest();
        } catch (e) {
            try {
                xmlhttp1 = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlhttp1 = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) {
                    alert("BROWSER BROKE");
                    return false;
                }
            }
        }
    
        xmlhttp1.open("POST", baseurl + "/invoicesecured/generateworkordersecured", true);
        xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xmlhttp1.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
        xmlhttp1.onreadystatechange = function () {
        var res = JSON.parse(this.responseText).response
        if (  this.status == 200 && this.responseText != null &&  this.responseText != ""  ) {
            var res = JSON.parse(this.responseText); 
            var s = res.rspnsMsg;
                var s = s.replace(/[{}]/g, "");
                let pairs = s.split(', ')
                let obj = pairs.reduce((obj, data) => {
                    let [k, v] = data.split('=')
                    obj[k] = v
                    return obj
                }, {})      
                if (left_company_name == null || left_company_name == "") {
                    var error = document.getElementById("msgSenderCompanyName");
                    error.innerHTML = "This field is mandatory";
                    document.getElementById('companyName').focus();
                    return false;
                }
                else if (obj["companyName"] == "Invalid Sender's Company Name!!") {
                    var error = document.getElementById("msgSenderCompanyName");
                    error.innerHTML = obj["companyName"];
                    document.getElementById('companyName').focus();
                    return false;
                }
                if (left_name == null || left_name == "") {
                    var error = document.getElementById("msgSenderContactName");
                    error.innerHTML = "This field is mandatory";
                    document.getElementById('contactName').focus();
                    return false;
                }
                else if (obj["contactName"] == "Invalid Sender's Company Name!!") {
                    var error = document.getElementById("msgSenderContactName");
                    error.innerHTML = obj["contactName"];
                    document.getElementById('contactName').focus();
                    return false;
                }            
                if (left_email == null || left_email == "") {
                    var error = document.getElementById("msgSenderMail");
                    error.innerHTML = "This field is mandatory";
                    document.getElementById('email').focus();
                    return false;
                }
                else if (obj["email"] == "Invalid Sender's Mail!!") {
                    var error = document.getElementById("msgSenderMail");
                    error.innerHTML = obj["email"];
                    document.getElementById('email').focus();
                    return false;
                }
                // if (custm_ph == null || custm_ph == "") {
                //     var error = document.getElementById("msgSenderPhone");
                //     error.innerHTML = "This field is mandatory";
                //     document.getElementById('phone').focus();
                //     return false;
                // }
                // else 
                if (obj["phone"] == "Invalid Sender's Phone!!") {
                    var error = document.getElementById("msgSenderPhone");
                    error.innerHTML = obj["phone"];
                    document.getElementById('phone').focus();
                    return false;
                }
                /*receiver*/
                if (right_company_name == null || right_company_name == "") {
                    var error = document.getElementById("msgReceiverCompanyName");
                    error.innerHTML = "This field is mandatory";
                    document.getElementById('rCompanyName').focus();
                    return false;
                }
                else if (obj["rCompanyName"] == "Invalid Receiver's Company Name!!") {
                    var error = document.getElementById("msgReceiverCompanyName");
                    error.innerHTML = obj["rCompanyName"];
                    document.getElementById('rCompanyName').focus();
                    return false;
                }
                if (right_name == null || right_name == "") {
                    var error = document.getElementById("msgReceiverContactName");
                    error.innerHTML = "This field is mandatory";
                    document.getElementById('rName').focus();
                    return false;
                }
                else if (obj["rName"] == "Invalid Receiver's Name!!") {
                    var error = document.getElementById("msgReceiverContactName");
                    error.innerHTML = obj["rName"];
                    document.getElementById('rName').focus();
                    return false;
                }            
                if (right_email == null || right_email == "") {
                    var error = document.getElementById("msgReceiverMail");
                    error.innerHTML = "This field is mandatory";
                    document.getElementById('rEmail').focus();
                    return false;
                }
                else if (obj["rEmail"] == "Invalid Receiver's Mail!!") {
                    var error = document.getElementById("msgReceiverMail");
                    error.innerHTML = obj["rEmail"];
                    document.getElementById('rEmail').focus();
                    return false;
                }
                // if (custmR_ph == null || custmR_ph == "") {
                //     var error = document.getElementById("msgReceiverPhone");
                //     error.innerHTML = "This field is mandatory";
                //     document.getElementById('rPhone').focus();
                //     return false;
                // }
                // else 
                if (obj["rPhone"] == "Invalid Receiver's Phone!!") {
                    var error = document.getElementById("msgReceiverPhone");
                    error.innerHTML = obj["rPhone"];
                    document.getElementById('rPhone').focus();
                    return false;
                }
                if (res.rspnsMsg == "GOOD") {
                    window.location='success.html';
                }
            }
    }
    xmlhttp1.send(JSON.stringify({
        "invoiceId": wo_invoice,
        "invoiceItems": arr,
        "ipAddress": ip_address,
        "receiver": {
            "rAddress": right_address,
            "rCompanyName": right_company_name,
            "rContactName": right_name,
            "rPhone": custmR_ph
        },
        "invoiceValues": {
            "comment": notes!="" ? notes : "",
            "currency": currencySelect!="" ? currencySelect : "",
            "date": date!="" ? date : "",
            "subTotal": subTotal!="" ? subTotal : "",
            "terms": termsStr!="" ? termsStr : "",           
            "validity": dayCount
          },
        "receiverEmail": right_email,
        "sender": {
          "address": left_address,
          "companyName": left_company_name,
          "contactName": left_name,
          "phone": custm_ph
        },
        "senderEmail": left_email
      })
    )
    arr=[]
    delarr=[]
    return true;
}

function initLogin() {

    var email = $("#username").val();
    var pass = $("#password").val();
    var xmlhttpAuth;
    try {
        xmlhttpAuth = new XMLHttpRequest();
    } catch (e) {
        try {
            xmlhttpAuth = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttpAuth = new ActiveXObject(
                    "Microsoft.XMLHTTP")
            } catch (e) {
                alert("BROWSER BROKE");
                return false;
            }
        }
    }
    xmlhttpAuth.open("POST", baseurl + "/authentication/getGenericJWTToken", true); // token
    xmlhttpAuth.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xmlhttpAuth.setRequestHeader('clientID', clientId);
    xmlhttpAuth.onreadystatechange = function () {
        if (this.status == 200 && this.responseText != null && this.responseText != "" && this.readyState == 4) {
            var res = JSON.parse(this.responseText);
            if (res.token != "Invalid User or Password / Or Account Locked") {
    
                localStorage.setItem('token', res.token);
                window.location.href = window.location.protocol + "//" + window.location.host + "/index.html";
    
            } else {
    
                $("#error_message").show();
                $("#error_message").html("<strong>Invalid User or Password / Or Account Locked</strong>");
            }
        }
    }
    xmlhttpAuth.send(JSON.stringify({
        "username": email,
        "password": pass
    }));
}
  
function addCompanyInfo() {
    var email = $("#email").val();
    var companyName = $("#companyName").val();
    var address = $("#address").val();
    var phone = $("#phone").val();    
    var c_gstin = $("#gstin").val();     
    var c_terms = $("#terms").val();
    
    var link = "http://invoices4us-dev.s3-website-us-east-1.amazonaws.com/login.html"; 
    var xmlhttp1;
    try {
        xmlhttp1 = new XMLHttpRequest();
    } catch (e) {
        try {
            xmlhttp1 = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp1 = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (e) {
                alert("BROWSER BROKE");
                return false;
            }
        }
    }    

    var details = {
        "companyEmail": email,
        "companyAddress": address,
        "companyName": companyName,
        "companyPhone": phone,
        "companyGstin": c_gstin,
        "companyTerms": c_terms
    };

    xmlhttp1.open("POST", baseurl + "/invoicesecured/addcompanyinfo?emailID=" + email + "&webBaseURL=" + link, true);
    xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xmlhttp1.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlhttp1.onreadystatechange = function () {
        var res = JSON.parse(this.responseText).response;
        if (this.status == 200 && this.responseText != null && this.responseText != "") {
            var res = JSON.parse(this.responseText);           
            
            if (res.rspnsMsg == "GOOD") {
                // alert("Successfully registered");
                localStorage.setItem('companyName', companyName);
                window.location = 'index.html';
            }
        }
    };

    xmlhttp1.send(JSON.stringify(details));
    return true;
}

function getCompanyInfo() {
    var xmlhttp1;
    try {
        xmlhttp1 = new XMLHttpRequest();
    } catch (e) {
        try {
            xmlhttp1 = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp1 = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (e) {
                alert("BROWSER BROKE");
                return false;
            }
        }
    }
    xmlhttp1.open("GET", baseurl +"/invoicesecured/getcompanyinfo", true);
    xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xmlhttp1.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlhttp1.onreadystatechange = function () {
        if (this.status == 200 && this.responseText != null && this.responseText != "") {
            var res = JSON.parse(this.responseText);
            var response =  JSON.parse(res['response']);
            
            var name = document.getElementById("companyName");
            var email = document.getElementById("email");
            var phone = document.getElementById("phone");
            var address = document.getElementById("address");
            var terms = document.getElementById("terms");
            var gstin = document.getElementById("gstin");
            name.value = response.companyName;
            email.value = response.companyEmail;
            phone.value = response.companyPhone;
            address.value = response.companyAddress;
            terms.value = response.companyTerms;
            gstin.value = response.companyGstin;
            email.disabled = true;
        }  else if ((this.status == 403 || this.status == 401) && this.readyState == 4) {
           // window.location.href = window.location.protocol + "//" + window.location.host + "/login.html"
        } else if (this.status == 500) {
            var res = JSON.parse(this.responseText);
            if (res.response === "403 FORBIDDEN") {
                window.location.href = window.location.protocol + "//" + window.location.host + "/login.html"
            }
        }
    };

    xmlhttp1.send();
}

function getRegisterEmail() {
    var xmlhttp1;
    try {
      xmlhttp1 = new XMLHttpRequest();
    } catch (e) {
      try {
        xmlhttp1 = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          xmlhttp1 = new ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {
          alert("BROWSER BROKE");
          return false;
        }
      }
    }
  
    var token = localStorage.getItem('token'); 
    xmlhttp1.open("GET", baseurl + "/invoicesecured/getregisteredemail", true);
    xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xmlhttp1.setRequestHeader('Authorization', 'Bearer ' + token);
    xmlhttp1.onreadystatechange = function () {
      if (this.status == 200 && this.responseText != null && this.responseText != "") {
        var res = JSON.parse(this.responseText);
        var response = JSON.parse(res['response']);  
        var email = document.getElementById("email");
        email.value = response.emailID;
        email.disabled = true;
      } else if ((this.status == 401) && this.readyState == 4) {
        //  window.location.href = window.location.protocol + "//" + window.location.host + "/login.html"
        } // else if (this.status == 500) 
        // {
            // localStorage.removeItem('token');
        var res = JSON.parse(this.responseText);
        if (res.response === "403 FORBIDDEN") {
            localStorage.removeItem('token');
            window.location.href = window.location.protocol + "//" + window.location.host + "/login.html"
        // }
      }
    };
  
    xmlhttp1.send();
}
  
function getInvoiceList() {
    var xmlhttp;
    try {
      xmlhttp = new XMLHttpRequest();
    } catch (e) {
      try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
          alert("BROWSER BROKE");
          return false;
        }
      }
    }
  
    var url = baseurl + "/invoicesecured/getinvoicelist";
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xmlhttp.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlhttp.onreadystatechange = function () {
    if (
        this.status == 200 &&
        this.responseText != null &&
        this.responseText != ""
      ) {
        var res = JSON.parse(this.responseText);
        var response = JSON.parse(res.response);  
        tableData = "";
        {
          if (response.length > 0) {
            for (i = 0; i < response.length; i++) {             
                tableData += "<tr " + ' class = "rem1 even">';
                tableData += '<td >' + response[i].invoiceId + "</td>";
                tableData += '<td >' + response[i].receiverEmail + "</td>";
                tableData += '<td>' + response[i].receiver.rCompanyName + "</td>";
                tableData += '<td>' + getDateFormat(response[i].timeStamp)+ "</td>";
                tableData += '<td>' + response[i].invoiceValues.grandTotal + "</td>";      
                //   tableData += '<td ><i class="icon1 fa-regular fa-pen-to-square" style="margin-left: 6px;"></i>&nbsp;&nbsp;&nbsp;<i class="icon1 fa-solid fa-circle-down></i></td>'; 
            }
                    document.getElementById("invoiceList").innerHTML = tableData;
          } else {
            document.getElementById("invoiceList").style.textAlign = "center";
            document.getElementById("invoiceList").innerHTML =
              "INVOICES NOT CREATED";
          }
        }

      }
};
    xmlhttp.send();
}



function getWorkorderList() {
    var xmlhttp;
    try {
      xmlhttp = new XMLHttpRequest();
    } catch (e) {
      try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
          alert("BROWSER BROKE");
          return false;
        }
      }
    }
    var url = baseurl + "/invoicesecured/getworkorderlist";
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xmlhttp.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlhttp.onreadystatechange = function () {
    if (
        this.status == 200 &&
        this.responseText != null &&
        this.responseText != ""
      ) {
        var res = JSON.parse(this.responseText);
        var response = JSON.parse(res.response);
        tableData = "";
        {
          if (response.length > 0) {
            for (i = 0; i < response.length; i++) {
                tableData += "<tr " + ' class = "rem1 even">';
                tableData += '<td >' + response[i].invoiceId + "</td>";
                tableData += '<td >' + response[i].receiverEmail + "</td>";
                tableData += '<td>' + response[i].receiver.rCompanyName + "</td>";
                tableData += '<td>' + getDateFormat(response[i].timeStamp)+ "</td>";
                tableData += '<td>' + response[i].invoiceValues.validity + "</td>";
                tableData += '<td>' + response[i].invoiceValues.subTotal + "</td>";         
            }
            
                    document.getElementById("workorderList").innerHTML = tableData;
          } else {
            document.getElementById("workorderList").style.textAlign = "center";
            document.getElementById("workorderList").innerHTML =
              "WORKORDER NOT CREATED";
          }
        }
      }
};
    xmlhttp.send();
}

function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  // Prevent form submission on button click
$(document).ready(function() {
    $("form").on("submit", function(e) {
      e.preventDefault();
    });
  });



  function getDateFormat(responseDate){
    if(responseDate.length>10){
        var date = new Date(responseDate + " UTC").toString();
    var finalDate = date.substring(4,10) + ", " +date.substring(11,15);
    return finalDate; 
    }else {
        if(responseDate==null || responseDate==""){
            return responseDate;
        }else{
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var date = responseDate.split("-");
        return (months[Number(date[1]) - 1] + " " + date[2] + ", " + date[0]);
        }
    }
    
}