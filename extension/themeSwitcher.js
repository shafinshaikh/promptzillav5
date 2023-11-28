document.addEventListener('DOMContentLoaded', function () {
    var themeSwitch = document.getElementById('theme-switch');
    var themeLink = document.getElementById('theme-style');
    var logo = document.getElementById('logo');

    function switchTheme(e) {
        if (e.target.checked) {
            themeLink.setAttribute('href', 'dark.css');
            logo.src = 'logo_dark.png'; // Replace 'logo_dark.png' with the path to your dark logo
        }
        else {
            themeLink.setAttribute('href', 'light.css');
            logo.src = 'logo_light.png'; // Replace 'logo_light.png' with the path to your light logo
        }
    }

    themeSwitch.addEventListener('change', switchTheme, false);
}, false);
