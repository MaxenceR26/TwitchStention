// client id : icdjbopusztf422x18donfnv7g19vc
// secret : i96m8zg59j8wswv42aj4g3te08zz3o

let clinetId = "icdjbopusztf422x18donfnv7g19vc";
let clinetSecret = "i96m8zg59j8wswv42aj4g3te08zz3o";

function getTwitchAuthorization() {
    let url = `https://id.twitch.tv/oauth2/token?client_id=${clinetId}&client_secret=${clinetSecret}&grant_type=client_credentials`;

    return fetch(url, {
    method: "POST",
    })
    .then((res) => res.json())
    .then((data) => {
        return data;
    });
}

async function getUser(username) {
    const endpoint = `https://api.twitch.tv/helix/users?login=${username}`;

    let authorizationObject = await getTwitchAuthorization();
    let { access_token, expires_in, token_type } = authorizationObject;

    //token_type first letter must be uppercase    
    token_type =
    token_type.substring(0, 1).toUpperCase() +
    token_type.substring(1, token_type.length);

    let authorization = `${token_type} ${access_token}`;

    let headers = {
    authorization,
    "Client-Id": clinetId,
    };

    fetch(endpoint, {
    headers,
    })
    .then((res) => res.json())
    .then((data) => renderUser(data));
}

function renderUser(data) {
    const stringified = JSON.stringify(data);
    const json_parsed = JSON.parse(stringified)
    getUserFollow(json_parsed.data[0].id)
    getStreams(json_parsed.data[0].id)
    
    document.getElementById("user").innerHTML = json_parsed.data[0].display_name;
    document.getElementById("desc-user").innerHTML = json_parsed.data[0].description;
    document.getElementById("img-user").src = json_parsed.data[0].profile_image_url;
}

function kFormatter(num) {
    if (Math.abs(num) > 999 && Math.abs(num) < 999999) {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
    } else if (Math.abs(num) > 999999) {
        return Math.abs(num) > 999999 ? Math.sign(num)*((Math.abs(num)/1000000).toFixed(1)) + 'M' : Math.sign(num)*Math.abs(num)
    } else if (Math.abs(num) < 999) {
        return num
    }
}

async function getUserFollow(id) {
    const endpoint = `https://api.twitch.tv/helix/users/follows?to_id=${id}`;

    let authorizationObject = await getTwitchAuthorization();
    let { access_token, expires_in, token_type } = authorizationObject;

    //token_type first letter must be uppercase    
    token_type =
    token_type.substring(0, 1).toUpperCase() +
    token_type.substring(1, token_type.length);

    let authorization = `${token_type} ${access_token}`;

    let headers = {
    authorization,
    "Client-Id": clinetId,
    };

    fetch(endpoint, {
    headers,
    })
    .then((res) => res.json())
    .then((data) => renderFollow(data));
}

function renderFollow(data) {
    const stringified = JSON.stringify(data);
    const json_parsed = JSON.parse(stringified)

    console.log(json_parsed)
    console.log(stringified)

    if (json_parsed.total > 1) {
        document.getElementById("follow-user").innerHTML = kFormatter(json_parsed.total) + " followers";
    } else {
        document.getElementById("follow-user").innerHTML = kFormatter(json_parsed.total) + " follower";
    }
    
    
}

async function getStreams(channel_id) {
    const endpoint = `https://api.twitch.tv/helix/streams?user_id=${channel_id}`;

    let authorizationObject = await getTwitchAuthorization();
    let { access_token, expires_in, token_type } = authorizationObject;

    //token_type first letter must be uppercase    
    token_type =
    token_type.substring(0, 1).toUpperCase() +
    token_type.substring(1, token_type.length);

    let authorization = `${token_type} ${access_token}`;

    let headers = {
    authorization,
    "Client-Id": clinetId,
    };

    fetch(endpoint, {
    headers,
    })
    .then((res) => res.json())
    .then((data) => renderStreams(data));
}

function renderStreams(data) {
    const stringified = JSON.stringify(data);
    const json_parsed = JSON.parse(stringified)

    console.log(stringified)


    if (json_parsed.data[0]) {
        document.getElementById("on-off").style.color = "#05AE01";
        document.getElementById("on-off").innerHTML = "Online";
    } else {
        document.getElementById("on-off").style.color = "red";
        document.getElementById("on-off").innerHTML = "Offline";
    }

    
}


const input = document.querySelector("input")
search_btn = document.querySelector("button");
search_btn.addEventListener("click", e => {
    e.preventDefault();
    getUser(input.value); 
});