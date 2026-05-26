function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

let langkah = 0;

async function mulai(){

    langkah = 0;

    let n = parseInt(document.getElementById("diskInput").value);

    let A = document.getElementById("A");
    let B = document.getElementById("B");
    let C = document.getElementById("C");

    A.innerHTML = '<div class="rod"></div><div class="base"></div>';
    B.innerHTML = '<div class="rod"></div><div class="base"></div>';
    C.innerHTML = '<div class="rod"></div><div class="base"></div>';

    let tower = {
        A: [],
        B: [],
        C: []
    };

    let warna = [
        "#ffb84d",
        "#66e0a3",
        "#4da6ff",
        "#b366ff",
        "#ff6699",
        "#66ffff"
    ];

    for(let i=n; i>=1; i--){

        let disk = document.createElement("div");

        disk.className = "disk";

        disk.style.width = (i*40) + "px";

        disk.style.background = warna[i % warna.length];

        disk.innerText = i;

        A.appendChild(disk);

        tower.A.push(disk);
    }

    async function move(n, asal, bantu, tujuan){

        if(n == 1){

            let disk = tower[asal].pop();

            tower[tujuan].push(disk);

            document.getElementById(tujuan).appendChild(disk);

            langkah++;

            document.getElementById("langkah").innerText =
            "Jumlah langkah : " + langkah;

            await sleep(2000);

        } else {

            await move(n-1, asal, tujuan, bantu);

            let disk = tower[asal].pop();

            tower[tujuan].push(disk);

            document.getElementById(tujuan).appendChild(disk);

            langkah++;

            document.getElementById("langkah").innerText =
            "Jumlah langkah : " + langkah;

            await sleep(2000);

            await move(n-1, bantu, asal, tujuan);
        }
    }

    await move(n,"A","C","B");
}

function resetGame(){
    location.reload();
}