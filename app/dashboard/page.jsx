"use client";
import React, { useState } from "react";
import "./styles.css";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState('personalInfo');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [isAnimationVisible, setIsAnimationVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      dateOfBirth: "",
      age: "",
      gender: "",
      civilStatus: [],
      homeAddress: "",
      contactNumber: "",
      email: "",
      occupation: "",
      employer: "",
    },
    membershipDetails: {
      isResident: false,
      previousMembership: false,
      purpose: [],
    },
    shareCapitalContribution: {
      initialShareCapital: "",
      minimumRequired: "",
      paymentMethod: "",
    },
    beneficiaryInfo: {
      beneficiaryName: "",
      relationship: "",
      contactNumber: "",
    },
    declaration: {
      signature: "",
      date: "",
    },
  });

  const handleNextPage = () => {
    if (currentPage === 'personalInfo') setCurrentPage('membershipDetails');
    else if (currentPage === 'membershipDetails') setCurrentPage('shareCapitalContribution');
    else if (currentPage === 'shareCapitalContribution') setCurrentPage('beneficiaryInfo');
    else if (currentPage === 'beneficiaryInfo') setCurrentPage('declaration');
    else if (currentPage === 'declaration') setCurrentPage('Cooperative');
  };

  const handleBackPage = () => {
    if (currentPage === 'membershipDetails') setCurrentPage('personalInfo');
    else if (currentPage === 'shareCapitalContribution') setCurrentPage('membershipDetails');
    else if (currentPage === 'beneficiaryInfo') setCurrentPage('shareCapitalContribution');
    else if (currentPage === 'declaration') setCurrentPage('beneficiaryInfo');
    else if (currentPage === 'Cooperative') setCurrentPage('declaration');
  };

  const handleInputChange = (e, section, field) => {
    const value = e.target.value;
    setFormData(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: value,
      },
    }));
  };

  const handleCheckboxChange = (e, section, field) => {
    const value = e.target.checked;
    setFormData(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: value,
      },
    }));
  };

  const handleMultiCheckboxChange = (e, section, field) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setFormData(prevState => {
      const updatedValues = isChecked
        ? [...prevState[section][field], value]
        : prevState[section][field].filter(item => item !== value);

      return {
        ...prevState,
        [section]: {
          ...prevState[section],
          [field]: updatedValues,
        },
      };
    });
  };

  return (
    <div className="dashboard-container">
    {/* Dashboard Header */}
    <header className="header">
      <div className="logo">
        <h1>Biliran Province Life Care Ministry Cooperative</h1>
      </div>
      <nav className="header-nav">
        {/* Dropdown Menu with unique classname */}
        
  <div class="dropdown1"> 
    <button class="dropbtn1">Dashboard<i class="fa fa-caret-down"></i></button> 
    <div class="dropdown-content1"> 
      <a href="page">Membership Application Form</a>
      <a href="urloan">Loan Application Form</a>
      <a href="#">About Us</a>
    </div>
  </div> 


        <ul className="nav-links">
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
        
      {/* Main Content */}
      <main className="main-content">
        <div className="page-number">
          Page {currentPage === 'personalInfo' ? '1' : 
                currentPage === 'membershipDetails' ? '2' : 
                currentPage === 'shareCapitalContribution' ? '3' : 
                currentPage === 'beneficiaryInfo' ? '4' : 
                currentPage === 'declaration' ? '5' : 
                currentPage === 'Cooperative' ? '6' : ''} of 6
        </div>
        <center><h2>Membership Application Form</h2></center>

        {currentPage === 'personalInfo' && (
          <>
            <h3>I. Personal Information</h3>
            <form className="space-y-4">
              {/* Full Name */}
              <div className="form-group">
                <label> Full Name:</label>
                <input type="text" placeholder="Enter your full name" 
                        onChange={(e) => handleInputChange(e, 'personalInfo', 'fullName')} />
              </div>

              {/* Date of Birth and Age */}
              <div className="flex gap-4">
                <div className="w-1/2 form-group">
                  <label>Date of Birth:</label>
                  <input type="date" />
                </div>
                <div className="w-1/2 form-group">
                  <label> Age:</label>
                  <input type="number" placeholder="Age" />
                </div>
              </div>

              {/* Gender */}
              <div className="w-1/2 form-group">
                <label> Gender:</label>
                <select onChange={(e) => handleInputChange(e, 'personalInfo', 'gender')}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Civil Status */}
              <div className="form-group">
                <label className="name"> Civil Status:</label>
                <div className="radio-group">
                  <label>
                    <input type="checkbox" name="civilStatus" value="Single" />
                     Single
                  </label>
                  <label>
                    <input type="checkbox" name="civilStatus" value="Married" />
                     Married
                  </label>
                  <label>
                    <input type="checkbox" name="civilStatus" value="Widow/er" />
                     Widow/er
                  </label>
                  <label>
                    <input type="checkbox" name="civilStatus" value="Others" />
                     Others
                  </label>
                  <input type="text" placeholder="Specify if other" />
                </div>
              </div>

              {/* Home Address */}
              <div className="form-group">
                <label>Home Address:</label>
                <input type="text" placeholder="Enter your home address" />
              </div>

              {/* Contact Number */}
              <div className="form-group">
                <label>Contact Number:</label>
                <input type="text" placeholder="Enter your contact number" />
              </div>

              {/* Email Address */}
              <div className="form-group">
                <label>Email Address:</label>
                <input type="email" placeholder="Enter your email" />
              </div>

              {/* Occupation */}
              <div className="form-group">
                <label>Occupation:</label>
                <input type="text" placeholder="Enter your occupation" />
              </div>

              {/* Employer/Business Name */}
              <div className="form-group">
                <label>Employer/Business Name (if applicable):</label>
                <input type="text" placeholder="Enter your employer or business name" />
              </div>

              {/* Navigation Buttons */}
              <div className="navigation-buttons">
                <button type="button" className="next-btn" onClick={handleNextPage}>
                  Next
                </button>
              </div>
            </form>
          </>
        )}

        {currentPage === 'membershipDetails' && (
          <div>
            {/* Membership Details Page */}
            <h3>II. Membership Details</h3>
            <form className="space-y-26">
              {/* Resident of Biliran Province */}
              <div className="form-group">
                <label>1. Are you a resident of Biliran Province?</label>
                <div className="radio-group">
                  <label>
                    <input type="checkbox" checked={formData.membershipDetails.isResident} 
                       onChange={(e) => handleCheckboxChange(e, 'membershipDetails', 'isResident')} /> Yes
                  </label>
                  <label>
                    <input type="checkbox" /> No
                  </label>
                </div>
              </div>

              {/* Previous Membership */}
              <div className="form-group">
                <label>2. Have you previously been a member of this cooperative?</label>
                <div className="radio-group">
                  <label>
                    <input type="checkbox" /> Yes
                  </label>
                  <label>
                    <input type="checkbox" /> No
                  </label>
                  <input type="text" placeholder="If yes, indicate the period" />
                </div>
              </div>

              {/* Purpose of Joining */}
              <div className="form-group">
               <label>3. Purpose of joining:</label>
                <div className="radio-group">
                  <label>
                    <input type="checkbox" /> Savings and Credit
                  </label>
                  <label>
                    <input type="checkbox" /> Livelihood Assistance
                  </label>
                  <label>
                    <input type="checkbox" /> Health Benefits
                  </label>
                  <label>
                    <input type="checkbox" /> Others: <input type="text" placeholder="Specify" />
                  </label>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="navigation-buttons">
                <button type="button" className="back-btn" onClick={handleBackPage}>
                  Back
                </button>
                <button type="button" className="next-btn" onClick={handleNextPage}>
                  Next
                </button>
              </div>
            </form>
          </div>
        )}

        {currentPage === 'shareCapitalContribution' && (
          <div>
            {/* Share Capital Contribution Page */}
            <h3>III. Share Capital Contribution</h3>
            <form className="space-y-26">
              {/* Initial Share Capital */}
              <div className="form-group">
  <label>1. Initial Share Capital: (₱) </label>
  <div className="currency-input">
    <span className="currency-symbol">(₱)</span>
    <input 
     
      placeholder="Enter amount" 
      className="currency-input-field"
    />
  </div>
  <span>(Minimum Required: ( ₱ )<input type="text" placeholder="Enter amount" className="currency-input-field" /></span>
  
</div>

      
              {/* Payment Method */}
              <div className="form-group">
                <label>2. Payment Method:</label>
                <div className="radio-group">
                  <label>
                    <input type="checkbox" /> Cash
                  </label>
                  <label>
                    <input type="checkbox" /> Check
                  </label>
                  <label>
                    <input type="checkbox" /> Bank Transfer
                  </label>
                  <label>
                    <input type="checkbox" /> Other: <input type="text" placeholder="Specify" />
                  </label>
                </div>
              </div>
      
              {/* Navigation Buttons */}
              <div className="navigation-buttons">
                <button type="button" className="back-btn" onClick={handleBackPage}>
                  Back
                </button>
                <button type="button" className="next-btn" onClick={handleNextPage}>
                  Next
                </button>
              </div>
            </form>
          </div>
        )}

        {currentPage === 'beneficiaryInfo' && (
          <div>
            {/* Beneficiary Information Page */}
            <h3>IV. Beneficiary Information</h3>
            <form className="space-y-4">
              {/* Name of Beneficiary */}
              <div className="form-group">
                <label>1. Name of Beneficiary:</label>
                <input type="text" placeholder="Enter name of beneficiary" />
              </div>

              {/* Relationship */}
              <div className="form-group">
                <label>2. Relationship:</label>
                <input type="text" placeholder="Enter relationship" />
              </div>

              {/* Contact Number of Beneficiary */}
              <div className="form-group">
                <label>3. Contact Number of Beneficiary:</label>
                <input type="text" placeholder="Enter contact number" />
              </div>

              {/* Navigation Buttons */}
              <div className="navigation-buttons">
                <button type="button" className="back-btn" onClick={handleBackPage}>
                  Back
                </button>
                <button type="button" className="next-btn" onClick={handleNextPage}>
                  Next
                </button>
              </div>
            </form>
          </div>
        )}


        {currentPage === 'declaration' && (
          <div className="declaration-container">
            <h3>V. Declaration of Applicant</h3>
            <form className="space-y-26" text-align="justify">
             
              <p>
                I, the undersigned, hereby apply for membership in the <b>Biliran Province Life Care Ministry Cooperative</b>.
                I pledge to abide by the cooperative's bylaws, policies, and Code of Ethics. I understand the rights and 
                responsibilities of membership, including participation in the cooperative's programs and activities.
              </p>
            
              <div className="form-group">
                <label>Signature:</label>
                <input type="file" placeholder="Upload your signature" />
              </div>
              <div className="form-group">
                <label>Date:</label>
                <input type="date" />
              </div>
              <div className="navigation-buttons">
                <button type="button" className="back-btn" onClick={handleBackPage}>
                  Back
                </button>
                <button type="button" className="next-btn" onClick={handleNextPage}>
                  Next
                </button>
              </div>
            </form>
          </div>
        )}

{currentPage === 'Cooperative' && (
  
  <div className="declaration-container">
    <h3>VI. For Cooperative Use Only</h3>
    <form className="space-y-26">
      {/* Cooperative use fields */}
      <div className="form-group">
        <label>1. Date of Application Received:</label>
        <input type="date" />
      </div>
      
      <div className="form-group">
        <label>2. Verified By (Officer's Name):</label>
        <input type="text" placeholder="Enter name" />
      </div>
      
      <div className="form-group">
        <label>3. Approval Date:</label>
        <input type="date" />
      </div>
      
      <div className="form-group">
        <label>4. Membership ID Number:</label>
        <input type="number" placeholder="Enter Membership ID Number" />
      </div>
      
      <div className="form-group">
        <label>Remarks:</label>
        <div className="radio-group">
          <label>
            <input type="checkbox" /> Approved
          </label>
          <label>
            <input type="checkbox" /> Not Approved
          </label>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
                <button type="button" className="back-btn" onClick={handleBackPage}>
                  Back
                </button>
                <button type="button" 
                        className={`submit-btn ${isButtonDisabled ? 'disabled' : ''}`} 
                        onClick={handleSubmit} 
                        disabled={isButtonDisabled}>
                  {isButtonDisabled ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        )}
        {/* Success Notification */}
        {isSubmitted && isNotificationVisible && isAnimationVisible && (
          <div className="notification-container">
          <div className="notification">
            <p>Your form was submitted!</p>
          </div>
          <div className="checkmark-animation">
            <svg xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 -1 53 58">
              <circle cx="25" cy="25" r="25" stroke="#4CAF50" strokeWidth="3" fill="none" />
              <path d="M10 25L20 35L40 15" stroke="#4CAF50" strokeWidth="4" fill="none" />
            </svg>
          </div>
           </div>
        )}

    
      </main>

      {/* Footer */}
      
      <footer className="footer">
        <p>&copy; 2025 All Rights Reserved.</p>
      </footer>
      
    </div>
  );
};

export default Dashboard;
