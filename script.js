let inputBox = $("#inputBox");
let url = "https://saavn.glitch.me/";
let outputContainer = $('#songContainer');

inputBox.on("keypress", (e) => {
    if (e.which == 13) {
        songSearch(e);
        outputContainer.html('<img src="./loading.gif">');
        inputBox.prop('disabled', true);
    }
});

function songSearch(e) {
    let query = inputBox.val();
    query = query.replace(/\s/g, "+");
    let finURL = url + query;
    getData(finURL);
}

function getData(url) {
    axios
        .get(url)
        .then((resp) => manipulateData(resp.data))
        .catch((err) => console.log(err));
}

function manipulateData(data) {
    let output = '';
    data.map((song) => {
        let songName = song.songName;
        let singers = song.singers;
        let image = song.image;
        let url = song.url;
        let duration = song.duration;
        output += `<div class="card text-center bg-dark text-white border-0" style="width: 15rem;">
        <img src="${image}" style="width: 100%;">
        <div class="card-body">
            <h3 class="card-title text-center">
                ${songName}
            </h3>
            <div class="card-text">
                Singers: <span id="singer">${singers}</span>
                <br>
                Duration: <span id="duration">${duration}</span>
            </div>
            <br>
            <a href="${url}"><button class="btn btn-primary">Download</button></a>
        </div>
    </div>`;
    });
    outputContainer.html(output);
    inputBox.prop('disabled', false);
}
