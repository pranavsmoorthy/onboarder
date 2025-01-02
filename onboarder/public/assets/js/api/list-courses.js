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

async function listCourses() {
    try {
        const json = await getAPIResponse("http://localhost:5001/api/admin/courses/", 'get', null);
        if (json?.ok) {
            let htmlString = "<h2>Course List</h2>";
            htmlString += "<table id='courseTable'><tbody>"

            htmlString += "<tr>";
            htmlString += "<td><label>Title</label></td>";
            htmlString += "<td><label>Description</label></td>";
            htmlString += "<td><label>Date Last Updated</label></td>";
            htmlString += "<td><label></label></td>";
            htmlString += "<td><label></label></td>";
            htmlString += "<td><label></label></td>";
            htmlString += "</tr>";


            json.courses.map((course) => {
                let info = [];
                info.push({ "key": "title", "value": course.title });
                info.push({ "key": "description", "value": course.description });
                info.push({ "key": "date_last_updated", "value": formatDateString(course.updatedAt) });

                htmlString += "<tr id='" + course._id + "'>";

                info.map((element) => {
                    htmlString += "<td><p id='" + (course._id + "_" + element.key) + "'>";
                    htmlString += element.value;
                    htmlString += "</p></td>";
                })
                htmlString += "<td><button onclick='viewCourse(`" + course.link + "`)'>Open Course</button></td>";
                htmlString += "<td><button class='primary' onclick=\"getCourse('" + course._id + "')\">View</button></td>";
                htmlString += "<td><button style='background-color: red; color: white;' onclick=\"deleteCourse('" + course._id + "')\">Delete</button></td>";

                htmlString += "</tr>";
            })

            htmlString += "</tbody></table>"
            htmlString += "<br>";
            document.getElementById('courseDiv').innerHTML = htmlString;
        } else {
            let htmlString = "";

            json.messages.map((element) => {
                htmlString += "<blockquote>" + element + "<blockquote>";
            })

            document.getElementById('result').innerHTML = htmlString;
        }
    } catch (error) {
        console.log(error)
        document.getElementById('result').innerHTML = '<blockquote>Problem getting all courses. Please try again later!</blockquote>';
    }
}

async function getCourse(id) {
    try {
        const json = await getAPIResponse("http://localhost:5001/api/admin/courses/" + id, 'get', null);
        if (json?.ok) {
            let htmlString = "";

            htmlString += "<h2 id='" + id + "_heading'>Course Info For: " + json.course.title + "</h2>";
            htmlString += "<form action='javascript:updateCourse(`" + json.course._id + "`)'>";
            htmlString += "<table>";
            htmlString += "   <tbody>";
            htmlString += "        <tr>";
            htmlString += "            <td><label for='title'>Title<span style='color: red;'>*</span>: </label></td>";
            htmlString += "            <td><input type='text' id='title' name='title' placeholder='Enter course title' value='" + json.course.title + "'><br></td>";
            htmlString += "        </tr>";
            htmlString += "        <tr>";
            htmlString += "            <td><label for='link'>Link<span style='color: red;'>*</span>: </label></td>";
            htmlString += "            <td><input type='text' id='link' name='link' placeholder='Enter course link' value='" + json.course.link + "'><br></td>";
            htmlString += "        </tr>";
            htmlString += "        <tr>";
            htmlString += "            <td><label for='description'>Description: </label></td>";
            htmlString += "            <td><textarea id='description' name='description' style='resize: none' rows='4' cols='50' placeholder='Enter course description'>" + json.course.description + "</textarea><br></td>";
            htmlString += "        </tr>";
            htmlString += "    </tbody>";
            htmlString += "</table>";
            htmlString += "<input class='primary' type='submit' value='Update'>";
            htmlString += "</form>";

            document.getElementById('courseInfoDiv').innerHTML = htmlString;
        } else {
            let htmlString = "";

            json.messages.map((element) => {
                htmlString += "<blockquote>" + element + "</blockquote>";
            })

            document.getElementById('result').innerHTML = htmlString;
        }
    } catch (err) {
        console.log(err);
        document.getElementById('result').innerHTML = '<blockquote>Problem getting the course. Please try again later!</blockquote>';
    }
}

async function updateCourse(id) {
    try {
        const title = document.getElementById("title").value;
        const link = document.getElementById("link").value;
        const description = document.getElementById("description").value;

        const data = {
            "title": title,
            "link": link,
            "description": description
        };
        const json = await getAPIResponse("http://localhost:5001/api/admin/courses/" + id, 'put', data);
        if (json?.ok) {
            document.getElementById('result').innerHTML = '<blockquote>Course succesfully updated</blockquote>';
            document.getElementById('courseInfoDiv').innerHTML = "";

            document.getElementById(id + '_title').innerHTML = "<p>" + json.title + "</p>";
            document.getElementById(id + '_link').innerHTML = "<p>" + json.link + "</p>";
            document.getElementById(id + '_description').innerHTML = "<p>" + json.description + "</p>";
            document.getElementById(id + '_date_last_updated').innerHTML = "<p>" + formatDateString(json.updatedAt) + "</p>";
        } else {
            let htmlString = "";

            json.messages.map((element) => {
                htmlString += "<blockquote>" + element + "</blockquote>";
            })

            document.getElementById('result').innerHTML = htmlString;
        }
    } catch (err) {
        document.getElementById('result').innerHTML = '<blockquote>Problem updating the courses. Please try again later!</blockquote>';
    }
}

async function deleteCourse(id) {
    try {
        const json = await getAPIResponse("http://localhost:5001/api/admin/courses/" + id, 'delete', null);
        if (json?.ok) {
            deleteRow(id);

            if(document.getElementById(id + "_heading")){
                document.getElementById("courseInfoDiv").innerHTML = "";
            }
        } else {
            let htmlString = "";
            json.messages.map((element) => {
                htmlString += "<blockquote>" + element + "</blockquote>";
            })

            document.getElementById('result').innerHTML = htmlString;
        }
    } catch (err) {
        document.getElementById('result').innerHTML = '<blockquote>Problem deleting the course. Please try again later!</blockquote>';
    }
}

function viewCourse(link){
    window.open(link, "_blank");
}