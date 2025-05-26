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

function insertSkills(skills) {
  // This function runs in the context of the page
  alert("Skills to insert: " + skills);
}
