function add_work(entity, index) {
    /* if the entered value is one of the skills */
    console.log("Creating Work...")

    var work_master_div = document.createElement("div");
    work_master_div.setAttribute("id", "work_" + index)
    work_master_div.setAttribute("class", "col-md-12")
    work_master_div.setAttribute("style", "border-style: dashed; margin-top: 15px; padding: 15px;")
    entity.parentNode.appendChild(work_master_div);

    /* Create a delete button for this award */
    var delete_button = document.createElement("button");
    delete_button.setAttribute("id", "work_delete_" + index);
    delete_button.setAttribute("class", "btn btn-danger");
    delete_button.setAttribute("type", "button");
    delete_button.innerHTML = "Delete Job"
    delete_button.addEventListener("click", function(e) {
        /* delete the parent div if pressed */
        remove_work(work_master_div)
    });

    work_master_div.appendChild(delete_button);

    var text_column_div = document.createElement("div");
    text_column_div.setAttribute("class", "edit-profile-row column col-md-12")
    work_master_div.appendChild(text_column_div);

    text_column_div.innerHTML += "<label class='col control-label'>Company Name (Required):</label>"
    text_column_div.innerHTML += "<div class='col'> " +
        "<input name='work_name[]' id='work_" + index + "_name_input' class='form-control column' type='text' placeholder='Company Name' />" +
        "</div>";

    text_column_div.innerHTML += "<label class='col control-label'>Position Title:</label>"
    text_column_div.innerHTML += "<div class='col'> " +
        "<input name='work_position[]' id='work_" + index + "_position_input' class='form-control column' type='text' placeholder='Position Title...' />" +
        "</div>";

    text_column_div.innerHTML += "<label class='col control-label' style='margin-top: 10px' >Job Description:</label>"
    var key_up_string = 'textCounter(this,"work_' + index + '_desc_chars_left", 120);'
    text_column_div.innerHTML += "<div class='col control-label''>" +
    "<textarea name='work_description[]' onkeyup='" + key_up_string + "' id='work_" + index + "_desc_input' class='form-control column' type='text' rows='3' cols='30' placeholder='Job Description'></textarea>" +
    "<p id='work_" + index + "_desc_chars_left'></p>" +
    "</div>";

    /* a temporary string loaded because the div will autoclose at the end of the .innerHTML addition */
    tmp_str = ""
    for (i=0;i < associated_with.length; i++){
        tmp_str += "<option value='" + associated_with[i] + "'>" + associated_with[i] + "</option>";
    }

    text_column_div.innerHTML += "<label class='col control-label' style='margin-top: 10px' >Start Date (Required):</label>" +
    "<div class='col'> " +
        "<input name='job_start_date[]' id='job_" + index + "_start_date_input' class='form-control' type='date'/>" +
    "</div>";

    text_column_div.innerHTML += "<label class='col control-label' style='margin-top: 10px' >End Date:</label>" +
    "<div class='col'> " +
        "<input name='job_end_date[]' id='job_" + index + "_end_date_input' class='form-control' type='date'/>" +
    "</div>";

}



function remove_work(entity){
    console.log("removing skill...")
    entity.parentNode.removeChild(entity);
}