//jshint esversion:6

//alert("Working")
console.log("Hello");
var date = new Date();
var dict = {'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6};

currentDay = date.getDay();

document.querySelector('table').rows[dict.Monday].cells[getLecture()-1].style.background = "red";

function getLecture() {
  let dateStr = date.toLocaleTimeString("en-US", {hour12: false});
  console.log(dateStr);
  if(dateStr>="08:15" && dateStr<"09:10") return 1;
  if(dateStr>="09:10" && dateStr<"10:05") return 2;
  if(dateStr>="10:05" && dateStr<"11:00") return 3;
  if(dateStr>="11:30" && dateStr<"12:25") return 4;
  if(dateStr>="12:25" && dateStr<"13:20") return 5;
  if(dateStr>="13:20" && dateStr<"14:15") return 6;
  if(dateStr>="14:15" && dateStr<"15:10") return 7;
}
