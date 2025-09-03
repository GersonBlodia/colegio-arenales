"use client"
import React, { useState } from 'react';

interface Lesson {
  id: number;
  title: string;
  completed: boolean;
}

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
  expanded: boolean;
}

interface CourseData {
  title: string;
  progress: number;
  modules: Module[];
  currentModuleId: number;
  currentLessonId: number;
}

export const CoursePlayer: React.FC = () => {
  const [courseData, setCourseData] = useState<CourseData>({
    title: "Web Development Masterclass",
    progress: 50,
    modules: [
      {
        id: 1,
        title: "Introduction to HTML",
        expanded: true,
        lessons: [
          { id: 1, title: "Basic HTML Structure", completed: true },
          { id: 2, title: "HTML Elements", completed: true },
          { id: 3, title: "HTML Attributes", completed: false },
        ]
      },
      {
        id: 2,
        title: "CSS Fundamentals",
        expanded: false,
        lessons: [
          { id: 1, title: "CSS Selectors", completed: false },
          { id: 2, title: "Box Model", completed: false },
          { id: 3, title: "Flexbox Layout", completed: false },
        ]
      },
      {
        id: 3,
        title: "JavaScript Basics",
        expanded: false,
        lessons: [
          { id: 1, title: "Variables & Data Types", completed: false },
          { id: 2, title: "Functions", completed: false },
          { id: 3, title: "DOM Manipulation", completed: false },
        ]
      },
      {
        id: 4,
        title: "Responsive Design",
        expanded: false,
        lessons: [
          { id: 1, title: "Media Queries", completed: false },
          { id: 2, title: "Mobile-First Approach", completed: false },
          { id: 3, title: "Responsive Typography", completed: false },
        ]
      }
    ],
    currentModuleId: 1,
    currentLessonId: 2
  });

  const [activeTab, setActiveTab] = useState<string>("overview");

  const handleModuleToggle = (moduleId: number) => {
    setCourseData(prevData => ({
      ...prevData,
      modules: prevData.modules.map(module => 
        module.id === moduleId 
          ? { ...module, expanded: !module.expanded } 
          : module
      )
    }));
  };

  const getCurrentLesson = () => {
    const currentModule = courseData.modules.find(m => m.id === courseData.currentModuleId);
    if (!currentModule) return null;
    
    return currentModule.lessons.find(l => l.id === courseData.currentLessonId);
  };

  const currentLesson = getCurrentLesson();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 shadow-sm">
        <h1 className="text-xl font-bold text-blue-600">LearnPro</h1>
        <div className="mx-auto max-w-lg relative">
          <input 
            type="text" 
            placeholder="Search courses..." 
            className="bg-gray-100 px-4 py-2 rounded-full w-full text-sm focus:outline-none"
          />
          <div className="absolute right-3 top-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600 font-medium">JD</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Navigation Panel */}
        <nav className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h2 className="font-bold text-gray-800">{courseData.title}</h2>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${courseData.progress}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 mt-1 inline-block">{courseData.progress}% complete</span>
            </div>

            <h3 className="font-semibold text-gray-700 mt-6 mb-2">Modules</h3>
            <div className="space-y-2">
              {courseData.modules.map(module => (
                <div key={module.id} className="space-y-1">
                  <div 
                    className={`p-3 rounded-md flex justify-between items-center cursor-pointer ${
                      module.id === courseData.currentModuleId ? "bg-gray-100" : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleModuleToggle(module.id)}
                  >
                    <h4 className="font-semibold text-gray-800 text-sm">
                      {module.id}. {module.title}
                    </h4>
                    <span className="text-blue-600">
                      {module.expanded ? "▼" : "▶"}
                    </span>
                  </div>
                  
                  {module.expanded && (
                    <div className="pl-4 space-y-1">
                      {module.lessons.map(lesson => (
                        <div 
                          key={lesson.id} 
                          className={`flex items-center p-2 rounded-md ${
                            module.id === courseData.currentModuleId && lesson.id === courseData.currentLessonId
                              ? "bg-gray-100"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${
                            lesson.completed ? "bg-blue-600" : "bg-gray-200"
                          }`}>
                            {lesson.completed && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm text-gray-700">
                            {module.id}.{lesson.id} {lesson.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">HTML Elements</h1>
              <p className="text-sm text-gray-500">Module 1 • Lesson 2 • 15 minutes</p>
            </div>

            {/* Video Player */}
            <div className="relative mb-6">
              <div className="bg-gray-900 rounded-lg aspect-video overflow-hidden flex items-center justify-center">
                <button className="absolute z-10 bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center opacity-90">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
                <img src="/api/placeholder/690/388" alt="Video Thumbnail" className="w-full h-full object-cover opacity-70" />
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md mt-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <div className="relative h-2 w-full bg-gray-200 rounded-full">
                      <div className="absolute left-0 top-0 h-2 bg-blue-600 rounded-full w-1/3"></div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600">5:30 / 15:00</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex -mb-px">
                {["overview", "resources", "discussion", "notes"].map(tab => (
                  <button
                    key={tab}
                    className={`py-3 px-6 text-sm font-medium capitalize ${
                      activeTab === tab 
                        ? "border-b-2 border-blue-600 text-blue-600" 
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="mb-6">
              {activeTab === "overview" && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">Lesson Description</h2>
                  <p className="text-gray-700">
                    In this lesson, you'll learn about HTML elements, the building blocks of web pages. 
                    We'll explore different types of elements and how to use them effectively.
                  </p>
                </div>
              )}
              {activeTab === "resources" && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">Additional Resources</h2>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                      <a href="#" className="text-blue-600 hover:underline">HTML Elements Cheatsheet.pdf</a>
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                      <a href="#" className="text-blue-600 hover:underline">Exercise: Building a Simple Webpage</a>
                    </li>
                  </ul>
                </div>
              )}
              {activeTab === "discussion" && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">Discussion Forum</h2>
                  <p className="text-gray-700">Join the conversation with other students about HTML elements.</p>
                </div>
              )}
              {activeTab === "notes" && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">Your Notes</h2>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md" 
                    rows={5} 
                    placeholder="Write your notes here..."
                  ></textarea>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Previous
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center">
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

 