// components/ResumeForm.jsx
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

    education: [
      { institution: '', details: '', year: '' }
    ],

    projects: [
      {
        title: '',
        tech: '',
        description: ['']
      }
    ],

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
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl mb-4 font-bold">Enter Resume Details</h2>

      {/* Basic Info */}
      {['name', 'phone', 'email', 'linkedin', 'github', 'objective'].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
        />
      ))}

      {/* Technical Skills */}
      <h3 className="text-lg mt-4 mb-2 font-semibold">Technical Skills</h3>
      {['languages', 'tools', 'core'].map((skill) => (
        <input
          key={skill}
          name={skill}
          placeholder={skill.charAt(0).toUpperCase() + skill.slice(1)}
          onChange={(e) => handleChange(e, 'technicalSkills')}
          className="border p-2 mb-2 w-full"
        />
      ))}

      {/* Education */}
      <h3 className="text-lg mt-4 mb-2 font-semibold">Education</h3>
      {formData.education.map((edu, index) => (
        <div key={index} className="mb-2">
          <input
            name="institution"
            placeholder="Institution"
            onChange={(e) => handleChange(e, 'education', index)}
            className="border p-2 mb-2 w-full"
          />
          <input
            name="details"
            placeholder="Details (e.g., CGPA)"
            onChange={(e) => handleChange(e, 'education', index)}
            className="border p-2 mb-2 w-full"
          />
          <input
            name="year"
            placeholder="Year"
            onChange={(e) => handleChange(e, 'education', index)}
            className="border p-2 mb-2 w-full"
          />
        </div>
      ))}

      {/* Projects */}
      <h3 className="text-lg mt-4 mb-2 font-semibold">Projects</h3>
      {formData.projects.map((proj, index) => (
        <div key={index} className="mb-2">
          <input
            name="title"
            placeholder="Project Title"
            onChange={(e) => handleChange(e, 'projects', index)}
            className="border p-2 mb-2 w-full"
          />
          <input
            name="tech"
            placeholder="Technologies Used"
            onChange={(e) => handleChange(e, 'projects', index)}
            className="border p-2 mb-2 w-full"
          />
          <input
            name="description"
            placeholder="Project Description"
            onChange={(e) => handleChange(e, 'projects', index, 'description')}
            className="border p-2 mb-2 w-full"
          />
        </div>
      ))}

      {/* Certifications */}
      <h3 className="text-lg mt-4 mb-2 font-semibold">Certifications</h3>
      {formData.certifications.map((cert, index) => (
        <input
          key={index}
          placeholder="Certification"
          onChange={(e) => handleChange(e, 'certifications', index)}
          className="border p-2 mb-2 w-full"
        />
      ))}

      {/* Achievements */}
      <h3 className="text-lg mt-4 mb-2 font-semibold">Achievements</h3>
      {formData.achievements.map((ach, index) => (
        <input
          key={index}
          placeholder="Achievement"
          onChange={(e) => handleChange(e, 'achievements', index)}
          className="border p-2 mb-2 w-full"
        />
      ))}

      {/* Languages Known */}
      <h3 className="text-lg mt-4 mb-2 font-semibold">Languages Known</h3>
      <input
        name="languages"
        placeholder="Languages Known (e.g., English, Tamil)"
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />

      {/* PDF Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => generatePDF(<ResumeTemplate1 data={formData} />)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Download Resume 1
        </button>
        <button
          onClick={() => generatePDF(<ResumeTemplate2 data={formData} />)}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Download Resume 2
        </button>
      </div>
    </div>
  );
};

export default ResumeForm;
