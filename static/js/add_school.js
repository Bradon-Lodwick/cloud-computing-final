function add_school(entity, index) {
    /* if the entered value is one of the skills */
    console.log("Creating School...")

    var school_master_div = document.createElement("div");
    school_master_div.setAttribute("id", "school_" + index)
    school_master_div.setAttribute("class", "col-md-12")
    school_master_div.setAttribute("style", "border-style: dashed; margin-top: 15px; padding: 15px;")
    entity.parentNode.appendChild(school_master_div);

    /* Create a delete button for this award */
    var delete_button = document.createElement("button");
    delete_button.setAttribute("id", "school_delete_" + index);
    delete_button.setAttribute("class", "btn btn-danger");
    delete_button.setAttribute("type", "button");
    delete_button.innerHTML = "Delete"
    delete_button.addEventListener("click", function(e) {
        /* delete the parent div if pressed */
        remove_school(school_master_div)
    });

    school_master_div.appendChild(delete_button);

    var text_column_div = document.createElement("div");
    text_column_div.setAttribute("class", "edit-profile-row column col-md-12")
    school_master_div.appendChild(text_column_div);

    text_column_div.innerHTML += "<label class='col control-label'>School Name (Required):</label>"
    text_column_div.innerHTML += "<div class='col'> " +
        "<input name='school_name[]' id='school_" + index + "_name_input' class='form-control column' type='text' placeholder='School...' />" +
        "</div>";

    text_column_div.innerHTML += "<label class='col control-label'>Degree (Required):</label>"
    text_column_div.innerHTML += "<div class='col'> " +
        "<input name='school_degree[]' id='school_" + index + "_degree_input' class='form-control column' type='text' placeholder='Degree...' />" +
        "</div>";

    text_column_div.innerHTML += "<label class='col control-label' style='margin-top: 10px' >Start Date (Required):</label>" +
    "<div class='col'> " +
        "<input name='school_start_date[]' id='school_" + index + "_start_date_input' class='form-control' type='date'/>" +
    "</div>";

    text_column_div.innerHTML += "<label class='col control-label' style='margin-top: 10px' >End Date (Or Estimated End Date):</label>" +
    "<div class='col'> " +
        "<input name='school_end_date[]' id='school_" + index + "_end_date_input' class='form-control' type='date'/>" +
    "</div>";

}



function remove_school(entity){
    console.log("removing skill...")
    entity.parentNode.removeChild(entity);
}