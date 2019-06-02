$.getJSON('https://jlippold.github.io/tweakCompatible/json/repository-urls.json').then(function (repos) {
  $('#get-started').attr('disabled', false)
  $('#load-repo-list').hide()
  $('#repos-loading-indicator').addClass('d-none')
  $('#repo-count').show()
  $('#repo-count').html(repos.repositories.length)
  for (var i = 0; i < repos.repositories.length; i++) {
    var repoItem = '<a href="' + repos.repositories[i].url + '" style="text-decoration: none;" name="' + repos.repositories[i].name + '"><li class="list-group-item a-list-item text-white" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;" id="repo-click">' + repos.repositories[i].name + ' <span class="text-muted">(' + repos.repositories[i].url + ')</span></li></a>';
    $('#repo-list').append(repoItem)
  }

  // Search

  const searchRepos = document.getElementById('searchRepos');
  searchRepos.addEventListener('keyup', function (e) {
    const term = e.target.value.toLowerCase();
    const items = $('#repo-list a');
    Array.from(items).forEach(function (item) {
      const title = item.name;
      if (title.toLowerCase().indexOf(term) != -1) {
        item.style.display = 'inline-block';
      } else {
        item.style.display = 'none';
      }
    })
  })

  // Lazy load

  $("#repo-list li").slice(20).hide();

  var mincount = 20;
  var maxcount = 40;


  $(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - 400) {
      $("#repo-list li").slice(mincount, maxcount).fadeIn(1200);

      mincount = mincount + 20;
      maxcount = maxcount + 20;

    }
  });
});