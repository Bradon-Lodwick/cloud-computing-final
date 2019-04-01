function add_award(entity, index, associated_with) {
    /* if the entered value is one of the skills */
    console.log("Creating Award...")

    var award_master_div = document.createElement("div");
    award_master_div.setAttribute("id", "award_" + index)
    award_master_div.setAttribute("class", "col-md-12")
    award_master_div.setAttribute("style", "border-style: dashed; margin-top: 15px; padding: 15px;")
    entity.parentNode.appendChild(award_master_div);

    /* Create a delete button for this award */
    var delete_button = document.createElement("button");
    delete_button.setAttribute("id", "award_delete_" + index);
    delete_button.setAttribute("class", "btn btn-danger");
    delete_button.setAttribute("type", "button");
    delete_button.innerHTML = "Delete Award"
    delete_button.addEventListener("click", function(e) {
        /* delete the parent div if pressed */
        remove_award(award_master_div)
    });

    award_master_div.appendChild(delete_button);

    var text_column_div = document.createElement("div");
    text_column_div.setAttribute("class", "edit-profile-row column col-md-12")
    award_master_div.appendChild(text_column_div);

    text_column_div.innerHTML += "<label class='col control-label'>Award Name (Required):</label>"
    text_column_div.innerHTML += "<div class='col'> " +
        "<input name='award_name[]' id='award_" + index + "_name_input' class='form-control column' type='text' placeholder='Award Name' />" +
        "</div>";

    text_column_div.innerHTML += "<label class='col control-label' style='margin-top: 10px' >Award Description:</label>"
    var key_up_string = 'textCounter(this,"award_' + index + '_desc_chars_left", 120);'
    text_column_div.innerHTML += "<div class='col control-label''>" +
    "<textarea name='award_description[]' onkeyup='" + key_up_string + "' id='award_" + index + "_desc_input' class='form-control column' type='text' rows='3' cols='30' placeholder='Award Description'></textarea>" +
    "<p id='award_" + index + "_desc_chars_left'></p>" +
    "</div>";

    /* a temporary string loaded because the div will autoclose at the end of the .innerHTML addition */
    tmp_str = ""
    for (i=0;i < associated_with.length; i++){
        tmp_str += "<option value='" + associated_with[i] + "'>" + associated_with[i] + "</option>";
    }
    text_column_div.innerHTML += "<label class='col control-label' style='margin-top: 10px' >Award Reference:</label>"
    text_column_div.innerHTML += "<div class='col'>" +
    "<select name='award_association[]' id='award_" + index + "_association_input' class='form-control column'>" +
    tmp_str +
    "</select>" +
    "</div>";

    text_column_div.innerHTML += "<label class='col control-label' style='margin-top: 10px' >Date Received:</label>" +
    "<div class='col'> " +
        "<input name='award_date[]' id='award_" + index + "_date_input' class='form-control' type='date'/>" +
    "</div>";

    text_column_div.innerHTML += "<label class='col control-label' style='margin-top: 10px'>Award Issuer:</label>"
    text_column_div.innerHTML += "<div class='col'> " +
    "<input name='award_issuer[]' id='award_" + index + "_issuer_input' class='form-control' type='text' placeholder='Award Issuer' />" +
    "</div>";
}



function remove_award(entity){
    console.log("removing skill...")
    entity.parentNode.removeChild(entity);
}