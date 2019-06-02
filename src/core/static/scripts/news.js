$(document).ready(function() {
  $('#news-sortby-week').trigger('click')
});

var isOnMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
if (isOnMobile) {
  $('.dropdown-menu').addClass('dropdown-menu-right');
}

$('#news-sortby-24hours').on('click', function() {
  $('#dropdownMenuButton').attr('disabled', true)
  $('#news-sortby-24hours').addClass('active')
  $('#news-sortby-week').removeClass('active')
  $('#news-sortby-month').removeClass('active')
  $('#news-sortby-year').removeClass('active')
  $('#news-list').html('')
  $('#news-list').hide()
  $('#news-loading-indicator').show()
  $.getJSON('https://www.reddit.com/r/jailbreak/search.json?q=flair_name%3A%22News%22&restrict_sr=1&sort=top&t=day').then(function(news) {
    $('#news-list').show()
    $('#dropdownMenuButton').attr('disabled', false)
    $('#news-loading-indicator').hide()
    if (news.data.dist === 0) {
      $('#news-error').show()
      $('#news-error').html('&times; No data to show').addClass('text-muted')
    } else {
      $('#news-error').hide()
    }

    $('#postInfo').on('show.bs.modal', function(event) {
      $('#comments').html('')
      $('#comments-loading-indicator').show()
      var a = $(event.relatedTarget)
      var title = a.data('title')
      var image = a.data('image')
      var author = a.data('author')
      var authorUrl = a.data('authorurl')
      var timePosted = a.data('time')
      var commentCount = a.data('commentcount')
      var link = a.data('perma')
      var modal = $(this)

      modal.find('#title').html(title)
      modal.find('#img-src').attr('src', image)
      modal.find('#comment-count').html(commentCount)
      modal.find('#author').html('<i class="fas fa-link"></i> <a href="'+link+'">Link</a> <br> <i class="far fa-user"></i> Posted by <a href="'+authorUrl+'">/u/'+author+'</a> <br> <i class="far fa-clock"></i> '+timePosted+'')

      $.ajax({
        cache: false,
        dataType: 'json',
        // Using 'cors-anywhere' domain because of the Access-Control-Allow-Origin policy
        url: 'https://cors-anywhere.herokuapp.com/' + link + '.json',
        headers: {

        },
        success: function (comments) {
          $('#comments').html('')
          $('#comments-loading-indicator').hide()
          for (let i=0; i < comments[1].data.children.length; i++) {
            var created = new Date(comments[1].data.children[i].data.created * 1000);
            var options = {
              weekday: 'long',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            };
            var md = window.markdownit();
            var template = `
            <div class="card">
              <div class="card-body">
                <p><span class="text-muted">`+comments[1].data.children[i].data.author+`</a> &bull; <i class="fas fa-arrow-up"></i> `+comments[1].data.children[i].data.ups+` &bull; `+created.toLocaleString('en-us', options)+`</span>
                `+md.render(comments[1].data.children[i].data.body)+`</p>
              </div>
            </div>
            <br>
            `;
            $('#comments').append(template)
          }
        }
      });

    });

    for (var i = 0; i < news.data.children.length; i++) {
      var newsTitle = news.data.children[i].data.title;
      var newTitle = newsTitle.replace('[News] ', '');
      var timePosted = new Date(news.data.children[i].data.created * 1000);
      var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      var stickiedStatus = news.data.children[i].data.stickied ? " <i style='color: #75D377;' class='fas fa-thumbtack'></i>&nbsp;" : "";
      var newsItemWeek = `
      <li class="media">
        <a style="cursor: pointer;" data-toggle="modal" data-target="#postInfo" data-title="`+news.data.children[i].data.title+`" data-image="`+news.data.children[i].data.thumbnail+`" data-author="`+news.data.children[i].data.author+`" data-authorurl="https://reddit.com/u/`+news.data.children[i].data.author+`" data-time="`+timePosted.toLocaleString('en-us', options)+`" data-commentcount="`+news.data.children[i].data.num_comments+`" data-perma="https://reddit.com` + news.data.children[i].data.permalink + `">
        <img class="mr-3 tempimg img-thumbnail" src="` + news.data.children[i].data.thumbnail + `" height="140" width=140>
        </a>
        <div class="media-body">
        <span class="float-left">`+stickiedStatus+`</span>
          <a style="cursor: pointer;" data-toggle="modal" data-target="#postInfo" data-title="`+news.data.children[i].data.title+`" data-image="`+news.data.children[i].data.thumbnail+`" data-author="`+news.data.children[i].data.author+`" data-authorurl="https://reddit.com/u/`+news.data.children[i].data.author+`" data-time="`+timePosted.toLocaleString('en-us', options)+`" data-commentcount="`+news.data.children[i].data.num_comments+`" data-perma="https://reddit.com` + news.data.children[i].data.permalink + `">
          <h5 class="mt-0 mb-1">` + newTitle + `</h5>
          </a>
          <p class="text-muted">Posted ` + timePosted.toLocaleString('en-us', options) + ` <a href="https://reddit.com/u/`+news.data.children[i].data.author+`"><span class="badge badge-secondary">/u/`+news.data.children[i].data.author+`</span></a><br><i class="fas fa-arrow-up"></i> ` + news.data.children[i].data.ups + `&nbsp;&nbsp;<i class="fas fa-comments"></i> ` + news.data.children[i].data.num_comments + `</p>
        </div>
      </li>
      <br>`;
      $('#news-list').append(newsItemWeek)
      $('.tempimg').on("error", function() {
        $(this).attr('src', '../static/images/main/reddit.png');
      });
    }
  })
});

$('#news-sortby-week').on('click', function() {
  $('#dropdownMenuButton').attr('disabled', true)
  $('#news-sortby-24hours').removeClass('active')
  $('#news-sortby-week').addClass('active')
  $('#news-sortby-month').removeClass('active')
  $('#news-sortby-year').removeClass('active')
  $('#news-list').html('')
  $('#news-list').hide()
  $('#news-loading-indicator').show()
  $.getJSON('https://www.reddit.com/r/jailbreak/search.json?q=flair_name%3A%22News%22&restrict_sr=1&sort=top&t=week').then(function(news) {
    $('#news-error').hide()
    $('#news-list').show()
    $('#dropdownMenuButton').attr('disabled', false)
    $('#news-loading-indicator').hide()

    $('#postInfo').on('show.bs.modal', function(event) {
      $('#comments').html('')
      $('#comments-loading-indicator').show()
      var a = $(event.relatedTarget)
      var title = a.data('title')
      var image = a.data('image')
      var author = a.data('author')
      var authorUrl = a.data('authorurl')
      var timePosted = a.data('time')
      var commentCount = a.data('commentcount')
      var link = a.data('perma')
      var modal = $(this)

      modal.find('#title').html(title)
      modal.find('#img-src').attr('src', image)
      modal.find('#comment-count').html(commentCount)
      modal.find('#author').html('<i class="fas fa-link"></i> <a href="'+link+'">Link</a> <br> <i class="far fa-user"></i> Posted by <a href="'+authorUrl+'">/u/'+author+'</a> <br> <i class="far fa-clock"></i> '+timePosted+'')

      $.ajax({
        cache: false,
        dataType: 'json',
        // Using 'cors-anywhere' domain because of the Access-Control-Allow-Origin policy
        url: 'https://cors-anywhere.herokuapp.com/' + link + '.json',
        headers: {

        },
        success: function (comments) {
          $('#comments').html('')
          $('#comments-loading-indicator').hide()
          for (let i=0; i < comments[1].data.children.length; i++) {
            var created = new Date(comments[1].data.children[i].data.created * 1000);
            var options = {
              weekday: 'long',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            };
            var md = window.markdownit();
            var template = `
            <div class="card">
              <div class="card-body">
                <p><span class="text-muted">`+comments[1].data.children[i].data.author+`</a> &bull; <i class="fas fa-arrow-up"></i> `+comments[1].data.children[i].data.ups+` &bull; `+created.toLocaleString('en-us', options)+`</span>
                `+md.render(comments[1].data.children[i].data.body)+`</p>
              </div>
            </div>
            <br>
            `;
            $('#comments').append(template)
          }
        }
      });

    });

    for (var i = 0; i < news.data.children.length; i++) {
      var newsTitle = news.data.children[i].data.title;
      var newTitle = newsTitle.replace('[News] ', '');
      var timePosted = new Date(news.data.children[i].data.created * 1000);
      var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      var stickiedStatus = news.data.children[i].data.stickied ? " <i style='color: #75D377;' class='fas fa-thumbtack'></i>&nbsp;" : "";
      var newsItemWeek = `
      <li class="media">
        <a style="cursor: pointer;" data-toggle="modal" data-target="#postInfo" data-title="`+news.data.children[i].data.title+`" data-image="`+news.data.children[i].data.thumbnail+`" data-author="`+news.data.children[i].data.author+`" data-authorurl="https://reddit.com/u/`+news.data.children[i].data.author+`" data-time="`+timePosted.toLocaleString('en-us', options)+`" data-commentcount="`+news.data.children[i].data.num_comments+`" data-perma="https://reddit.com` + news.data.children[i].data.permalink + `">
        <img class="mr-3 tempimg img-thumbnail" src="` + news.data.children[i].data.thumbnail + `" height="140" width=140>
        </a>
        <div class="media-body">
        <span class="float-left">`+stickiedStatus+`</span>
          <a style="cursor: pointer;" data-toggle="modal" data-target="#postInfo" data-title="`+news.data.children[i].data.title+`" data-image="`+news.data.children[i].data.thumbnail+`" data-author="`+news.data.children[i].data.author+`" data-authorurl="https://reddit.com/u/`+news.data.children[i].data.author+`" data-time="`+timePosted.toLocaleString('en-us', options)+`" data-commentcount="`+news.data.children[i].data.num_comments+`" data-perma="https://reddit.com` + news.data.children[i].data.permalink + `">
          <h5 class="mt-0 mb-1">` + newTitle + `</h5>
          </a>
          <p class="text-muted">Posted ` + timePosted.toLocaleString('en-us', options) + ` <a href="https://reddit.com/u/`+news.data.children[i].data.author+`"><span class="badge badge-secondary">/u/`+news.data.children[i].data.author+`</span></a><br><i class="fas fa-arrow-up"></i> ` + news.data.children[i].data.ups + `&nbsp;&nbsp;<i class="fas fa-comments"></i> ` + news.data.children[i].data.num_comments + `</p>
        </div>
      </li>
      <br>`;
      $('#news-list').append(newsItemWeek)
      $('.tempimg').on("error", function() {
        $(this).attr('src', '../static/images/main/reddit.png');
      });
    }
  })
});

$('#news-sortby-month').on('click', function() {
  $('#dropdownMenuButton').attr('disabled', true)
  $('#news-sortby-24hours').removeClass('active')
  $('#news-sortby-week').removeClass('active')
  $('#news-sortby-month').addClass('active')
  $('#news-sortby-year').removeClass('active')
  $('#news-list').html('')
  $('#news-list').hide()
  $('#news-loading-indicator').show()
  $.getJSON('https://www.reddit.com/r/jailbreak/search.json?q=flair_name%3A%22News%22&restrict_sr=1&sort=top&t=month').then(function(news) {
    $('#news-error').hide()
    $('#news-list').show()
    $('#dropdownMenuButton').attr('disabled', false)
    $('#news-loading-indicator').hide()

    $('#postInfo').on('show.bs.modal', function(event) {
      $('#comments').html('')
      $('#comments-loading-indicator').show()
      var a = $(event.relatedTarget)
      var title = a.data('title')
      var image = a.data('image')
      var author = a.data('author')
      var authorUrl = a.data('authorurl')
      var timePosted = a.data('time')
      var commentCount = a.data('commentcount')
      var link = a.data('perma')
      var modal = $(this)

      modal.find('#title').html(title)
      modal.find('#img-src').attr('src', image)
      modal.find('#comment-count').html(commentCount)
      modal.find('#author').html('<i class="fas fa-link"></i> <a href="'+link+'">Link</a> <br> <i class="far fa-user"></i> Posted by <a href="'+authorUrl+'">/u/'+author+'</a> <br> <i class="far fa-clock"></i> '+timePosted+'')

      $.ajax({
        cache: false,
        dataType: 'json',
        // Using 'cors-anywhere' domain because of the Access-Control-Allow-Origin policy
        url: 'https://cors-anywhere.herokuapp.com/' + link + '.json',
        headers: {

        },
        success: function (comments) {
          $('#comments').html('')
          $('#comments-loading-indicator').hide()
          for (let i=0; i < comments[1].data.children.length; i++) {
            var created = new Date(comments[1].data.children[i].data.created * 1000);
            var options = {
              weekday: 'long',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            };
            var md = window.markdownit();
            var template = `
            <div class="card">
              <div class="card-body">
                <p><span class="text-muted">`+comments[1].data.children[i].data.author+`</a> &bull; <i class="fas fa-arrow-up"></i> `+comments[1].data.children[i].data.ups+` &bull; `+created.toLocaleString('en-us', options)+`</span>
                `+md.render(comments[1].data.children[i].data.body)+`</p>
              </div>
            </div>
            <br>
            `;
            $('#comments').append(template)
          }
        }
      });

    });

    for (var i = 0; i < news.data.children.length; i++) {
      var newsTitle = news.data.children[i].data.title;
      var newTitle = newsTitle.replace('[News] ', '');
      var timePosted = new Date(news.data.children[i].data.created * 1000);
      var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      var stickiedStatus = news.data.children[i].data.stickied ? " <i style='color: #75D377;' class='fas fa-thumbtack'></i>&nbsp;" : "";
      var newsItemWeek = `
      <li class="media">
        <a style="cursor: pointer;" data-toggle="modal" data-target="#postInfo" data-title="`+news.data.children[i].data.title+`" data-image="`+news.data.children[i].data.thumbnail+`" data-author="`+news.data.children[i].data.author+`" data-authorurl="https://reddit.com/u/`+news.data.children[i].data.author+`" data-time="`+timePosted.toLocaleString('en-us', options)+`" data-commentcount="`+news.data.children[i].data.num_comments+`" data-perma="https://reddit.com` + news.data.children[i].data.permalink + `">
        <img class="mr-3 tempimg img-thumbnail" src="` + news.data.children[i].data.thumbnail + `" height="140" width=140>
        </a>
        <div class="media-body">
        <span class="float-left">`+stickiedStatus+`</span>
          <a style="cursor: pointer;" data-toggle="modal" data-target="#postInfo" data-title="`+news.data.children[i].data.title+`" data-image="`+news.data.children[i].data.thumbnail+`" data-author="`+news.data.children[i].data.author+`" data-authorurl="https://reddit.com/u/`+news.data.children[i].data.author+`" data-time="`+timePosted.toLocaleString('en-us', options)+`" data-commentcount="`+news.data.children[i].data.num_comments+`" data-perma="https://reddit.com` + news.data.children[i].data.permalink + `">
          <h5 class="mt-0 mb-1">` + newTitle + `</h5>
          </a>
          <p class="text-muted">Posted ` + timePosted.toLocaleString('en-us', options) + ` <a href="https://reddit.com/u/`+news.data.children[i].data.author+`"><span class="badge badge-secondary">/u/`+news.data.children[i].data.author+`</span></a><br><i class="fas fa-arrow-up"></i> ` + news.data.children[i].data.ups + `&nbsp;&nbsp;<i class="fas fa-comments"></i> ` + news.data.children[i].data.num_comments + `</p>
        </div>
      </li>
      <br>`;
      $('#news-list').append(newsItemWeek)
      $('.tempimg').on("error", function() {
        $(this).attr('src', '../static/images/main/reddit.png');
      });
    }
  })
});

$('#news-sortby-year').on('click', function() {
  $('#dropdownMenuButton').attr('disabled', true)
  $('#news-sortby-24hours').removeClass('active')
  $('#news-sortby-week').removeClass('active')
  $('#news-sortby-month').removeClass('active')
  $('#news-sortby-year').addClass('active')
  $('#news-list').html('')
  $('#news-list').hide()
  $('#news-loading-indicator').show()
  $.getJSON('https://www.reddit.com/r/jailbreak/search.json?q=flair_name%3A%22News%22&restrict_sr=1&sort=top&t=year&limit=50').then(function(news) {
    $('#news-error').hide()
    $('#news-list').show()
    $('#dropdownMenuButton').attr('disabled', false)
    $('#news-loading-indicator').hide()

    $('#postInfo').on('show.bs.modal', function(event) {
      $('#comments').html('')
      $('#comments-loading-indicator').show()
      var a = $(event.relatedTarget)
      var title = a.data('title')
      var image = a.data('image')
      var author = a.data('author')
      var authorUrl = a.data('authorurl')
      var timePosted = a.data('time')
      var commentCount = a.data('commentcount')
      var link = a.data('perma')
      var modal = $(this)

      modal.find('#title').html(title)
      modal.find('#img-src').attr('src', image)
      modal.find('#comment-count').html(commentCount)
      modal.find('#author').html('<i class="fas fa-link"></i> <a href="'+link+'">Link</a> <br> <i class="far fa-user"></i> Posted by <a href="'+authorUrl+'">/u/'+author+'</a> <br> <i class="far fa-clock"></i> '+timePosted+'')

      $.ajax({
        cache: false,
        dataType: 'json',
        // Using 'cors-anywhere' domain because of the Access-Control-Allow-Origin policy
        url: 'https://cors-anywhere.herokuapp.com/' + link + '.json',
        headers: {

        },
        success: function (comments) {
          $('#comments').html('')
          $('#comments-loading-indicator').hide()
          for (let i=0; i < comments[1].data.children.length; i++) {
            var created = new Date(comments[1].data.children[i].data.created * 1000);
            var options = {
              weekday: 'long',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            };
            var md = window.markdownit();
            var template = `
            <div class="card">
              <div class="card-body">
                <p><span class="text-muted">`+comments[1].data.children[i].data.author+`</a> &bull; <i class="fas fa-arrow-up"></i> `+comments[1].data.children[i].data.ups+` &bull; `+created.toLocaleString('en-us', options)+`</span>
                `+md.render(comments[1].data.children[i].data.body)+`</p>
              </div>
            </div>
            <br>
            `;
            $('#comments').append(template)
          }
        }
      });

    });

    for (var i = 0; i < news.data.children.length; i++) {
      var newsTitle = news.data.children[i].data.title;
      var newTitle = newsTitle.replace('[News] ', '');
      var timePosted = new Date(news.data.children[i].data.created * 1000);
      var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      var stickiedStatus = news.data.children[i].data.stickied ? " <i style='color: #75D377;' class='fas fa-thumbtack'></i>&nbsp;" : "";
      var oldStatus = news.data.children[i].data.archived ? " <span class='badge badge-danger'>Old</span>" : "";
      var newsItemWeek = `
      <li class="media">
        <a style="cursor: pointer;" data-toggle="modal" data-target="#postInfo" data-title="`+news.data.children[i].data.title+`" data-image="`+news.data.children[i].data.thumbnail+`" data-author="`+news.data.children[i].data.author+`" data-authorurl="https://reddit.com/u/`+news.data.children[i].data.author+`" data-time="`+timePosted.toLocaleString('en-us', options)+`" data-commentcount="`+news.data.children[i].data.num_comments+`" data-perma="https://reddit.com` + news.data.children[i].data.permalink + `">
        <img class="mr-3 tempimg img-thumbnail" src="` + news.data.children[i].data.thumbnail + `" height="140" width=140>
        </a>
        <div class="media-body">
        <span class="float-left">`+stickiedStatus+`</span>
          <a style="cursor: pointer;" data-toggle="modal" data-target="#postInfo" data-title="`+news.data.children[i].data.title+`" data-image="`+news.data.children[i].data.thumbnail+`" data-author="`+news.data.children[i].data.author+`" data-authorurl="https://reddit.com/u/`+news.data.children[i].data.author+`" data-time="`+timePosted.toLocaleString('en-us', options)+`" data-commentcount="`+news.data.children[i].data.num_comments+`" data-perma="https://reddit.com` + news.data.children[i].data.permalink + `">
          <h5 class="mt-0 mb-1">` + newTitle + `</h5>
          </a>
          <p class="text-muted">Posted ` + timePosted.toLocaleString('en-us', options) + ` <a href="https://reddit.com/u/`+news.data.children[i].data.author+`"><span class="badge badge-secondary">/u/`+news.data.children[i].data.author+`</span></a><br><i class="fas fa-arrow-up"></i> ` + news.data.children[i].data.ups + `&nbsp;&nbsp;<i class="fas fa-comments"></i> ` + news.data.children[i].data.num_comments + ` `+oldStatus+`</p>
        </div>
      </li>
      <br>`;
      $('#news-list').append(newsItemWeek)
      $('.tempimg').on("error", function() {
        $(this).attr('src', '../static/images/main/reddit.png');
      });
    }
  })
});
