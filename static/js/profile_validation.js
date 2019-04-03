forms_to_validate = []
function add_validation(item) {
    forms_to_validate.push(item);
}

function remove_validation(item_id) {
    for (var i=0; i < forms_to_validate.length; i++){
        if (forms_to_validate[i].id == item_id){
            forms_to_validate.splice(i, 1);
            break;
        }
    }
}

function validate_all(){
    var all_validated = true;
    document.getElementById("profile_submit").disabled = true;
    for (var i=0; i < forms_to_validate.length; i++){
        var text = forms_to_validate[i].value;
        var set_err = forms_to_validate[i].parentNode;

        if(forms_to_validate[i].type == "text"){
            if (text.length == 0){
                all_validated = false;
                set_err.classList.add("has-error")
            } else {
                set_err.classList.remove("has-error")
            }
        } else if (forms_to_validate[i].type == "date"){
            if (forms_to_validate[i].value.length < 10){
                all_validated = false;
                set_err.classList.add("has-error")
            } else {
                set_err.classList.remove("has-error")
            }
        }
    }
    if(all_validated){
        document.getElementById("profile_submit").disabled = false;
    }
}