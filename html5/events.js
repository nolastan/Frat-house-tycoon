var TurnTemplateInfo = {
    descript: "Standard Week",
    party:  {
          rewards:   [[0, 0, -3]],
          msgs: ["No parties!"],
          cutoffs: [0]
    },

    cs:  {
          rewards:  [[0, 0, 0]],
          msgs: ["No community service"],
          cutoffs: [0]
    },

    rush:  {
          rewards:  [[0, 0, 0]],
          msgs: ["No rush."],
          cutoffs: [0]
    },

    study:  {
          rewards:  [[0, 0, 0]],
          msgs: ["No studying."],
          cutoffs: [0]
    }
};


var MardiGrasInfo = {
    descript: "Mardi Gras!",
    party:  {
          rewards:   [[-3, 0, 0],
                     [-2, 0, 0],
                     [ 5, 0 ,0]],
          msgs: ["Missed out on a big party night",
                "Throw me some beads!",
                "Purple, Gold and Green everywhere!"],
          cutoffs: [0, 1, 6]
    },

    cs:  {
          rewards:  [[-1, -50, 0],
                    [0, 0, 0],
                    [2, 0, 0]],
          msgs: ["Had to pay for bead removal",
                "Your bead selling fundraiser broke even",
                "Donated extra beads to charity.  Good thinking!"],
          cutoffs: [0, 1, 3]
    },

    rush:  {
          rewards:  [[0, 0, 0],
                    [0, 0, 1],
                    [0, 0, 3]],
          msgs: ["Missed out on a rush opportunity",
                "Threw a great rush event at the bowling alley!",
                "Road tripped to New Orleans with Rushees!"],
          cutoffs: [0, 1, 6]
    },

    study:  {
          rewards:  [[0, 0, 0]],
          msgs: ["Parades were too loud to study"],
          cutoffs: [0]
    }
};


var  GLOCrackDownInfo = {
    descript : "The GLO Cracks down",
    party:  {
          rewards:   [[5, 0, 0],
                     [0, 0, -3],
                     [-4, 0 ,0]],
          msgs: ["The GLO is glad you didn't have any unregeistered events.",
                "The GLO demands you weed out the trouble makers",
                "Caught hosting an unregistered event"],
          cutoffs: [0, 1, 4]
    },

    cs:  {
          rewards:  [[0, 0, 0],
                    [0, 0, 0],
                    [3, 0, 0]],
          msgs: ["No change",
                "Good to see you have a few good apples",
                "This is what Greek Life is all about!"],
          cutoffs: [0, 1, 4]
    },

    rush:  {
          rewards:  [[-1, 0, 0],
                    [-2, 0, 0],
                    [2, 0, 2]],
          msgs: ["You need to attract decent men.",
                "Why are random freshmen wandering around your house?",
                "Well organized rush!"],
          cutoffs: [0, 1, 3]
    },

    study:  {
          rewards:  [[-1, 0, 0],
                    [0, 0, 0]],
          msgs: ["You are here to study first and foremost",
                "Of course you're studying. You're students."],
          cutoffs: [0, 2]
    }
};