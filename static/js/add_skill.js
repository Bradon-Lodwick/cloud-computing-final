function add_skill(entry, arr){
  var a, b, i, val = this.value;
  entry_val = entry.value
  if (arr.includes(entry_val) && !entry.parentNode.parentNode.contains(document.getElementById(entry_val + "skills_added"))){
    /* if the entered value is one of the skills */
    console.log("Valid Skill")

    /*create a DIV element that will contain the skill:*/
    a = document.createElement("button");
    a.setAttribute("id", entry_val + "skills_added");
    a.setAttribute("class", "displayed_skills col-sm-3");
    a.setAttribute("type", "button");
    a.addEventListener("click", function(e) {
        remove_skill(a)
    });

    entry.parentNode.parentNode.appendChild(a);

    b = document.createElement("div");
    //Display the completed word (based on autofill entries)
    b.innerHTML = entry_val;
    b.setAttribute("class", 'displayed_skills_text')

    /*insert a input field that will hold the current array item's value:*/
    b.innerHTML += "<input type='hidden' name='skills[]' value='" + entry_val + "'>";
    /*execute a function when someone clicks on the item value (DIV element):*/
    a.appendChild(b);
  } else {
    /* if the entered value is not one of the specified skills */
    console.log("Skill entered is not valid");
  }

}

function remove_skill(entity){
    console.log("removing skill...")
    entity.parentNode.removeChild(entity);
}