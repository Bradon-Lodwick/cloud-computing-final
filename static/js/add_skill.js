function add_skill(entry, arr){
  console.log("Howdy Skill Adder")
  var a, b, i, val = this.value;
  if (arr.includes(entry)){
    /* if the entered value is one of the skills */

    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "skills_added");
    a.setAttribute("class", "displayed_skills");

     b = document.createElement("div");
      //Display the completed word (based on autofill entries)
      b.innerHTML = arr[i];

      /*insert a input field that will hold the current array item's value:*/
      b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
      /*execute a function when someone clicks on the item value (DIV element):*/
      b.addEventListener("click", function(e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
      });
      a.appendChild(b);
  } else {
    /* if the entered value is not one of the specified skills */
    console.log("Skill entered is not valid");
  }

}

function remove_skill(){
    console.log("removing skill...")
}