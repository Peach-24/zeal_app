// initial example challenge set
export const challengeSet = [
  {
    challengeNum: 1,
    topic: "Portrait",
  },
  {
    challengeNum: 2,
    topic: "RuleOfThirds",
  },
  {
    challengeNum: 3,
    topic: "Human Form",
  },
  {
    challengeNum: 4,
    topic: "Covidiots",
  },
  {
    challengeNum: 5,
    topic: "Masktapiece",
  },
];

const mixSet = {
  id: 1,
  setTitle: "Mix",
  challenges: [
    {
      challengeNum: 1,
      topic: "Portrait",
      desc: "",
    },
    {
      challengeNum: 2,
      topic: "Rule of Thirds",
      desc: "",
    },
    {
      challengeNum: 3,
      topic: "Human Form",
      desc: "",
    },
    {
      challengeNum: 4,
      topic: "Covidiots",
      desc: "",
    },
    {
      challengeNum: 5,
      topic: "Masktapiece",
      desc: "",
    },
  ],
};

const techSet = {
  id: 2,
  setTitle: "Technical",
  challenges: [
    {
      challengeNum: 1,
      topic: "Leading Lines",
      desc: "",
    },
    {
      challengeNum: 2,
      topic: "Frame in a Frame",
      desc: "",
    },
    {
      challengeNum: 3,
      topic: "Low Angle",
      desc: "",
    },
    {
      challengeNum: 4,
      topic: "Rule of Thirds",
      desc: "",
    },
    {
      challengeNum: 5,
      topic: "Macro",
      desc: "",
    },
  ],
};

const creativeSet = {
  id: 3,
  setTitle: "Creative",
  challenges: [
    {
      challengeNum: 1,
      topic: "Comfort",
      desc: "",
    },
    {
      challengeNum: 2,
      topic: "Resilience",
      desc: "",
    },
    {
      challengeNum: 3,
      topic: "Precision",
      desc: "",
    },
    {
      challengeNum: 4,
      topic: "Connection",
      desc: "",
    },
    {
      challengeNum: 5,
      topic: "Opposites",
      desc: "",
    },
  ],
};

export const challengeSets = [techSet, creativeSet, mixSet];
