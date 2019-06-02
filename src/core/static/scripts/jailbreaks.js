// Unc0ver

$.ajax({
  cache: false,
  headers: {
    'User-Agent': 'Jailibrary'
  },
  url: 'https://api.github.com/repos/pwn20wndstuff/undecimus/releases/latest',
  success: function (unc0ver) {
    $('#unc0ver-loading-indicator').hide()
    var posted = new Date(unc0ver.created_at);
    var today = new Date();
    var postedFormat = Math.floor((today - posted) / 1000 / 60 / 60 / 24) + " days ago"
    var template = `
    <div class="card">
      <div class="card-header">
        <img src="` + unc0ver.author.avatar_url + `" height="25" width="25" class="rounded align-bottom">&nbsp;Published by <a href="` + unc0ver.author.html_url + `" class="text-muted">` + unc0ver.author.login + `</a> ` + postedFormat + `
      </div>
      <div class="card-body">
        <h3 class="card-title">Unc0ver ` + unc0ver.name + `</h3>
        <p class="text-muted">Download links</p>
        <ul class="list-unstyled" id="download-links"></ul>
        <hr>
        <div class="btn-group">
          <button type="button" class="btn btn-primary dropdown-toggle bg-primary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Release history
          </button>
          <div class="dropdown-menu" id="unc0ver-release-history" style="background-color: #2C2F33">
  
          </div>
        </div>
  
      </div>
    </div>
    <br>
    `;
    $('#latest-releases').append(template)
    for (let i = 0; i < unc0ver.assets.length; i++) {
      var downloadItem = `
      <a href="` + unc0ver.assets[i].browser_download_url + `" class="btn btn-primary">` + unc0ver.assets[i].name + `</a>&nbsp;
      `;
      $('#download-links').append(downloadItem)
    }
    $.ajax({
      cache: false,
      headers: {
        'User-Agent': 'Jailibrary'
      },
      url: 'https://api.github.com/repos/pwn20wndstuff/undecimus/releases',
      success: function (unc0verReleases) {
        for (let i = 0; i < unc0verReleases.length; i++) {
          var releaseItem = `
          <a class="dropdown-item" href="` + unc0verReleases[i].assets[0].browser_download_url + `" style="background-color: #2C2F33">` + unc0verReleases[i].name + ` (` + Math.round((unc0verReleases[i].assets[0].size * 0.000001) * 10) / 10 + ` MB)</a>
          `;
          $('#unc0ver-release-history').append(releaseItem)
        }
      }
    });
  },
  error: function () {
    $('#unc0ver-loading-indicator').hide()
    $('#lr-callback').html('<code>Unc0ver Error</code>: <br> Github API is receiving too many requests from your IP address. Check back later.')
  }
});

// Chimera

$.getJSON('https://scrappet.herokuapp.com/api/scrape/links?url=https://chimera.sh').then(function (chimera) {
  $('#chimera-loading-indicator').hide()
  var template = `
  <div class="card">
    <div class="card-header">
      <img src="https://chimera.sh/img/icon.png" height="25" width="25" class="rounded align-bottom">&nbsp;Published by <a href="https://chimera.sh" class="text-muted">Chimera Team</a></a>
    </div>
    <div class="card-body">
      <h3 class="card-title">Chimera (Latest)</h3>
      <p class="text-muted">Download links</p>
      <ul class="list-unstyled">
        <a href="https://chimera.sh`+ chimera.links[0] + `" class="btn btn-primary">Download Latest</a>
      </ul>
      <hr>
      <div class="btn-group">
        <button type="button" class="btn btn-primary bg-primary" disabled>
          Release history
        </button>
      </div>
    </div>
  </div>
  <br>
  `;
  $('#latest-releases').append(template)
});