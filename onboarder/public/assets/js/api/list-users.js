function deleteRow(rowid) {
    var row = document.getElementById(rowid);
    var table = row.parentNode;

    while (table && table.tagName != 'TABLE')
        table = table.parentNode;
    if (!table)
        return;
    table.deleteRow(row.rowIndex);
}

function formatDateString(dateString) {
    dateString = dateString.slice(0, dateString.indexOf("T"));
    const splitString = dateString.split("-");
    const formattedDateString = splitString[1] + "/" + splitString[2] + "/" + splitString[0];
    return formattedDateString;
}

async function listUsers() {
    try {
        const json = await getAPIResponse("/api/admin/users", 'get', null);
        if (json?.ok) {
            let htmlString = "<table id='userTable'><tbody>"

            htmlString += "<tr>";
            htmlString += "<td><label>Username</label></td>";
            htmlString += "<td><label>Email</label></td>";
            htmlString += "<td><label>Role</label></td>";
            htmlString += "<td><label>Last Updated</label></td>";
            htmlString += "<td><label> </label></td>";
            htmlString += "<td><label> </label></td>";
            htmlString += "</tr>";

            json.users.map((user) => {
                let info = [];
                info.push({ "key": "username", "value": user.username });
                info.push({ "key": "email", "value": user.email });
                info.push({ "key": "role", "value": user.role });
                info.push({ "key": "date_last_updated", "value": formatDateString(user.updatedAt) });

                htmlString += "<tr id='" + user._id + "'>";

                info.map((element) => {
                    htmlString += "<td><p id='" + (user._id + "_" + element.key) + "'>";
                    htmlString += element.value;
                    htmlString += "</p></td>";
                })

                htmlString += "<td><button class='button primary' onclick=\"getUser('" + user._id + "')\">View</button></td>";
                htmlString += "<td><button style='background-color: red; color: white;' onclick=\"deleteUser('" + user._id + "')\">Delete Account</button></td>";

                htmlString += "</tr>";
            })

            htmlString += "</tbody></table>"
            document.getElementById('userDiv').innerHTML = htmlString;
        } else {
            document.getElementById('result').innerHTML = getErrorResponse(json);
        }
    } catch (error) {
        document.getElementById('result').innerHTML = '<blockquote>Problem getting all users. Please try again later!</blockquote>';
    }
}

async function getUser(id) {
    try {
        const json = await getAPIResponse("/api/admin/users/" + id, 'get', null);
        if (json?.ok) {
            let htmlString = "";

            htmlString += "<h1 class='major'>" + json.user.username + "'s Account</h1>"
            htmlString += "<form action='javascript:updateUser(`" + json.user._id + "`)'>";
            htmlString += "<h2>Account Information</h2>"
            htmlString += "<table>";
            htmlString += "   <tbody>";
            htmlString += "        <tr>";
            htmlString += "            <td><label for='username'>Username<span style='color: red;'>*</span></label></td>";
            htmlString += "            <td><input type='text' id='username' name='username' placeholder='Enter user name' value='" + json.user.username + "'><br></td>";
            htmlString += "        </tr>";
            htmlString += "        <tr>";
            htmlString += "            <td><label for='password'>Password<span style='color: red;'>*</span></label></td>";
            htmlString += "            <td><input type='password' id='password' name='password' placeholder='Enter password' value='" + json.user.password + "'><img onclick='passwordToggle()' width='3%' height='3%' style='display: inline; margin-left: -4.5%; vertical-align: middle' src='./images/eye.png' id='togglePassword'><br></td>";
            htmlString += "        </tr>";
            htmlString += "        <tr>";
            htmlString += "            <td><label for='email'>Email ID<span style='color: red;'>*</span></label></td>";
            htmlString += "            <td><input type='text' id='email' name='email' placeholder='Enter email id' value='" + json.user.email + "'><br></td>";
            htmlString += "        </tr>";
            htmlString += "        <tr>";
            htmlString += "            <td><label>User Role<span style='color: red;'>*</span></label></td>";
            htmlString += "            <td>"
            htmlString += "                 <select name='roleSelection' id='roleSelection'>";
            htmlString += "                     <option id='User'>User</option>";
            htmlString += "                     <option id='Admin'>Admin</option>";
            htmlString += "                 </select>";
            htmlString += "            </td>";
            htmlString += "        </tr>";
            htmlString += "    </tbody>";
            htmlString += "</table>";
            htmlString += "<input type='submit' class='primary' value='Update'>";
            htmlString += "</form>";

            document.getElementById('userInfoDiv').innerHTML = htmlString;

            htmlString = "<h2 id='" + id + "_heading'>Courses Enrolled</h2>"
            htmlString += "<table id='enrollmentList'><tbody>";
            htmlString += "<tr>"
            htmlString += "<td><label>Course Name</label></td>"
            htmlString += "<td><label>Due Date</label></td>"
            htmlString += "<td><label>Progress</label></td>"
            htmlString += "<td><label> </label></td>"
            htmlString += "</tr>"

            json.courses.map((courseSelected) => {
                let info = { "key": "course_title", "value": courseSelected.course.title };

                htmlString += "<tr id='" + courseSelected.course._id + "'><td>";
                htmlString += "<p id='" + (courseSelected.course._id + "_" + info.key) + "'>";
                htmlString += info.value;
                htmlString += "</p>";
                htmlString += "<td><p>" + formatDateString(courseSelected.completionDate) + "</p></td>";
                htmlString += "<td><p>" + courseSelected.progress + "</p></td>";
                htmlString += "<td><button style='background-color: red; color: white;' onclick=\"unenrollUser('" + id + "','" + courseSelected.course._id + "')\">Unenroll</button></td>";
                htmlString += "</tr>";
            })
            htmlString += "</tbody></table><br>"

            htmlString += "<h2>Enroll User Into A Course</h2>"
            htmlString += "<form action='javascript:enrollUser(`" + id + "`)'><table><tbody>";
            htmlString += "<tr><td><label for='courses'>Course to enroll in:</label></td>";
            htmlString += "<td><select name='enrollmentSelection' id='enrollmentSelection'>";

            const courseJson = await getAPIResponse("/api/admin/courses", 'get', null);
            courseJson.courses.map((course) => {
                htmlString += "<option id='" + course._id + "_dropdown_option'>" + course.title + "</option>";
            })

            htmlString += "</td></select></tr><br>";
            htmlString += "<tr><td><label for='courses'>Due Date<span style='color: red;'>*</span>:</label></td>";
            htmlString += "<td><input type='date' id='dueDate' name='dueDate'></td></tr></tbody></table>"
            htmlString += "<input class='primary' type='submit' value='Enroll'>";
            htmlString += "</form>";

            document.getElementById('userEnrollmentInfoDiv').innerHTML = htmlString;
        } else {
            document.getElementById('result').innerHTML = getErrorResponse(json);
        }
    } catch (err) {
        console.log(err);
        document.getElementById('result').innerHTML = '<blockquote>Problem getting the users. Please try again later!</blockquote>';
    }
}

async function enrollUser(userId) {
    try {
        const dropdown = document.getElementById("enrollmentSelection");
        const selected = dropdown.options[dropdown.selectedIndex].id;
        const formattedId = selected.slice(0, selected.indexOf("_"));
        const dueDate = document.getElementById("dueDate").value;

        const data = {
            "userId": userId,
            "courseId": formattedId,
            "completionDate": dueDate,
            "progress": "Not Started"
        }

        const responseJSON = await getAPIResponse("/api/admin/enroll/", 'post', data);
        if (responseJSON.ok) {
            const json = await getAPIResponse("/api/admin/users/" + userId, 'get', null);

            const course = json.courses.find(element => element.course._id === formattedId);


            const table = document.getElementById('enrollmentList');
            const newRow = table.insertRow();

            let htmlString = "";
            let info = { "key": "course_title", "value": course.course.title };

            htmlString += "<tr id='" + course.course._id + "'><td>";
            htmlString += "<p id='" + (course.course._id + "_" + info.key) + "'>";
            htmlString += info.value;
            htmlString += "</p>";
            htmlString += "<td><p>" + responseJSON.completionDate + "</p></td>";
            htmlString += "<td><p>" + responseJSON.progress + "</p></td>";
            htmlString += "<td><button style='background-color: red; color: white;' onclick=\"unenrollUser('" + userId + "','" + course.course._id + "')\">Unenroll</button></td>";
            htmlString += "</tr>";

            newRow.innerHTML = htmlString;
            newRow.setAttribute("id", course.course._id);

            document.getElementById('result').innerHTML = '<blockquote>User succesfully enrolled</blockquote>';
        } else {
            document.getElementById('result').innerHTML = getErrorResponse(responseJSON);
        }
    } catch (err) {
        console.log(err);
        document.getElementById('result').innerHTML = '<blockquote>Problem enrolling the users. Please try again later!</blockquote>';
    }
}

async function unenrollUser(userId, courseId) {
    try {
        const data = {
            "userId": userId,
            "courseId": courseId
        }

        const json = await getAPIResponse("/api/admin/enroll/", 'delete', data);
        if (json?.ok) {
            deleteRow(courseId);
            document.getElementById('result').innerHTML = '<blockquote>User successfully unenrolled</blockquote>';
        } else {
            document.getElementById('result').innerHTML = getErrorResponse(json);
        }
    } catch (err) {
        console.log(err);
        document.getElementById('result').innerHTML = '<blockquote>Problem unenrolling the users. Please try again later!</blockquote>';
    }
}

async function updateUser(id) {
    try {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const email = document.getElementById("email").value;
        const dropdown = document.getElementById("roleSelection");
        const role = dropdown.options[dropdown.selectedIndex].id;

        const data = {
            "username": username,
            "password": password,
            "email": email,
            "role": role
        };

        const json = await getAPIResponse("/api/admin/users/" + id, 'put', data);
        if (json?.ok) {
            clearUserInfo();
            document.getElementById('result').innerHTML = '<blockquote>User succesfully updated</blockquote>';

            document.getElementById(id + '_username').innerHTML = "<p>" + json.username + "</p>";
            document.getElementById(id + '_email').innerHTML = "<p>" + json.email + "</p>";
            document.getElementById(id + '_role').innerHTML = "<p>" + json.role + "</p>";
            document.getElementById(id + '_date_last_updated').innerHTML = "<p>" + formatDateString(json.updatedAt) + "</label>";
        } else {
            document.getElementById('result').innerHTML = getErrorResponse(json);
        }
    } catch (err) {
        document.getElementById('result').innerHTML = '<blockquote>Problem updating the users. Please try again later!</blockquote>';
    }
}

async function deleteUser(id) {
    try {
        const json = await getAPIResponse("/api/admin/users/" + id, 'delete', null);
        if (json?.ok) {
            deleteRow(id);

            if (document.getElementById(id + "_heading")) {
                document.getElementById("userInfoDiv").innerHTML = "";
                document.getElementById("userEnrollmentInfoDiv").innerHTML = "";
            }

            document.getElementById('result').innerHTML = '<blockquote>User successfully deleted</blockquote>';
        } else {
            document.getElementById('result').innerHTML = getErrorResponse(json);
        }
    } catch (err) {
        document.getElementById('result').innerHTML = '<blockquote>Problem deleting the user. Please try again later!</blockquote>';
    }
}

function clearUserInfo() {
    document.getElementById('userInfoDiv').innerHTML = "";
    document.getElementById('userEnrollmentInfoDiv').innerHTML = "";
}