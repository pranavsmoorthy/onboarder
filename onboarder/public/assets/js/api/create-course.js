let questions = [];

async function createCourse() {
    const title = document.getElementById("title").value;
    const link = document.getElementById("link").value;
    const description = document.getElementById("description").value;

    const data = {
        "title": title,
        "link": link,
        "description": description,
        "exam": {
            "questions": questions,
            "passMark": 70
        }
    };

    try {
        console.log(data);
        const json = await getAPIResponse("/api/admin/courses/", 'post', data);
        if (json?.ok) {
            document.getElementById('result').innerHTML = '<blockquote>Course succesfully created</blockquote>';
            window.location.replace("list-courses.html")
        } else {
            document.getElementById('result').innerHTML = getErrorResponse(json);
        }
    } catch (error) {
        document.getElementById('result').innerHTML = '<blockquote>Problem creating the course. Please try again later!</blockquote>';
        console.log(error);
    }
}

async function addQuestion() {
    const prompt = document.getElementById("promptBox").value;

    const answerChoices = [
        document.getElementById("choiceABox").value,
        document.getElementById("choiceBBox").value,
    ];

    const correctAnswerDropdown = document.getElementById("answerSelection");
    const correctAnswerNumber = parseInt(correctAnswerDropdown.options[correctAnswerDropdown.selectedIndex].id);

    if(!answerChoices[0] || !answerChoices[1]){
        document.getElementById('result').innerHTML = '<blockquote>Answer choices A and B need answers.</blockquote>';
        return;
    }

    const choiceC = document.getElementById("choiceCBox").value;
    if(choiceC){
        answerChoices.push(choiceC);

        const choiceD = document.getElementById("choiceDBox").value;
        if(choiceD) answerChoices.push(choiceD);
    }

    if(!answerChoices[correctAnswerNumber]){
        document.getElementById('result').innerHTML = '<blockquote>Correct answer choice cannot be empty.</blockquote>';
        return;
    }

    const table = document.getElementById('questionList');
    const newRow = table.insertRow();

    let htmlString = "";

    htmlString += "<tr><td>";
    htmlString += "<p id='prompt'>";
    htmlString += prompt;
    htmlString += "</p></td>";
    htmlString += "<td id='correctChoice' name='" + correctAnswerNumber.toString() + "'><p>" + answerChoices[correctAnswerNumber] + "</p></td>";
    htmlString += "</tr>";

    questions.push({
        "prompt": prompt,
        "answerChoices": answerChoices,
        "correctAnswerNumber": correctAnswerNumber
    });

    newRow.innerHTML = htmlString;
}