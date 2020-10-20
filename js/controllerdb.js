const idbPromised = idb.open('mydatabase', 1, upgradedDb => {
    if (!upgradedDb.objectStoreNames.contains('teams')) {
        upgradedDb.createObjectStore("teams", { keyPath: "idTeam" });
    }
});

const getAllTeamFav = () => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("teams", `readonly`);
            return transaction.objectStore("teams").getAll();
        }).then(data => {
            if (data !== undefined) {
                resolve(data)
            } else {
                reject(new Error("Favorite not Found"))
            }
        })
    })
};

const insertTeamFav = team => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("teams", `readwrite`);
            transaction.objectStore("teams").add(team);
            return transaction;
        }).then(transaction => {
            if (transaction.complete) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            }
        })
    })
};

const deleteTeamFav = idTeam => {
    console.log(`delete ${idTeam}`)
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("teams", `readwrite`);
            transaction.objectStore("teams").delete(idTeam);
            return transaction;
        }).then(transaction => {
            if (transaction.complete) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            }
        })
    })
};

document.addEventListener("DOMContentLoaded", function () {

});

function saveTeamFav(data) {
    console.log(data);
    const teamFav = {
        idTeam: data.id,
        namaTeam: data.name,
        namapendekTeam: data.shortName,
        ofcWeb: data.website,
        venueTeam: data.venue
    };

    insertTeamFav(teamFav).then(() => {
        document.getElementById("floatBtn").remove();
    })

}

function allTeamFavorite() {
    getAllTeamFav().then(teams => {
        let listTeams = "";
        teams.forEach(team => {
            listTeams += `
            <div class="col s12 m12">
                <div class="card">
                    <div class="card-content">
                        <div class="row">
                            <div class="col s12 m6" style="display: inline-block;">
                                <div class="">
                                    <div style="font-weight: 600;font-size: 36px">${team.namaTeam}</div>
                                    <div style="font-weight: 400;font-size: 18px">${team.namapendekTeam}</div>
                                    <div style="font-weight: 400;font-size: 18px"><a href="${team.ofcWeb}">${team.ofcWeb}</a></div>
                                    <div style="font-weight: 400;font-size: 18px">${team.venueTeam}</div>
                                </div>
                            </div>
                            <div class="col s12 m6" style="">
                                <div style="text-align:end">
                                    <button id="${team.idTeam}" class="btn-floating btn-large red deletedataidb">
                                        <i class="large material-icons">delete</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
		    </div>
            `;
        });
        if (teams.length == 0) {
            document.getElementById('rowTeams').innerHTML = '<h6 class="header center">Tidak ada data tersimpan</h6>';
        } else {
            document.querySelector("#rowTeams").innerHTML = listTeams;
        }

        let buttonDelete = document.querySelectorAll(".deletedataidb");
        for (let btn of buttonDelete) {
            btn.addEventListener("click", function (event) {
                let id_team = parseInt(btn.id);
                deleteTeamFav(id_team).then(() => {
                    allTeamFavorite();
                })
            })
        }
    })
}