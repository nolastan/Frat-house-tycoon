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
						"base": "0",
						"mult": "0"
					}
				},
				{
					"rush": {
						"base": "5",
						"mult": "1"
					}
				},
				{
					"rush": {
						"base": "0",
						"mult": "-0.5"
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
		"descript": "The GLO Cracks Down",
		"categories": {
			"party": {
				"rewards": [
					{
						"rep": {
							"base": "5",
							"mult": "0"
						}
					},
					{
						"rush": {
							"base": "-2",
							"mult": "0"
						}
					},
					{
						"rep": {
							"base": "-15",
							"mult": "0"
						}
					}
				],
				"msgs": [
					"The GLO is glad you didn't have any unregeistered events.",
					"The GLO demands you weed out the trouble makers",
					"Caught hosting an unregistered event"
				],
				"cutoffs": [
					"0",
					"1",
					"4"
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
							"mult": "0"
						}
					},
					{
						"rep": {
							"base": "15",
							"mult": "0"
						}
					}
				],
				"msgs": [
					"No change",
					"Good to see you have a few good apples",
					"This is what Greek Life is all about!"
				],
				"cutoffs": [
					"0",
					"1",
					"4"
				]
			},
			"rush": {
				"rewards": [
					{
						"rep": {
							"base": "-5",
							"mult": "0"
						}
					},
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
						},
						"rush": {
							"base": "3",
							"mult": "0"
						}
					}
				],
				"msgs": [
					"You need to attract decent men.",
					"Why are random freshmen wandering around your house?",
					"Well organized rush!"
				],
				"cutoffs": [
					"0",
					"1",
					"3"
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
							"mult": "0"
						}
					}
				],
				"msgs": [
					"You are here to study first and foremost",
					"Of course you're studying. You're students!"
				],
				"cutoffs": [
					"0",
					"2"
				]
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

var superBowlInfo = {
		"descript": "Super Bowl",
		"categories": {
			"party": {
				"rewards": [
					{
						"rep": {
							"base": "-10",
							"mult": "0"
						}
					},
					{
						"rep": {
							"base": "10",
							"mult": "1"
						},
						"cash": {
							"base": "-10",
							"mult": "0"
						}
					},
					{
						"rep": {
							"base": "10",
							"mult": "1"
						},
						"cash": {
							"base": "-10",
							"mult": "0"
						}
					}
				],
				"msgs": [
					"Why was no one watching the game?",
					"You had to have food for the game",
					"Nice party!"
				],
				"cutoffs": [
					"0",
					"2",
					"6"
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
						"cash": {
							"base": "-5",
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
					"Get involved!",
					"Delivered pizza and wings during the super bowl, but wings got cold before you could deliver them",
					"Great success!"
				],
				"cutoffs": [
					"0",
					"1",
					"4"
				]
			},
			"rush": {
				"rewards": [
					{
						"rep": {
							"base": "5",
							"mult": "1"
						},
						"rush": {
							"base": "10",
							"mult": "1"
						}
					}
				],
				"msgs": [
					"Rushees love the super bowl!"
				],
				"cutoffs": [
					"0"
				]
			},
			"study": {
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
					},
					{
						"rep": {
							"base": "-10",
							"mult": "0"
						}
					}
				],
				"msgs": [
					"SUPERBOWWWLLL!",
					"Streamed the game in the library, good thinking",
					"You only watch for the commercials anyway"
				],
				"cutoffs": [
					"0",
					"1",
					"6"
				]
			}
		}
	};

var coldInfo = {
		"descript": "Freezing Cold Outside",
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
							"base": "-5",
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
					"It was too cold anyway, good call.",
					"¡°I braved the cold for this??¡±",
					"Strong effort paid off"
				],
				"cutoffs": [
					"0",
					"1",
					"5"
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
							"base": "0",
							"mult": "1"
						}
					}
				],
				"msgs": [
					"Not enough guys involved",
					"Sold hot cocoa and donated proceeds to USO"
				],
				"cutoffs": [
					"0",
					"1"
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
						"rep": {
							"base": "5",
							"mult": "0"
						},
						"cash": {
							"base": "-10",
							"mult": "0"
						}
					},
					{
						"rush": {
							"base": "2",
							"mult": "0"
						}
					}
				],
				"msgs": [
					"Too slippery",
					"Slipped on ice trying to cook burgers, need to pay for medical expenses",
					"Threw great rush event at the Blues hockey game"
				],
				"cutoffs": [
					"0",
					"1",
					"3"
				]
			},
			"study": {
				"rewards": [
					{
						"rep": {
							"base": "-5",
							"mult": "0"
						}
					},
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
					"Did poorly on assignments",
					"Did ok on assignments",
					"Studying in your nice warm room paid off"
				],
				"cutoffs": [
					"0",
					"1",
					"4"
				]
			}
		}
	};


var firstDayOfSpringInfo = {
		"descript": "First day of Spring",
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
							"base": "-5",
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
					"It was too cold anyway, good call.",
					"¡°I braved the cold for this??¡±",
					"Strong effort paid off"
				],
				"cutoffs": [
					"0",
					"1",
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
						"cash": {
							"base": "-10",
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
					"What¡¯s your fraternity about?",
					"Too busy enjoying the weather to plan event well enough",
					"Host volleyball tournament for deaf children "
				],
				"cutoffs": [
					"0",
					"1",
					"3"
				]
			},
			"rush": {
				"rewards": [
					{
						"rep": {
							"base": "-5",
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
						"rush": {
							"base": "3",
							"mult": "0"
						}
					}
				],
				"msgs": [
					"It¡¯s sunny, where were you?",
					"Played lawn games, got your name out there",
					"Had a great time playing flag football, +2 brothers"
				],
				"cutoffs": [
					"0",
					"1",
					"4"
				]
			},
			"study": {
				"rewards": [
					{
						"rep": {
							"base": "-2",
							"mult": "0"
						}
					},
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
					}
				],
				"msgs": [
					"Professors noticed you skipped class to be outside",
					"Got good grades",
					"Hitting the books outside? Great idea."
				],
				"cutoffs": [
					"0",
					"1",
					"4"
				]
			}
		}
	};

var halloweenInfo = {
		"descript": "Halloween",
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
							"base": "-5",
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
					"It was too cold anyway, good call.",
					"¡°I braved the cold for this??¡±",
					"Strong effort paid off"
				],
				"cutoffs": [
					"0",
					"1",
					"5"
				]
			},
			"cs": {
				"rewards": [
					{
						"rep": {
							"base": "-6",
							"mult": "0"
						}
					},
					{
						"rep": {
							"base": "8",
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
					"Are you even trying?",
					"Raked leaves for charity",
					"Safe trick or treat!"
				],
				"cutoffs": [
					"0",
					"1",
					"5"
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
						"rep": {
							"base": "5",
							"mult": "0"
						},
						"rush": {
							"base": "5",
							"mult": "0"
						}
					}
				],
				"msgs": [
					"Missed out on rush opportunity",
					"Threw great rush event at an outdoor concert"
				],
				"cutoffs": [
					"0",
					"2"
				]
			},
			"study": {
				"rewards": [
					{
						"rep": {
							"base": "0",
							"mult": "0"
						}
					},
					{
						"rep": {
							"base": "7",
							"mult": "0"
						}
					},
					{
						"rep": {
							"base": "4",
							"mult": "1"
						}
					}
				],
				"msgs": [
					"Too busy eating candy?",
					"Wore your costume to the library.",
					"How you aced that test in a cow costume is anyone¡¯s guess"
				],
				"cutoffs": [
					"0",
					"1",
					"5"
				]
			}
		}
	};

var forthOfJulyInfo = {
		"descript": "Forth of July",
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
							"base": "5",
							"mult": "1"
						}
					}
				],
				"msgs": [
					"Why aren't you celebrating?",
					"BBQ! "
				],
				"cutoffs": [
					"0",
					"3"
				]
			},
			"cs": {
				"rewards": [
					{
						"rep": {
							"base": "-6",
							"mult": "0"
						}
					},
					{
						"rep": {
							"base": "8",
							"mult": "0"
						}
					},
					{
						"rep": {
							"base": "5",
							"mult": "1"
						},
						"cash": {
							"base": "-10",
							"mult": "0"
						}
					}
				],
				"msgs": [
					"America is about Community Service!",
					"Patriotism at it¡¯s best.",
					"Donating food to the hungry"
				],
				"cutoffs": [
					"0",
					"3",
					"5"
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
						"rep": {
							"base": "5",
							"mult": "0"
						}
					},
					{
						"rush": {
							"base": "4",
							"mult": "0"
						}
					}
				],
				"msgs": [
					"Do you love this country or not?",
					"USA! USA!",
					"USA! USA!"
				],
				"cutoffs": [
					"0",
					"1",
					"4"
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
							"base": "1",
							"mult": "1"
						}
					}
				],
				"msgs": [
					"America is falling behind.",
					"Study for the USA!"
				],
				"cutoffs": [
					"0",
					"3"
				]
			}
		}
	};

var parentWeekendInfo = {
		"descript": "Parents Weekend",
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
							"base": "-10",
							"mult": "0"
						}
					}
				],
				"msgs": [
					"People were too busy with their parents",
					"Good showing",
					"People were too tired from partying to deal with parents"
				],
				"cutoffs": [
					"0",
					"5",
					"11"
				]
			},
			"cs": {
				"rewards": [
					{
						"rep": {
							"base": "-6",
							"mult": "0"
						}
					},
					{
						"rep": {
							"base": "-10",
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
					"Parents steer their kids away from you",
					"Misspelled ¡°Noodles¡± on your event flyers",
					"People took their parents to your great Community Service event at the local restaurant"
				],
				"cutoffs": [
					"0",
					"1",
					"4"
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
						"rep": {
							"base": "-6",
							"mult": "0"
						}
					}
				],
				"msgs": [
					"Parents don¡¯t join fraternities",
					"Parents at the house scared off potential rushees"
				],
				"cutoffs": [
					"0",
					"3"
				]
			},
			"study": {
				"rewards": [
					{
						"cash": {
							"base": "-10",
							"mult": "0"
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
					"Parents rethinking paying your dues",
					"Made your parents proud"
				],
				"cutoffs": [
					"0",
					"4"
				]
			}
		}
	};

var midtermsWeekInfo = {
		"descript": "Midterms Week",
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
							"mult": "-1"
						}
					}
				],
				"msgs": [
					"Brothers needed to study",
					"Noise complaint from neighbors trying to study"
				],
				"cutoffs": [
					"0",
					"6"
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
							"base": "1",
							"mult": "1"
						}
					}
				],
				"msgs": [
					"Too busy studying",
					"Sold sandwiches in the quad with donations to the Red Cross"
				],
				"cutoffs": [
					"0",
					"6"
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
						"rep": {
							"base": "0",
							"mult": "-1"
						}
					}
				],
				"msgs": [
					"It¡¯s okay, rushees were studying too",
					"Bugged rushees trying to study"
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
							"base": "-8",
							"mult": "0"
						}
					},
					{
						"rep": {
							"base": "9",
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
					"Did poorly on exams",
					"Passed!",
					"Aced it!"
				],
				"cutoffs": [
					"0",
					"4",
					"8"
				]
			}
		}
	};

var proStudentWeekInfo = {
		"descript": "Prospective Student Weekend",
		"categories": {
			"party": {
				"rewards": [
					{
						"rep": {
							"base": "-6",
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
							"base": "-15",
							"mult": "0"
						}
					}
				],
				"msgs": [
					"None of the prospectives heard about your party",
					"Convinced some prospectives to enroll",
					"School heard you had pre-frosh over"
				],
				"cutoffs": [
					"0",
					"1",
					"5"
				]
			},
			"cs": {
				"rewards": [
					{
						"rep": {
							"base": "-10",
							"mult": "0"
						},
						"cash": {
							"base": "-10",
							"mult": "0"
						}
					},
					{
						"rep": {
							"base": "0",
							"mult": "0"
						}
					},
					{
						"rep": {
							"base": "1",
							"mult": "1"
						}
					}
				],
				"msgs": [
					"Visiting shirts came across as offensive.  Did you put any thought into it?",
					"Your sales broke even. What was the point?",
					"Prospectives loved your t-shirt design and bought them like hotcakes."
				],
				"cutoffs": [
					"0",
					"1",
					"4"
				]
			},
			"rush": {
				"rewards": [
					{
						"rep": {
							"base": "0",
							"mult": "0"
						}
					}
				],
				"msgs": [
					"No rush events allowed over this weekend"
				],
				"cutoffs": [
					"0"
				]
			},
			"study": {
				"rewards": [
					{
						"rep": {
							"base": "-8",
							"mult": "0"
						}
					},
					{
						"rep": {
							"base": "9",
							"mult": "0"
						}
					}
				],
				"msgs": [
					"Too busy chasing around tour groups to get good grades",
					"Show those prospies what it takes to succeed around here"
				],
				"cutoffs": [
					"0",
					"1"
				]
			}
		}
	};

var stPatricksDay = {
		"descript": "St Patricks Day",
		"categories": {
			"party": {
				"rewards": [
					{
						"rep": {
							"base": "-8",
							"mult": "0"
						}
					},
					{
						"rep": {
							"base": "9",
							"mult": "0"
						}
					},
					{
						"rep": {
							"base": "1",
							"mult": "1"
						},
						"cash": {
							"base": "-5",
							"mult": "0"
						}
					}
				],
				"msgs": [
					"No party?",
					"Nice one",
					"Everyone got caffeinated, need to pay for cleaning up"
				],
				"cutoffs": [
					"0",
					"3",
					"6"
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
							"base": "0",
							"mult": "1"
						}
					}
				],
				"msgs": [
					"All caffeinated",
					"Sold some green hats and donated the money"
				],
				"cutoffs": [
					"0",
					"4"
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
							"base": "3",
							"mult": "0"
						}
					}
				],
				"msgs": [
					"Where is everyone?",
					"Had a good time!"
				],
				"cutoffs": [
					"0",
					"4"
				]
			},
			"study": {
				"rewards": [
					{
						"rep": {
							"base": "-5",
							"mult": "0"
						}
					},
					{
						"rep": {
							"base": "9",
							"mult": "0"
						}
					}
				],
				"msgs": [
					"Tried to use ¡°Leprechauns ate my homework¡± excuse",
					"Luck of the Irish came through on your pop-quiz"
				],
				"cutoffs": [
					"0",
					"3"
				]
			}
		}
	};

//**********************************************************************
var events = [];
events[0] = mardiGrasInfo;
events[1] = standardWeekInfo;
events[2] = finalsWeekInfo;
events[3] = superBowlInfo;