  $(document).ready(function () {
      /*
  first keep blank so can start at 1 not 0 
  */
      var questions = ["What is the capital of Canada?", "What colour is the Sun?", "What colours are in Canada's flag?"];
      /*
        Format for answers:
        correct answer as array positon,answer 1, amswer 2, answer 3
      */

      var answers = [
                ["Ottawa", "Toronto", "Quebec City"],
                ["Yellow", "Blue", "Purple"],
                ["Red", "White", "Blue"]
            ];


      var theanswer = [
                ["Ottawa"],
                ["Yellow"],
                ["Red", "White"]
            ];

      // player answers
      var choices = [];

      // number of questions to ask (max)
      var maxq = questions.length - 1;
      // question counter
      var qcount = 0;
      // score keeper
      var score = 0;
      //
      var currentRound = 1;
      // allowable answers per turn
      var allow = 1;
      // number of answers the player has selected (1 or 2 really)
      var answercount = 0;
      // is answer selected or not (needs to be toggleable)
      var astatus = [];
      astatus[1] = "off";
      astatus[2] = "off";
      astatus[3] = "off";
      // to clear text later on (and JUST text no child nodes)
      let isTextNode = (_, el) => el.nodeType === Node.TEXT_NODE;
      //
      var temp;


      /*
      ***********************************
      Initial values 
      ***********************************
      */
      $("#next").hide();
      $("#quizq").append("" + questions[qcount]);
      $("#answer1").append("" + answers[qcount][0]);
      $("#answer2").append("" + answers[qcount][1]);
      $("#answer3").append("" + answers[qcount][2]);
      temp = currentRound + " of " + (maxq + 1);
      $("#theround").append("Round: " + temp);
      $("#thescore").append("Score: " + score);
      allow = getallow();
      console.log("starting value for allow :" + allow);
      $("#available").append("You can select " + allow + " answer(s).");
      /*
      ***********************************
      default graphics 
      ***********************************
      */
      $("#answer1gfx").append("<i class='fas fa-question-circle'></i>");
      $("#answer2gfx").append("<i class='fas fa-question-circle'></i>");
      $("#answer3gfx").append("<i class='fas fa-question-circle'></i>");




      /*
      ***********************************
      more intialized methods
      ***********************************
      */

      /*
      ***********************************
      answer toggle
      ***********************************
      */
      function toggle(temp) {
          var maxallow = getallow();
          // check if answer has been selected or not
          var buttonis = astatus[temp];
          console.log("top: The button status of" + temp + " is " + buttonis);




          if (allow > 0) {
              // can make a choice
              if (window["astatus" + temp] == "on") {
                  console.log("apples");
                  // turn off
                  answercount--;
                  allow++;
                  window["astatus" + temp] = "off";
                  $("#answer" + temp).toggleClass("purple");
                  // adjust allow
                  allow = maxallow - 1;
                  // fix
                  fixval();
                  //updateAnswers(answers[qcount][temp - 1]);


              } else {
                  console.log("bananas");
                  // turn on
                  answercount++;
                  allow--;
                  window["astatus" + temp] = "off";
                  $("#answer" + temp).toggleClass("purple");
                  // fix
                  fixval();
                  //updateAnswers(answers[qcount][temp - 1]);
              }

          }
          // end if allow > 0 
          // choices used can only do something if click off other item
          else {
              if (window["astatus" + temp] == "on") {
                  answercount--;
                  allow++;
                  window["astatus" + temp] = "off";
                  $("#answer" + temp).toggleClass("purple");
                  // fix
                  fixval();
                  //updateAnswers(answers[qcount][temp - 1]);

                  console.log("pears");


              } else {
                  if (buttonis == "off") {
                      $("#answer" + temp).toggleClass("purple");
                      // other two off?
                      console.log("dogs");
                      allow++;
                      answercount--;
                      // fix
                      fixval();
                      // updateAnswers(answers[qcount][temp]);
                  } else {



                      console.log("cats");
                  }
                  console.log("grapes");


              }




          }


      }
      /*
      ***************************************************************
      fix the values so they don't go out of range and break sh*t
      **************************************************************
      */
      function fixval() {
          var maxallow = getallow();
          if (allow >= maxallow) {
              allow = maxallow;
          }
          // fix count
          if (answercount < 0) {
              answercount = 0;
          }
          if (allow < 0) {
              allow = 0;
          }

      }



      /*
      ***********************************
      answer one box
      ***********************************
      */

      $("#answer1").click(function () {
          console.log("answer1 selected.................");
          updateAnswers(answers[qcount][0]);
          // other option
          if (((allow == 0) && (astatus[1] == "on")) || ((allow > 0) && (astatus[1] == "off"))) {
              console.log("blue");
              if (astatus[1] == "on") {
                  astatus[1] = "off";
              } else {
                  astatus[1] = "on";
              }

              toggle("1");

          }
      });

      /*
      ***********************************
      answer two box
      ***********************************
      */

      $("#answer2").click(function () {
          console.log("answer2 selected.................");
          updateAnswers(answers[qcount][1]);
          if (((allow == 0) && (astatus[2] == "on")) || ((allow > 0) && (astatus[2] == "off"))) {

              if (astatus[2] == "on") {
                  astatus[2] = "off";
              } else {
                  astatus[2] = "on";
              }
              toggle("2");

          }

      });

      /*
      ***********************************
      answer three box
      ***********************************
      */

      $("#answer3").click(function () {
          console.log("answer3 selected.................");
          updateAnswers(answers[qcount][2]);
          if (((allow == 0) && (astatus[3] == "on")) || ((allow > 0) && (astatus[3] == "off"))) {

              if (astatus[3] == "on") {
                  astatus[3] = "off";
              } else {
                  astatus[3] = "on";
              }
              toggle("3");
          }


      });

      /* 
      ***********************************
      update answer div
      is an item in an array?
      const arr = [1, 2, 3, 4, 5, 6];
       arr.includes(2); // output: true
       adds or removes answer from array 
       ***********************************
       */



      function updateAnswers(ans) {
          console.log("Updating answers array for " + ans);
          var temp;
          if (choices.includes(ans)) {
              // is there so remove
              choices.splice(choices.indexOf(ans), 1);
              // update counter
              // temp = allow - answercount;
              $("#available").empty().append("You can select " + allow + " answer(s).");
          } else {
              choices.push(ans);
              // update counter
              temp = allow - answercount;
              $("#available").empty().append("You can select " + allow + " answer(s).");
          }
      }


      /*
      ***********************************
      answer submitted - check answers
      ***********************************
      */
      function scores() {
          var i, checkout, j, graphic, temp;
          var maxallow = getallow();
          $("#answer1, #answer2, #answer3").removeClass("purple");
          $("#next").show();
          for (i = 0; i <= choices.length - 1; i++) {
              for (j = 0; j <= theanswer.length; j++) {
                  temp = theanswer[qcount];
                  c = choices[i];
                  console.log("The temp answer is: " + temp);
                  console.log("The choice is: " + c);
                  // check answers
                  if (choices[i] == temp) {
                      score++;
                      // remove so it isn't duplicated
                      choices.splice(choices.indexOf(temp), 1);
                      // fix gfx
                      graphic = "answer" + (j + 1) + "gfx";
                      console.log("updating graphic: " + graphic);
                      $("#" + graphic).empty().append("<i class='fas fa-check-square'></i>");
                      $("#" + graphic).css({
                          "background-color": "#00ff00"
                      });

                  } else {
                      graphic = "answer" + (j + 1) + "gfx";
                      console.log("updating graphic: " + graphic);
                      $("#" + graphic).empty().append("<i class='fas fa-times-circle'></i>");
                      $("#" + graphic).css({
                          "background-color": "#ff0000"
                      });

                  }
              }

          }
          $("#thescore").empty().append("Score: " + score);
      }

      /*
      ***********************************
      get maxiumum number of allowable answers 
      ***********************************
      */
      function getallow() {
          var a;
          a = theanswer[qcount].length;
          return a;
      }

      /*
      ***********************************
      answers selected
      ***********************************
      */

      $("#qbutton").click(function () {
          /*
          ***********************************
          Calculate and update scores 
          ***********************************
          */
          $("#qbutton").hide();
          $("#hide").show();
          scores();

      })
      /*
      ***********************************
      testing - console.logging variables
      ***********************************
      */
      $("#testing").click(function () {
          console.log("answer 1." + choices[0]);
          console.log("answer 2." + choices[1]);
          console.log("answer 3." + choices[2]);
          console.log("maxq: " + maxq);
          console.log("qcount: " + qcount);
          console.log("allow: " + allow);
          console.log("answercount: " + answercount);
          console.log("score: " + score);
          console.log("astatus1: " + astatus[1]);
          console.log("astatus2: " + astatus[2]);
          console.log("astatus3: " + astatus[3]);
          console.log("round: " + currentRound);
          console.log("---------------------------------------------");
      });

      /*
       /*
      ***********************************
      reset variables
      ***********************************
      */
      function reset() {
          console.log("**RESET**");
          choices = [];
          astatus[1] = "off";
          astatus[2] = "off";
          astatus[3] = "off";
          $("#answer1gfx").empty().append("<i class='fas fa-question-circle'></i>");
          $("#answer2gfx").empty().append("<i class='fas fa-question-circle'></i>");
          $("#answer3gfx").empty().append("<i class='fas fa-question-circle'></i>");
          // clear answer colours
          $("#answer1gfx,#answer2gfx,#answer3gfx").css({
              "background-color": "#ffffff"
          });

          // clear selected
          $("#answer1, #answer2, #answer3").removeClass("purple");
          // clear text from answers
          $('#answer1').contents().filter(isTextNode).remove();
          $('#answer2').contents().filter(isTextNode).remove();
          $('#answer3').contents().filter(isTextNode).remove();
          $("#qbutton").hide();
          $("#next").hide();
      }



      /*
      ***********************************
      next question
      ***********************************
      */

      $("#next").click(function () {
          var temp, max;
          console.log("**NEXT QUESTION**");
          reset();
          var max = questions.length;
          qcount++;
          currentRound++;
          // check if done
          if (qcount >= max) {
              endgame();
          }
          allow = getallow();
          $("#available").empty().append("You can select " + allow + " answer(s).");
          $("#qbutton").show();
          $("#hide").hide();
          // $("#answer1").append("" + answers[qcount][0]);
          $("#quizq").empty().append("" + questions[qcount]);
          $("#answer1").append("" + answers[qcount][0]);
          $("#answer2").append("" + answers[qcount][1]);
          $("#answer3").append("" + answers[qcount][2]);
          // update text
          temp = currentRound + " of " + (maxq + 1);
          $("#theround").empty().append("" + temp);
      });

      /*
       ***********************************
       end game - offer restart
       ***********************************
       */
      function endgame() {
          $("#available").empty();
          $("#quizq").hide();
          $("#answer1").hide();
          $("#answer2").hide();
          $("#answer3").hide();
          $("#theround").empty().append("Game Over!");
          reset();
      }

      /*
      ***********************************
      end ready
      ***********************************
      */
  });
