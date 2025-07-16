import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Save, Sparkles, X, CheckCircle, AlertCircle } from 'lucide-react';
import SidebarSub from '../../../component/template/SidebarSub';
import TopHeader from '../../../component/template/TopHeader';
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

const JobRoleForm = () => {
  const [jobRoleName, setJobRoleName] = useState('');
  const [skillLists, setSkillLists] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAIPopup, setShowAIPopup] = useState(false);
  const [filter, setFilter] = useState('all'); // all, skills, questions

  const [aiJobRoleName, setAiJobRoleName] = useState('');
  const [aiSkillName, setAiSkillName] = useState('');
  const [aiNumQuestions, setAiNumQuestions] = useState('');
  const [aiNumAnswers, setAiNumAnswers] = useState('');

  const handleAddSkill = () => {
    setSkillLists([...skillLists, { skillId: null, skillName: '', skillQuestions: [] }]);
  };

  const handleAddQuestion = (skillIndex) => {
    const newSkills = [...skillLists];
    newSkills[skillIndex].skillQuestions.push({
      questionId: null,
      question: '',
      skillAnswers: [],
    });
    setSkillLists(newSkills);
  };

  const handleAddAnswer = (skillIndex, questionIndex) => {
    const newSkills = [...skillLists];
    newSkills[skillIndex].skillQuestions[questionIndex].skillAnswers.push({
      skillAnswerId: null,
      answer: '',
      status: false,
    });
    setSkillLists(newSkills);
  };

  const handleRemoveSkill = (skillIndex) => {
    setSkillLists(skillLists.filter((_, i) => i !== skillIndex));
  };

  const handleRemoveQuestion = (skillIndex, questionIndex) => {
    const newSkills = [...skillLists];
    newSkills[skillIndex].skillQuestions.splice(questionIndex, 1);
    setSkillLists(newSkills);
  };

  const handleRemoveAnswer = (skillIndex, questionIndex, answerIndex) => {
    const newSkills = [...skillLists];
    newSkills[skillIndex].skillQuestions[questionIndex].skillAnswers.splice(answerIndex, 1);
    setSkillLists(newSkills);
  };

  const handleChange = (e, skillIndex, field) => {
    const newSkills = [...skillLists];
    newSkills[skillIndex][field] = e.target.value;
    setSkillLists(newSkills);
  };

  const handleQuestionChange = (e, skillIndex, questionIndex, field) => {
    const newSkills = [...skillLists];
    newSkills[skillIndex].skillQuestions[questionIndex][field] = e.target.value;
    setSkillLists(newSkills);
  };

  const handleAnswerChange = (e, skillIndex, questionIndex, answerIndex, field) => {
    const newSkills = [...skillLists];
    const value = field === 'status' ? e.target.checked : e.target.value;
    newSkills[skillIndex].skillQuestions[questionIndex].skillAnswers[answerIndex][field] = value;
    setSkillLists(newSkills);
  };

  const handleSubmit = async () => {
    if (!jobRoleName.trim()) return alert('Please enter a job role name');
    if (skillLists.length === 0) return alert('Add at least one skill');

    for (let i = 0; i < skillLists.length; i++) {
      const skill = skillLists[i];
      if (!skill.skillName.trim()) return alert(`Skill ${i + 1} missing name`);
      if (skill.skillQuestions.length === 0) return alert(`Add question for skill ${skill.skillName}`);

      for (let j = 0; j < skill.skillQuestions.length; j++) {
        const question = skill.skillQuestions[j];
        if (!question.question.trim()) return alert(`Question ${j + 1} missing text in skill ${skill.skillName}`);
        if (question.skillAnswers.length === 0) return alert(`Add answers to question: ${question.question}`);

        const correct = question.skillAnswers.some((a) => a.status);
        if (!correct) return alert(`Mark a correct answer for question: ${question.question}`);
      }
    }

    try {
      setIsSubmitting(true);
      const jobRoleData = { jobRoleName, jobRoleId: null, skillLists };
      await axios.post('http://localhost:8080/api/v1/jobRole', [jobRoleData], {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Job role saved successfully');
      setJobRoleName('');
      setSkillLists([]);
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to save job role');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateNow = async () => {
    if (!aiJobRoleName || !aiSkillName || !aiNumQuestions || !aiNumAnswers) {
      alert('Please fill in all fields');
      return;
    }

    const apiKey = 'AIzaSyCQUQ9sYtjSjasfpps4bK00hUkqdMwSDV0';
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Generate ${aiNumQuestions} quiz questions for the skill "${aiSkillName}" under the job role "${aiJobRoleName}". Each question must have ${aiNumAnswers} answer options. Return JSON:
[
  {"question": "What is React?", "answers": [
    {"text": "A JavaScript library", "isCorrect": true},
    {"text": "A type of CSS", "isCorrect": false}
  ]}
]`;

    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const jsonMatch = text.match(/\[.*\]/s);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);

        const shuffledSkillQuestions = parsed.map((q) => ({
          questionId: null,
          question: q.question,
          skillAnswers: shuffleArray(
            q.answers.map((a) => ({
              skillAnswerId: null,
              answer: a.text,
              status: a.isCorrect,
            }))
          ),
        }));

        const newSkill = {
          skillId: null,
          skillName: aiSkillName,
          skillQuestions: shuffledSkillQuestions,
        };

        setSkillLists((prev) => [...prev, newSkill]);
        setShowAIPopup(false);
        // Reset AI form
        setAiJobRoleName('');
        setAiSkillName('');
        setAiNumQuestions('');
        setAiNumAnswers('');
      } else {
        alert('Invalid AI response format');
        console.log(text);
      }
    } catch (err) {
      console.error('AI error:', err);
      alert('AI generation failed');
    }
  };

  // Shuffle utility
  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  // Get counts for filter tabs
  const getCounts = () => {
    const totalQuestions = skillLists.reduce((acc, skill) => acc + skill.skillQuestions.length, 0);
    return {
      all: skillLists.length + totalQuestions,
      skills: skillLists.length,
      questions: totalQuestions,
    };
  };

  const counts = getCounts();

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <SidebarSub />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <TopHeader HeaderMessage={'Job Role Management'} />

        <div className="flex-1 flex m-5 flex-col pt-5 pl-10 overflow-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Add Job Role</h1>
            <p className="text-gray-600 mt-2">Create and manage job roles with skills and quiz questions</p>
          </div>

          {/* Job Role Name Input */}
          <div className="mb-6">
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Job Role Information</h3>
                <button
                  onClick={() => setShowAIPopup(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate with AI
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Role Name</label>
                  <input
                    type="text"
                    placeholder="Enter job role name (e.g., Software Engineer, Data Scientist)"
                    value={jobRoleName}
                    onChange={(e) => setJobRoleName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {[
                { key: 'all', label: `All Items (${counts.all})` },
                { key: 'skills', label: `Skills (${counts.skills})` },
                { key: 'questions', label: `Questions (${counts.questions})` },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  className={`py-4 px-1 font-medium text-sm ${
                    filter === key ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setFilter(key)}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Skills Section */}
          <div className="mr-8">
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              {skillLists.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No skills added yet</h3>
                  <p className="text-sm text-gray-500 mb-4">Start by adding skills to your job role</p>
                  <button
                    onClick={handleAddSkill}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Skill
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {skillLists.map((skill, skillIndex) => (
                    <div key={skillIndex} className="p-6">
                      {/* Skill Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-800">{skillIndex + 1}</span>
                          </div>
                          <h3 className="ml-3 text-lg font-semibold text-gray-900">
                            {skill.skillName || `Skill ${skillIndex + 1}`}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleAddQuestion(skillIndex)}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Question
                          </button>
                          <button
                            onClick={() => handleRemoveSkill(skillIndex)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Skill Name Input */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Skill Name</label>
                        <input
                          type="text"
                          value={skill.skillName}
                          onChange={(e) => handleChange(e, skillIndex, 'skillName')}
                          placeholder="Enter skill name (e.g., JavaScript, Problem Solving)"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      {/* Questions */}
                      {skill.skillQuestions.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="text-md font-medium text-gray-900 flex items-center">
                            <Edit3 className="h-4 w-4 mr-2" />
                            Questions ({skill.skillQuestions.length})
                          </h4>
                          {skill.skillQuestions.map((question, qIdx) => (
                            <div key={qIdx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-gray-700">Question {qIdx + 1}</span>
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => handleAddAnswer(skillIndex, qIdx)}
                                    className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                  >
                                    <Plus className="h-3 w-3 mr-1" />
                                    Add Answer
                                  </button>
                                  <button
                                    onClick={() => handleRemoveQuestion(skillIndex, qIdx)}
                                    className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>

                              <input
                                type="text"
                                value={question.question}
                                onChange={(e) => handleQuestionChange(e, skillIndex, qIdx, 'question')}
                                placeholder="Enter your question here"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3"
                              />

                              {/* Answers */}
                              {question.skillAnswers.length > 0 && (
                                <div className="space-y-2">
                                  <span className="text-sm font-medium text-gray-700">Answer Options:</span>
                                  {question.skillAnswers.map((answer, aIdx) => (
                                    <div key={aIdx} className="flex items-center space-x-2">
                                      <input
                                        type="text"
                                        value={answer.answer}
                                        onChange={(e) => handleAnswerChange(e, skillIndex, qIdx, aIdx, 'answer')}
                                        placeholder={`Answer option ${aIdx + 1}`}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                      />
                                      <label className="flex items-center space-x-2 min-w-fit">
                                        <input
                                          type="checkbox"
                                          checked={answer.status}
                                          onChange={(e) => handleAnswerChange(e, skillIndex, qIdx, aIdx, 'status')}
                                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <span className="text-sm text-gray-700">Correct</span>
                                      </label>
                                      <button
                                        onClick={() => handleRemoveAnswer(skillIndex, qIdx, aIdx)}
                                        className="inline-flex items-center p-1 border border-transparent text-xs font-medium rounded text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 mb-8 mr-8">
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <button
                    onClick={handleAddSkill}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Skill
                  </button>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !jobRoleName.trim() || skillLists.length === 0}
                  className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Job Role
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Generation Modal */}
      {showAIPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 shadow w-11/12 max-w-xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
                    Generate Quiz with AI
                  </h3>
                  <p className="text-gray-600 mt-1">Let AI generate quiz questions for your skill</p>
                </div>
                <button
                  onClick={() => setShowAIPopup(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Role Name</label>
                  <input
                    type="text"
                    value={aiJobRoleName}
                    onChange={(e) => setAiJobRoleName(e.target.value)}
                    placeholder="e.g., Software Engineer"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skill Name</label>
                  <input
                    type="text"
                    value={aiSkillName}
                    onChange={(e) => setAiSkillName(e.target.value)}
                    placeholder="e.g., JavaScript, React, Problem Solving"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Questions</label>
                    <input
                      type="number"
                      value={aiNumQuestions}
                      onChange={(e) => setAiNumQuestions(e.target.value)}
                      placeholder="5"
                      min="1"
                      max="20"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Answers per Question</label>
                    <input
                      type="number"
                      value={aiNumAnswers}
                      onChange={(e) => setAiNumAnswers(e.target.value)}
                      placeholder="4"
                      min="2"
                      max="6"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAIPopup(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGenerateNow}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobRoleForm;
