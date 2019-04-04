$(function() {
    if (item_type === "repo") {
        /* Hide the file section and youtube section and add the repo section */
        $('#file-upload-group').hide();
        $('#file-upload-group :input').prop("disabled", true);

        $('#repo-group').show();
        $('#repo-group :input').prop("disabled", false);

        $('#general-input').hide();
        $('#general-input :input').prop("disabled", true);

        $('#image-group').hide();
        $('#image-group :input').prop("disabled", true);

        $('#youtube-group').hide();
        $('#youtube-group :input').prop("disabled", true);
    }
    else if (item_type === "youtube") {
        /* Hide the file section and the repo sections add the youtube section */
        $('#file-upload-group').show();
        $('#file-upload-group :input').prop("disabled", false);

        $('#repo-group').hide();
        $('#repo-group :input').prop("disabled", true);

        $('#general-input').show();
        $('#general-input :input').prop("disabled", false);

        $('#image-group').hide();
        $('#image-group :input').prop("disabled", true);

        $('#youtube-group').show();
        $('#youtube-group :input').prop("disabled", false);
    }
    else if (item_type === "image") {
        $('#file-upload-group').show();
        $('#file-upload-group :input').prop("disabled", false);

        $('#repo-group').hide();
        $('#repo-group :input').prop("disabled", true);

        $('#general-input').show();
        $('#general-input :input').prop("disabled", false);

        $('#image-group').show();
        $('#image-group :input').prop("disabled", false);

        $('#youtube-group').hide();
        $('#youtube-group :input').prop("disabled", true);
    }
    else {
        /* Hide the youtube section and the repo section and add the file section */
        $('#file-upload-group').show();
        $('#file-upload-group :input').prop("disabled", false);

        $('#repo-group').hide();
        $('#repo-group :input').prop("disabled", true);

        $('#general-input').show();
        $('#general-input :input').prop("disabled", false);

        $('#image-group').hide();
        $('#image-group :input').prop("disabled", true);

        $('#youtube-group').hide();
        $('#youtube-group :input').prop("disabled", true);
    }

    $('#file-input').change(function(e) {
        $('#file-name').val(e.target.files[0].name);
    });

    $('#clear-file').click(function(){
        $('#file-input').wrap('<form>').closest('form').get(0).reset();
        $('#file-input').unwrap();
        $('#file-name').val('');
    });

    $('#image-input').change(function(e) {
        $('#image-name').val(e.target.files[0].name);
    });

    $('#clear-image').click(function(){
        $('#image-input').wrap('<form>').closest('form').get(0).reset();
        $('#image-input').unwrap();
        $('#image-name').val('');
    });

    async function get_repo_data(repo_endpoint) {
        // Set a variable to be used to determine if errors occurred, to determine if the help text should be shown
        let error_occurred = false;

        /* Get the repo from the base endpoint */
        let response = await fetch(repo_endpoint);
        let repo = await response.json();

        let contributors_response = await fetch(repo.contributors_url);
        let contributors = await contributors_response.json();

        /* Check to see if the user made contributions by using the github id passed in the create_item.html form */
        $.each(contributors, function(index, contributor) {
            if(contributor.id === github_id) {
                /* The id matches, therefore the repo is valid */
                repo.contributions = contributor.contributions

                return false; // breaks
            }
        });

        /* Test to see if the contributor was not found */
        if (typeof repo.contributions === 'undefined') {
            $('#other-repo-help').text('Please only link repositories you have contributed to.');
            $('#other-repo-help').show();
            throw new Error('Repo invalid');
        }
        else {
            // Set the repo api url
            $('#repo-api-url').val(repo_endpoint);
            $('#repo-api-url').prop("disabled", false);
            return repo;
        }

    }

    $('#check-other-repo').click(async function() {
        /* Get the username/repo-name that was given */
        var endpoint = 'https://api.github.com/repos/' + $('#repo-url').val();

        // Hide the help text
        $('#other-repo-help').hide();

        /* Fetch the repo information */
        let repo = await get_repo_data(endpoint);

        /* Display the repo data on the page */
        $('#repo-title').val(repo.name);
        $('#repo-description').val(repo.description);
        $('#repo-language-display').text(repo.language);
        $('#repo-issues-display').text(repo.open_issues_count);
        $('#repo-forks-display').text(repo.forks_count);

        $('#repo-output-div').show();
    });

    $('#edit-button').click(function() {
        submit_form(false);
    });
    $('#delete-button').click(function() {
        submit_form(true);
    });

    function submit_form(del) {
        if (del) {
            $('#delete').prop("checked", true)
        }
        else {
            $('#delete').prop("checked", false)
        }
        $('#edit-form').submit();
    }
});

