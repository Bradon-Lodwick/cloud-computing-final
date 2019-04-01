function add_award(entity, index) {
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
    delete_button.setAttribute("style", "float: left;")
    delete_button.setAttribute("type", "button");
    delete_button.innerHTML = "Delete Award"
    delete_button.addEventListener("click", function(e) {
        /* delete the parent div if pressed */
        remove_award(award_master_div)
    });

    award_master_div.appendChild(delete_button);

    var picture_column_div = document.createElement("div");
    picture_column_div.setAttribute("class", "column col-md-4 text-center")
    picture_column_div.setAttribute("style", "float: center; overflow:hidden;")
    award_master_div.appendChild(picture_column_div);

    var image_crop = document.createElement("div");
    image_crop.setAttribute("id", "awards_image_" + index)
    image_crop.setAttribute("class", "crop_award")
    image_crop.setAttribute("style", "background-image: url('https://cdn.pixabay.com/photo/2017/07/24/05/20/cup-2533629_960_720.png')");
    picture_column_div.appendChild(image_crop)

    var input_image = document.createElement("input");
    input_image.setAttribute("name", "award_image[]");
    input_image.setAttribute("type", "file");
    input_image.setAttribute("id", "award_" + index + "_image");
    input_image.setAttribute("accept", "image/*");
    input_image.addEventListener("change", function(e){
        var output = document.getElementById("awards_image_" + index);
        var input = document.getElementById("award_" + index + "_image");
        var file = input.files[0];
        var reader = new FileReader();
        reader.onload = imageIsLoaded;
        reader.readAsDataURL(input.files[0]);

        function imageIsLoaded(e) {
          output.style.backgroundImage ='url(' + e.target.result + ')';
        }

    })
    input_image.setAttribute("class", "form-control");
    picture_column_div.appendChild(input_image);

    var text_column_div = document.createElement("div");
    text_column_div.setAttribute("class", "edit-profile-row column col-md-4")
    award_master_div.appendChild(text_column_div);

    text_column_div.innerHTML = "<label class='column control-label'>Award Name:</label>"
    text_column_div.innerHTML += "<input name='award_name[]' id='award_" + index + "_name_input class='form-control column' type='text' placeholder='Award Name' />"
    text_column_div.innerHTML += "<label class='column control-label' style='margin-top: 10px' >Award Description:</label>"
    var key_up_string = 'textCounter(this,"award_' + index + '_desc_chars_left", 120);'
    text_column_div.innerHTML += "<textarea name='award_description[]' onkeyup='" + key_up_string + "' id='award_" + index + "_desc_input class='form-control column' type='text' rows='3' cols='30' placeholder='Award Description'></textarea>"
    text_column_div.innerHTML += "<p id='award_" + index + "_desc_chars_left'></p>"
}



function remove_award(entity){
    console.log("removing skill...")
    entity.parentNode.removeChild(entity);
}