async function logout() {
    try {
        const response = await getAPIResponse("/api/public/auth/", 'get', null);

        const json = await response.json();
        if (response?.ok) {
            window.location.replace("index.html");
        } else {
            let htmlString = "<blockquote>";

            json.messages.map((element) => {
                htmlString += element + "<br />";
            })

            htmlString += "</blockquote>"

            document.getElementById('result').innerHTML = htmlString;
        }
    } catch (err) {
        console.log(err);
        document.getElementById('result').innerHTML = '<blockquote>Problem logging out. Please try again later!</blockquote>';
    }
}

function getHeader(role, pageName) {
    let htmlString = "";
    if (role == "Admin") {
        if (pageName == "Create Course")
            htmlString += "<li><a href='create-course.html' class='active'>Create Course</a></li>";
        else
            htmlString += "<li><a href='create-course.html'>Create Course</a></li>";

        if (pageName == "User List")
            htmlString += "<li><a href='list-users.html' class='active'>User List</a></li>";
        else
            htmlString += "<li><a href='list-users.html'>User List</a></li>";

        if (pageName == "Course List")
            htmlString += "<li><a href='list-courses.html' class='active'>Course List</a></li>";
        else
            htmlString += "<li><a href='list-courses.html'>Course List</a></li>";
    }

    if (pageName == "My Courses")
        htmlString += "<li><a href='view-course-details.html' class='active'>My Courses</a></li>";
    else
        htmlString += "<li><a href='view-course-details.html'>My Courses</a></li>";

    if (pageName == "Profile")
        htmlString += "<li><a href='view-users-details.html' class='active'>Profile</a></li>";
    else
        htmlString += "<li><a href='view-users-details.html'>Profile</a></li>";

    htmlString += "<li><a href='index.html' onclick='logout()'>Log Out</a></li>";
    return htmlString;
}

function getErrorResponse(json) {
    let htmlString = "<blockquote>";
    json.messages.map((element) => {
        htmlString += element + "<br />";
    })
    htmlString += "</blockquote>"
    return htmlString;
}

async function getAPIResponse(url, method, data) {
    const payload = {
        "method": method,
        "headers": {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    if (data != null)
        payload.body = JSON.stringify(data);
    const response = await fetch('https://onboarder.com:5001' + url, payload);
    const json = await response.json();
    if (response?.ok) {
        json.ok = response.ok;
    }

    return json;
}

function passwordToggle() {
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');
    // Toggle the type attribute 
    const type = password.getAttribute(
        'type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    // Toggle the eye slash icon 
    if (togglePassword.src.match("./images/eyeslash.png")) {
        togglePassword.src = "./images/eye.png";
    } else {
        togglePassword.src = "./images/eyeslash.png";
    }
}