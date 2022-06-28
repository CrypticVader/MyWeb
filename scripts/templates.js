// Template for adding overflow and navBar

/*
 * IMPORTANT: When loading js to a page, make sure to load templates.js before default.js
 */

const navBarTemplate = `<img src="/assets/vader-grey.png" height="40px" width="40px" alt="logo"/>
<span style="font-size: 25px; vertical-align: 10px; padding-left: 10px" id="navBarTitle">
Hello
</span>

<button
id="overflowMenuToggleButton"
style="float: right; padding: 8px"
onclick="toggleOverflowMenu()"
>
<span
	style="transition: 0.2s; margin-top: 0em"
	id="overflowMenuToggleButtonText"
	class="material-icons-round md-24"
>
	menu
</span>
</button>

<a
id="navBarHomeButton"
class="link-button"
style="float: right; padding: 8px; margin-right: 7px"
href="/"
>
<span class="material-icons-round md-24" style="padding-right: 0.2em">
	home
</span>
Home
</a>

<a
id="navBarMoreButton"
class="link-button"
style="float: right; padding: 8px; margin-right: 7px"
href="/pages/learn2code.html"
>
<span
	class="material-icons-round md-24"
	style="margin-top: 0em; padding-right: 0.4em"
>
	dashboard
</span>
See More
</a>

<a
id="navBarProjectButton"
class="link-button disabled"
style="float: right; padding: 8px; margin-right: 7px"
href="https://github.com/CrypticVader/MyWeb"
>
<span
	class="material-icons-round md-24"
	style="margin-top: 0em; padding-right: 0.4em"
>
	build
</span>
My projects
</a>

<a
id="navBarSourceButton"
class="link-button"
style="float: right; padding: 8px; margin-right: 7px"
href="https://github.com/CrypticVader/MyWeb"
target="_blank"
rel="noopener noreferrer"
>
<span
	class="material-icons-round md-24"
	style="margin-top: 0em; padding-right: 0.4em"
>
	source
</span>
View Source
</a>

<button
id="playStateButton"
style="
	transition: 0.2s;
	float: right;
	vertical-align: middle;
	padding: 8px;
	margin-right: 7px;
"
onclick="togglePlayState(); spawnAlert();"
>
<span
	id="playStateIcon"
	style="transition: 0.2s"
	class="material-icons-round md-24"
>
	pause
</span>
</button>

<button
id="themeToggleButton"
style="
	transition: 0.2s;
	float: right;
	vertical-align: middle;
	padding: 8px;
	margin-right: 7px;
"
onclick="toggleTheme(); spawnAlert('Theme changed');"
>
<span
	id="themeToggleButtonIcon"
	style="transition: 0.2s"
	class="material-icons-round md-24"
>
	light_mode
</span>
</button>`;

const overflowMenutemplate = `<a id="overflowMenuHomeButton" class="overflowMenuButton" href="/">
<span
	class="material-icons-round md-18"
	style="transform: scale(1.1); font-size: 20px; padding-right: 0.4em"
>
	home
</span>
Home
</a>

<a
id="overflowMenuMoreButton"
class="overflowMenuButton"
href="/pages/learn2code.html"
>
<span
	class="material-icons-round md-18"
	style="transform: scale(1.1); font-size: 20px; padding-right: 0.4em"
>
	dashboard
</span>
See More
</a>

<a
id="overflowMenuSourceButton"
class="overflowMenuButton"
href="https://github.com/CrypticVader/MyWeb"
target="_blank"
rel="noopener noreferrer"
>
<span
	class="material-icons-round md-18"
	style="transform: scale(1.1); font-size: 20px; padding-right: 0.4em"
>
	source
</span>
View source
</a>

<a
id="overflowMenuProjectButton"
class="overflowMenuButton disabled"
href="/pages/projects"
>
<span
	class="material-icons-round md-18"
	style="transform: scale(1.1); font-size: 20px; padding-right: 0.4em"
>
	build
</span>
My projects
</a>`;

document.getElementById("overflowMenuId").innerHTML = overflowMenutemplate;
document.getElementById("navBar").innerHTML = navBarTemplate;
