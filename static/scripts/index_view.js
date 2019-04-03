function controll_view() {
  var checkBox = document.getElementById("myCheck");
  var listview = document.getElementById("listview");
  var tableview = document.getElementById("tableview");
  if (checkBox.checked == true){
    listview.style.display = "block";
    tableview.style.display = "none";
  } else {
    listview.style.display = "none";
    tableview.style.display = "block";
  }
}