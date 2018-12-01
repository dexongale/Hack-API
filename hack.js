var cl = cloudinary.Cloudinary.new( { cloud_name: "dbl7whgry"});


var image = "" ;
var intent = "";
var data = "" ;


window.ajaxSuccess = function () {
	response = JSON.parse(this.responseText);
  console.log("ajaxSuccess", typeof this.responseText);
  document.getElementById('uploaded').innerHTML = ( thumbnail(response["secure_url"]));
  // document.getElementById('results').innerText = this.responseText;
  image = response["public_id"];
}

window.AJAXSubmit = function (formElement) {
  console.log("starting AJAXSubmit");
  if (!formElement.action) { return; }
  var xhr = new XMLHttpRequest();
  xhr.onload = ajaxSuccess;
  xhr.open("post", "https://api.cloudinary.com/v1_1/dbl7whgry/image/upload");
  xhr.send(new FormData(formElement));
}



function toGreyscale(){

    greyscale(image) ;
}


function first_load(image){

  var imageString = cl.imageTag(image, {height: "400", effect:"grayscale"}).toHtml();
  console.log(imageString);
  return imageString;

}

function thumbnail(image){

  var imageString = cl.imageTag(image, {transformation: [
    {width: 400, height: 400, gravity: "face", radius: "max", crop: "crop"},
    {width: 200, crop: "scale"}
    ]}).toHtml();
  console.log(imageString);
  return imageString;

}

function message(){
  var text = document.getElementById("message").value;
  toSend = {
    "text": text
  }
  $(document).ready(function () {
  $.post("http://localhost:5000/api",toSend)
  .done(function (res) {
    console.log(res);
    intent = res["intent"] ;
    data = res["data"] ;
      console.log(intent) ;
      console.log(data) ;
        doRequest(data,intent) ;
  })});

}

function doRequest(user_data, user_intent) {
    var toSend = {
        "public_id": image,
        "option" :
    {
        "command" : user_intent
    }
    } ;
    console.log(toSend);
        $.post("http://localhost:3000/transform",toSend)
            .done(function (res) {
                console.log(res);
            });
    }


