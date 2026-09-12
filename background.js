async function updateBlockedCount() {
  const rules = await chrome.declarativeNetRequest.getMatchedRules();
  const count = rules.rulesMatchedInfo?.length || 0;
  const stored = await chrome.storage.local.get([
    "lastMatchedCount",
    "totalBlocked",
    "blockedToday",
  ]);
  const newMatches = Math.max(0, count - (stored.lastMatchedCount || 0));
  if (newMatches > 0) {
    chrome.storage.local.set({
      lastMatchedCount: count,
      totalBlocked: (stored.totalBlocked || 0) + newMatches,
      blockedToday: (stored.blockedToday || 0) + newMatches,
    });
  }
}

setInterval(updateBlockedCount, 3000);
chrome.declarativeNetRequest.updateEnabledRulesets({
  enableRulesetIds: ["easylist_ads", "easylist_trackers", "easylist_popups"],
  disableRulesetIds: [],
});
