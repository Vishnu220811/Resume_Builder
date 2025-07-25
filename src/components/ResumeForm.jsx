import React, { useState } from 'react';
import ResumeTemplate1 from './ResumeTemplate1';
import ResumeTemplate2 from './ResumeTemplate2';
import { generatePDF } from '../utils/pdfGenerator';

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    linkedin: '',
    github: '',
    objective: '',
    technicalSkills: {
      languages: '',
      tools: '',
      core: ''
    },
    education: [{ institution: '', details: '', year: '' }],
    projects: [{ title: '', tech: '', description: [''] }],
    certifications: [''],
    achievements: [''],
    languages: ''
  });

  const handleChange = (e, field, index, subfield) => {
    if (field === 'technicalSkills') {
      setFormData({
        ...formData,
        technicalSkills: { ...formData.technicalSkills, [e.target.name]: e.target.value }
      });
    } else if (field === 'education') {
      const updated = [...formData.education];
      updated[index][e.target.name] = e.target.value;
      setFormData({ ...formData, education: updated });
    } else if (field === 'projects') {
      const updated = [...formData.projects];
      if (subfield === 'description') {
        updated[index].description[0] = e.target.value;
      } else {
        updated[index][e.target.name] = e.target.value;
      }
      setFormData({ ...formData, projects: updated });
    } else if (field === 'certifications' || field === 'achievements') {
      const updated = [...formData[field]];
      updated[index] = e.target.value;
      setFormData({ ...formData, [field]: updated });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-rose-100 to-purple-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-10 transition-all duration-500">
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-10">Build Your Resume</h1>

        {/* Basic Info */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Basic Information</h2>
          {['name', 'phone', 'email', 'linkedin', 'github', 'objective'].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              onChange={handleChange}
              className="border border-gray-300 p-3 mb-4 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          ))}
        </section>

        {/* Technical Skills */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Technical Skills</h2>
          {['languages', 'tools', 'core'].map((skill) => (
            <input
              key={skill}
              name={skill}
              placeholder={skill.charAt(0).toUpperCase() + skill.slice(1)}
              onChange={(e) => handleChange(e, 'technicalSkills')}
              className="border border-gray-300 p-3 mb-4 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          ))}
        </section>

        {/* Education */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Education</h2>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <input
                name="institution"
                placeholder="Institution"
                onChange={(e) => handleChange(e, 'education', index)}
                className="border p-3 rounded-lg shadow-sm w-full"
              />
              <input
                name="details"
                placeholder="Details (e.g., CGPA)"
                onChange={(e) => handleChange(e, 'education', index)}
                className="border p-3 rounded-lg shadow-sm w-full"
              />
              <input
                name="year"
                placeholder="Year"
                onChange={(e) => handleChange(e, 'education', index)}
                className="border p-3 rounded-lg shadow-sm w-full"
              />
            </div>
          ))}
        </section>

        {/* Projects */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Projects</h2>
          {formData.projects.map((proj, index) => (
            <div key={index} className="mb-4">
              <input
                name="title"
                placeholder="Project Title"
                onChange={(e) => handleChange(e, 'projects', index)}
                className="border p-3 mb-2 w-full rounded-lg shadow-sm"
              />
              <input
                name="tech"
                placeholder="Technologies Used"
                onChange={(e) => handleChange(e, 'projects', index)}
                className="border p-3 mb-2 w-full rounded-lg shadow-sm"
              />
              <textarea
                name="description"
                placeholder="Project Description"
                onChange={(e) => handleChange(e, 'projects', index, 'description')}
                className="border p-3 mb-2 w-full rounded-lg shadow-sm resize-none"
              />
            </div>
          ))}
        </section>

        {/* Certifications */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Certifications</h2>
          {formData.certifications.map((cert, index) => (
            <input
              key={index}
              placeholder="Certification"
              onChange={(e) => handleChange(e, 'certifications', index)}
              className="border p-3 mb-4 w-full rounded-lg shadow-sm"
            />
          ))}
        </section>

        {/* Achievements */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Achievements</h2>
          {formData.achievements.map((ach, index) => (
            <input
              key={index}
              placeholder="Achievement"
              onChange={(e) => handleChange(e, 'achievements', index)}
              className="border p-3 mb-4 w-full rounded-lg shadow-sm"
            />
          ))}
        </section>

        {/* Languages Known */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Languages Known</h2>
          <input
            name="languages"
            placeholder="Languages Known (e.g., English, Tamil)"
            onChange={handleChange}
            className="border p-3 mb-4 w-full rounded-lg shadow-sm"
          />
        </section>

        {/* PDF Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button
            onClick={() => generatePDF(<ResumeTemplate1 data={formData} />)}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-300"
          >
            Download Resume 1
          </button>
          {/* <button
            onClick={() => generatePDF(<ResumeTemplate2 data={formData} />)}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-300"
          >
            Download Resume 2
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
