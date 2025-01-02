async function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    const data = {
        "username": username,
        "password": password,
        "email": email,
        "role": "User"
    };

    try {
        const json = await getAPIResponse("http://localhost:5001/api/public/users/", 'post', data);

        if (json?.ok) {
            document.getElementById('result').innerHTML = '<blockquote>User succesfully created</blockquote>';
        } else {
            document.getElementById('result').innerHTML = getErrorResponse(json);
        }
    } catch (error) {
        console.log(error);
        document.getElementById('result').innerHTML = '<blockquote>Problem creating the user. Please try again later!</blockquote>';
    }
}