function autocomplete(item, arr) {
    console.log("Autocompleting....")
  var currentFocus;
  item.addEventListener("input", function(e) {
      /* grabs the input field's value (eg. Program) so it can compare and autocomplete it */
      var input_value = item.value;
      delete_dropdown_items();
      if (!this.value) { return false;}
      currentFocus = -1;

      dropdown_master_div = document.createElement("div");
      dropdown_master_div.setAttribute("id", "skills_autocomplete_list");
      dropdown_master_div.setAttribute("class", "autocomplete_items");
      this.parentNode.appendChild(dropdown_master_div);

      for (var i = 0; i < arr.length; i++) {
        /* if the current input string given matches the current element in the given array up to the amount entered so far */
        if (arr[i].substr(0, input_value.length).toUpperCase() == input_value.toUpperCase()) {
          single_dropdown_div = document.createElement("div");
          /* sets text within the div to the autocompleted string */
          single_dropdown_div.innerHTML = arr[i];

          /* creates an input field thats hidden, to allow for the manipulation of these added items/skills */
          single_dropdown_div.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /* makes it so when any div is clicked it autocompletes the input field and deletes all the other divs */
          single_dropdown_div.addEventListener("click", function(e) {
            item.value = this.getElementsByTagName("input")[0].value;
            delete_dropdown_items();
          });
          dropdown_master_div.appendChild(single_dropdown_div);
        }
      }
  });
  /* Adds a listener whenever a button is pressed on the input field given */
  item.addEventListener("keydown", function(e) {
      var item_list = document.getElementById("skills_autocomplete_list");
      if (item_list == null || item_list == undefined){
        return
      }

      all_dropdown_divs = item_list.getElementsByTagName("div");
      /* If the down arrow key is pressed, move focus and change the active item */
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(all_dropdown_divs);
      } else if (e.keyCode == 38) {
        /* If the up arrow key is pressed, move focus and change the active item  */
        currentFocus--;
        addActive(all_dropdown_divs);
      } else if (e.keyCode == 13) {
        /* If the enter key is pressed simulate a click and prevent the default form submission */
        e.preventDefault();
        if (all_dropdown_divs != null && all_dropdown_divs != undefined){
            all_dropdown_divs[currentFocus].click();
        }
      }
  });

  function addActive(all_dropdown_divs) {
    if (all_dropdown_divs == null || all_dropdown_divs == undefined){
        return false;
    }
    /* makes no dropdowns active first */
    removeActive(all_dropdown_divs);

    /* if the current item is out of bounds, bring it back within bounds */
    if (currentFocus >= all_dropdown_divs.length) {
        currentFocus = 0;
    }
    if (currentFocus < 0){
        currentFocus = (all_dropdown_divs.length - 1);
    }
    /*add class "autocomplete_active":*/
    all_dropdown_divs[currentFocus].classList.add("autocomplete_active");
  }

  function removeActive(items) {
    /* Makes all divs no longer active */
    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove("autocomplete_active");
    }
  }

  function delete_dropdown_items() {
    /* deletes all single_dropdown_div items */
    var x = document.getElementsByClassName("autocomplete_items");
    for (var i = 0; i < x.length; i++) {
        x[i].parentNode.removeChild(x[i]);
    }
  }
    /* sets a listener for if someone clicks off the input field */
    document.addEventListener("click", function (e) {
        delete_dropdown_items();
    });
}