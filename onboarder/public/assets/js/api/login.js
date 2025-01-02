async function checkIfLoggedIn() {
    if (document.cookie != "") {
        window.location.replace("view-users-details.html");
    }
}

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = {
        "email": email,
        "password": password
    };

    try {
        const json = await getAPIResponse("http://localhost:5001/api/public/auth/", 'post', data);
        if (!json?.ok) {
            let htmlString = "<blockquote>" + json.message + "</blockquote>";
            document.getElementById('result').innerHTML = htmlString;
        } else {
            window.location.replace("view-users-details.html");
        }
    } catch (error) {
        console.log(error);
        document.getElementById('result').innerHTML = '<blockquote>Problem loggin in. Please try again later!</blockquote>';
    }
}