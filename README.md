<p align="center">
  <a href="https://jailibrary.com">
    <img src="https://jailibrary.com/static/images/favicon/android-icon-72x72.png" alt="Jailibrary logo" width="72" height="72">
  </a>
</p>

<p align="center">
  Jailbreak news, updates, compatibility checks, package lists, developer resources, and more.
  <br>
  <a href="https://jailibrary.com"><strong>Go »</strong></a>
  <br>
  <br>
  <a href="https://github.com/Jailibrary/jailibrary.github.io/issues/new">Report bug</a>
  ·
  <a href="https://github.com/Jailibrary/jailibrary.github.io/issues/new">Request feature</a>
</p>

## About

Jailibrary is an iOS jailbreak package and news database built on the Flask Python micro-framework. We mainly use Flask for templating, resulting in faster development.

If you have any issues, create one [here](https://github.com/Jailibrary/Jailibrary/issues/new)! Any other questions/comments can be left on our [Twitter](https://twitter.com/jailibrary).


## Sources

Jailibrary uses several sources to provide information to its users. The current list will be updated as Jailibrary gets new features.

### Library
Special thanks to [tweakCompatible](https://github.com/jlippold/tweakCompatible) developer [jlippold](https://github.com/jlippold) for open-sourcing his JSON data of all known tweaks, repositories, and packages. We use it to display information about each package on the `Library` page.

### Latest Releases
We use the GitHub API to fetch the [Pwn20wnd's Unc0ver](https://github.com/pwn20wndstuff/Undecimus) jailbreak. For Chimera, We use our own web scraper to retrieve information from [chimera.sh](https://chimera.sh).

### News
We use the Reddit API to fetch all [r/jailbreak](https://reddit.com/r/jailbreak) posts under the tag `News`.

### Detailed Stats
We use the Google Sheets API with the [iDevice Matrix Spreadsheet](https://docs.google.com/spreadsheets/d/1AdPHy5Fy6S6NOGtSrqIQrVsCuHle1u2fjRuSiROtsyY/edit#gid=0) to provide lots of detailed information about jailbreaks, devices, releases, and more. Permission granted by [Stoppels](https://www.reddit.com/user/Stoppels).
