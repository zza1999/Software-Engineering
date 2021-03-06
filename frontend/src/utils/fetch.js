const url = "http://www.huiyuan9.xyz/api";

//const url = "http://tylerdurden.natapp1.cc";
const init = {
    method: 'POST',
    mode: 'cors',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
};

export async function fetchTool(route, form) {
    let body = ""
    for (let i in form) {
        if (body !== "") {
            body += '&'
        }
        body += `${i}=${form[i]}`;
    }
    if (body !== "") init['body'] = body;
    console.log(init)
    const res = await fetch(url + route, init);

    if (res.status === 200) {
        return await res.json();
    } else {
        return { code: 500 };
    }
}