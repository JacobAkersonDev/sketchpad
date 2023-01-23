$(function () {
  // Generate UniqueID and place in Eform_id field and append in attachment link url
  var eform_unique_id = Date.now();
  $("#OBKey_Eform_ID_1").val(eform_unique_id);
  AddEformIdToAttachmentURL($("#filenest"), eform_unique_id);

  function AddEformIdToAttachmentURL(uploadObj, eformUniqueId) {
    // Append eform unique id to url querystring
    var upload_href_val = uploadObj.attr("href");
    upload_href_val = upload_href_val + "&EformID=" + eformUniqueId;
    uploadObj.attr("href", upload_href_val);
  }

  // Show or hide the upload attachment based on selection.
  $('input[name="OBKey_Attachment_1"]').on("click", function () {
    if ($(this).val().toLowerCase() == "yes") {
      $("#upload-container").show();
    } else {
      $("#upload-container").hide();
    }
  });

  // Open attachment window in a popup window:
  $("#filenest").click(function () {
    var newWindow = window.open(
      $(this).prop("href"),
      "",
      "height=750,width=750"
    );
    if (window.focus) {
      newWindow.focus();
    }
    return false;
  });

  var formValidator = $("#appForm").validate({
    errorPlacement: function (error, element) {
      // Append error within linked label
      $(element).closest(".form-group").find(".required").after(error);
    },
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
  });

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
    $("#OBKey_Eform_ID_1").val(eform_unique_id);
    AddEformIdToAttachmentURL($("#filenest"), eform_unique_id);
    // Repopulate date submitted
    $("#OBKey_Submit_Date_1").val(GetCurrentDate());

    // Move form to step 1
    document.getElementById("sectionOne").scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  });

  // Enable/Disable go to petition button.
  $("#policyRead").on("click", function () {
    togglePetitionButton($(this));
  });

  // Run once on page load
  togglePetitionButton($("#policyRead"));

  function togglePetitionButton(btn) {
    if (btn.prop("checked") == true) {
      $("#goToPetition").prop("disabled", false);
    } else {
      $("#goToPetition").prop("disabled", true);
    }
  }

  $("#goToPetition").on("click", function () {
    $("#InclusiveEForm").css("display", "block");
    $("#policy").css("display", "none");
    document.getElementById("form_top").scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  });

  // Format phone number
  $("body").on("click", function () {
    var pattern = /^\+1 [0-9]{3}\/[0-9]{3}-[0-9]{4}$/;
    var phoneNumber = $("#OBKey_Phone_1").val().trim();
    if (phoneNumber.search(pattern) == 0) {
      phoneNumber = phoneNumber.replace("+1", "");
      phoneNumber = phoneNumber.trim();
      phoneNumber = phoneNumber.replace("/", "-");
      $("#OBKey_Phone_1").val(phoneNumber);
    }
  });
});
