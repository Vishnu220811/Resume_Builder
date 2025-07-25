// components/ResumeTemplate2.jsx
const ResumeTemplate2 = ({ data }) => (
  <div style={{ fontFamily: 'Arial', color: '#333' }}>
    <h2>{data.name}</h2>
    <ul>
      <li><b>Phone:</b> {data.phone}</li>
      <li><b>Education:</b> {data.education}</li>
      <li><b>Experience:</b> {data.experience}</li>
      <li><b>Skills:</b> {data.skills}</li>
      <li><b>Projects:</b> {data.projects}</li>
    </ul>
  </div>
);

export default ResumeTemplate2;
