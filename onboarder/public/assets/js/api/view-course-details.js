function formatDateString(dateString) {
    dateString = dateString.slice(0, dateString.indexOf("T"));
    const splitString = dateString.split("-");
    const formattedDateString = splitString[1] + "/" + splitString[2] + "/" + splitString[0];
    return formattedDateString;
}

async function getCourses() {
    try {
        const json = await getAPIResponse("/api/protected/users", 'get', null);
        if (json?.ok) {
            document.getElementById('navOptions').innerHTML = getHeader(json.user.role, "My Courses");

            let htmlString = "";
            if (json.courses.length != 0) {
                htmlString += "<table id='enrollmentList'><tbody>";
                htmlString += "<tr>"
                htmlString += "<td><label>Course Title</label></td>";
                htmlString += "<td><label>Due Date</label></td>";
                htmlString += "<td><label>Progress</label></td>";
                htmlString += "<td><label> </label></td>";
                htmlString += "<td><label> </label></td>";
                htmlString += "</tr>"
                json.courses.map((courseSelected) => {
                    console.log(courseSelected);
                    let info = { "key": "course_title", "value": courseSelected.course.title };

                    htmlString += "<tr id='" + courseSelected.course._id + "'><td>";
                    htmlString += "<p id='" + (courseSelected.course._id + "_" + info.key) + "'>";
                    htmlString += info.value;
                    htmlString += "</p></td>";
                    htmlString += "<td><p>" + formatDateString(courseSelected.completionDate) + "</p></td>";
                    htmlString += "<td><p id=" + courseSelected.course._id + "_progress" + ">" + courseSelected.progress + "</p></td>";
                    htmlString += "<td><button onclick='viewCourse(`" + json.user._id + "`,`" + courseSelected.course._id + "`,`" + courseSelected.course.link + "`)'>Open Course</button></td>";
                    htmlString += "<td><button id=" + courseSelected.course._id + "_markDoneButton class="

                    if (courseSelected.progress == "In Progress")
                        htmlString += "'complete'"
                    else
                        htmlString += "'complete disabled'"

                    htmlString += "onclick="
                    
                    console.log(courseSelected);

                    if(courseSelected.course.hasExam){
                        htmlString += "loadExam('" + json.user._id + "','" + courseSelected.course._id + "')";
                    }else{
                        htmlString += "markComplete(`" + json.user._id + "`,`" + courseSelected.course._id + "`)"
                    }

                    htmlString += '>';

                    if(courseSelected.course.hasExam)
                        htmlString += "Take Test";
                    else
                        htmlString += "Mark as Complete";

                    htmlString += "</button></td>";
                    htmlString += "</tr>"
                });
            } else {
                htmlString = "<blockquote>You have not assigned to any courses. Please contact the administrator!</blockquote>"
            }
            document.getElementById('userEnrollmentInfoDiv').innerHTML = htmlString;

        } else {
            document.getElementById('result').innerHTML = getErrorResponse(json);
        }
    } catch (err) {
        console.log(err);
        document.getElementById('result').innerHTML = '<blockquote>Problem getting the courses. Please try again later!</blockquote>';
    }
}

async function viewCourse(userId, courseId, link) {
    window.open(link, "_blank");
    const element = document.getElementById(courseId + "_markDoneButton");
    console.log(element);
    if (element.getAttribute("class") != "complete") {
        const data = {
            "userId": userId,
            "courseId": courseId,
            "progress": "In Progress"
        }

        const json = await getAPIResponse("/api/protected/enroll", 'put', data);
        try {
            if (json?.ok) {
                document.getElementById(courseId + '_progress').innerHTML = "<p>" + json.progress + "</p>";
                element.setAttribute("class", "primary complete");
            } else {
                document.getElementById('result').innerHTML = getErrorResponse(json);
            }
        } catch (err) {
            console.log(err);
            document.getElementById('result').innerHTML = '<blockquote>Problem opening the course. Please try again later!</blockquote>';
        }
    }
}

async function markComplete(userId, courseId) {
    const data = {
        "userId": userId,
        "courseId": courseId,
        "progress": "Completed"
    }

    const json = await getAPIResponse("/api/protected/enroll", 'put', data);
    try {
        if (json?.ok) {
            document.getElementById(courseId + '_progress').innerHTML = "<p>" + json.progress + "</p>";
            const element = document.getElementById(courseId + "_markDoneButton");
            element.setAttribute("class", "complete disabled");
        } else {
            document.getElementById('result').innerHTML = getErrorResponse(json);
        }
    } catch (err) {
        console.log(err);
        document.getElementById('result').innerHTML = '<blockquote>Problem marking course as complete. Please try again later!</blockquote>';
    }
}

function loadExam(userId, courseId) {
    try {
        localStorage.setItem("userId", userId);
        localStorage.setItem("courseId", courseId);
        window.location.replace("exam.html");
    } catch (err) {
        console.log(err);
        document.getElementById('result').innerHTML = '<blockquote>Failed to load test. Please try again later!</blockquote>';
    }
}