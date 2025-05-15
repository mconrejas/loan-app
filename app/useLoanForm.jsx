import { useState } from 'react';

export const useLoanForm = () => {
  const [currentPage, setCurrentPage] = useState("personalInfo");
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [repaymentPeriod, setRepaymentPeriod] = useState('');
  const [otherPeriod, setOtherPeriod] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [otherPaymentMode, setOtherPaymentMode] = useState('');
  const [selectedCollateral, setSelectedCollateral] = useState('');
  const [otherCollateral, setOtherCollateral] = useState('');
  const [loanApproved, setLoanApproved] = useState('');

  const handleNextPage = () => {
    if (currentPage === "personalInfo") setCurrentPage("loanDetails");
    else if (currentPage === "loanDetails") setCurrentPage("loanSecurity");
    else if (currentPage === "loanSecurity") setCurrentPage("references");
    else if (currentPage === "references") setCurrentPage("declaration");
    else if (currentPage === "declaration") setCurrentPage("cooperative");
  };

  const handleBackPage = () => {
    if (currentPage === "loanDetails") setCurrentPage("personalInfo");
    else if (currentPage === "loanSecurity") setCurrentPage("loanDetails");
    else if (currentPage === "references") setCurrentPage("loanSecurity");
    else if (currentPage === "declaration") setCurrentPage("references");
    else if (currentPage === "cooperative") setCurrentPage("declaration");
  };

  const handleStatusChange = (event) => {
    const value = event.target.value;
    setSelectedStatus(value);
  };

  const handleTypeChange = (event) => {
    const value = event.target.value;
    setSelectedType(value);
  };

  const handleRepaymentPeriodChange = (event) => {
    setRepaymentPeriod(event.target.value);
  };

  const handleOtherPeriodChange = (event) => {
    setOtherPeriod(event.target.value);
  };

  const handlePaymentModeChange = (event) => {
    const value = event.target.value;
    setPaymentMode(value === 'Other' ? value : value);
  };

  const handleOtherPaymentModeChange = (event) => {
    setOtherPaymentMode(event.target.value);
  };

  const handleCollateralChange = (event) => {
    const value = event.target.value;
    setSelectedCollateral(value === 'Others' ? value : value);
  };

  const handleOtherCollateralChange = (event) => {
    setOtherCollateral(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setLoanApproved(loanApproved === value ? '' : value);
  };

  return {
    currentPage,
    selectedStatus,
    selectedType,
    repaymentPeriod,
    otherPeriod,
    paymentMode,
    otherPaymentMode,
    selectedCollateral,
    otherCollateral,
    loanApproved,
    handleNextPage,
    handleBackPage,
    handleStatusChange,
    handleTypeChange,
    handleRepaymentPeriodChange,
    handleOtherPeriodChange,
    handlePaymentModeChange,
    handleOtherPaymentModeChange,
    handleCollateralChange,
    handleOtherCollateralChange,
    handleCheckboxChange,
  };
};
