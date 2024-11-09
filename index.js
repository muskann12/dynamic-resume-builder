// Select elements
var createResumeBtn = document.getElementById('createResumeBtn');
var resumeForm = document.getElementById('resumeForm');
var formSteps = document.querySelectorAll('.form-step');
var nextBtns = document.querySelectorAll('.next-btn');
var backBtns = document.querySelectorAll('.back-btn');
var submitBtn = document.querySelector('.submit-btn');
var cvOutput = document.getElementById('cvOutput');
var cvContent = document.getElementById('cvContent');
var downloadCvButton = document.getElementById('downloadCv'); // Select the download button
// Initialize current step
var currentStep = 0;
// Show the form when "Create Resume" is clicked
createResumeBtn.addEventListener('click', function () {
    var _a;
    resumeForm.classList.remove('hidden');
    (_a = document.getElementById('welcomePage')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
});
// Show next form step
nextBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        if (currentStep < formSteps.length - 1) {
            formSteps[currentStep].classList.add('hidden');
            currentStep++;
            formSteps[currentStep].classList.remove('hidden');
        }
    });
});
// Show previous form step
backBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        if (currentStep > 0) {
            formSteps[currentStep].classList.add('hidden');
            currentStep--;
            formSteps[currentStep].classList.remove('hidden');
        }
    });
});
// Generate CV 
submitBtn.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default form submission
    // Collect form data
    var firstName = document.getElementById('firstName').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var dob = document.getElementById('dob').value; // Collect Date of Birth
    var address = document.getElementById('address').value;
    var schoolName = document.getElementById('schoolName').value;
    var schoolLocation = document.getElementById('schoolLocation').value;
    var degree = document.getElementById('degree').value;
    var graduationYear = document.getElementById('graduationYear').value;
    var skills = document.getElementById('skills').value;
    // Collect experience data
    var jobTitle = document.getElementById('jobTitle').value;
    var companyName = document.getElementById('companyName').value;
    var jobDescription = document.getElementById('jobDescription').value;
    var yearsWorked = document.getElementById('yearsWorked').value;
    // Profile picture
    var profilePicInput = document.getElementById('profilePic');
    var profilePicSrc = null;
    if (profilePicInput.files && profilePicInput.files[0]) {
        var file = profilePicInput.files[0];
        var reader = new FileReader();
        // Display the profile picture after it has been loaded
        reader.onload = function (e) {
            var _a;
            profilePicSrc = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result; // Set the image source
            outputCV(); // Call outputCV function to display CV
        };
        reader.readAsDataURL(file); // Read the file as a data URL
    }
    else {
        outputCV(); // Call outputCV even if no image is selected
    }
    function outputCV() {
        // Output CV content with updated layout
        cvContent.innerHTML = "\n            <div class=\"cv-container\">\n                <div class=\"cv-info\">\n                    ".concat(profilePicSrc ? "<img src=\"".concat(profilePicSrc, "\" alt=\"Profile Picture\" class=\"profile-pic\">") : '', "\n                    <h1>").concat(firstName, "</h1> \n                    <p>Email: ").concat(email, "</p> \n                    <p>Phone: ").concat(phone, "</p> \n                    <p>Date of Birth: ").concat(dob, "</p>\n                    <p>Address: ").concat(address, "</p> \n                </div>\n                <div class=\"cv-details\">\n                    <div class=\"cv-education\">\n                        <h2>Education</h2>\n                        <p>").concat(degree, " from ").concat(schoolName, ", ").concat(schoolLocation, " (").concat(graduationYear, ")</p>\n                    </div>\n                    <div class=\"cv-experience\">\n                        <h2>Experience</h2>\n                        <p>").concat(jobTitle, " at ").concat(companyName, "</p>\n                        <p>").concat(jobDescription, "</p>\n                        <p>Years Worked: ").concat(yearsWorked, "</p>\n                    </div>\n                    <div class=\"cv-skills\">\n                        <h2>Skills</h2>\n                        <p>").concat(skills, "</p>\n                    </div>\n                </div>\n            </div>\n        ");
        cvOutput.classList.remove('hidden');
        downloadCvButton.classList.remove('hidden'); // Show the download button
    }
});
downloadCvButton.addEventListener('click', function () {
    var element = document.getElementById('cvOutput');
    html2pdf()
        .from(element)
        .save('resume.pdf'); // Name of the downloaded file
});
