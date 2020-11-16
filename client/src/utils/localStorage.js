export const getSavedJobIds = () => {
    const savedJobIds = localStorage.getItem('saved_jobs')
      ? JSON.parse(localStorage.getItem('saved_jobs'))
      : [];
  
    return savedJobIds;
  };
  
  export const saveJobIds = (jobIdArr) => {
    if (jobIdArr.length) {
      localStorage.setItem('saved_jobs', JSON.stringify(jobIdArr));
    } else {
      localStorage.removeItem('saved_jobs');
    }
  };
  
  export const removeJobId = (jobId) => {
    const savedJobIds = localStorage.getItem('saved_jobs')
      ? JSON.parse(localStorage.getItem('saved_jobs'))
      : null;
  
    if (!savedJobIds) {
      return false;
    }
  
    const updatedSavedJobIds = savedJobIds?.filter((savedJobId) => savedJobId !== jobId);
    localStorage.setItem('saved_jobs', JSON.stringify(updatedSavedJobIds));
console.log(updatedSavedJobIds);
    return true;
  };
  





  