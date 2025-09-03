"use client";
import React, { useState } from 'react';
import { Edit2, Upload, X, Check } from 'lucide-react';

const PageProfile = () => {
  const [formData, setFormData] = useState({
    fullName: 'Ronald Richards',
    email: 'RonaldRich@example.com',
    phone: '(219) 555-0114',
    location: 'California',
    bio: `Hi 👋, I'm Ronald, a passionate UX designer with 10 of experience in creating intuitive and user-centered digital experiences. With a strong background in user research, information architecture, and interaction design, I am dedicated to crafting seamless and delightful user journeys.

I have a keen eye for detail and a deep understanding of user needs, which allows me to create visually appealing and functional designs. I am proficient in using industry-`
  });

  const [completionPercentage] = useState(40);

  const completionItems = [
    { label: 'Setup account', completed: true, percentage: '10%' },
    { label: 'Upload your photo', completed: true, percentage: '5%' },
    { label: 'Personal info', completed: true, percentage: '10%' },
    { label: 'Location', completed: false, percentage: '+20%' },
    { label: 'Biography', completed: false, percentage: '15%' },
    { label: 'Notifications', completed: false, percentage: '+10%' },
    { label: 'Bank details', completed: false, percentage: '+30%' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">Edit Profile</h1>
              
              {/* Profile Photo Section */}
              <div className="flex items-center space-x-4 mb-8">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <img 
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='40' r='15' fill='%23fff'/%3E%3Cpath d='M25 85c0-15 10-25 25-25s25 10 25 25' fill='%23fff'/%3E%3C/svg%3E" 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
                    <Upload className="w-4 h-4" />
                    <span>Upload new photo</span>
                  </button>
                  <p className="text-sm text-gray-500 mt-1">
                    At least 800×800 px recommended.<br />
                    JPG or PNG is allowed
                  </p>
                </div>
              </div>

              {/* Personal Info */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Personal info</h2>
                  <button className="text-gray-600 hover:text-gray-800">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Location</h2>
                  <button className="text-gray-400 hover:text-gray-600">Cancel</button>
                </div>
                
                <div className="flex space-x-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="California"
                      className="w-full p-3 border-2 border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="absolute left-3 top-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
                    Save changes
                  </button>
                </div>
              </div>

              {/* Bio */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Bio</h2>
                  <button className="text-gray-600 hover:text-gray-800">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
                
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>

          {/* Sidebar - Complete your profile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Complete your profile</h3>
              
              {/* Progress Circle */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#10b981"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${completionPercentage * 2.51} 251.2`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{completionPercentage}%</span>
                  </div>
                </div>
              </div>

              {/* Completion Items */}
              <div className="space-y-3">
                {completionItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        item.completed 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-gray-300'
                      }`}>
                        {item.completed && <Check className="w-3 h-3 text-white" />}
                        {!item.completed && <X className="w-3 h-3 text-gray-400" />}
                      </div>
                      <span className={`text-sm ${
                        item.completed ? 'text-gray-900' : 'text-gray-600'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                    <span className={`text-sm font-medium ${
                      item.completed 
                        ? 'text-gray-500' 
                        : item.percentage.startsWith('+') 
                          ? 'text-green-600' 
                          : 'text-gray-500'
                    }`}>
                      {item.percentage}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageProfile;