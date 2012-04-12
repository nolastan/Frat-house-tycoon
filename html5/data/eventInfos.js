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
						"mult": "0.2"
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
				"40",
				"70"
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
				},
				{
					"rep": {
						"base": "0",
						"mult": "2"
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
				"30",
				"60"
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
						"base": "3",
						"mult": "0.2"
					}
				}
			],
			"msgs": [
				"Rushing hard, or hardly rushing?",
				"Had a good turnout to your events."
			],
			"cutoffs": [
				"0",
				"40"
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
				"10",
				"40"
			]
		}
	}
}

var events = [
	{
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
				"30"
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
				"30"
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
						"mult": "0.2"
					}
				}
			],
			"msgs": [
				"No presence on campus.",
				"Got your name out there."
			],
			"cutoffs": [
				"0",
				"40"
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
				"40"
			]
		}
	}
},
{
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
				"30",
				"70"
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
				"40"
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
						"mult": "0.1"
					}
				},
				{
					"rep": {
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
				"10",
				"40"
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
				"10",
				"50"
			]
		}
	}
},
{
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
				"20",
				"60"
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
				"20",
				"60"
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
						"mult": "0.2"
					}
				},
				{
					"rush": {
						"base": "10",
						"mult": "0.2"
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
				"20",
				"60"
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
},
{
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
					"20",
					"50"
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
					"20",
					"55"
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
							"base": "5",
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
					"15",
					"40"
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
					"30"
				]
			}
		}
	},

	{
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
					"30",
					"60"
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
					"40",
					"60"
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
							"mult": "0.1"
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
					"15",
					"50"
				]
			}
		}
	},
	{
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
					"'I braved the cold for this??'",
					"Strong effort paid off"
				],
				"cutoffs": [
					"0",
					"20",
					"50"
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
					"24"
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
					"19",
					"45"
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
					"18",
					"42"
				]
			}
		}
	},
	{
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
					"24",
					"54"
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
					"What's your fraternity about?",
					"Too busy enjoying the weather to plan event well enough",
					"Host volleyball tournament for deaf children "
				],
				"cutoffs": [
					"0",
					"18",
					"48"
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
					"It's sunny, where were you?",
					"Played lawn games, got your name out there",
					"Had a great time playing flag football."
				],
				"cutoffs": [
					"0",
					"15",
					"45"
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
							"mult": "2"
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
					"Professors noticed you skipped class to be outside",
					"Got good grades",
					"Hitting the books outside? Great idea."
				],
				"cutoffs": [
					"0",
					"18",
					"34"
				]
			}
		}
	},
	{
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
					"'I braved the cold for this??'",
					"Strong effort paid off"
				],
				"cutoffs": [
					"0",
					"31",
					"53"
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
					"18",
					"35"
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
					"28"
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
					"16",
					"45"
				]
			}
		}
	},
	{
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
					"30"
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
					"30",
					"50"
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
					"10",
					"30"
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
					"30"
				]
			}
		}
	},
	{
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
					"18",
					"40"
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
					"Misspelled 'Noodles' on your event flyers",
					"People took their parents to your great Community Service event at the local restaurant"
				],
				"cutoffs": [
					"0",
					"18",
					"20"
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
					"Parents don't join fraternities",
					"Parents at the house scared off potential rushees"
				],
				"cutoffs": [
					"0",
					"30"
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
					"40"
				]
			}
		}
	},
	{
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
					"40"
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
					"30"
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
					"It's okay, rushees were studying too",
					"Bugged rushees trying to study"
				],
				"cutoffs": [
					"0",
					"30"
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
					"30",
					"60"
				]
			}
		}
	},
	{
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
					"18",
					"50"
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
					"15",
					"40"
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
					"19"
				]
			}
		}
	},
	{
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
					"30",
					"60"
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
					"40"
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
							"mult": "0.1"
						}
					}
				],
				"msgs": [
					"Where is everyone?",
					"Had a good time!"
				],
				"cutoffs": [
					"0",
					"40"
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
					'Tried to use "Leprechauns ate my homework" excuse',
					"Luck of the Irish came through on your pop-quiz"
				],
				"cutoffs": [
					"0",
					"15"
				]
			}
		}
	}
]

//**********************************************************************
