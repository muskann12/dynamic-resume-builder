

// Select elements
const createResumeBtn = document.getElementById('createResumeBtn') as HTMLButtonElement;
const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
const formSteps = document.querySelectorAll('.form-step') as NodeListOf<HTMLElement>;
const nextBtns = document.querySelectorAll('.next-btn') as NodeListOf<HTMLButtonElement>;
const backBtns = document.querySelectorAll('.back-btn') as NodeListOf<HTMLButtonElement>;
const submitBtn = document.querySelector('.submit-btn') as HTMLButtonElement;
const cvOutput = document.getElementById('cvOutput') as HTMLElement;
const cvContent = document.getElementById('cvContent') as HTMLElement;
const downloadCvButton = document.getElementById('downloadCv') as HTMLButtonElement; // Select the download button

// Initialize current step
let currentStep: number = 0;

// Show the form when "Create Resume" is clicked
createResumeBtn.addEventListener('click', () => {
    resumeForm.classList.remove('hidden');
    document.getElementById('welcomePage')?.classList.add('hidden');
});

// Show next form step
nextBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (currentStep < formSteps.length - 1) {
            formSteps[currentStep].classList.add('hidden');
            currentStep++;
            formSteps[currentStep].classList.remove('hidden');
        }
    });
});


backBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (currentStep > 0) {
            formSteps[currentStep].classList.add('hidden');
            currentStep--;
            formSteps[currentStep].classList.remove('hidden');
        }
    });
});

// Generate CV 
submitBtn.addEventListener('click', (event: Event) => {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const firstName = (document.getElementById('firstName') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLTextAreaElement).value;
    const schoolName = (document.getElementById('schoolName') as HTMLInputElement).value;
    const schoolLocation = (document.getElementById('schoolLocation') as HTMLInputElement).value;
    const degree = (document.getElementById('degree') as HTMLInputElement).value;
    const graduationYear = (document.getElementById('graduationYear') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

    // Collect experience data
    const jobTitle = (document.getElementById('jobTitle') as HTMLInputElement).value;
    const companyName = (document.getElementById('companyName') as HTMLInputElement).value;
    const jobDescription = (document.getElementById('jobDescription') as HTMLTextAreaElement).value;
    const yearsWorked = (document.getElementById('yearsWorked') as HTMLInputElement).value;

    // profile picture
    const profilePicInput = document.getElementById('profilePic') as HTMLInputElement;
    let profilePicSrc: string | null = null;

    if (profilePicInput.files && profilePicInput.files[0]) {
        const file = profilePicInput.files[0];
        const reader = new FileReader();
        
        // Display the profile picture after it has been loaded
        reader.onload = function (e) {
            profilePicSrc = e.target?.result as string; // Set the image source
            outputCV(); // Call outputCV function to display CV
        };
        
        reader.readAsDataURL(file); // Read the file as a data URL
    } else {
        outputCV(); // Call outputCV even if no image is selected
    }

    
    function outputCV() {
        // Output CV content
        cvContent.innerHTML = `
            <div class="cv-header">
                ${profilePicSrc ? `<img src="${profilePicSrc}" alt="Profile Picture" class="profile-pic">` : ''}
                <h1>${firstName}</h1>
                <p>Email: ${email}</p>
                <p>Phone: ${phone}</p>
                <p>Address: ${address}</p>
            </div>
            <div class="cv-education">
                <h2>Education</h2>
                <p>${degree} from ${schoolName}, ${schoolLocation} (${graduationYear})</p>
            </div>
            <div class="cv-experience">
                <h2>Experience</h2>
                <p>${jobTitle} at ${companyName}</p>
                <p>${jobDescription}</p>
                <p>Years Worked: ${yearsWorked}</p>
            </div>
            <div class="cv-skills">
                <h2>Skills</h2>
                <p>${skills}</p>
            </div>
        `;

      
        cvOutput.classList.remove('hidden');
        downloadCvButton.classList.remove('hidden'); // Show the download button
    }
});

// Download CV 
declare var html2pdf: any;

downloadCvButton.addEventListener('click', () => {
    const element = document.getElementById('cvOutput')!;
    html2pdf()
        .from(element)
        .save('resume.pdf'); // Name of the downloaded file
});
