import React, { useState } from 'react';
import axios from 'axios';

const JobRoleForm = () => {
  const [jobRoleName, setJobRoleName] = useState('');
  const [skillLists, setSkillLists] = useState([]);

  const handleAddSkill = () => {
    setSkillLists([
      ...skillLists,
      {
        skillId: null,
        skillName: '',
        skillQuestions: []
      }
    ]);
  };

  const handleAddQuestion = (skillIndex) => {
    const newSkills = [...skillLists];
    newSkills[skillIndex].skillQuestions.push({
      questionId: null,
      question: '',
      skillAnswers: []
    });
    setSkillLists(newSkills);
  };

  const handleAddAnswer = (skillIndex, questionIndex) => {
    const newSkills = [...skillLists];
    newSkills[skillIndex].skillQuestions[questionIndex].skillAnswers.push({
      skillAnswerId: null,
      answer: '',
      status: false
    });
    setSkillLists(newSkills);
  };

  const handleChange = (e, skillIndex, field, type = 'skill') => {
    const newSkills = [...skillLists];
    if (type === 'skill') {
      newSkills[skillIndex][field] = e.target.value;
    }
    setSkillLists(newSkills);
  };

  const handleQuestionChange = (e, skillIndex, questionIndex, field) => {
    const newSkills = [...skillLists];
    newSkills[skillIndex].skillQuestions[questionIndex][field] = e.target.value;
    setSkillLists(newSkills);
  };

  const handleAnswerChange = (e, skillIndex, questionIndex, answerIndex, field) => {
    const newSkills = [...skillLists];
    if (field === 'status') {
      newSkills[skillIndex].skillQuestions[questionIndex].skillAnswers[answerIndex][field] = e.target.checked;
    } else {
      newSkills[skillIndex].skillQuestions[questionIndex].skillAnswers[answerIndex][field] = e.target.value;
    }
    setSkillLists(newSkills);
  };

  const handleSubmit = async () => {
    const jobRoleData = {
      jobRoleName,
      jobRoleId: null, // if you're auto-generating ID, set to null
      skillLists
    };

    try {
      const response = await axios.post('http://localhost:8080/api/v1/jobRole', [jobRoleData]); // post as a list
      alert('Job role saved successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error saving job role:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add Job Role</h2>
      <input
        type="text"
        placeholder="Job Role Name"
        value={jobRoleName}
        onChange={(e) => setJobRoleName(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      {skillLists.map((skill, skillIndex) => (
        <div key={skillIndex} className="mb-6 border p-3 rounded">
          <input
            type="text"
            placeholder="Skill Name"
            value={skill.skillName}
            onChange={(e) => handleChange(e, skillIndex, 'skillName')}
            className="border p-2 w-full mb-2"
          />
          <button
            onClick={() => handleAddQuestion(skillIndex)}
            className="bg-blue-500 text-white px-2 py-1 rounded mb-2"
          >
            Add Question
          </button>

          {skill.skillQuestions.map((question, questionIndex) => (
            <div key={questionIndex} className="mb-4 p-3 border">
              <input
                type="text"
                placeholder="Question"
                value={question.question}
                onChange={(e) => handleQuestionChange(e, skillIndex, questionIndex, 'question')}
                className="border p-2 w-full mb-2"
              />

              <button
                onClick={() => handleAddAnswer(skillIndex, questionIndex)}
                className="bg-green-500 text-white px-2 py-1 rounded mb-2"
              >
                Add Answer
              </button>

              {question.skillAnswers.map((answer, answerIndex) => (
                <div key={answerIndex} className="flex items-center mb-1">
                  <input
                    type="text"
                    placeholder="Answer"
                    value={answer.answer}
                    onChange={(e) =>
                      handleAnswerChange(e, skillIndex, questionIndex, answerIndex, 'answer')
                    }
                    className="border p-1 mr-2 flex-1"
                  />
                  <label className="mr-2">
                    <input
                      type="checkbox"
                      checked={answer.status}
                      onChange={(e) =>
                        handleAnswerChange(e, skillIndex, questionIndex, answerIndex, 'status')
                      }
                    />{' '}
                    Correct
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={handleAddSkill}
        className="bg-purple-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Skill
      </button>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Submit Job Role
      </button>
    </div>
  );
};

export default JobRoleForm;
