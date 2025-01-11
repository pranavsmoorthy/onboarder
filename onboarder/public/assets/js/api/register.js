async function sendOTP() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    const data = {
        "username": username,
        "password": password,
        "email": email
    }

    try {
        const json = await getAPIResponse("/api/public/otp/", 'post', data);

        if (json?.ok) {
            document.getElementById('result').innerHTML = '<blockquote>Sending OTP...</blockquote>';

            sessionStorage.setItem("username", username);
            sessionStorage.setItem("password", password);
            sessionStorage.setItem("email", email);

            window.location.replace("verifyOTP.html")
        } else {
            document.getElementById('result').innerHTML = getErrorResponse(json);
        }
    } catch (error) {
        console.log(error);
        document.getElementById('result').innerHTML = '<blockquote>Problem creating the user. Please try again later!</blockquote>';
    }
}