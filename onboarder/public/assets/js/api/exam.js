let questions = [];
let incorrectQuestionIndexes = [];
let passMark = 0;
let totalQuestions = 0;

async function getExam() {
    try {
        const courseId = localStorage.getItem("courseId");

        const json = await getAPIResponse("/api/admin/courses/" + courseId, 'get', null);

        passMark = json.course.exam[0].passMark;

        let htmlString = '<form action="javascript:gradeExam()">';
        htmlString += "<table style='border-collapse: separate; border-spacing: 1em;'>";
        htmlString += "   <tbody>";

        questions = json.course.exam[0].questions[0];
        totalQuestions = questions.length;
        
        questions.map((question, index) => {
            htmlString += "<tr><td style='background-color: rgba(255, 255, 255, 0.05); border-left: 3px; border-right: 3px;'>";
            htmlString += "<label>" + (index + 1) + ". " + question.prompt + "</label><br><br>";

            question.answers.map((answer, answerNum) => {
                htmlString += "<div style='vertical-align: middle;'>";
                htmlString += "<input type='radio' name='" + question.prompt + "' value='" + answer + "' id='" + answer + "' class='" + answerNum.toString() + "'>"
                htmlString += "<label for='" + answer + "'>" + answer + "</label>"
                htmlString += "</div><br>"
            })

            htmlString += "</td></tr>";
        })

        htmlString += "    </tbody>";
        htmlString += "</table><div style='display: flex; justify-content: center;'>";
        htmlString += "<input type='submit' value='Submit Answers' class='primary'>";
        htmlString += "</div></form>";

        document.getElementById('examDiv').innerHTML = htmlString;

        localStorage.setItem("examQuestions", JSON.stringify(questions));
    } catch (err) {
        console.log(err);
        document.getElementById('result').innerHTML = '<blockquote>Failed to load test. Please try again later!</blockquote>';
    }
}

function gradeExam() {
    let score = 0;

    questions.map((question, index) => {
        const radioButtons = document.getElementsByName(question.prompt);

        for(const button of radioButtons){
            if(button.checked){
                if(button.className == question.correctAnswerNumber)
                    score++;
                else
                    incorrectQuestionIndexes.push(index);
            }
        }
    })

    localStorage.setItem("examScore", score);
    localStorage.setItem("passMark", passMark);
    localStorage.setItem("totalQuestions", totalQuestions);
    localStorage.setItem("wrongQuestions", JSON.stringify(incorrectQuestionIndexes));
    window.location.replace("exam-results.html");
}