let chatToggler = document.getElementById("chatToggler");

chrome.storage.sync.get(["showChat"], ({ showChat }) => {
	if (showChat) chatToggler.checked = true;
});

chatToggler.addEventListener("change", async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: toggleChat,
	});
});

function toggleChat() {
	chrome.storage.sync.get(["showChat"], ({ showChat }) => {
		const wrapper = document.getElementById("chat-wrapper");
		const player = document.querySelector(".watch-video--player-view");

		if (!showChat) {
			wrapper.style.display = "block";
		} else {
			wrapper.style.display = "none";
		}
		player.classList.toggle("with-chat");

		chrome.storage.sync.set({ showChat: !showChat });
	});
}
