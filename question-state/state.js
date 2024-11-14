let tabBtns = [];
let tabPanels = {};

tabBtns = Array.from(document.querySelectorAll(".tabBtn"));
for (let i =0 ; i < tabBtns.length; i++) {
	tabBtns[i].addEventListener("click", selectTab, false);
	tabBtns[i].addEventListener("keyup", focusTab, false);
}

let x = document.querySelectorAll(".tabPanel");
for (let i =0 ; i < x.length; i++) {
	tabPanels[x[i].id] = x[i];
}

// If left (37) or right (39) arrow keys are pressed, change the focus on the tab buttons, but do not activate.
function focusTab (e) {
	if (e.keyCode == 39) {
		tabBtns[(tabBtns.indexOf(e.target) + 1) % 3].focus();
	} else if (e.keyCode == 37) {
		tabBtns[((tabBtns.indexOf(e.target) - 1) < 0 ? 2 : tabBtns.indexOf(e.target) - 1)].focus();
	}
} // End of focusTab

// If tab button is clicked (mouse, touch, Enter/Space) expose that tab's panel and hide the others
function selectTab(e) {
	let tabPanelID = e.target.id.replace("Btn", "Panel");

	for (let i = 0; i < tabBtns.length; i++) {
		if (tabBtns[i].id === e.target.id) {
			// Show the associated tab panel and mark this tab as selected
			tabPanels[tabPanelID].classList.remove("hidden");
			tabBtns[i].removeAttribute("tabindex");
			tabBtns[i].setAttribute("aria-selected", "true");  // Set aria-selected to true for the active tab
			tabBtns[i].parentNode.classList.add("selectedTab");
		} else {
			// Hide other tab panels and set aria-selected to false for non-active tabs
			tabPanels[tabBtns[i].id.replace("Btn", "Panel")].classList.add("hidden");
			tabBtns[i].setAttribute("tabindex", "-1");
			tabBtns[i].setAttribute("aria-selected", "false");  // Set aria-selected to false for non-active tabs
			tabBtns[i].parentNode.classList.remove("selectedTab");
		}
	}
}


