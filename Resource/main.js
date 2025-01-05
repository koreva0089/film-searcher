const url = 'http://omdbapi.com';
const btn = document.getElementById('btnSearch');
const textTitle = document.getElementById('title');
const cmbbxType = document.getElementById('type');
const searchRes = document.getElementById('searchResult');

let data;

async function RunDBMovies(url) {
    let response = await fetch(url);
    data = await response.json();

    console.log(data);

    searchRes.innerHTML = '';
    if (data != null && data.Title != null) {
        searchRes.innerHTML =
            `
            <div id="searchResultIn">
                <img src="${data.Poster}">
                <div>
                    <div>${data.Type}</div>
                    <h3>${data.Title}</h3>
                    <div style="font-size: 19px;">${data.Year}</div>
                    <button onclick="openNewWindow()">Details</button>
                </div>
            </div>
            `;
        return;
    }
    searchRes.innerHTML = '<div class="error-text">Film not found!</div>'
}

btn.addEventListener('click', () => {
    const title = textTitle.value;
    if (title === '') {
        alert("Title is empty");
        return;
    }
    const type = cmbbxType.value;

    let tempUrl = url.concat(`/?t=${title}&type=${type}&apikey=baaade44`);
    RunDBMovies(tempUrl);
});

function openNewWindow() {
    const environment = document.getElementById('Details');
    environment.classList.add('details');
    environment.innerHTML =
        `
        <button class="btn-close-details" onclick="closeNewWindow()">
            Close
        </button>
        <h3>Film info:</h3>
        <form>
            <img src="${data.Poster}">
            <table>
                <tr>
                    <th>Title:</th>
                    <td>${data.Title}</td>
                </tr>
                <tr>
                    <th>Released:</th>
                    <td>${data.Released}</td>
                </tr>
                <tr>
                    <th>Genre:</th>
                    <td>${data.Genre}</td>
                </tr>
                <tr>
                    <th>Country</th>
                    <td>${data.Country}</td>
                </tr>
                <tr>
                    <th>Director:</th>
                    <td>${data.Director}</td>
                </tr>
                <tr>
                    <th>Writer:</th>
                    <td>${data.Writer}</td>
                </tr>
                <tr>
                    <th>Actors:</th>
                    <td>${data.Actors}</td>
                </tr>
                <tr>
                    <th>Awards:</th>
                    <td>${data.Awards}</td>
                </tr>
            </table>
        </form>
        `;
}

function closeNewWindow() {
    const environment = document.getElementById('Details');
    environment.classList.remove('details');
    environment.innerHTML = '';
}