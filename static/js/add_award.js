function add_award(entity, index){
    var tmp_obj, tmp_obj_2, i, val = this.value;
    /* if the entered value is one of the skills */
    console.log("Valid Skill")

    tmp_obj = document.createElement("div");
    tmp_obj.setAttribute("id", "award_" + index)
    entity.parentNode.appendChild(tmp_obj);

    /* Create a delete button for this award */
    tmp_obj_2 = document.createElement("button");
    tmp_obj_2.setAttribute("id", "award_delete_" + index);
    tmp_obj_2.setAttribute("class", "btn btn-danger");
    tmp_obj_2.setAttribute("type", "button");
    tmp_obj_2.innerHTML = "Delete Award"
    tmp_obj_2.addEventListener("click", function(e) {
        /* delete the parent div if pressed */
        remove_award(tmp_obj)
    });

    tmp_obj.appendChild(tmp_obj_2);

    tmp_obj_2 = document.createElement("div");
    tmp_obj_2.setAttribute("class", "col-md-3")
    tmp_obj_2.innerHTML = "<div class="text-center">"
    tmp_obj_2.innerHTML += "<img  id="award_" + index "_image" src="#" class="img-circle img-responsive" style="overflow: hidden;" alt="Profile Picture">"
    tmp_obj_2.innerHTML += "</div>"
    tmp_obj_2.innerHTML += "<input name="picture" type="file" id="upload_image" accept="image/\*" onchange="loadFile(event)" class="form-control"/>"

    var loadFile = function(event) {
        var output = document.getElementById('profile_img_edit');
        output.src = URL.createObjectURL(event.target.files[0]);
    };

    tmp_obj.appendChild(tmp_obj_2);

}



function remove_award(entity){
    console.log("removing skill...")
    entity.parentNode.removeChild(entity);
}