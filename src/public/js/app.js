// Client-Side Interactivity for Nexora Digital Engineering
document.addEventListener('DOMContentLoaded', () => {
  // 1. Contact Form Async Submission Handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const statusBox = document.getElementById('formStatus');
      const submitBtn = document.getElementById('submitBtn');
      
      // Clear previous status
      statusBox.className = 'form-status';
      statusBox.textContent = '';
      statusBox.style.display = 'none';
      
      const payload = {
        fullName: contactForm.fullName.value,
        email: contactForm.email.value,
        company: contactForm.company.value,
        serviceInterest: contactForm.serviceInterest.value,
        message: contactForm.message.value
      };
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting Enquiry...';
      
      try {
        const res = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        
        const data = await res.json();
        
        if (res.ok && data.success) {
          statusBox.className = 'form-status success';
          statusBox.textContent = data.data.message || 'Enquiry successfully submitted!';
          statusBox.style.display = 'block';
          contactForm.reset();
        } else {
          statusBox.className = 'form-status error';
          const errorMsg = data.error?.message || 'Failed to submit enquiry.';
          const detailList = data.error?.details ? data.error.details.map(d => d.message).join(' ') : '';
          statusBox.textContent = `${errorMsg} ${detailList}`;
          statusBox.style.display = 'block';
        }
      } catch (err) {
        statusBox.className = 'form-status error';
        statusBox.textContent = 'Network or server communication error. Please try again.';
        statusBox.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Consultation Enquiry';
      }
    });
  }

  // 2. Admin Lead Status Update Handler
  window.updateLeadStatus = async function(id, status) {
    try {
      const res = await fetch(`/api/admin/leads/${id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        window.location.reload();
      } else {
        alert('Failed to update status.');
      }
    } catch (e) {
      alert('Error updating status.');
    }
  };
});
