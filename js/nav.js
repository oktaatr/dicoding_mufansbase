document.addEventListener('DOMContentLoaded', function () {

	// SIDEBAR NAVIGATION
	var elems = document.querySelectorAll('.sidenav');
	M.Sidenav.init(elems);
	loadNav();

	function loadNav() {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4) {
				if (this.status != 200) return;

				// Muat daftar tautan menu
				document.querySelectorAll(".topnav, .sidenav")
					.forEach(function (elm) {
						elm.innerHTML = xhttp.responseText;
					});

				// Daftarkan event listener untuk setiap tautan menu
				document.querySelectorAll('.sidenav a, .topnav a')
					.forEach(function (elm) {
						elm.addEventListener('click', function (event) {
							// Tutup sidenav
							var sidenav = document.querySelector('.sidenav');
							M.Sidenav.getInstance(sidenav).close();

							// Muat konten halaman yang dipanggil 
							page = event.target.getAttribute('href').substr(1);
							loadPage(page);
						});
					});
			}
		};
		xhttp.open("GET", 'nav.html', true);
		xhttp.send();
	}

	// Load page content
	let hashPage = window.location.hash.substr(1);
	let paramsPage = hashPage.slice(hashPage.indexOf('?') + 1);
	let page;
	let param;

	if (hashPage == '') {
		page = 'home';
		console.log(page);
	}
	else if (hashPage.indexOf('?') > 0) {
		param = paramsPage.split('=')[1];
		page = hashPage.split('?')[0];
		console.log(page);
	} else {
		page = hashPage;
		console.log(page);
	}

	loadPage(page, param);

});

function loadPage(page, paramURL = null) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4) {
			var content = document.querySelector(".body-content");
			if (this.status == 200) {
				content.innerHTML = xhttp.responseText;
				if (page == 'home' && paramURL == null) {
					getHomeJadwal()
				} else if (page == 'klasemensementara' && paramURL == null) {
					getKlasemen()
				} else if (page == 'teamfavorite' && paramURL == null) {
					allTeamFavorite()
				} else {
					getdetailTeam(paramURL);
				}
			} else if (this.status == 404) {
				content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
			} else {
				content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
			}
		}
	};
	xhttp.open("GET", 'pages/' + page + '.html', true);
	xhttp.send();
}