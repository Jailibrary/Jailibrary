$('#jailbreaks-table').sheetrock({
  url: 'https://docs.google.com/spreadsheets/d/1AdPHy5Fy6S6NOGtSrqIQrVsCuHle1u2fjRuSiROtsyY/edit#gid=215367419',
  callback: function() {
    $('#info-loading-indicator').addClass('d-none')
  }
});

$('#devices-table').sheetrock({
  url: 'https://docs.google.com/spreadsheets/d/1AdPHy5Fy6S6NOGtSrqIQrVsCuHle1u2fjRuSiROtsyY/edit#gid=0'
});

$('#ios-versions-table').sheetrock({
  url: 'https://docs.google.com/spreadsheets/d/1AdPHy5Fy6S6NOGtSrqIQrVsCuHle1u2fjRuSiROtsyY/edit#gid=1792617700'
});

$('#ios-features-table').sheetrock({
  url: 'https://docs.google.com/spreadsheets/d/1AdPHy5Fy6S6NOGtSrqIQrVsCuHle1u2fjRuSiROtsyY/edit#gid=1344288954'
});
