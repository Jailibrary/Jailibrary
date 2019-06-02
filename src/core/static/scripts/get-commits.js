setTimeout(function () {
  $.ajax({
    cache: false,
    headers: {
      'User-Agent': 'Jailibrary'
    },
    url: 'https://api.github.com/repos/jailibrary/jailibrary.github.io/commits',
    success: function (commits) {
      $('#commit-count').html('(' + commits.length + ')')
      $('#commit-count').removeClass('d-none')
      $('#commits-loading-indicator').hide()

      for (let i = 0; i < commits.length; i++) {
        var posted = new Date(commits[i].commit.author.date);
        var today = new Date();
        var postedFormat = Math.floor((today - posted) / 1000 / 60 / 60 / 24) + " days ago";

        var commit = `<a href="` + commits[i].html_url + `" style="text-decoration: none;"><li class="list-group-item a-list-item">` + commits[i].commit.message + ` <span class="float-right text-muted">` + postedFormat + `</span></li></a>`;
        $('#latest-commits').append(commit)
      }
    },
    error: function () {
      $('#commits-loading-indicator').hide()
      $('#commits-callback').html('<code>Commits Error</code>: <br> Github API is receiving too many requests from your IP address. Check back later.')
    }
  });
}, 500);
