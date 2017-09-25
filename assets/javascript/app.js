$(document).ready(function() {


    //Hide the timer in the landing page

    $("#time").hide();
    $(".jumbotron").hide();


    //Create the object 
    var questionOb = [{
            question: "The Eiffel Tower is located where in Paris?",
            choices: ["Bois de Boulogne",
                "Champ de Mars",
                "Jardin des Plantes",
                "Parc de Belleville"
            ],
            correctAnswer: "Champ de Mars"
        }, {
            question: "Which Apollo mission landed the first humans on the Moon?",
            choices: ["Apollo 7",
                "Apollo 9",
                "Apollo 11",
                "Apollo 13"
            ],
            correctAnswer: "Apollo 11"
        }, {
            question: "Who starred in the 1959 epic film 'Ben-Hur'?",
            choices: ["Charlton Heston",
                "Clark Gable",
                "Errol Flynn",
                "Lee Marvin"
            ],
            correctAnswer: "Charlton Heston"
        }, {
            question: "What is the International Air Transport Association airport code for Heathrow Airport?",
            choices: ["HRW",
                "HTR",
                "LHR",
                "LHW"
            ],
            correctAnswer: "LHR"
        }, {
            question: "The reactor at the site of the Chernobyl nuclear disaster is now in which country?",
            choices: ["Ukraine",
                "Slovakia",
                "Hungary",
                "Russia"
            ],
            correctAnswer: "Ukraine"
        },
        {
            question: "Which volcano is best known for its eruption in AD 79 that led to the destruction of the Roman cities of Pompeii and Herculaneum?",
            choices: ["Mount Etna",
                "Mount Stromboli",
                "Mount Vesuvius",
                "Mount Vulture"
            ],
            correctAnswer: "Mount Vesuvius"
        },
        {
            question: "Which event from the 2012 Summer Olympics will be held at Lord's Cricket Ground?",
            choices: ["Archery",
                "Fencing",
                "Handball",
                "Shooting"
            ],
            correctAnswer: "Archery"
        }, {
            question: "The British Naval Ensign features a Union Jack in which corner?",
            choices: ["Top left",
                "Top right",
                "Bottom left",
                "Bottom right"
            ],
            correctAnswer: "Top left"
        }, {
            question: "Who plays Lara Croft in the Tomb Raider series of films?",
            choices: ["Angelina Jolie",
                "Minnie Driver",
                "Nell McAndrew",
                "Jennifer Aniston"
            ],

            correctAnswer: "Angelina Jolie"
        }, {
            question: "Which castle was the childhood home of Elizabeth Bowes-Lyon, the late Queen Mother?",
            choices: ["Craigievar Castle",
                "Glamis Castle",
                "InvergquestionOby Castle",
                "Loch Leven Castle"
            ],
            correctAnswer: "Glamis Castle"
        },
    ];



    //Start the Game and Choose the answer
    $(".button").on("click", function() {
        $(".button").hide();
        $("#welcome-message").hide();
        $("#time").show();
        startTiming();
        startGame();
    });


    var choice;
    var answerValue;
    var dataValue;
    var firstQuestion;
    var j = 0;


    function startGame() {
        $(".checkbox").remove();
        firstQuestion = questionOb[j];
        console.log(firstQuestion.question);
        console.log(firstQuestion.choices);
        $("#question").html('<h1>' + firstQuestion.question + '<h1>');
        var choiceCount = 1;
        answerValue = firstQuestion.correctAnswer;
        console.log(firstQuestion.correctAnswer);
        for (var i = 0; i < firstQuestion.choices.length; i++) {
            var answerDiv = $("<div id='answer'>");
            choice = firstQuestion.choices[i];

            //console.log(choice);
            var p = $("<p>").html('<li>' + choice + '</li>');
            answerDiv.attr("style", "cursor: pointer");
            answerDiv.append(p);
            p.attr("data-item", "data-item-" + choiceCount);
            p.attr("id", "pTag");
            answerDiv.addClass("checkbox");
            p.addClass("value");
            $("#choiceList").append(answerDiv);
            choiceCount++
        }


        $(document.body).one("click", ".checkbox", function() {
            dataValue = $(this).find('p.value').text();
            if (dataValue === answerValue) {
                getCorrectRandomImage(arrayImg, "");
                (function() {
                    var myDiv = document.getElementById("images"),
                        show = function() {
                            myDiv.style.display = "block";
                            setTimeout(hide, 5000); // 5 seconds
                            $(".quizContainer").hide();
                        },
                        hide = function() {
                            myDiv.style.display = "none";
                            $(".quizContainer").show();
                            j++;
                            if (j > 9) {
                                j = 0;
                                $(".quizContainer").hide();
                                $("#question").remove();
                                $('#result').append('<p><img id="theImg" src="assets/images/endGame.gif" /></p>');
                                $("#result").append("The Game is Over! Let's Get Productive with Something of a Value!");
                            }
                            startGame();
                            startTiming();
                        };

                    show();
                })();
            } else {
                getIncorrectRandomImage(arrayImg1, "");
                (function() {
                    var myDiv = document.getElementById("images"),
                        show = function() {
                            myDiv.style.display = "block";
                            setTimeout(hide, 5000); // 5 seconds
                            $(".quizContainer").hide();
                            $("#time").html("The Correct answer was: " + answerValue);
                        },
                        hide = function() {
                            myDiv.style.display = "none";
                            $(".quizContainer").show();
                            j++;
                            if (j > 9) {
                                j = 0;
                                $(".quizContainer").remove();
                                $('#result').append('<p><img id="theImg" src="assets/images/endGame.gif" /></p>');
                                $("#result").append("The Game is Over! Let's Get Productive with Something of a Value!")
                            }
                            startGame();
                            startTiming();
                        };
                    show();
                })();
            }
        });
    }


    //Counting Results
    var win = 0;
    var loss = 0;

    $(document.body).on("click", ".checkbox", function() {
        dataValue = $(this).find('p.value').text();
        if (dataValue === answerValue) {
            win++;
            console.log("correct " + win);
        } else {
            loss++;
            console.log("incorrect " + loss);
        }
        $("#result").html("Correct Answers: " + win + '<br />');
        $("#result").append("Incorrect Answers: " + loss);
    });



    //Create Timer
    function startTimer(duration, display) {
        var timer = duration,
            minutes, seconds;
        var __timer = setInterval(function() {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.textContent = "Remaining Time: " + minutes + ":" + seconds;
            if (--timer < 0) {
                clearInterval(__timer);
                timer = duration;
                $("#time").text("Your Time is Over");
                $(".quizContainer").remove();
                $("#result").html("Correct Answers: " + win + '<br />');
                $("#result").append("Incorrect Answers: " + loss);
                $('#result').append('<p><img id="theImg" src="assets/images/endGame.gif" /></p>');
                $("#result").append("The Game is Over! Let's Get Productive with Something of a Value!")
            }
            if (j > 9) {
                j = 0;
                clearInterval(__timer);
                timer = duration;
                $("#time").remove();
                $("#images").remove();
                $('#result').append('<p><img id="theImg" src="assets/images/endGame.gif" /></p>');
                $("#result").append("The Game is Over! Let's Get Productive with Something of a Value!")
            }
            $(document.body).one("click", ".checkbox", function() {
                clearInterval(__timer);
            })
        }, 1000);
    }


    function startTiming() {
        var fiveMinutes = 30 * 1,
            display = document.querySelector("#time");
        startTimer(fiveMinutes, display);
    };


    var arrayImg = new Array();
    arrayImg[0] = "assets/images/1-correct.gif";
    arrayImg[1] = "assets/images/2-correct.gif";
    arrayImg[2] = "assets/images/3-correct.gif";
    arrayImg[3] = "assets/images/4-correct.gif";
    arrayImg[4] = "assets/images/5-correct.gif";
    arrayImg[5] = "assets/images/6-correct.gif";
    arrayImg[6] = "assets/images/7-correct.gif";
    arrayImg[7] = "assets/images/8-correct.gif";
    arrayImg[8] = "assets/images/9-correct.gif";
    arrayImg[9] = "assets/images/10-correct.gif";

    function getCorrectRandomImage(imgAr, path) {
        path = path || ''; // default path here
        var num = Math.floor(Math.random() * imgAr.length);
        var img = imgAr[num];
        var imgStr = '<img src="' + path + img + '" alt = "" width="50%" height="50%">';
        $("#images").html(imgStr);
    }


    var arrayImg1 = new Array();
    arrayImg1[0] = "assets/images/1-incorrect.gif";
    arrayImg1[1] = "assets/images/2-incorrect.gif";
    arrayImg1[2] = "assets/images/3-incorrect.gif";
    arrayImg1[3] = "assets/images/4-incorrect.gif";
    arrayImg1[4] = "assets/images/5-incorrect.gif";
    arrayImg1[5] = "assets/images/6-incorrect.gif";
    arrayImg1[6] = "assets/images/7-incorrect.gif";
    arrayImg1[7] = "assets/images/8-incorrect.gif";
    arrayImg1[8] = "assets/images/9-incorrect.gif";
    arrayImg1[9] = "assets/images/10-incorrect.gif";

    function getIncorrectRandomImage(imgAr, path) {
        path = path || ''; // default path here
        var num = Math.floor(Math.random() * imgAr.length);
        var img = imgAr[num];
        var imgStr = '<img src="' + path + img + '" alt = "" width="50%" height="50%">';
        $("#images").html(imgStr);
    }
});