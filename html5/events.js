var standardWeekInfo = {
	"descript": "Standard Week",
	"categories": {
		"party": {
			"rewards": [
				{
					"rep": {
						"base": "0",
						"mult": "0"
					}
				},
				{
					"rep": {
						"base": "5",
						"mult": "2"
					}
				}
			],
			"msgs": [
				"No party?",
				"Had some people over."
			],
			"cutoffs": [
				"0",
				"5"
			]
		},
		"cs": {
			"rewards": [
				{
					"rep": {
						"base": "-5",
						"mult": "0"
					}
				},
				{
					"rep": {
						"base": "5",
						"mult": "2"
					}
				}
			],
			"msgs": [
				"Don't you care about the community?",
				"Good work."
			],
			"cutoffs": [
				"0",
				"5"
			]
		},
		"rush": {
			"rewards": [
				{
					"rush": {
						"base": "0",
						"mult": "0"
					}
				},
				{
					"rush": {
						"base": "4",
						"mult": "1"
					}
				}
			],
			"msgs": [
				"No presence on campus.",
				"Got your name out there."
			],
			"cutoffs": [
				"0",
				"5"
			]
		},
		"study": {
			"rewards": [
				{
					"rep": {
						"base": "-10",
						"mult": "0"
					}
				},
				{
					"rep": {
						"base": "0",
						"mult": "2"
					}
				}
			],
			"msgs": [
				"Academics should be a priority",
				"Middle of the pack."
			],
			"cutoffs": [
				"0",
				"5"
			]
		}
	}
};

var finalsWeekInfo = {
	"descript": "Finals Week",
	"categories": {
		"party": {
			"rewards": [
				{
					"rep": {
						"base": "0",
						"mult": "0"
					}
				},
				{
					"rep": {
						"base": "0",
						"mult": "1"
					}
				},
				{
					"rep": {
						"base": "-3",
						"mult": "-1"
					},
					"cash": {
						"base": "-30",
						"mult": "0"
					}
				}
			],
			"msgs": [
				"People needed to study anyway.",
				"Everyone needs a study break.",
				"Noise complaint from neighbors trying to study."
			],
			"cutoffs": [
				"0",
				"7",
				"15"
			]
		},
		"cs": {
			"rewards": [
				{
					"rep": {
						"base": "0",
						"mult": "0"
					}
				},
				{
					"rep": {
						"base": "5",
						"mult": "1"
					}
				}
			],
			"msgs": [
				"Too busy studying.",
				"Sold pizza in the library and donated proceeds to education."
			],
			"cutoffs": [
				"0",
				"7"
			]
		},
		"rush": {
			"rewards": [
				{
					"rush": {
						"base": "5",
						"mult": "1"
					}
				},
				{
					"rush": {
						"base": "-20",
						"mult": "-2"
					}
				}
			],
			"msgs": [
				"It's okay, rushees were studying too.",
				"Tutored potential members.",
				"Bugged rushees trying to study."
			],
			"cutoffs": [
				"0",
				"1",
				"9"
			]
		},
		"study": {
			"rewards": [
				{
					"rep": {
						"base": "-10",
						"mult": "0"
					}
				},
				{
					"rep": {
						"base": "5",
						"mult": "2"
					}
				},
				{
					"rep": {
						"base": "10",
						"mult": "1"
					}
				}
			],
			"msgs": [
				"Did poorly on exams.",
				"Passed!",
				"Aced it!"
			],
			"cutoffs": [
				"0",
				"1",
				"10"
			]
		}
	}
};


var mardiGrasInfo = {
	"descript": "Mardi Gras",
	"categories": {
		"party": {
			"rewards": [
				{
					"rep": {
						"base": "-5",
						"mult": "0"
					}
				},
				{
					"rep": {
						"base": "10",
						"mult": "0"
					}
				},
				{
					"rep": {
						"base": "8",
						"mult": "2"
					}
				}
			],
			"msgs": [
				"Missed out on a big party night.",
				"Throw me some beads!",
				"Purple, Gold and Green everywhere!"
			],
			"cutoffs": [
				"0",
				"1",
				"9"
			]
		},
		"cs": {
			"rewards": [
				{
					"rep": {
						"base": "-5",
						"mult": "0"
					},
					"cash": {
						"base": "-50",
						"mult": "0"
					}
				},
				{
					"rep": {
						"base": "0",
						"mult": "1"
					}
				},
				{
					"rep": {
						"base": "10",
						"mult": "1"
					}
				}
			],
			"msgs": [
				"Had to pay for bead removal.",
				"Your bead selling fundraiser broke even",
				"Donated extra beads to charity.  Good thinking!"
			],
			"cutoffs": [
				"0",
				"1",
				"10"
			]
		},
		"rush": {
			"rewards": [
				{
					"rep": {
						"base": "0",
						"mult": "0"
					}
				},
				{
					"rush": {
						"base": "0",
						"mult": "3"
					}
				},
				{
					"rush": {
						"base": "10",
						"mult": "3"
					}
				}
			],
			"msgs": [
				"Missed out on a rush opportunity",
				"Threw a great rush event at the bowling alley!",
				"Road tripped to New Orleans with Rushees!"
			],
			"cutoffs": [
				"0",
				"1",
				"10"
			]
		},
		"study": {
			"rewards": [
				{
					"rep": {
						"base": "0",
						"mult": "0"
					}
				}
			],
			"msgs": [
				"Parades made it too loud to study."
			],
			"cutoffs": [
				"0"
			]
		}
	}
};


var  gloCrackDownInfo = {
    descript : "The GLO Cracks down",
	categories: {
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
	}
};

var rushWeekendInfo = {
	"descript": "Rush Weekend",
	"categories": {
		"party": {
			"rewards": [
				{
					"rep": {
						"base": "-20",
						"mult": "0"
					}
				},
				{
					"rep": {
						"base": "15",
						"mult": "0"
					}
				},
				{
					"rep": {
						"base": "0",
						"mult": "1"
					},
					"rush": {
						"base": "0",
						"mult": "0.5"
					}
				}
			],
			"msgs": [
				"Rushees wondered why you weren't having a party.",
				"It's a party. Everyone's having a good time.",
				"Rushees had a great time."
			],
			"cutoffs": [
				"0",
				"8",
				"15"
			]
		},
		"cs": {
			"rewards": [
				{
					"rep": {
						"base": "0",
						"mult": "1"
					}
				},
				{
					"rep": {
						"base": "0",
						"mult": "1"
					}
				}
			],
			"msgs": [
				"You couldn't think of anything to do?",
				"Rushees were impressed by your philanthropy event.",
				"Sold some sweet rush week shirts."
			],
			"cutoffs": [
				"0",
				"6",
				"12"
			]
		},
		"rush": {
			"rewards": [
				{
					"rep": {
						"base": "0",
						"mult": "0.5"
					}
				},
				{
					"rep": {
						"base": "0",
						"mult": "0.75"
					}
				}
			],
			"msgs": [
				"Rushing hard, or hardly rushing?",
				"Had a good turnout to your events."
			],
			"cutoffs": [
				"0",
				"8"
			]
		},
		"study": {
			"rewards": [
				{
					"rep": {
						"base": "-10",
						"mult": "0"
					}
				},
				{
					"rep": {
						"base": "15",
						"mult": "0"
					}
				},
				{
					"rep": {
						"base": "10",
						"mult": "1"
					}
				}
			],
			"msgs": [
				"You should probably study if you want to stick around.",
				"Got your work done.",
				"Work hard, play hard."
			],
			"cutoffs": [
				"0",
				"1",
				"7"
			]
		}
	}
};

//**********************************************************************
var events = [];
events[0] = mardiGrasInfo;
events[1] = standardWeekInfo;
events[2] = finalsWeekInfo;