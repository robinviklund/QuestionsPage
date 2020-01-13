let sign;
let answer;
let times = 1;
let totalTimes = 10;
let points = 0;

$(document).ready(function() {
    $("#questions").hide();
    $("#finish").hide();
    $("#mark").show();
});

function randomNum(max) {
    return Math.floor(Math.random() * max);
}

function getAnswer(mark, amount1, amount2) {
    if (mark == "/") {
        return amount1 / amount2;
    } else if (mark == "*") {
        return amount1 * amount2;
    } else if (mark == "+") {
        return amount1 + amount2;
    } else if (mark == "-") {
        return amount1 - amount2;
    }
}

function generateNum(arr, right) {
    maxNum = 21;
    if (sign == "-") {
        maxNum = 11;
    } else if (sign == "/") {
        maxNum = 11;
    } else if (sign == "*") {
        maxNum = 101;
    }
    let randomized = randomNum(maxNum);
    while (arr.includes(randomized) == true || randomized == right) {
        randomized = randomNum(maxNum);
    }
    return randomized;
}

function makeAnswers(rightAnswer) {
    let answers = [];
    let randomized = randomNum(4);
    for (let i = 0; i < 4; i++) {
        if (i == randomized) {
            answers.push(rightAnswer);
        } else {
            answers.push(generateNum(answers, rightAnswer));
        }
    }
    for (let i = 1; i < 8; i = i + 2) {
        document.getElementById("answers").childNodes[i].id =
            answers[(i - 1) / 2];

        document.getElementById("answers").childNodes[
            i
        ].innerHTML = document.getElementById("answers").childNodes[i].id;
    }
}

function makeQuestion() {
    let amount1 = randomNum(11);
    let amount2 = randomNum(11);
    if (amount1 < amount2) {
        let amount = amount1;
        amount1 = amount2;
        amount2 = amount;
    }
    if (sign == "/") {
        if (amount2 == 0) {
            makeQuestion();
            return;
        }
    }
    answer = getAnswer(sign, amount1, amount2);
    if (answer != Math.floor(answer)) {
        makeQuestion();
        return;
    }
    makeAnswers(answer);
    $("#mark").hide();
    $("#question").html("Vad är " + amount1 + " " + sign + " " + amount2 + "?");
    $("#questions").show();
    $("#count").html(times + "/" + totalTimes);
}

function chooseMark(e) {
    sign = e;
    makeQuestion();
}

function comment(points) {
    if (points <= 3) {
        return "Dåligt jobbat!";
    } else if (points <= 6) {
        return "Okej jobbat!";
    } else {
        return "Bra jobbat!";
    }
}

function answered(e) {
    if (e == answer) {
        console.log("Right answer!");
        points++;
        times++;
        if (times <= totalTimes) {
            makeQuestion();
        } else {
            console.log(
                "Finshed, got " + points + " points out of " + totalTimes + "!"
            );
            $("#result").html(points + " / " + totalTimes);
            $("#comment").html(comment(points));
            $("#questions").hide();
            $("#finish").show();
        }
        $("#points").html(points + "p");
    } else {
        console.log("Wrong answer!");
        times++;
        if (times <= totalTimes) {
            makeQuestion();
        } else {
            console.log(
                "Finshed, got " + points + " points out of " + totalTimes + "!"
            );
            $("#result").html(points + " / " + totalTimes);
            $("#comment").html(comment(points));
            $("#questions").hide();
            $("#finish").show();
        }
    }
}

function restart() {
    location.reload();
}
