window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    $('#back-to-top-btn').fadeIn()
  } else {
    $('#back-to-top-btn').fadeOut()
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

$('#back-to-top-btn').on('click', function () {
  topFunction();
});

setTimeout(function() {
  $.getJSON('https://jlippold.github.io/tweakCompatible/tweaks.json').then(function(data) {
    $('#library-loading-indicator').hide()
    $('#pkg-count').html(data.packages.length)

    // Get URL Params and set value

    function getUrlVars() {
      var vars = {};
      var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
      });
      $('#searchTweaks').val(vars.tweak)
      $('#searchSystem').val(vars.system)
      $('#searchDevelopment').val(vars.development)
      $('#searchAddons').val(vars.addon)
      $('#searchUtilities').val(vars.utility)
      $('#searchNetworking').val(vars.networking)
    }

    getUrlVars()

    // Collapse lists

    $('#col-tweaks').click(function () {
      $('#tweaks-list').toggle()
      $('#un-col-tweaks').show()
    });
    $('#un-col-tweaks').click(function () {
      $('#tweaks-list').toggle()
      $('#un-col-tweaks').hide()
    });

    $('#col-utilities').click(function () {
      $('#un-col-utilities').show()
      $('#utilities-list').toggle()
    });
    $('#un-col-utilities').click(function () {
      $('#utilities-list').toggle()
      $('#un-col-utilities').hide()
    });

    $('#col-networking').click(function () {
      $('#un-col-networking').show()
      $('#networking-list').toggle()
    });
    $('#un-col-networking').click(function () {
      $('#networking-list').toggle()
      $('#un-col-networking').hide()
    });

    $('#col-development').click(function () {
      $('#un-col-development').show()
      $('#development-list').toggle()
    });
    $('#un-col-development').click(function () {
      $('#development-list').toggle()
      $('#un-col-development').hide()
    });

    $('#col-addons').click(function () {
      $('#un-col-addons').show()
      $('#addons-list').toggle()
    });
    $('#un-col-addons').click(function () {
      $('#addons-list').toggle()
      $('#un-col-addons').hide()
    });

    $('#col-system').click(function () {
      $('#un-col-system').show()
      $('#system-list').toggle()
    });
    $('#un-col-system').click(function () {
      $('#system-list').toggle()
      $('#un-col-system').hide()
    });


    // Tweaks

    $('#packageInfo').on('show.bs.modal', function(event) {
      var a = $(event.relatedTarget)
      var name = a.data('id')
      var author = a.data('author')
      var repo = a.data('repo')
      var description = a.data('desc')
      var version = a.data('version')
      var moreinfo = a.data('moreinfo')
      var status = a.data('status')
      var statusp = a.data('statusp')
      var modal = $(this)

      modal.find('.modal-title').html('<code>' + name + '</code>')
      modal.find('.modal-body #description').html('Description&nbsp;&nbsp;<strong>' + description + '</strong>')
      modal.find('.modal-body #repository').html('Repo&nbsp;&nbsp<strong>' + repo + '</strong>')
      modal.find('.modal-body #version').html('Version&nbsp;&nbsp;<strong>' + version + '</strong>')
      modal.find('.modal-body #author').html('Author&nbsp;&nbsp;<strong>' + author + '</strong>')
      modal.find('.modal-body #status').html('iOS 12 Status&nbsp;&nbsp;<strong>' + status + ' (' + statusp + '%)</strong>')
      modal.find('.modal-body #moreinfo').html('<a href="' + moreinfo + '" class="btn btn-primary">More info</a>')
    })
    const searchTweaks = document.getElementById('searchTweaks');
    searchTweaks.addEventListener('keyup', function(e) {
      const term = e.target.value.toLowerCase();
      const items = $('#tweaks-list a');
      Array.from(items).forEach(function(item) {
        const title = item.name;
        if (title.toLowerCase().indexOf(term) != -1) {
          item.style.display = 'inline-block';
        } else {
          item.style.display = 'none';
        }
      })
    })

    var filterTweaks = data.packages.filter(package => package.category.includes('Tweaks'));
    var notWorking = data.packages.filter(package => package.versions[0].outcome.calculatedStatus === 'Not working');
    var working = data.packages.filter(package => package.versions[0].outcome.calculatedStatus === 'Working');
    for (let i = 0; i < filterTweaks.length; i++) {
      var template = `<a class="overflow-hidden" name="` + filterTweaks[i].name + `" style="cursor: pointer;" data-toggle="modal" data-target="#packageInfo" data-id="` + filterTweaks[i].id + `" data-author="` + filterTweaks[i].author + `" data-repo="` + filterTweaks[i].repository + `" data-desc="` + filterTweaks[i].shortDescription + `" data-version="` + filterTweaks[i].latest + `" data-moreinfo="` + filterTweaks[i].url + `" data-status="` + filterTweaks[i].versions[0].outcome.calculatedStatus + `" data-statusp="` + filterTweaks[i].versions[0].outcome.percentage + `"><li class="list-group-item a-list-item">` + filterTweaks[i].name + `</li></a>`;

      $('#tweaks-list').append(template)
    }
    $("#go-tweaks").on('click', function() {
      $('html,body').animate({
          scrollTop: $("#tweaks-list").offset().top
        },
        'slow');
    });
    $('#tweaks-count').html(filterTweaks.length)

    // System

    $('#packageInfo').on('show.bs.modal', function(event) {
      var a = $(event.relatedTarget)
      var name = a.data('id')
      var author = a.data('author')
      var repo = a.data('repo')
      var description = a.data('desc')
      var version = a.data('version')
      var moreinfo = a.data('moreinfo')
      var status = a.data('status')
      var statusp = a.data('statusp')
      var modal = $(this)

      modal.find('.modal-title').html('<code>' + name + '</code>')
      modal.find('.modal-body #description').html('Description&nbsp;&nbsp;<strong>' + description + '</strong>')
      modal.find('.modal-body #repository').html('Repo&nbsp;&nbsp<strong>' + repo + '</strong>')
      modal.find('.modal-body #version').html('Version&nbsp;&nbsp;<strong>' + version + '</strong>')
      modal.find('.modal-body #author').html('Author&nbsp;&nbsp;<strong>' + author + '</strong>')
      modal.find('.modal-body #status').html('iOS 12 Status&nbsp;&nbsp;<strong>' + status + ' (' + statusp + '%)</strong>')
      modal.find('.modal-body #moreinfo').html('<a href="' + moreinfo + '" class="btn btn-primary">More info</a>')
    })
    const searchSystem = document.getElementById('searchSystem');
    searchSystem.addEventListener('keyup', function(e) {
      const term = e.target.value.toLowerCase();
      const items = $('#system-list a');
      Array.from(items).forEach(function(item) {
        const title = item.name;
        if (title.toLowerCase().indexOf(term) != -1) {
          item.style.display = 'inline-block';
        } else {
          item.style.display = 'none';
        }
      })
    })

    var filterSystem = data.packages.filter(package => package.category.includes('System'));
    for (var i = 0; i < filterSystem.length; i++) {
      var template = `<a name="` + filterSystem[i].name + `" style="cursor: pointer;" data-toggle="modal" data-target="#packageInfo" data-id="` + filterSystem[i].id + `" data-author="` + filterSystem[i].author + `" data-repo="` + filterSystem[i].repository + `" data-desc="` + filterSystem[i].shortDescription + `" data-version="` + filterSystem[i].latest + `" data-moreinfo="` + filterSystem[i].url + `" data-status="` + filterSystem[i].versions[0].outcome.calculatedStatus + `" data-statusp="` + filterSystem[i].versions[0].outcome.percentage + `"><li class="list-group-item a-list-item">` + filterSystem[i].name + `</li></a>`;

      $('#system-list').append(template)
    }
    $("#go-system").click(function() {
      $('html,body').animate({
          scrollTop: $("#system-list").offset().top
        },
        'slow');
    });
    $('#system-count').html(filterSystem.length)


    // Development

    $('#packageInfo').on('show.bs.modal', function(event) {
      var a = $(event.relatedTarget)
      var name = a.data('id')
      var author = a.data('author')
      var repo = a.data('repo')
      var description = a.data('desc')
      var version = a.data('version')
      var moreinfo = a.data('moreinfo')
      var status = a.data('status')
      var statusp = a.data('statusp')
      var modal = $(this)

      modal.find('.modal-title').html('<code>' + name + '</code>')
      modal.find('.modal-body #description').html('Description&nbsp;&nbsp;<strong>' + description + '</strong>')
      modal.find('.modal-body #repository').html('Repo&nbsp;&nbsp<strong>' + repo + '</strong>')
      modal.find('.modal-body #version').html('Version&nbsp;&nbsp;<strong>' + version + '</strong>')
      modal.find('.modal-body #author').html('Author&nbsp;&nbsp;<strong>' + author + '</strong>')
      modal.find('.modal-body #status').html('iOS 12 Status&nbsp;&nbsp;<strong>' + status + ' (' + statusp + '%)</strong>')
      modal.find('.modal-body #moreinfo').html('<a href="' + moreinfo + '" class="btn btn-primary">More info</a>')
    })
    const searchDevelopment = document.getElementById('searchDevelopment');
    searchDevelopment.addEventListener('keyup', function(e) {
      const term = e.target.value.toLowerCase();
      const items = $('#development-list a');
      Array.from(items).forEach(function(item) {
        const title = item.name;
        if (title.toLowerCase().indexOf(term) != -1) {
          item.style.display = 'inline-block';
        } else {
          item.style.display = 'none';
        }
      })
    })

    var filterDevelopment = data.packages.filter(package => package.category.includes('Development'));
    for (var i = 0; i < filterDevelopment.length; i++) {
      var template = `<a name="` + filterDevelopment[i].name + `" style="cursor: pointer;" data-toggle="modal" data-target="#packageInfo" data-id="` + filterDevelopment[i].id + `" data-author="` + filterDevelopment[i].author + `" data-repo="` + filterDevelopment[i].repository + `" data-desc="` + filterDevelopment[i].shortDescription + `" data-version="` + filterDevelopment[i].latest + `" data-moreinfo="` + filterDevelopment[i].url + `" data-status="` + filterDevelopment[i].versions[0].outcome.calculatedStatus + `" data-statusp="` + filterDevelopment[i].versions[0].outcome.percentage + `"><li class="list-group-item a-list-item">` + filterDevelopment[i].name + `</li></a>`;
      $('#development-list').append(template)
    }
    $("#go-development").click(function() {
      $('html,body').animate({
          scrollTop: $("#development-list").offset().top
        },
        'slow');
    });
    $('#development-count').html(filterDevelopment.length)


    // Networking

    $('#packageInfo').on('show.bs.modal', function(event) {
      var a = $(event.relatedTarget)
      var name = a.data('id')
      var author = a.data('author')
      var repo = a.data('repo')
      var description = a.data('desc')
      var version = a.data('version')
      var moreinfo = a.data('moreinfo')
      var status = a.data('status')
      var statusp = a.data('statusp')
      var modal = $(this)

      modal.find('.modal-title').html('<code>' + name + '</code>')
      modal.find('.modal-body #description').html('Description&nbsp;&nbsp;<strong>' + description + '</strong>')
      modal.find('.modal-body #repository').html('Repo&nbsp;&nbsp<strong>' + repo + '</strong>')
      modal.find('.modal-body #version').html('Version&nbsp;&nbsp;<strong>' + version + '</strong>')
      modal.find('.modal-body #author').html('Author&nbsp;&nbsp;<strong>' + author + '</strong>')
      modal.find('.modal-body #status').html('iOS 12 Status&nbsp;&nbsp;<strong>' + status + ' (' + statusp + '%)</strong>')
      modal.find('.modal-body #moreinfo').html('<a href="' + moreinfo + '" class="btn btn-primary">More info</a>')
    })
    const searchNetworking = document.getElementById('searchNetworking');
    searchNetworking.addEventListener('keyup', function(e) {
      const term = e.target.value.toLowerCase();
      const items = $('#networking-list a');
      Array.from(items).forEach(function(item) {
        const title = item.name;
        if (title.toLowerCase().indexOf(term) != -1) {
          item.style.display = 'inline-block';
        } else {
          item.style.display = 'none';
        }
      })
    })

    var filterNetworking = data.packages.filter(package => package.category.includes('Networking'));
    for (var i = 0; i < filterNetworking.length; i++) {
      var template = `<a name="` + filterNetworking[i].name + `" style="cursor: pointer;" data-toggle="modal" data-target="#packageInfo" data-id="` + filterNetworking[i].id + `" data-author="` + filterNetworking[i].author + `" data-repo="` + filterNetworking[i].repository + `" data-desc="` + filterNetworking[i].shortDescription + `" data-version="` + filterNetworking[i].latest + `" data-moreinfo="` + filterNetworking[i].url + `" data-status="` + filterNetworking[i].versions[0].outcome.calculatedStatus + `" data-statusp="` + filterNetworking[i].versions[0].outcome.percentage + `"><li class="list-group-item a-list-item">` + filterNetworking[i].name + `</li></a>`;
      $('#networking-list').append(template)
    }
    $("#go-networking").click(function() {
      $('html,body').animate({
          scrollTop: $("#networking-list").offset().top
        },
        'slow');
    });
    $('#networking-count').html(filterNetworking.length)


    // Utilities

    $('#packageInfo').on('show.bs.modal', function(event) {
      var a = $(event.relatedTarget)
      var name = a.data('id')
      var author = a.data('author')
      var repo = a.data('repo')
      var description = a.data('desc')
      var version = a.data('version')
      var moreinfo = a.data('moreinfo')
      var status = a.data('status')
      var statusp = a.data('statusp')
      var modal = $(this)

      modal.find('.modal-title').html('<code>' + name + '</code>')
      modal.find('.modal-body #description').html('Description&nbsp;&nbsp;<strong>' + description + '</strong>')
      modal.find('.modal-body #repository').html('Repo&nbsp;&nbsp<strong>' + repo + '</strong>')
      modal.find('.modal-body #version').html('Version&nbsp;&nbsp;<strong>' + version + '</strong>')
      modal.find('.modal-body #author').html('Author&nbsp;&nbsp;<strong>' + author + '</strong>')
      modal.find('.modal-body #status').html('iOS 12 Status&nbsp;&nbsp;<strong>' + status + ' (' + statusp + '%)</strong>')
      modal.find('.modal-body #moreinfo').html('<a href="' + moreinfo + '" class="btn btn-primary">More info</a>')
    })
    const searchUtilities = document.getElementById('searchUtilities');
    searchUtilities.addEventListener('keyup', function(e) {
      const term = e.target.value.toLowerCase();
      const items = $('#utilities-list a');
      Array.from(items).forEach(function(item) {
        const title = item.name;
        if (title.toLowerCase().indexOf(term) != -1) {
          item.style.display = 'inline-block';
        } else {
          item.style.display = 'none';
        }
      })
    })

    var filterUtilities = data.packages.filter(package => package.category.includes('Utilities'));
    for (var i = 0; i < filterUtilities.length; i++) {
      var template = `<a name="` + filterUtilities[i].name + `" style="cursor: pointer;" data-toggle="modal" data-target="#packageInfo" data-id="` + filterUtilities[i].id + `" data-author="` + filterUtilities[i].author + `" data-repo="` + filterUtilities[i].repository + `" data-desc="` + filterUtilities[i].shortDescription + `" data-version="` + filterUtilities[i].latest + `" data-moreinfo="` + filterUtilities[i].url + `" data-status="` + filterUtilities[i].versions[0].outcome.calculatedStatus + `" data-statusp="` + filterUtilities[i].versions[0].outcome.percentage + `"><li class="list-group-item a-list-item">` + filterUtilities[i].name + `</li></a>`;
      $('#utilities-list').append(template)
    }
    $("#go-utilities").click(function() {
      $('html,body').animate({
          scrollTop: $("#utilities-list").offset().top
        },
        'slow');
    });
    $('#utilities-count').html(filterUtilities.length)


    // Addons

    $('#packageInfo').on('show.bs.modal', function(event) {
      var a = $(event.relatedTarget)
      var name = a.data('id')
      var author = a.data('author')
      var repo = a.data('repo')
      var description = a.data('desc')
      var version = a.data('version')
      var moreinfo = a.data('moreinfo')
      var status = a.data('status')
      var statusp = a.data('statusp')
      var modal = $(this)

      modal.find('.modal-title').html('<code>' + name + '</code>')
      modal.find('.modal-body #description').html('Description&nbsp;&nbsp;<strong>' + description + '</strong>')
      modal.find('.modal-body #repository').html('Repo&nbsp;&nbsp<strong>' + repo + '</strong>')
      modal.find('.modal-body #version').html('Version&nbsp;&nbsp;<strong>' + version + '</strong>')
      modal.find('.modal-body #author').html('Author&nbsp;&nbsp;<strong>' + author + '</strong>')
      modal.find('.modal-body #status').html('iOS 12 Status&nbsp;&nbsp;<strong>' + status + ' (' + statusp + '%)</strong>')
      modal.find('.modal-body #moreinfo').html('<a href="' + moreinfo + '" class="btn btn-primary">More info</a>')
    })
    const searchAddons = document.getElementById('searchAddons');
    searchAddons.addEventListener('keyup', function(e) {
      const term = e.target.value.toLowerCase();
      const items = $('#addons-list a');
      Array.from(items).forEach(function(item) {
        const title = item.name;
        if (title.toLowerCase().indexOf(term) != -1) {
          item.style.display = 'inline-block';
        } else {
          item.style.display = 'none';
        }
      })
    })

    var filterAddons = data.packages.filter(package => package.category.includes('Addons'));
    for (var i = 0; i < filterAddons.length; i++) {
      var template = `<a name="` + filterAddons[i].name + `" style="cursor: pointer;" data-toggle="modal" data-target="#packageInfo" data-id="` + filterAddons[i].id + `" data-author="` + filterAddons[i].author + `" data-repo="` + filterAddons[i].repository + `" data-desc="` + filterAddons[i].shortDescription + `" data-version="` + filterAddons[i].latest + `" data-moreinfo="` + filterAddons[i].url + `" data-status="` + filterAddons[i].versions[0].outcome.calculatedStatus + `" data-statusp="` + filterAddons[i].versions[0].outcome.percentage + `"><li class="list-group-item a-list-item">` + filterAddons[i].name + `</li></a>`;
      $('#addons-list').append(template)
    }
    $("#go-addons").click(function() {
      $('html,body').animate({
          scrollTop: $("#addons-list").offset().top
        },
        'slow');
    });
    $('#addons-count').html(filterAddons.length)


  });
}, 500);
