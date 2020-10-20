const BASE_URL = "https://api.football-data.org/v2/";
const API_KEY = "8d85044d5df345588c51817b8e05bb12";
const ID_LIGA = 2021;

const apiStandings = () => {
    return fetch(`${BASE_URL}competitions/${ID_LIGA}/standings`, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};

const apiTeam = (ID_TEAM) => {
    return fetch(`${BASE_URL}teams/${ID_TEAM}`, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};

const jadwalTeam = (ID_TEAM) => {
    return fetch(`${BASE_URL}teams/${ID_TEAM}/matches?status=SCHEDULED`, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};

const Team = () => {
    return fetch(`${BASE_URL}teams/${ID_TEAM}`, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};

function getKlasemen() {
    if ("caches" in window) {
        caches.match(`${BASE_URL}competitions/${ID_LIGA}/standings`).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    totalStanding(data);
                })
            }
        })
    }
    apiStandings()
        .then(data => {
            totalStanding(data);
        })
}
function getHomeJadwal() {
    if ("caches" in window) {
        caches.match(`${BASE_URL}teams/66`).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    profileTeam(data);
                })
            }
        })
    }
    if ("caches" in window) {
        caches.match(`${BASE_URL}teams/66/matches?status=SCHEDULED`).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    jadwal(data);
                })
            }
        })
    }
    apiTeam(66)
        .then(data => {
            profileTeam(data);
        })

    jadwalTeam(66)
        .then(data => {
            jadwal(data);
        })
}
function getdetailTeam(URLParam) {
    if(!navigator.onLine){
        const status=document.getElementById('status-offline')
        status.innerHTML = 'Offline'
    }
    if ("caches" in window) {
        caches.match(`${BASE_URL}teams/${URLParam}`).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    detailTeam(data);
                })
            }
        })
    }

    apiTeam(URLParam)
        .then(data => {
            detailTeam(data);
        })
}

function totalStanding(data) {
    let totalStandings = '';
    document.getElementById("loader").remove();
    let standingsEl = document.getElementById("klasemen-sementara");

    data.standings[0].table.forEach(function (standing) {
        totalStandings += `
                <tr>
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                </tr>
        `;
    });

    standingsEl.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
                <div style="color:black;">Last Updated : ${data.competition.lastUpdated}</div>
                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Team Name</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${totalStandings}
                    </tbody>
                </table>
                
                </div>
    `;
}

function profileTeam(data) {
    document.getElementById("loader2").remove();
    document.getElementById("image-logo").src = data.crestUrl;
    document.getElementById("name-team").innerHTML = data.name;
    document.getElementById("short-name").innerHTML = `Nama Pendek : ${data.shortName}`;
    document.getElementById("from").innerHTML = `Klub : ${data.area.name}`;
    document.getElementById("venue").innerHTML = `Venue : ${data.venue}`;
    document.getElementById("url-team").href = data.website;
    document.getElementById("url-team").innerHTML = data.website;
    document.getElementById("address").innerHTML = data.address;
}

function jadwal(data) {
    let jadwals = '';
    let jadwalEl = document.getElementById("jadwal-pertandingan");
    document.getElementById("loader").remove();

    data.matches.forEach(function (jadwal) {
        jadwals += `
		<div class="col s12 m12">
			<div class="card">
		  		<div class="card-content">
					<span class="card-title" style="font-size:14px">${jadwal.utcDate}</span>
					<div class="row">
						<div class="col s4 m4">
							<a href="#detailteam?id=${jadwal.homeTeam.id}" id="detail" style="white-space:break-spaces;font-size:14px;font-weight:600;text-align: center;margin-top: 10px;color:${jadwal.homeTeam.id == 66 ? '#c70101' : 'black'}">${jadwal.homeTeam.name}</a>
						</div>
						<div class="col s4 m4">
							<div style="text-align: center;font-weight: 800;margin-top: 30px;"> VS </div>
						</div>
						<div class="col s4 m4">
							<a href="#detailteam?id=${jadwal.awayTeam.id}" id="detail" style="white-space:break-spaces;font-size:14px;font-weight:600;text-align: center;margin-top: 10px;color:${jadwal.awayTeam.id == 66 ? '#c70101' : 'black'}">${jadwal.awayTeam.name}</a>
						</div>
					</div>
				</div>
			</div>
		</div>`
    });
    jadwalEl.innerHTML = jadwals;

    document.querySelectorAll('#detail')
        .forEach(function (elm) {
            elm.addEventListener('click', function (event) {
                let targetPage = event.target.getAttribute('href').substr(1);
                page = targetPage.split('?')[0];
                let parampage = targetPage.split('=')[1];
                loadPage(page, parampage);
            });
        });
}

function detailTeam(data) {
    document.getElementById("loader").remove();

    document.getElementById("team-img").src = data.crestUrl;
    document.getElementById("name-team").innerHTML = data.name;
    document.getElementById("short-name").innerHTML = `Nama Pendek : ${data.shortName}`;
    document.getElementById("from").innerHTML = `Klub : ${data.area.name}`;
    document.getElementById("venue").innerHTML = `Venue : ${data.venue}`;
    document.getElementById("official-website").href = data.website;
    document.getElementById("official-website").innerHTML = data.website;

    const save = document.getElementById("save");
    save.onclick = function () {
        console.log("Tombol FAB di klik.");
        saveTeamFav(data);
    }
}