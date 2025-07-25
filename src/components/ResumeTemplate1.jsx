import React from 'react';

const sectionTitleStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginTop: '20px',
  marginBottom: '6px',
  borderBottom: '1px solid #000',
  paddingBottom: '4px',
  textTransform: 'uppercase',
};

const ResumeTemplate1 = ({ data }) => {
  const {
    name,
    phone,
    email,
    linkedin,
    github,
    objective,
    technicalSkills,
    education,
    projects,
    certifications,
    achievements,
    languages,
  } = data;

  return (
    <div style={{
      fontFamily: 'Calibri, sans-serif',
      backgroundColor: '#fff',
      padding: '40px',
      display: 'flex',
      justifyContent: 'center',  // Center align content horizontally
    }}>
      <div style={{
        width: '800px',
        fontSize: '14px',
        lineHeight: '1.6',
        color: '#000',
      }}>

        {/* Header Section */}
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '26px', marginBottom: '8px' }}>{name}</h1>
          <p style={{ margin: 0 }}>{phone}</p>
          <p style={{ margin: 0 }}>{email}</p>
          <p style={{ margin: 0 }}>
            <strong>LinkedIn:</strong> <a href={linkedin} target="_blank" rel="noreferrer">{linkedin}</a>
          </p>
          <p style={{ margin: 0 }}>
            <strong>GitHub:</strong> <a href={github} target="_blank" rel="noreferrer">{github}</a>
          </p>
        </div>

        {/* Objective */}
        <div style={sectionTitleStyle}>Objective</div>
        <p>{objective}</p>

        {/* Technical Skills */}
        <div style={sectionTitleStyle}>Technical Skills</div>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          <li><strong>Languages:</strong> {technicalSkills?.languages}</li>
          <li><strong>Tools:</strong> {technicalSkills?.tools}</li>
          <li><strong>Core Concepts:</strong> {technicalSkills?.core}</li>
        </ul>

        {/* Education */}
        <div style={sectionTitleStyle}>Education</div>
        {education?.map((edu, idx) => (
          <div key={idx} style={{ marginBottom: '10px' }}>
            <strong>{edu.institution}</strong><br />
            {edu.details}<br />
            {edu.year}
          </div>
        ))}

        {/* Projects */}
        <div style={sectionTitleStyle}>Projects</div>
        {projects?.map((proj, idx) => (
          <div key={idx} style={{ marginBottom: '10px' }}>
            <strong>{proj.title} | {proj.tech}</strong>
            <ul>
              {proj.description?.map((point, i) => <li key={i}>{point}</li>)}
            </ul>
          </div>
        ))}

        {/* Certifications */}
        <div style={sectionTitleStyle}>Certifications</div>
        <ul>
          {certifications?.map((cert, idx) => <li key={idx}>{cert}</li>)}
        </ul>

        {/* Achievements */}
        <div style={sectionTitleStyle}>Achievements</div>
        <ul>
          {achievements?.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>

        {/* Languages Known */}
        <div style={sectionTitleStyle}>Languages Known</div>
        <p>{languages}</p>
      </div>
    </div>
  );
};

export default ResumeTemplate1;
