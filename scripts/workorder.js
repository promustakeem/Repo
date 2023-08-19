var s_no = 1;
var delarr =[];

function addition() {
  let total = 0;
  for (let i = 1; i <= 16; i++) {
    const inputElem = document.getElementById(`txtResult${i}`);
    const inputValue = parseFloat(inputElem?.value) || 0;
    total += inputValue;
  }
  document.getElementById("subTotal").value = total.toFixed(2);
}


function subtotal() {
  addition();
  num = parseFloat(document.getElementById("subTotal").value);
  DollarCent();
}

// function to calculate invoice items (as row)
function addNRows(s_no) { 
  var amount = parseFloat(document.getElementById("amount" + s_no).value);
  if (isNaN(amount)) amount = 0;
  var quantity = parseFloat(document.getElementById("quantity" + s_no).value);
  if (quantity < 1) document.getElementById("quantity" + s_no).value = 1;
  var tamount = amount * quantity;
  document.getElementById("txtResult" + s_no).value = tamount;
  var txt = document.getElementById("txtResult" + s_no).value;
  subtotal();
  // valueCheck();
}

// function to delete the row
function removeRow(rowNo) {
  if(rowNo == delarr.length){
    delarr.pop();
  } else {
    delarr.push(rowNo);
  }
  var element =  document.getElementById("row" + rowNo);
  element.remove();
  stateHandle();
  subtotal();
  // valueCheck(rowNo); 
}

   function validate() {
    s_no++;
      counter.push(s_no);
      document.getElementById("tbl").insertAdjacentHTML("beforeend", '<div id="row' +
      s_no + '"  class="table-row" style="margin-bottom: 10px;"><div class="description_div"><input  id="description' +
      s_no + '" type="Description" name="Description" class="form-control input" oninput="workorderErrorLess()" placeholder="Item Name" ></div><div class="calculation_div"><div style="width: 30%; padding:0px 2px 0px 2px; "><input  id="quantity' +
      s_no + '" type="number" name="number" class="form-control input" min="1" placeholder="Quantity" oninput="addNRows(' + s_no + ')" onkeypress="return /[0-9a-zA-Z]/i.test(event.key)"></div><div style="width: 30%; padding:0px 2px 0px 2px;"><input  id="amount' +
      s_no + '" type="number" name="Amount" class="form-control" min="1" placeholder="Price" oninput="addNRows(' + s_no + ')" onkeypress="return /[0-9a-zA-Z.]/i.test(event.key)"></div><div style="width: 32%; padding:0px 2px 0px 2px;"><input  id="txtResult' +
      s_no + '" type="number" class="form-control" style="background-color: white;" name="TextBox3" disabled></div><div style="width: 8%; display: flex; justify-content: center; "><button type="button" class="btn-close add-tax" style=" text-align: center;margin: 6px ;" aria-label="Close" onclick="removeRow(' + s_no + ')"></button></div></div></div>'
    )
    disableAddLine();
    document.getElementById("description" + s_no).focus();
    return s_no;   
}

// function for add button disable
function disableAddLine(){
  let inputs = document.querySelectorAll(".input");
  let button = document.querySelector(".button");
  button.disabled = true; //setting button state to disabled
  
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", stateHandle); // listen for input event instead of change event
  }
  
  function stateHandle() {
    let isFilled = true; // initialize flag to true
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value === "") {
        isFilled = false; // set flag to false if any input field is empty
        break;
      }
    }
    button.disabled = !isFilled; // enable/disable button based on flag
  }
  return inputs;
}

  
function currency() { 
  if (document.getElementById("currencySelect").value == "USD") {
    document.getElementById("unitChange").innerHTML = 'Unit Price ($)';
    document.getElementById("amountChange").innerHTML = 'Amount ($)';
    document.getElementById("com_date").value = 'Sub Total ($)';
    document.getElementById("com_word").value = 'In Words ($)';
    DollarCent();
  } else if (document.getElementById("currencySelect").value == "IND") {
    document.getElementById("unitChange").innerHTML = 'Unit Price (₹)';
    document.getElementById("amountChange").innerHTML = 'Amount (₹)';
    document.getElementById("com_date").value = 'Sub Total (₹)';
    document.getElementById("com_word").value = 'In Words (₹)';
    DollarCent();
  }
}


// function readURL(input) {
//   if (input.files && input.files[0]) {
//     var reader = new FileReader();

//     reader.onload = function (e) {
//       $("#blah").attr("src", e.target.result).width(150).height(200);
//     };

//     reader.readAsDataURL(input.files[0]);
//   }
// }


function workOrderValidate() {
  var regexComName = /^[A-Z0-9]([a-zA-Z0-9]|[- @\.#&!])*$/;
  var regexName = /^[A-Z]([a-zA-Z0-9 ,.'-])+$/;
  var regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var regexID = /^[WO]{2}([a-zA-Z0-9 ,.'-])+$/; 
  var regexPhone = /^$|^\+?[1-9][0-9]{9,12}$/;

  document.getElementById("msgID_err").innerHTML = "";
  document.getElementById("wo_unique_id").style.outline = "none";
  document.getElementById("wo_date").innerHTML = "";
  document.getElementById("workorderDate").style.outline = "none";
  document.getElementById("dayCount").style.outline = "none";
  document.getElementById("msgSenderCompanyName").innerHTML = "";
  document.getElementById("companyName").style.outline = "none";
  document.getElementById("msgSenderContactName").innerHTML = "";
  document.getElementById("contactName").style.outline = "none";
  document.getElementById("msgSenderMail").innerHTML = "";
  document.getElementById("email").style.outline = "none";
  document.getElementById("msgSenderPhone").innerHTML = "";
  document.getElementById("phone").style.outline = "none";
  document.getElementById("msgReceiverCompanyName").innerHTML = "";
  document.getElementById("rCompanyName").style.outline = "none";
  document.getElementById("msgReceiverContactName").innerHTML = "";
  document.getElementById("rName").style.outline = "none";
  document.getElementById("msgReceiverMail").innerHTML = "";
  document.getElementById("rEmail").style.outline = "none";
  document.getElementById("msgReceiverPhone").innerHTML = "";
  document.getElementById("rPhone").style.outline = "none";
  document.getElementById("error_filed").innerHTML = "";
  document.getElementById("areaCode").style.outline = "none";
  document.getElementById("areaCodeR").style.outline = "none";
  document.getElementById("inv_item").innerHTML = "";
  document.getElementById("description1").style.outline = "none";
  document.getElementById("quantity1").style.outline = "none";

  if (document.getElementById("wo_unique_id").value === "" || !regexID.test(document.getElementById("wo_unique_id").value)) {
    document.getElementById("msgID_err").innerHTML = "Please Enter valid ID";
    document.getElementById("wo_unique_id").focus();
    document.getElementById("wo_unique_id").style.outline = "3px solid red";
  } else if (document.getElementById("workorderDate").value === "") {
    document.getElementById("wo_date").innerHTML = "Select Date";
    document.getElementById("workorderDate").focus();
    document.getElementById("workorderDate").style.outline = "3px solid red";
  } else if (document.getElementById("dayCount").value === "") {
    document.getElementById("wo_date").innerHTML = "Select Days";
    document.getElementById("dayCount").focus();
    document.getElementById("dayCount").style.outline = "3px solid red";
  } else if (document.getElementById("companyName").value === "" || !regexComName.test(document.getElementById("companyName").value)) {
    document.getElementById("msgSenderCompanyName").innerHTML = "Please enter valid Company Name";
    document.getElementById("companyName").focus();
    document.getElementById("companyName").style.outline = "3px solid red";
  } else if (document.getElementById("contactName").value === "" || !regexName.test(document.getElementById("contactName").value)) {
    document.getElementById("msgSenderContactName").innerHTML = "Please enter valid Contact Name";
    document.getElementById("contactName").focus();
    document.getElementById("contactName").style.outline = "3px solid red";
  } else if (document.getElementById("email").value === "" || !regexEmail.test(document.getElementById("email").value)) {
    document.getElementById("msgSenderMail").innerHTML = "Please enter valid Email";
    document.getElementById("email").focus();
    document.getElementById("email").style.outline = "3px solid red";
  } else if (!regexPhone.test(document.getElementById("phone").value) ) {
    document.getElementById("msgSenderPhone").innerHTML = "Please enter valid Phone Number";
    document.getElementById("phone").focus();
    document.getElementById("phone").style.outline = "3px solid red";
  } else if (document.getElementById("rCompanyName").value === "" || !regexComName.test(document.getElementById("rCompanyName").value)) {
    document.getElementById("msgReceiverCompanyName").innerHTML = "Please enter valid Company Name";
    document.getElementById("rCompanyName").focus();
    document.getElementById("rCompanyName").style.outline = "3px solid red";
  } else if (document.getElementById("rName").value === "" || !regexName.test(document.getElementById("rName").value)) {
    document.getElementById("msgReceiverContactName").innerHTML = "Please enter valid Contact Name";
    document.getElementById("rName").focus();
    document.getElementById("rName").style.outline = "3px solid red";
  } else if (document.getElementById("rEmail").value === "" || !regexEmail.test(document.getElementById("rEmail").value)) {
    document.getElementById("msgReceiverMail").innerHTML = "Please enter valid Email";
    document.getElementById("rEmail").focus();
    document.getElementById("rEmail").style.outline = "3px solid red";
  } else if (!regexPhone.test(document.getElementById("rPhone").value) ) {
    document.getElementById("msgReceiverPhone").innerHTML = "Please enter valid Phone Number";
    document.getElementById("rPhone").focus();
    document.getElementById("rPhone").style.outline = "3px solid red";
  } else if (document.getElementById("areaCode").value === "") {
    document.getElementById("error_filed").innerHTML = "Please enter valid Area Code";
    document.getElementById("areaCode").focus();
    document.getElementById("areaCode").style.outline = "3px solid red";
  } else if (document.getElementById("areaCodeR").value === "") {
    document.getElementById("error_filed").innerHTML = "Please enter valid Area Code";
    document.getElementById("areaCodeR").focus();
    document.getElementById("areaCodeR").style.outline = "3px solid red";
  } else if (document.getElementById("description1").value === "") {
    document.getElementById("inv_item").innerHTML = "Please Enter Description";
    document.getElementById("description1").focus();
    document.getElementById("description1").style.outline = "3px solid red";
  }  else if (document.getElementById("quantity1").value === "") {
    document.getElementById("inv_item").innerHTML = "Please Enter Quantity";
    document.getElementById("quantity1").focus();
    document.getElementById("quantity1").style.outline = "3px solid red";
  }  else if (document.getElementById("amount1").value === "") {
    document.getElementById("inv_item").innerHTML = "Please Enter Amount";
    document.getElementById("amount1").focus();
    document.getElementById("amount1").style.outline = "3px solid red";
  }  else{
        if(localStorage.getItem("token") == null){
          previewWorkOrder();
          togg();
        } else {
          previewWorkOrderSecured();
          togg();
        }
      }
}

function workorderErrorLess() {
  document.getElementById("dayCount").style.outline = "0px solid";
  document.getElementById("wo_date").innerHTML = "";
  document.getElementById("description1").style.outline = "0px solid";
  document.getElementById("quantity1").style.outline = "0px solid";
  document.getElementById("amount1").style.outline = "0px solid";
  document.getElementById("wo_date").innerHTML = "";
  document.getElementById("msgSenderCompanyName").innerHTML = ""; 
  document.getElementById("companyName").style.outline = "0px solid";
  document.getElementById("quantity1").style.outline = "0px solid";
  document.getElementById("amount1").style.outline = "0px solid";
  document.getElementById("msgSenderContactName").innerHTML = ""; 
  document.getElementById("contactName").style.outline = "0px solid";
  document.getElementById("inv_item").innerHTML = ""; 
  document.getElementById("inv_item").innerHTML = ""; 
  document.getElementById("msgSenderMail").innerHTML = ""; 
  document.getElementById("email").style.outline = "0px solid";
  document.getElementById("msgSenderPhone").innerHTML = ""; 
  document.getElementById("phone").style.outline = "0px solid";
  document.getElementById("msgReceiverCompanyName").innerHTML = ""; 
  document.getElementById("rCompanyName").style.outline = "0px solid";
  document.getElementById("msgReceiverContactName").innerHTML = ""; 
  document.getElementById("rName").style.outline = "0px solid";
  document.getElementById("msgReceiverMail").innerHTML = ""; 
  document.getElementById("inv_item").innerHTML = ""; 
  document.getElementById("rEmail").style.outline = "0px solid";
  document.getElementById("msgReceiverPhone").innerHTML = "";
  document.getElementById("rPhone").style.outline = "0px solid";
  document.getElementById("wo_unique_id").style.outline = "0px solid";
  document.getElementById("workorderDate").style.outline = "0px solid";
  document.getElementById("dayCount").style.outline = "0px solid";
  document.getElementById("msgID_err").innerHTML = ""; 
  document.getElementById("error_filed").innerHTML = ""; 
  document.getElementById("areaCode").style.outline = "0px solid";
  document.getElementById("error_filed").innerHTML = "";
  // document.getElementById("areacodeR").style.outline = "0px solid";
}
function handleDate() {
  var values = parseInt(document.getElementById("dayCount").value);
  if (values < 1) document.getElementById("dayCount").value = "";
  if (values > 365) document.getElementById("dayCount").value = 365;
}


  function DollarCent(){
  var num = parseFloat(document.getElementById("subTotal").value);
  var n = (Math.round(num*100)/100);
  if(document.getElementById("currencySelect").value=="IND"){
    var cur="rupees";var frac="paise";
  }
  else{
    var cur="dollars";var frac="cents";
  }
  nums = n.toString().split('.')
  var whole = amountToWord(nums[0]);
  if(nums[1]==null)nums[1]=0;
  if(nums[1].length == 1 )nums[1]=nums[1]+'0';
  if(nums[1].length> 2){nums[1]=nums[1].substring(2,length - 1)}
  if(nums.length == 2){
  if(nums[0]<=12){nums[0]=nums[0]*10} else {nums[0]=nums[0]};
  var fraction = amountToWord(nums[1]);
  if(whole=='' && fraction==''){op= 'Zero';}
  if(whole=='' && fraction!=''){op= fraction + frac;}
  if(whole!='' && fraction==''){op= whole +cur ;} 
  if(whole!='' && fraction!=''){op=whole + cur + ' and '+ fraction +frac ;}
  amt=num;
  if(amt > 99999999999.99){op='Oops!!! The amount is too big to convert';}
  if(isNaN(amt) == true ){op='zero';}
  document.getElementById("subTotalWord").innerHTML = op;}
}