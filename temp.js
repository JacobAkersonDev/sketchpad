$(document).ready(function() {
  // Generate UniqueID and place in Eform_id field and append in attachment link url
  let eform_unique_id = Date.now();
  generateUniqueIdAndUpdateAttachmentLink(eform_unique_id);

  function generateUniqueIdAndUpdateAttachmentLink(eformUniqueId) {
    $("#OBKey_Eform_ID_1").val(eformUniqueId);
    let uploadObj = $("#filenest");
    let upload_href_val = uploadObj.attr("href");
    upload_href_val = upload_href_val + "&EformID=" + eformUniqueId;
    uploadObj.attr("href", upload_href_val);
  }

  // Show or hide the upload attachment based on selection.
  $('input[name="OBKey_Attachment_1"]').on("click", toggleUploadContainer);

  function toggleUploadContainer() {
    if ($(this).val().toLowerCase() == "yes") {
      $("#upload-container").show();
    } else {
      $("#upload-container").hide();
    }
  }

  // Open attachment window in a popup window:
  $("#filenest").click(openAttachmentInPopup);

  function openAttachmentInPopup() {
    let newWindow = window.open(
      $(this).prop("href"),
      "",
      "height=750,width=750"
    );
    if (window.focus) {
      newWindow.focus();
    }
    return false;
  }

  // Form validation configuration
  var validationConfig = {
    errorPlacement: handleValidationErrors,
    errorElement: "span",
    debug: true,
    ignore: ".ignore",
    rules: {
      student_employee: "required",
      OBKey_Service_Office_1: "required",
      OBKey_service_group_1: "required",
      other: {
        required: {
          depends: function () {
            return $("#OBKey_service_group_1_other").is(":checked");
          },
        },
      },
      other_organizations: {
        required: {
          depends: function () {
            return $("#OBKey_Collaboration_1_yes").is(":checked");
          },
        },
      },
      OBKey_Program_Start_Date_Details_1: "required",
      OBKey_Program_Duration_Details_1: "required",
      OBKey_Program_Location_1: "required",
      OBKey_Program_Audience_1: "required",
      reason_for_request: "required",
      OBKey_Expected_Participant_Range_1: "required",
      OBKey_Antiracism_Inclusive_Campus_Plan_1: "required",
      OBKey_Sac_State_Imperatives_1: "required",
    },
    messages: {
      other: {
        required: "Please fill in a request type",
      },
    },
    submitHandler: function (form) {
      form.submit();
    },
  };

  var formValidator = $("#appForm").validate(validationConfig);

  // Form Clear/Cancel
  $("#OBBtn_Cancel").on("click", function (e) {
    // Prevent default action
    e.preventDefault();

    // Clear all form fields
    $("#appForm")[0].reset();
    // Ensure submit is enabled.
    $("#OBBtn_Yes").prop("disabled", false);
    $("#OBBtn_Yes").val("Submit Petition");

    // Repopulate Eform ID and attachment url
    generateUniqueIdAndUpdateAttachmentLink(eform_unique_id);
    // Repopulate date submitted
    $("#OBKey_Submit_Date_1").val(GetCurrentDate());

    // Move form to step 1
    document.getElementById("sectionOne").scrollIntoView({
      behavior: "smooth",
    });
  });

  function handleValidationErrors(error, element) {
    $(element).closest(".form-group").find(".required").after(error);
  }
});
