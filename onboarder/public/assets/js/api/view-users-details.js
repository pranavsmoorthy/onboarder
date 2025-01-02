function formatDateString(dateString) {
    dateString = dateString.slice(0, dateString.indexOf("T"));
    const splitString = dateString.split("-");
    const formattedDateString = splitString[1] + "/" + splitString[2] + "/" + splitString[0];
    return formattedDateString;
}

async function getUser() {
    try {
        const json = await getAPIResponse("http://localhost:5001/api/protected/users", 'get', null);
        if (json?.ok) {
            document.getElementById('navOptions').innerHTML = getHeader(json.user.role, "Profile");

            let htmlString = "";

            htmlString += "<form action='javascript:updateUser()'>";
            htmlString += "<table>";
            htmlString += "   <tbody>";
            htmlString += "        <tr>";
            htmlString += "            <td><label for='username'>Username<span style='color: red;'>*</span>: </label></td>";
            htmlString += "            <td><input type='text' id='username' name='username' placeholder='Enter user name' value='" + json.user.username + "'><br></td>";
            htmlString += "        </tr>";
            htmlString += "        <tr>";
            htmlString += "            <td><label for='password'>Password<span style='color: red;'>*</span>: </label></td>";
            htmlString += "            <td><input type='password' id='password' name='password' placeholder='Enter password' value='" + json.user.password + "'><img onclick='passwordToggle()' width='3%' height='3%' style='display: inline; margin-left: -4.5%; vertical-align: middle' src='./images/eye.png' id='togglePassword'><br></td>";
            htmlString += "        </tr>";
            htmlString += "        <tr>";
            htmlString += "            <td><label for='email'>Email ID<span style='color: red;'>*</span>: </label></td>";
            htmlString += "            <td><input type='text' id='email' name='email' placeholder='Enter email id' value='" + json.user.email + "'><br></td>";
            htmlString += "        </tr>";
            htmlString += "    </tbody>";
            htmlString += "</table>";
            htmlString += "<input type='submit' value='Update' class='primary'>";
            htmlString += "                               ";
            htmlString += "<button style='background-color: red; color: white;' onclick=\"deleteUser()\">Delete Account</button>";
            htmlString += "</form>";

            document.getElementById('userInfoDiv').innerHTML = htmlString;
        } else {
            document.getElementById('result').innerHTML = getErrorResponse(json);
        }
    } catch (err) {
        console.log(err);
        document.getElementById('result').innerHTML = '<blockquote>Problem getting the users. Please try again later!</blockquote>';
    }
}

async function updateUser() {
    try {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const email = document.getElementById("email").value;

        const data = {
            "username": username,
            "password": password,
            "email": email
        };
        const json = await getAPIResponse("http://localhost:5001/api/protected/users", 'put', data);
        if (json?.ok) {
            document.getElementById('result').innerHTML = '<blockquote>User succesfully updated</blockquote>';
        } else {
            document.getElementById('result').innerHTML = getErrorResponse(json);
        }
    } catch (err) {
        console.log(err);
        document.getElementById('result').innerHTML = '<blockquote>Problem updating the users. Please try again later!</blockquote>';
    }
}

async function deleteUser() {
    try {
        const json = await getAPIResponse("http://localhost:5001/api/protected/users", 'delete', null);
        if (json?.ok) {
            alert("User successfully deleted");
            window.location.replace("index.html");
        } else {
            document.getElementById('result').innerHTML = getErrorResponse(json);
        }
    } catch (err) {
        console.log(err);
        document.getElementById('result').innerHTML = '<blockquote>Problem deleting the user. Please try again later!</blockquote>';
    }
}
