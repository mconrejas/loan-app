import React, { useState } from "react";
import { useNavigate } from "react-router-dom";   
import "./style.css";  

const LoanApplicationForm = () => {
  const [currentPage, setCurrentPage] = useState("personalInfo");

  const [formData, setFormData] = useState({
    personalInfo: {
      name: "",
      membershipId: "",
      dateOfBirth: "",
      age: "",
      civilStatus: "",
      address: "",
      contactNumber: "",
      email: "",
      occupation: "",
      employerName: "",
      monthlyIncome: "",
    },
    loanDetails: {
      loanType: "",
      loanAmount: "",
      loanPurpose: "",
      repaymentPeriod: "",
      paymentMode: "",
    },
    loanSecurity: {
      collateralType: "",
      collateralValue: "",
      guarantorName: "",
      guarantorContact: "",
      guarantorRelationship: "",
    },
    references: {
      reference1Name: "",
      reference1Address: "",
      reference1Contact: "",
      reference1Relationship: "",
      reference2Name: "",
      reference2Address: "",
      reference2Contact: "",
      reference2Relationship: "",
    },
    declaration: {
      signature: "",
      date: "",
    },
    cooperativeUse: { 
      applicationReceivedDate: "",
      creditStanding: "",
      repaymentStanding: "",
      loanApproved: "",
      amountApproved: "",
      repaymentTerms: "",
      interestRate: "",
      remarks: "",
      loanOfficerName: "",
      loanOfficerSignature: "",
      applicationDate: "",
    },
  });


  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const navigate = useNavigate();

  // Handle page navigation
  const handleNextPage = () => {
    if (currentPage === "personalInfo") {
      setCurrentPage("loanDetails");
    } else if (currentPage === "loanDetails") {
      setCurrentPage("loanSecurity");
    } else if (currentPage === "loanSecurity") {
      setCurrentPage("references");
    } else if (currentPage === "references") {
      setCurrentPage("declaration");
    } else if (currentPage === "declaration") {
      setCurrentPage("cooperative");
    }
  };

  const handleBackPage = () => {
    if (currentPage === "loanDetails") {
      setCurrentPage("personalInfo");
    } else if (currentPage === "loanSecurity") {
      setCurrentPage("loanDetails");
    } else if (currentPage === "references") {
      setCurrentPage("loanSecurity");
    } else if (currentPage === "declaration") {
      setCurrentPage("references");
    } else if (currentPage === "cooperative") {
      setCurrentPage("declaration");
    }
  };

  const handleSubmit = async () => {
    setIsButtonDisabled(true);
    setIsSubmitted(true);

    try {
      await axios.post("http://localhost:5000/submit-loan-application", formData);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const handleLogout = () => {
    alert("Logged out!");
    navigate("/");
  };
  return (
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <header className="header">
        <div className="logo">
          <h1>Biliran Province Life Care Ministry Cooperative</h1>
        </div>
        <nav className="header-nav">
          <div className="dropdown1">
            <button className="dropbtn1">Dashboard<i className="fa fa-caret-down"></i></button>
            <div className="dropdown-content1">
              <a href="dashboard">Membership Application Form</a>
              <a href="loanform">Loan Application Form</a>
              <a href="about">About Us</a>
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
                currentPage === 'loanDetails' ? '2' :
                currentPage === 'loanSecurity' ? '3' :
                currentPage === 'references' ? '4' :
                currentPage === 'declaration' ? '5' :
                currentPage === 'cooperative' ? '6' : ''} of 6
        </div>
        <center><h2>Loan Application Form</h2></center>

        {currentPage === 'personalInfo' && (
          <>
            <h3>I. Personal Information</h3>
            <form className="space-y-4">
              <div className="form-group">
                <label>1. Name of Borrower:</label>
                <input type="text" placeholder="Enter name of borrower" />
              </div>
              <div className="form-group">
                <label>2. Membership ID Number:</label>
                <input type="text" placeholder="Enter Membership ID Number" />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2 form-group">
                  <label>3. Date of Birth:</label>
                  <input type="date" />
                </div>
                <div className="w-1/2 form-group">
                  <label>4. Age:</label>
                  <input type="number" placeholder="Age" />
                </div>
              </div>
              <div className="form-group">
                <label>5. Civil Status:</label>
                <div className="radio-group">
                  <label><input type="checkbox" /> Single</label>
                  <label><input type="checkbox" /> Married</label>
                  <label><input type="checkbox" /> Widow/er</label>
                  <label><input type="checkbox" /> Others: <input type="text" placeholder="Specify" /></label>
                </div>
              </div>
              <div className="form-group">
                <label>6. Address:</label>
                <input type="text" placeholder="Enter your address" />
              </div>
              <div className="form-group">
                <label>7. Contact Number:</label>
                <input type="text" placeholder="Enter your contact number" />
              </div>
              <div className="form-group">
                <label>8. Email Address:</label>
                <input type="email" placeholder="Enter your email" />
              </div>
              <div className="form-group">
                <label>9. Occupation:</label>
                <input type="text" placeholder="Enter your occupation" />
              </div>
              <div className="form-group">
                <label>10. Employer/Business Name:</label>
                <input type="text" placeholder="Enter employer or business name" />
              </div>
              <div className="form-group">
                <label>11. Monthly Income: (₱)</label>
                <input type="number" placeholder="Enter monthly income" />
              </div>
              <div className="navigation-buttons">
                <button type="button" className="next-btn" onClick={handleNextPage}>Next</button>
              </div>
            </form>
          </>
        )}

        {currentPage === 'loanDetails' && (
          <div>
            <h3>II. Loan Details</h3>
            <form className="space-y-4">
              <div className="form-group">
                <label>1. Type of Loan:</label>
                <div className="radio-group">
                  <label><input type="checkbox" /> Emergency Loan</label>
                  <label><input type="checkbox" /> Personal Loan</label>
                  <label><input type="checkbox" /> Business Loan</label>
                  <label><input type="checkbox" /> Educational Loan</label>
                  <label><input type="checkbox" /> Housing Loan</label>
                  <label><input type="checkbox" /> Others: <input type="text" placeholder="Specify" /></label>
                </div>
              </div>
              <div className="form-group">
                <label>2. Loan Amount Requested: (₱)</label>
                <input type="number" placeholder="Enter amount" />
              </div>
              <div className="form-group">
                <label>3. Purpose of Loan:</label>
                <input type="text" placeholder="Enter purpose" />
              </div>
              <div className="form-group">
                <label>4. Repayment Period:</label>
                <div className="radio-group">
                  <label><input type="checkbox" /> 3 months</label>
                  <label><input type="checkbox" /> 6 months</label>
                  <label><input type="checkbox" /> 1 year</label>
                  <label><input type="checkbox" /> Other: <input type="text" placeholder="Specify" /></label>
                </div>
              </div>
              <div className="form-group">
                <label>5. Preferred Payment Mode:</label>
                <div className="radio-group">
                  <label><input type="checkbox" /> Monthly</label>
                  <label><input type="checkbox" /> Bi-weekly</label>
                  <label><input type="checkbox" /> Lump Sum</label>
                  <label><input type="checkbox" /> Other: <input type="text" placeholder="Specify" /></label>
                </div>
              </div>
              <div className="navigation-buttons">
                <button type="button" className="back-btn" onClick={handleBackPage}>Back</button>
                <button type="button" className="next-btn" onClick={handleNextPage}>Next</button>
              </div>
            </form>
          </div>
        )}

        {currentPage === 'loanSecurity' && (
          <div>
            <h3>III. Loan Security</h3>
            <form className="space-y-4">
              <div className="form-group">
                <label>1. Type of Collateral:</label>
                <div className="radio-group">
                  <label><input type="checkbox" /> Real Property</label>
                  <label><input type="checkbox" /> Vehicle</label>
                  <label><input type="checkbox" /> Appliances</label>
                  <label><input type="checkbox" /> Others: <input type="text" placeholder="Specify" /></label>
                </div>
              </div>
              <div className="form-group">
                <label>2. Estimated Value of Collateral: (₱)</label>
                <input type="number" placeholder="Enter value" />
              </div>
              <div className="form-group">
                <label>3. Guarantor Name (if applicable):</label>
                <input type="text" placeholder="Enter guarantor's name" />
              </div>
              <div className="form-group">
                <label>4. Guarantor Contact Number:</label>
                <input type="text" placeholder="Enter guarantor's contact number" />
              </div>
              <div className="form-group">
                <label>5. Guarantor Relationship to Borrower:</label>
                <input type="text" placeholder="Enter relationship" />
              </div>
              <div className="navigation-buttons">
                <button type="button" className="back-btn" onClick={handleBackPage}>Back</button>
                <button type="button" className="next-btn" onClick={handleNextPage}>Next</button>
              </div>
            </form>
          </div>
        )}

        {currentPage === 'references' && (
          <div>
            <h3>IV. References</h3>
            <form className="space-y-4">
              <div className="form-group">
                <label>1. Reference 1:</label>
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Address" />
                <input type="text" placeholder="Contact Number" />
                <input type="text" placeholder="Relationship" />
              </div>
              <div className="form-group">
                <label>2. Reference 2:</label>
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Address" />
                <input type="text" placeholder="Contact Number" />
                <input type="text" placeholder="Relationship" />
              </div>
              <div className="navigation-buttons">
                <button type="button" className="back-btn" onClick={handleBackPage}>Back</button>
                <button type="button" className="next-btn" onClick={handleNextPage}>Next</button>
              </div>
            </form>
          </div>
        )}

        {currentPage === 'declaration' && (
          <div>
            <h3>V. Declaration of Borrower</h3>
            <form className="space-y-4">
              <p>
                I, the undersigned, hereby apply for a loan from the <b>Biliran Province Life Care Ministry Cooperative</b>.
                I certify that the information provided in this application is true and correct to the best of my knowledge.
                I agree to abide by the cooperative's loan policies and to repay the loan as per the agreed terms.
              </p>
              <div className="form-group">
                <label>Borrower's Signature:</label>
                <input type="file" placeholder="Upload signature" />
              </div>
              <div className="form-group">
                <label>Date:</label>
                <input type="date" />
              </div>
              <div className="navigation-buttons">
                <button type="button" className="back-btn" onClick={handleBackPage}>Back</button>
                <button type="button" className="next-btn" onClick={handleNextPage}>Next</button>
              </div>
            </form>
          </div>
        )}

{currentPage === 'cooperative' && (
          <div>
            <h3>VI. For Cooperative Use Only</h3>
            <form className="space-y-4">
              <div className="form-group">
                <label>Date of Application Received:</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <label>Loan Evaluation Report</label>
                <div className="bulleted-list">
                  <ul>
                    <li>Credit Standing: </li>
                    <li>Repayment Capacity: </li>
                  </ul>
                </div>
              </div>
              <div className="form-group">
                <label>Loan Approved:</label>
                <div className="radio-group">
                  <label><input type="checkbox" /> Yes</label>
                  <label><input type="checkbox" /> No</label>
                </div>
              </div>
              <div className="form-group">
                <label>Amount Approved: (₱)</label>
                <input type="number" placeholder="Enter amount" />
              </div>
              <div className="form-group">
                <label>Repayment Terms:</label>
                <input type="text" placeholder="Enter repayment terms" />
              </div>
              <div className="form-group">
                <label>Interest Rate:</label>
                <input type="text" placeholder="Enter interest rate" />
              </div>
              <div className="form-group">
                <label>Remarks:</label>
                <input type="text" placeholder="Enter remarks" />
              </div>
              <div className="form-group">
                <label>Loan Officer's Name:</label>
                <input type="text" placeholder="Enter officer's name" />
              </div>
              <div className="form-group">
                <label>Loan Officer's Signature:</label>
                <input type="file" placeholder="Upload signature" />
              </div>
              <div className="form-group">
                <label>Date:</label>
                <input type="date" />
              </div>
              <div className="navigation-buttons">
                <button type="button" className="back-btn" onClick={handleBackPage}>Back</button>
                <button type="button" className={`submit-btn ${isButtonDisabled ? 'disabled' : ''}`} onClick={handleSubmit} disabled={isButtonDisabled}>
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

// Handle logout action
const handleLogout = () => {
  alert("Logged out!");
};
export default LoanApplicationForm;
