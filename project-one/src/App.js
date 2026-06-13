import React, { useState } from 'react';
import { jobs } from './data';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);

  // Logic to filter jobs based on all criteria
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || job.role === selectedRole;
    const matchesLocation = selectedLocation === 'All' || job.location === selectedLocation;
    const matchesBookmark = showOnlyBookmarks ? bookmarks.includes(job.id) : true;
    
    return matchesSearch && matchesRole && matchesLocation && matchesBookmark;
  });

  const toggleBookmark = (id) => {
    setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <h1 style={{ textAlign: 'center' }}>Career Search Hub</h1>
        
        {/* Filter Controls */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <input 
            placeholder="Search for job..."
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 2, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <select onChange={(e) => setSelectedRole(e.target.value)} style={{ padding: '10px' }}>
            <option value="All">All Roles</option>
            {Array.from(new Set(jobs.map(j => j.role))).map(role => <option key={role} value={role}>{role}</option>)}
          </select>
          <select onChange={(e) => setSelectedLocation(e.target.value)} style={{ padding: '10px' }}>
            <option value="All">All Locations</option>
            {Array.from(new Set(jobs.map(j => j.location))).map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
          <button 
            onClick={() => setShowOnlyBookmarks(!showOnlyBookmarks)} 
            style={{ padding: '10px', cursor: 'pointer', backgroundColor: showOnlyBookmarks ? '#ff4d4d' : '#f0f0f0' }}
          >
            {showOnlyBookmarks ? '❤️ Show All' : '🤍 Bookmarks'}
          </button>
        </div>
        
        {/* Job List */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {filteredJobs.map(job => (
            <div key={job.id} style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '15px', width: '90%', borderRadius: '8px' }}>
              <h3>{job.title}</h3>
              <p>{job.company} | {job.location} | {job.role}</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setSelectedJob(job)} style={{ padding: '8px 15px', cursor: 'pointer' }}>View Details</button>
                <button onClick={() => toggleBookmark(job.id)} style={{ padding: '8px 15px', cursor: 'pointer' }}>
                  {bookmarks.includes(job.id) ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      {selectedJob && (
        <div style={{ position: 'fixed', top: '10%', right: '5%', width: '350px', padding: '20px', backgroundColor: '#fff', border: '1px solid #ddd', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', zIndex: 1000, maxHeight: '80vh', overflowY: 'auto' }}>
          <button onClick={() => setSelectedJob(null)} style={{ float: 'right', cursor: 'pointer' }}>Close</button>
          <h2>{selectedJob.title}</h2>
          <p><strong>Company:</strong> {selectedJob.company}</p>
          <p><strong>Location:</strong> {selectedJob.location}</p>
          <p><strong>Salary:</strong> {selectedJob.salary}</p>
          <p><strong>Experience Required:</strong> {selectedJob.experience}</p>
          <p><strong>Role:</strong> {selectedJob.role}</p>
          <hr />
          <p><strong>Description:</strong></p>
          <p>{selectedJob.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;