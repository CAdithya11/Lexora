// MentorFeedbackPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Star, MessageCircle, User } from 'lucide-react';
import axios from 'axios';
import SidebarSub from '../../../../component/template/SidebarSub';
import TopHeader from '../../../../component/template/TopHeader';
import Alert from '../../../../component/template/alert/Alert';

export default function MentorFeedbackPage() {
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  const handleGetUserDetails = (e) => {
    console.log('This is the user details', e);
    setUserDetails(e);
  };

  const showAlert = (text, type = 'success') => {
    setAlertMessage(text);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage('');
      setAlertType('');
    }, 3000);
  };

  // Fetch feedbacks data
  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/v2/mentorFeedbacks/${userDetails.user_id}`);
      console.log('This is the feedback response ', response.data);
      // Sort feedbacks by date in reverse chronological order (newest first)
      const sortedFeedbacks = response.data.sort(
        (a, b) => new Date(b.feedback_date_time) - new Date(a.feedback_date_time)
      );
      setFeedbacks(sortedFeedbacks);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      showAlert('Failed to fetch feedbacks. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userDetails && userDetails.user_id) {
      fetchFeedbacks();
    }
  }, [userDetails]);

  // Get rating badge styling
  const getRatingBadge = (rating) => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full flex items-center';
    if (rating >= 4.5) return `${baseClasses} bg-green-100 text-green-800`;
    if (rating >= 3.5) return `${baseClasses} bg-yellow-100 text-yellow-800`;
    if (rating >= 2.5) return `${baseClasses} bg-orange-100 text-orange-800`;
    return `${baseClasses} bg-red-100 text-red-800`;
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 text-yellow-400 fill-current opacity-50" />);
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  // Just use all feedbacks without filtering
  const filteredFeedbacks = feedbacks;

  // Format date to display
  const formatDate = (dateTime) => {
    return new Date(dateTime).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Format time to display
  const formatTime = (dateTime) => {
    return new Date(dateTime).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Calculate average rating
  const getAverageRating = () => {
    if (feedbacks.length === 0) return 0;
    const sum = feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);
    return (sum / feedbacks.length).toFixed(1);
  };

  return (
    <>
      {alertMessage && <Alert message={alertMessage} type={alertType} />}
      <div className="flex h-screen overflow-hidden bg-white">
        <SidebarSub />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <TopHeader HeaderMessage={'Mentor Feedbacks'} handleGetUserDetails={handleGetUserDetails} />

          <div className="flex-1 flex m-5 flex-col pt-5 pl-10 overflow-auto">
            <h3 className="text-sml font-medium text-gray-600 mb-5">No feedbacks have been received yet</h3>
            {/* Feedbacks Table */}
            <div className="mr-8">
              <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
                    <span className="ml-2 text-gray-600">Loading feedbacks...</span>
                  </div>
                ) : filteredFeedbacks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <MessageCircle className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No feedbacks found</h3>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sender
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rating
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Feedback
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Time
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredFeedbacks.map((feedback) => (
                          <tr key={feedback.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <User className="h-5 w-5 text-blue-600" />
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{feedback.user}</div>
                                  <div className="text-sm text-gray-500">Sender ID: {feedback.sender_id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex items-center mb-1">{renderStars(feedback.rating)}</div>
                                <div className="flex items-center ml-2 mb-1">{'( ' + feedback.rating + ' )'}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900 max-w-xs">
                                <p className="line-clamp-3 break-words">{feedback.feedback}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex flex-col text-sm text-gray-900">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                  {formatDate(feedback.feedback_date_time)}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex flex-col text-sm text-gray-900">
                                <div className="flex items-center mt-1 text-gray-500">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {formatTime(feedback.feedback_date_time)}
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
