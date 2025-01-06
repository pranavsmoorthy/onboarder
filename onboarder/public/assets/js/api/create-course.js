async function createCourse() {
    const title = document.getElementById("title").value;
    const link = document.getElementById("link").value;
    const description = document.getElementById("description").value;

    const data = {
        "title": title,
        "link": link,
        "description": description
    };
    try {
        const json = await getAPIResponse("/api/admin/courses/", 'post', data);
        if (json?.ok) {
            document.getElementById('result').innerHTML = '<blockquote>Course succesfully created</blockquote>';
        } else {
            document.getElementById('result').innerHTML = getErrorResponse(json);
        }
    } catch (error) {
        document.getElementById('result').innerHTML = '<blockquote>Problem creating the course. Please try again later!</blockquote>';
    }
}