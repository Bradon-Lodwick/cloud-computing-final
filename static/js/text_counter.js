function textCounter(field,field2,maxlimit)
{
 var count_display = document.getElementById(field2);
 if (field.value.length == 0){
    count_display.innerHTML = ""
 } else if ( field.value.length <= maxlimit ) {
  count_display.innerHTML = "Characters Remaining: " + (maxlimit - field.value.length);
 }
}