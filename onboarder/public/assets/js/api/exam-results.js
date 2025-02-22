let examPassed = "";

async function displayScore() {
  let htmlString = "";

  htmlString += "<h1>Final Score: " + localStorage.getItem("examScore").toString() + "/" + localStorage.getItem("totalQuestions").toString() + "</h1><br />";
  document.getElementById("examResultDiv").innerHTML = htmlString;

  if((localStorage.getItem("examScore")/localStorage.getItem("totalQuestions") * 100) >= localStorage.getItem("passMark")){
    htmlString = "<p>Congratulations, you passsed!</p>";
    examPassed = "Exam Passed";
  }else{
    htmlString = "<p>You have failed the exam.</p>";
    examPassed = "Exam Failed";
  }

  try{
    updateCourseInfo();
  }catch(err){
    return;
  }

  document.getElementById("examStatus").innerHTML = htmlString;

  htmlString = "<table>";
  htmlString += "<tbody>";

  const questions = JSON.parse(localStorage.getItem("examQuestions"));
  const wrongQuestions = JSON.parse(localStorage.getItem("wrongQuestions"));

  questions.map((question, index) => {
    htmlString += "<tr>";

    htmlString += "<td>";
    htmlString += question.prompt;
    htmlString += "</td>";

    htmlString += "<td>";

    let correctStatus = "<label style='color: #00ED64;'>Correct";

    wrongQuestions.map((wrongQuestion) => {
      if (wrongQuestion == index)
        correctStatus = "<label style='color: red;'>Incorrect";
    });

    htmlString += correctStatus;
    htmlString += "</label></td></tr>";
  });

  document.getElementById("examResultQuestionDiv").innerHTML = htmlString;

  htmlString = "</tbody></table>";

  htmlString += "<table style='width: 40%;'><tbody><tr style='display: flex; justify-content: center; background-color: rgba(0, 0, 0, 0); border-color: rgba(0, 0, 0, 0);'>";

  htmlString += "<td>";
  htmlString += "<div>";
  htmlString += "Your Score";
  htmlString += "<h2 style='margin: 0 0 0 0;'>" + (localStorage.getItem("examScore")/localStorage.getItem("totalQuestions") * 100).toString() + "%</h2>";
  htmlString += "</div>";
  htmlString += "</td>";

  htmlString += "<td>";
  htmlString += "<div>";
  htmlString += "Pass Score";
  htmlString += "<h2 style='margin: 0 0 0 0;'>" + (localStorage.getItem("passMark")).toString() + "%</h2>";
  htmlString += "</div>";
  htmlString += "</td>";

  htmlString += "</tr></tbody></table>";
  document.getElementById("scoreComparisonDiv").innerHTML = htmlString;
}

async function updateCourseInfo() {
  try {
    const data = {
      "userId": localStorage.getItem("userId"),
      "courseId": localStorage.getItem("courseId"),
      "progress": examPassed
    }

    const json = await getAPIResponse("/api/protected/enroll/", 'put', data);

    if(json?.ok){
      localStorage.clear();
    }else{
      document.getElementById('result').innerHTML = getErrorResponse(json);
    }
  } catch(err) {
    document.getElementById('result').innerHTML = '<blockquote>Problem updating grades. Please try again later!</blockquote>';
  }
}

function redirect() {
  window.location.replace("view-course-details.html");
}
