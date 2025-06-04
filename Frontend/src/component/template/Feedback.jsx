import React, { useState } from 'react';

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    rating: '',
    subject: '',
    feedback: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [hoveredStar, setHoveredStar] = useState(0);

  const handleStarClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating: rating.toString()
    }));
  };

  const handleStarHover = (rating) => {
    setHoveredStar(rating);
  };

  const handleStarLeave = () => {
    setHoveredStar(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Thank you for your feedback! We appreciate your input.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      category: '',
      rating: '',
      subject: '',
      feedback: ''
    });
  };

  return (
    <div>
      <div className="px-6 py-5 sm:p-5">
                <h3 className="text-2xl text-gray-900 font-medium mb-2">
                  Share Your Experience
                </h3>

                <div className="mt-14">
               
                {/* Feedback Category */}
                <div className="flex mb-6 object-center">
                  <div className="w-35 mr-5">
                    <label htmlFor="category" className="text-base font-medium text-gray-900">
                        Feedback Category
                      </label>
                  </div>
                  <div className="flex-1">
                     <select
                          name="category"
                          id="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm  focus:outline-none focus:border-blue-600 caret-blue-600"
                          required
                        >
                          <option value="roadmap">Roadmap Generator</option>
                          <option value="mentoring">Mentoring Sessions</option>
                          <option value="industry">Industry Insights</option>
                          <option value="Analyzer">Skill Gap Analyzer</option>
                          <option value="persona">Persona Matcher</option>
                          
                        </select>
                  </div>
                </div>

                {/* Overall Rating */}
                <div className="flex mb-6 object-center">
                  <div className="w-35 mr-5">
                    <label className="text-base font-medium text-gray-900">
                        Overall Rating
                    </label>
                  </div>
                   <div >
                        <div className="flex items-center ">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => handleStarClick(star)}
                              onMouseEnter={() => handleStarHover(star)}
                              onMouseLeave={handleStarLeave}
                              className="text-3xl transition-colors duration-200 focus:outline-none w-full rounded-md  px-3 "
                            >
                              <span 
                                className={`${
                                  star <= (hoveredStar || parseInt(formData.rating) || 0)
                                    ? 'text-yellow-400' 
                                    : 'text-gray-300'
                                } hover:text-yellow-400`}
                              >
                                ★
                              </span>
                            </button>
                          ))}
                        </div>
                        {formData.rating && (
                          <p className="mt-2 text-sm text-gray-600">
                            You rated: {formData.rating} star{formData.rating !== '1' ? 's' : ''}
                          </p>
                        )}
                      </div>
                </div>

                {/* Subject */}
                <div className="flex mb-6 object-center">
                  <div className="w-35 mr-5">
                    <label htmlFor="subject" className="text-base font-medium text-gray-900">
                        Subject
                      </label>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Brief summary of your feedback"
                      required
                      className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm  focus:outline-none focus:border-blue-600 caret-blue-600"
                    />
                  </div>
                </div>

                {/* Feedback Section */}
                <div className="flex mb-6 object-center">
                  <div className="w-35 mr-5">
                    <label htmlFor="feedback" className="text-base font-medium text-gray-900 ">
                        Your Feedback
                      </label>
                  </div>
                  <div className="">
                        <textarea
                          name="feedback"
                          id="feedback"
                          value={formData.feedback}
                          onChange={handleInputChange}
                          className="block w-full px-85 py-3 text-black placeholder-gray-500 transition-all bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:border-blue-600 caret-blue-600"
                          rows="6"
                          required
                        />
                      </div>

                      
                      
                    
                </div>
                 <div className="sm:col-span-2">
                      <button
                        type="submit"
                       className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 cursor-pointer"
                      >
                        Submit Feedback
                      </button>
                    </div>
                </div>
                </div>

                
              </div>


  );
}