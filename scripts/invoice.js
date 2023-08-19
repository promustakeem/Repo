var s_no = 1;
var grandtotal = 0;
var subtotal = 0;
var delarr = [];
var counter=[];

// function to get the calculated subtotal value
function doSubTotal() {
  let total = 0;
  for (let i = 1; i <= 20; i++) {
    const inputElem = document.getElementById(`txtResult${i}`);
    const inputValue = parseFloat(inputElem?.value) || 0;
    total += inputValue;
  }
  document.getElementById("subTotal").value = total.toFixed(2);
}

// function to set the maximum value for discount
function maxValueCheck() {
  var disc = parseFloat(document.getElementById("discount").value); 
  if (disc < 1) document.getElementById("discount").value = "";
  if (disc > 99) document.getElementById("discount").value = 100;  
}

// function to calculate the grand total
function calculateGrandTotal() {  
  var taxes = parseFloat(document.getElementById("tax").value);
  if (isNaN(taxes)) taxes = 0;
    doSubTotal();
    document.getElementById("grandTotal").value = (parseFloat(document.getElementById("subTotal").value) + (taxes/100)*parseFloat(document.getElementById("subTotal").value)).toFixed(2);
    if (document.getElementById("discount")) {
    var discount = parseFloat(document.getElementById("discount").value); 
    if (isNaN(discount)) discount = 0;
    var taxed_amount = parseFloat(document.getElementById("subTotal").value) + (taxes/100)*parseFloat(document.getElementById("subTotal").value);
    if (discount > 100){ 
      discount = 100;
      document.getElementById("grandTotal").value = (taxed_amount - (discount/100)*taxed_amount).toFixed(2);
    } else {
      document.getElementById("grandTotal").value = (taxed_amount - (discount/100)*taxed_amount).toFixed(2);
    }
    num = document.getElementById("grandTotal").value;
    getAmountInWords();
  }
}

// function to recheck the values after row add or remove
function valueCheck() {
  doSubTotal();
  num = parseFloat(document.getElementById("grandTotal").value);
  getAmountInWords();
}

// function to add the row with id as +1 
function validate() {    
      s_no++;
      counter.push(s_no);
      document.getElementById("tbl").insertAdjacentHTML("beforeend", '<div id="row' +
      s_no + '"  class="table-row" style="margin-bottom: 10px;"><div class="description_div"><input  id="description' +
      s_no + '" type="Description" name="Description" class="form-control input" oninput="error_less()" placeholder="Item Name" ></div><div class="calculation_div"><div style="width: 30%; padding:0px 2px 0px 2px; "><input  id="quantity' +
      s_no + '" type="number" name="number" class="form-control input" min="1" placeholder="Quantity" oninput="addNRows(' + s_no + '),error_less()" onkeypress="return /[0-9a-zA-Z]/i.test(event.key)"></div><div style="width: 30%; padding:0px 2px 0px 2px;"><input  id="amount' +
      s_no + '" type="number" name="Amount" class="form-control" min="1" placeholder="Price" oninput="addNRows(' + s_no + '),error_less()" onkeypress="return /[0-9a-zA-Z.]/i.test(event.key)"></div><div style="width: 32%; padding:0px 2px 0px 2px;"><input  id="txtResult' +
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

var lastIndex = 0;

// function to calculate invoice items (as row)
function addNRows(s_no) { 
  var amount = parseFloat(document.getElementById("amount" + s_no).value);
  if (isNaN(amount)) amount = 0;
  var quantity = parseFloat(document.getElementById("quantity" + s_no).value);
  if (quantity < 1) document.getElementById("quantity" + s_no).value = 1;
  var tamount = amount * quantity;
  document.getElementById("txtResult" + s_no).value = tamount;
  var txt = document.getElementById("txtResult" + s_no).value;
  calculateGrandTotal();
  valueCheck();
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
  calculateGrandTotal();
  valueCheck(rowNo); 
}

// function to set the selected currency
function currency_select() {
  if (document.getElementById("currencySelect").value == "USD"){      
      document.getElementById("unitChange").innerHTML = 'Unit Price ($)';
      document.getElementById("amountChange").innerHTML = 'Amount ($)';
      document.getElementById("com_date").value = 'Sub Total ($)';
      document.getElementById("grand").innerHTML = 'Grand Total ($)';
      document.getElementById("com_word").value = 'In Words ($)';      
  } else if (document.getElementById("currencySelect").value == "IND") {
      document.getElementById("unitChange").innerHTML = 'Unit Price (₹)';
      document.getElementById("amountChange").innerHTML = 'Amount (₹)';
      document.getElementById("com_date").value = 'Sub Total (₹)';
      document.getElementById("grand").innerHTML = 'Grand Total (₹)';
      document.getElementById("com_word").value = 'In Words (₹)';      
    }
    getAmountInWords();
}  

// function to adding Discount input field
function addDiscount() {
  document.getElementById("discountInput").innerHTML = '<div class="input-group end mb-3" style="width: 100%">'
  + '<span class="input-group-text wosub" id="">Discount (%)</span>'
  + '<input  type="number" id="discount" class="form-control inputGroup wosub" min="0" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onkeypress="return /[0-9.]/i.test(event.key)" oninput="calculateGrandTotal();maxValueCheck()"'
  + '</div>';
  document.getElementById("crossButton").innerHTML = '<button type="button" class="btn-close add-tax" aria-label="Close" onclick="remove_input()"></button>';
}


// function to remove Discount input field
function remove_input() {
  var taxes = parseFloat(document.getElementById("tax").value);
  if (isNaN(taxes)) taxes = 0;
  document.getElementById("grandTotal").value = (parseFloat(document.getElementById("subTotal").value) + (taxes/100)*parseFloat(document.getElementById("subTotal").value)).toFixed(2);
  document.getElementById("discountInput").innerHTML = '';
  document.getElementById("crossButton").innerHTML = '<input type="submit" class="btn add-tax btn-light" value="+ Discount" onclick="addDiscount()" onkeypress="return /[0-9a-zA-Z.]/i.test(event.key)"/>'; 
}

//  function today_date(){
//   var today = new Date();
//   var dd = String(today.getDate()).padStart(2, '0');
//   var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//   var yyyy = today.getFullYear();
//   today = dd + '/' + mm + '/' + yyyy;  
//   document.getElementById("todayDate").value =  today
//  }

// function for validation check and focus invalid/empty fields
function validateInput() {
  var regexComName = /^[A-Z0-9]([a-zA-Z0-9]|[- @\.#&!])*$/; 
  var regexName = /^[A-Z][A-Za-z0-9 .@_%&]{1,80}$/;
  var regexID = /^[IN]{2}([a-zA-Z0-9 ,.'-])+$/; // 'IN' prefix for invoice id
  var regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;      
  var regexPhone = /^$|^\+?[1-9][0-9]{9,12}$/;
  document.getElementById("description1").style.outline = "none";
  document.getElementById("quantity1").style.outline = "none";
  if ( document.getElementById("unique_id").value == "" || !regexID.test(document.getElementById("unique_id").value) ) {
    document.getElementById("msgID_err").innerHTML = " Please Enter valid ID";
    document.getElementById("unique_id").focus();
    document.getElementById("unique_id").style.outline = "3px solid red";
  }
  else if ( document.getElementById("companyName").value == "" || !regexComName.test(document.getElementById("companyName").value)) {
    document.getElementById("msgSenderCompanyName").innerHTML = " Please enter valid Company Name";
    document.getElementById("companyName").focus();
    document.getElementById("companyName").style.outline = "3px solid red";
  }
  else if (document.getElementById("contactName").value == "" || !regexName.test(document.getElementById("contactName").value)){
    document.getElementById("msgSenderContactName").innerHTML = " Please enter valid Contact Name";
    document.getElementById("contactName").focus();
    document.getElementById("contactName").style.outline = "3px solid red";
  }
  else if (document.getElementById("email").value == "" || !regexEmail.test(document.getElementById("email").value)){
    document.getElementById("msgSenderMail").innerHTML = "  Please enter valid Email";
    document.getElementById("email").focus();
    document.getElementById("email").style.outline = "3px solid red";
  }
  else if (!regexPhone.test(document.getElementById("phone").value)){
    document.getElementById("msgSenderPhone").innerHTML = " Please enter valid Phone Number";
    document.getElementById("phone").focus();
    document.getElementById("phone").style.outline = "3px solid red";
  }
  else if (document.getElementById("rCompanyName").value == "" || !regexComName.test(document.getElementById("rCompanyName").value)){
    document.getElementById("msgReceiverCompanyName").innerHTML = " Please enter valid Company Name";
    document.getElementById("rCompanyName").focus();
    document.getElementById("rCompanyName").style.outline = "3px solid red";
  }
  else if (document.getElementById("rName").value == "" || !regexName.test(document.getElementById("rName").value)){
    document.getElementById("msgReceiverContactName").innerHTML = " Please enter valid Contact Name";
    document.getElementById("rName").focus();
    document.getElementById("rName").style.outline = "3px solid red";
  }
  else if (document.getElementById("rEmail").value == "" || !regexEmail.test(document.getElementById("rEmail").value)){
    document.getElementById("msgReceiverMail").innerHTML = " Please enter valid Email";
    document.getElementById("rEmail").focus();
    document.getElementById("rEmail").style.outline = "3px solid red";
  }
  else if (!regexPhone.test(document.getElementById("rPhone").value)){
    document.getElementById("msgReceiverPhone").innerHTML = " Please enter valid Phone Number";
    document.getElementById("rPhone").focus();
    document.getElementById("rPhone").style.outline = "3px solid red";
  } 
  else if (document.getElementById("areaCode").value == ""){
    document.getElementById("lcompany_error").innerHTML = " Please choose Country Code";
    document.getElementById("areaCode").focus();
    document.getElementById("areaCode").style.outline = "3px solid red";
  }
  else if (document.getElementById("areaCodeR").value == ""){
    document.getElementById("lcompany_error").innerHTML = " Please choose Country Code";
    document.getElementById("areaCodeR").focus();
    document.getElementById("areaCodeR").style.outline = "3px solid red";
  }
  else if (document.getElementById("description1").value === "") {
    document.getElementById("inv_item").innerHTML = "Please Enter Description";
    document.getElementById("description1").focus();
    document.getElementById("description1").style.outline = "3px solid red";
  } else if (document.getElementById("quantity1").value === "") {
    document.getElementById("inv_item").innerHTML = "Please Enter Quantity";
    document.getElementById("quantity1").focus();
    document.getElementById("quantity1").style.outline = "3px solid red"; 
  } else if (document.getElementById("amount1").value === "") {
    document.getElementById("inv_item").innerHTML = "Please Enter Amount";
    document.getElementById("amount1").focus();
    document.getElementById("amount1").style.outline = "3px solid red";
  } else if (document.getElementById("date").value == ""){
    document.getElementById("inv_date").innerHTML = " Select Date";
    document.getElementById("date").focus();
    document.getElementById("date").style.outline = "3px solid red";
  }
  else{
    if(localStorage.getItem("token") == null){
      previewInvoice();
      togg();
    } else {
      previewInvoiceSecured();
      togg();
    }
  }
}

// function to remove error message and focus from invalid/empty fields
function error_less() {
  document.getElementById("description1").style.outline = "0px solid";
  document.getElementById("unique_id").style.outline = "0px solid";
  document.getElementById("date").style.outline = "0px solid";
  document.getElementById("amount1").style.outline = "0px solid";
  document.getElementById("msgID_err").innerHTML = ""; 
  document.getElementById("inv_item").innerHTML = ""; 
  document.getElementById("inv_date").innerHTML = ""; 
  document.getElementById("msgSenderContactName").innerHTML = ""; 
  document.getElementById("msgSenderCompanyName").innerHTML = ""; 
  document.getElementById("msgSenderMail").innerHTML = ""; 
  document.getElementById("msgSenderPhone").innerHTML = ""; 
  document.getElementById("msgReceiverCompanyName").innerHTML = ""; 
  document.getElementById("msgReceiverContactName").innerHTML = ""; 
  document.getElementById("msgReceiverMail").innerHTML = ""; 
  document.getElementById("msgReceiverPhone").innerHTML = "";
  document.getElementById("lcompany_error").innerHTML = "";
  document.getElementById("companyName").style.outline = "0px solid";
  document.getElementById("contactName").style.outline = "0px solid";
  document.getElementById("email").style.outline = "0px solid";
  document.getElementById("phone").style.outline = "0px solid";
  document.getElementById("rCompanyName").style.outline = "0px solid";
  document.getElementById("rName").style.outline = "0px solid";
  document.getElementById("rEmail").style.outline = "0px solid";
  document.getElementById("rPhone").style.outline = "0px solid";
  document.getElementById("areaCode").style.outline = "0px solid";
  document.getElementById("areaCodeR").style.outline = "0px solid";
  document.getElementById("quantity1").style.outline = "0px solid";
}

// create unique invoice id with random values
function uniqueId(){
  var today = new Date();
  document.getElementById("unique_id").value = "IN" + today.getDate() + String(today.getMonth() + 1) + (today).getMilliseconds()+Math.floor(Math.random()*100);
  // Date.now().toString(36) + Math.random().toString(36)
}


function amountToWord(amount) {
  var words = new Array();
  words[0] = 'Zero';words[1] = 'One';words[2] = 'Two';words[3] = 'Three';words[4] = 'Four';words[5] = 'Five';words[6] = 'Six';words[7] = 'Seven';words[8] = 'Eight';words[9] = 'Nine';words[10] = 'Ten';words[11] = 'Eleven';words[12] = 'Twelve';words[13] = 'Thirteen';words[14] = 'Fourteen';words[15] = 'Fifteen';words[16] = 'Sixteen';words[17] = 'Seventeen';words[18] = 'Eighteen';words[19] = 'Nineteen';words[20] = 'Twenty';words[30] = 'Thirty';words[40] = 'Forty';words[50] = 'Fifty';words[60] = 'Sixty';words[70] = 'Seventy';words[80] = 'Eighty';words[90] = 'Ninety'; words[100] = 'One Hundred'; words[200] = 'Two Hundred'; words[300] = 'Three Hundred'; words[400] = 'Four Hundred'; words[500] = 'Five Hundred'; words[600] = 'Six Hundred'; words[700] = 'Seven Hundred'; words[800] = 'Eight Hundred'; words[900] = 'Nine Hundred'; var op;
  amount = amount.toString();
  var atemp = amount.split('.');
  var number = atemp[0].split(',').join('');
  var n_length = number.length;
  var words_string = '';
  if(n_length <= 11){
  var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var received_n_array = new Array();
  for (var i = 0; i < n_length; i++){
  received_n_array[i] = number.substr(i, 1);}
  for (var i = 11 - n_length, j = 0; i < 11; i++, j++){
  n_array[i] = received_n_array[j];}
  for (var i = 0, j = 1; i < 11; i++, j++){
  if(i == 0 || i == 3 || i == 6 || i == 9){
  if(n_array[i] == 1){
  n_array[j] = 10 + parseInt(n_array[j]);
  n_array[i] = 0;}
  }}
  value = '';
  for (var i = 0; i < 11; i++){
  if(i == 0 || i == 3 || i == 6 || i == 9){
  value = n_array[i] * 10;}
  else if( i == 2 || i == 5 || i == 8){
  value = n_array[i] * 100;} else {
  value = n_array[i];}
  
  if(value != 0){
  words_string += words[value] + ' ';}
  if((i == 1 && value != 0) && (n_array[i - 1] > 0)){
  words_string += 'Billion ';}else if(( i == 1) && value != 0){
  words_string += 'Biillion ';}
  if((i == 4) && value == 0 && (n_array[i - 1] > 0 || n_array[i - 2] > 0)){
  words_string += 'Million ';} else if(( i == 4) && value != 0){
  words_string += 'Million ';}
  if((i == 7) && value == 0 && (n_array[i - 1] > 0 || n_array[i - 2] > 0)){
  words_string += 'Thousand ';} else if(( i == 7) && value != 0){
  words_string += 'Thousand ';}}
  words_string = words_string.split(' ').join(' ');}
  return words_string;

}

  function getAmountInWords(){
  var num = parseFloat(document.getElementById("grandTotal").value);
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
// Error : Amount in number appears to be incorrect. Please Check.