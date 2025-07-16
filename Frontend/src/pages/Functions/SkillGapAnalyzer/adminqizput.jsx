import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Plus, Trash2, Edit3, Save, CheckCircle, AlertCircle } from 'lucide-react';
import SidebarSub from '../../../component/template/SidebarSub';
import TopHeader from '../../../component/template/TopHeader';

export default function MatchedPersona() {
  const [jobRoleName, setJobRoleName] = useState('');
  const [skillLists, setSkillLists] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');
  const [filter, setFilter] = useState('all'); // all, skills, questions

  const { jobRoleId } = useParams();
  const location = useLocation();
  const selectedSkillId = location.state?.selectedSkillId || null;

  const fetchJobRole = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/jobRole/${jobRoleId}`);
      const data = Array.isArray(response.data) ? response.data[0] : response.data;
      setJobRoleName(data.jobRoleName || '');

      const filteredSkills = selectedSkillId
        ? data.skillLists?.filter((skill) => skill.skillId === selectedSkillId)
        : data.skillLists || [];

      setSkillLists(filteredSkills);
      setDebugInfo(`Filtered Skill Data: ${JSON.stringify(filteredSkills, null, 2)}`);
    } catch (error) {
      setDebugInfo(`GET Error: ${error.message}`);
      alert('Failed to load job role data');
    }
  };

  useEffect(() => {
    fetchJobRole();
  }, [jobRoleId, selectedSkillId]);

  const handleSkillChange = (e, skillIndex) => {
    const updated = [...skillLists];
    updated[skillIndex].skillName = e.target.value;
    setSkillLists(updated);
  };

  const handleQuestionChange = (e, skillIndex, questionIndex) => {
    const updated = [...skillLists];
    updated[skillIndex].skillQuestions[questionIndex].question = e.target.value;
    setSkillLists(updated);
  };

  const handleAnswerChange = (e, skillIndex, questionIndex, answerIndex, field) => {
    const updated = [...skillLists];
    if (field === 'status') {
      updated[skillIndex].skillQuestions[questionIndex].skillAnswers[answerIndex].status = e.target.checked;
    } else {
      updated[skillIndex].skillQuestions[questionIndex].skillAnswers[answerIndex].answer = e.target.value;
    }
    setSkillLists(updated);
  };

  const handleAddAnswer = (skillIndex, questionIndex) => {
    const updated = [...skillLists];
    updated[skillIndex].skillQuestions[questionIndex].skillAnswers.push({
      skillAnswerId: null,
      answer: '',
      status: false,
    });
    setSkillLists(updated);
  };

  const handleDeleteAnswer = (skillIndex, questionIndex, answerIndex) => {
    const updated = [...skillLists];
    updated[skillIndex].skillQuestions[questionIndex].skillAnswers.splice(answerIndex, 1);
    setSkillLists(updated);
  };

  const handleAddQuestion = (skillIndex) => {
    const updated = [...skillLists];
    updated[skillIndex].skillQuestions.push({
      questionId: null,
      question: '',
      skillAnswers: [{ skillAnswerId: null, answer: '', status: false }],
    });
    setSkillLists(updated);
  };

  const handleDeleteQuestion = (skillIndex, questionIndex) => {
    const updated = [...skillLists];
    updated[skillIndex].skillQuestions.splice(questionIndex, 1);
    setSkillLists(updated);
  };

  const handleSubmit = async () => {
    if (!jobRoleName.trim()) {
      alert('Please enter a job role name');
      return;
    }

    for (let i = 0; i < skillLists.length; i++) {
      const skill = skillLists[i];
      if (!skill.skillName.trim()) {
        alert(`Please enter a name for skill ${i + 1}`);
        return;
      }

      for (let j = 0; j < skill.skillQuestions.length; j++) {
        const question = skill.skillQuestions[j];
        if (!question.question.trim()) {
          alert(`Please enter question text for question ${j + 1} in skill: ${skill.skillName}`);
          return;
        }

        const hasCorrectAnswer = question.skillAnswers.some((a) => a.status === true);
        if (!hasCorrectAnswer) {
          alert(`Please mark at least one answer as correct for question: ${question.question}`);
          return;
        }
      }
    }

    const jobRoleData = {
      jobRoleName,
      jobRoleId,
      skillLists,
    };

    setIsSubmitting(true);
    setDebugInfo('Preparing to send data...');

    try {
      const response = await axios.post('http://localhost:8080/api/v1/jobRole', [jobRoleData], {
        headers: { 'Content-Type': 'application/json' },
      });

      setDebugInfo(`Success: ${JSON.stringify(response.data, null, 2)}`);
      alert('Job role updated successfully!');
      await fetchJobRole(); // Refresh after submit
    } catch (error) {
      setDebugInfo(`POST Error: ${error.message}`);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <TopHeader HeaderMessage="Edit Questions and Answers" />

        <div className="flex-1 flex m-5 flex-col pt-5 pl-10 overflow-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Edit Job Role</h1>
            <p className="text-gray-600 mt-2">Modify existing job role with skills and quiz questions</p>
          </div>

          {/* Job Role Name Input */}
          <div className="mb-6">
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Role Information</h3>
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
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No skills found</h3>
                  <p className="text-sm text-gray-500 mb-4">The selected skill data could not be loaded</p>
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
                        </div>
                      </div>

                      {/* Skill Name Input */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Skill Name</label>
                        <input
                          type="text"
                          value={skill.skillName}
                          onChange={(e) => handleSkillChange(e, skillIndex)}
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
                                    onClick={() => handleDeleteQuestion(skillIndex, qIdx)}
                                    className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>

                              <input
                                type="text"
                                value={question.question}
                                onChange={(e) => handleQuestionChange(e, skillIndex, qIdx)}
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
                                        onClick={() => handleDeleteAnswer(skillIndex, qIdx, aIdx)}
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
              <div className="flex items-center justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !jobRoleName.trim() || skillLists.length === 0}
                  className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Update Job Role
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
