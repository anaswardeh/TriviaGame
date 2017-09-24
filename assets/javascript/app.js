$(document).ready(function() {


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


                }
            }, 1000);
        }

        function startTiming() {
            var fiveMinutes = 60 * 1,
                display = document.querySelector("#time");
            startTimer(fiveMinutes, display);
        };


        var questionOb = [{
            question: "What is 2*5?",
            choices: [2, 5, 10, 15, 20],
            correctAnswer: 2
        }, {
            question: "What is 3*6?",
            choices: [3, 6, 9, 12, 18],
            correctAnswer: 4
        }, {
            question: "What is 8*9?",
            choices: [72, 99, 108, 134, 156],
            correctAnswer: 0
        }, {
            question: "What is 1*7?",
            choices: [4, 5, 6, 7, 8],
            correctAnswer: 3
        }, {
            question: "What is 8*8?",
            choices: [20, 30, 40, 50, 64],
            correctAnswer: 4
        }];


        var questionCounter = 0; //Tracks question number

        var selections = []; //Array containing user choices

        var quiz = $("#quizContainer"); //Quiz div object

        //Create the Game On Function

        $(".button").on("click", function() {
            $(".button").hide();
            $("#welcome-message").hide();

            startTiming();
            startGame();

        });

        function startGame() {

            random = questionOb[Math.floor(Math.random() * questionOb.length)];

            console.log(random.question);
            console.log(random.choices);

            $("#question").text(random.question);


            var choiceCount = 1;

            for (var i = 0; i < random.choices.length; i++) {

                var answerDiv = $("<div id='answer'>");

                var choice = random.choices[i];

                //console.log(choice);

                var p = $("<p>").text(choiceCount + " - " + choice);

                answerDiv.attr("style", "cursor: pointer");

                answerDiv.append(p);


                p.attr("data-item", "data-item-" + choiceCount);

                p.attr("id", "pTag");

                p.addClass("checkbox");

                $("#choiceList").append(answerDiv);

                choiceCount++
                //return this.random.choices;
            }

        }

            $(document.body).on("click", ".checkbox", function() {

                    var val1 = $(this).data();

                    //var val2 = val1.val();

                    console.log(val1);
                  
                  //  console.log(val2);
                  

                    /*
                            	var panel = $("#quizArea");

                            	function start(){

                            		for (var i = 0; i < questionOb.length; i++) {
                            			
                            			panel.append("<h2>" + questionOb[i].question + "</h2>");

                            			for (var j = 0; j < questionOb[i].choices.length; j++) {

                            				panel.append("<div value = " + questionOb[i].choices[j]);
                            			}

                            		}


                            	}*/
                });	

        });

   