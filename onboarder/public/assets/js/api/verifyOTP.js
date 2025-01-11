async function registerUser() {
    const otp = document.getElementById("otp").value;

    const data = {
        "username": sessionStorage.getItem("username"),
        "email": sessionStorage.getItem("email"),
        "password": sessionStorage.getItem("password"),
        "otp": otp,
        "role": "User"
    }

    try {
        const json = await getAPIResponse("/api/public/users", 'post', data);

        if (json?.ok) {
            document.getElementById('result').innerHTML = '<blockquote>User created succesfully</blockquote>';
            window.location.replace("login.html")
        } else {
            document.getElementById('result').innerHTML = getErrorResponse(json);
        }
    } catch (error) {
        console.log(error);
        document.getElementById('result').innerHTML = '<blockquote>Problem creating the user. Please try again later!</blockquote>';
    }
}