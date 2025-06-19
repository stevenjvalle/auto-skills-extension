document.getElementById('extractBtn').addEventListener('click', () => {
  const skills = document.getElementById('skillsInput').value;

  if (skills) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: insertSkills,
        args: [skills]
      });
    });
  }
});
function insertSkillsManually(skills){
    alert("Click the input or textarea field where you want to insert the skills.");

    const inputs = document.querySelectorAll('input, textarea'); 
    inputs.forEach(input => {
        input.style.outline = '2px solid orange';
        input.style.cursor = 'pointer'; 
    })

    const handleClick = (event) => {
        const el = event.target;
        el.value = skills; 

        el.dispatchEvent(new Event('input', {bubbles: true}))
        el.dispatchEvent(new Event('change', {bubbles: true}))

        inputs.forEach(input => {
            input.style.outline = ''; 
            input.style.cursor = '';
        })

        document.removeEventListener('click', handleClick, true)
    }

    document.addEventListener('click', handleClick, true)
}

function insertSkillsAlternate(skills){
    if(skills == null || skills.length() = 0 
    )
    const skills =  [
  // Programming & Scripting
  "Python",
  "Go",
  "Bash",
  "Java",
  "Node.js",

  // Cloud & Infrastructure
  "AWS",
  "Google Cloud Platform",
  "Azure",
  "Docker",
  "Kubernetes",
  "Helm",
  "Terraform",
  "Ansible",

  // CI/CD & Automation
  "GitHub Actions",
  "Jenkins",
  "CI/CD Pipelines",
  "Infrastructure as Code",
  "Automation",
  "Configuration Management",

  // Monitoring & Observability
  "Prometheus",
  "Grafana",
  "ELK Stack",
  "CloudWatch",
  "OpenTelemetry",
  "Monitoring",
  "Alerting",
  "SLO/SLI/SLA Management",

  // System Operations
  "Linux",
  "System Architecture",
  "Networking",
  "Load Balancing",
  "Incident Response",
  "Root Cause Analysis",

  // Soft Skills & Practices
  "Site Reliability Engineering",
  "DevOps",
  "Agile",
  "Collaboration",
  "Scalability",
  "Resilience Engineering",
  "Performance Tuning"
];

async function insertAndSelectSkills(skills) {
  const input = document.querySelector('#skills--skills');
  if (!input) {
    console.error('Skill input not found!');
    return;
  }

  for (let skill of skills) {
    input.focus();
    input.value = skill;
    input.dispatchEvent(new Event('input', { bubbles: true }));

    // Wait for the dropdown to populate (tweak delay as needed)
    await new Promise(res => setTimeout(res, 650));

    // Press Enter (to search) - fires keydown + keyup
    ['keydown', 'keyup'].forEach(type => {
      input.dispatchEvent(new KeyboardEvent(type, {
        key: 'Enter',
        keyCode: 13,
        code: 'Enter',
        which: 13,
        bubbles: true,
        cancelable: true
      }));
    });

    // Wait for results to appear
    await new Promise(res => setTimeout(res, 1550));

    // Find the first skill result in the dropdown
    // This selector may need to be adjusted for your specific DOM:
    // Try '.css-veag3t' for the text node, or use [data-automation-label]
	
	const options = Array.from(document.querySelectorAll('[data-automation-id="promptLeafNode"]'));
	const target = options.find(opt => opt.textContent.trim().toLowerCase() === skill.toLowerCase());
	if (target) {
      const checkbox = target.closest('[data-automation-id="promptLeafNode"]')?.querySelector('input[type="checkbox"]');
      if (checkbox && !checkbox.checked) {
        checkbox.click();
        console.log(`✓ Selected: ${skill}`);
      }
    } else {
      console.warn(`⚠️ Skill not found: ${skill}`);
    }

    // Wait before processing next skill
    await new Promise(res => setTimeout(res, 400));
  }
}

insertAndSelectSkills(skills);

}

function insertSkills(skills) {
  // Convert to lowercase for matching
  const lowerSkills = skills.toLowerCase();

  // Candidate fields: inputs or textareas with a "skills"-like label, placeholder, etc.
  const inputs = Array.from(document.querySelectorAll('input, textarea'));

  let target = null;

  for (let input of inputs) {
    const label = input.closest('label')?.innerText || "";
    const placeholder = input.getAttribute('placeholder') || "";
    const ariaLabel = input.getAttribute('aria-label') || "";

    const searchableText = `${label} ${placeholder} ${ariaLabel}`.toLowerCase();

    if (searchableText.includes("skill")) {
      target = input;
      break;
    }
  }

  if (target) {
    target.value = skills;

    // Simulate typing behavior
    target.dispatchEvent(new Event('input', { bubbles: true }));
    target.dispatchEvent(new Event('change', { bubbles: true }));
  } else {
    insertSkillsManually(skills);
  }
}



