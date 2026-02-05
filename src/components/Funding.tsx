import { useState } from 'react';
import { Search, Plus, Edit, Eye, Filter, DollarSign, ChevronDown, ChevronUp, X, Upload, FileSpreadsheet, Building2, Award, Wallet, Briefcase, BarChart3 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

// Export reference data for use in other components
export const grantsData = [
  { 
    id: 1, 
    grantName: 'GR10129 13154 Dubisnky - CHDI Foundation',
    referenceId: 'GR10129',
    award: 'AWD-0000073: Dubisnky - CHDI Foundation 10/01/2012 (version 0)',
    fundCode: 'FD010',
    fundDescription: 'RI Clinical Trials',
    costCenterCode: 'CC1548',
    costCenterDescription: 'SOM KC Neurology - Huntington Disease',
    functionCode: '45011',
    functionDescription: 'Clinical Trials',
    hscNumber: '13154',
    awardGroup: 'Dakoda White',
    status: 'Active'
  },
  { 
    id: 2, 
    grantName: 'GR10002 11803 Abhyankar Millennium',
    referenceId: 'GR10002',
    award: 'AWD-0000002: Abhyankar Millennium 04/29/2010 (version 0)',
    fundCode: 'FD010',
    fundDescription: 'RI Clinical Trials',
    costCenterCode: 'CC1055',
    costCenterDescription: 'SOM KC Cancer Center Clinical Trials',
    functionCode: '45011',
    functionDescription: 'Clinical Trials',
    hscNumber: '11803',
    awardGroup: 'KUCC',
    status: 'Active'
  },
  { 
    id: 3, 
    grantName: 'GR10030 QA865500 Anant_Physiology_Grant',
    referenceId: 'GR10030',
    award: 'AWD-0000011: Anant_Physiology_Grant 08/01/2014 (version 0)',
    fundCode: 'FD002',
    fundDescription: 'RI Sponsored Program',
    costCenterCode: 'CC1074',
    costCenterDescription: 'SOM KC Cancer Biology',
    functionCode: '45018',
    functionDescription: 'Organized Research',
    hscNumber: '',
    awardGroup: 'Linda Hubbart-Williams (Inactive)',
    status: 'Active'
  },
];

export const awardsData = [
  { 
    id: 1, 
    awardId: 'AWD-0000073',
    awardName: 'Dubisnky - CHDI Foundation',
    startDate: '10/01/2012',
    version: '0',
    awardGroup: 'Dakoda White',
    status: 'Active'
  },
  { 
    id: 2, 
    awardId: 'AWD-0000002',
    awardName: 'Abhyankar Millennium',
    startDate: '04/29/2010',
    version: '0',
    awardGroup: 'KUCC',
    status: 'Active'
  },
  { 
    id: 3, 
    awardId: 'AWD-0000011',
    awardName: 'Anant_Physiology_Grant',
    startDate: '08/01/2014',
    version: '0',
    awardGroup: 'Linda Hubbart-Williams (Inactive)',
    status: 'Active'
  },
];

export const fundsData = [
  { id: 1, fundCode: 'FD001', fundName: 'FD001 RI Operating', status: 'Active' },
  { id: 2, fundCode: 'FD002', fundName: 'FD002 RI Sponsored Program', status: 'Active' },
  { id: 3, fundCode: 'FD003', fundName: 'FD003 RI Sponsored Program Cost Share', status: 'Active' },
  { id: 4, fundCode: 'FD004', fundName: 'FD004 RI Facilities & Administration (F&A)', status: 'Active' },
  { id: 5, fundCode: 'FD006', fundName: 'FD006 RI Residual (R&D)', status: 'Active' },
  { id: 6, fundCode: 'FD010', fundName: 'FD010 RI Clinical Trials', status: 'Active' },
  { id: 7, fundCode: 'FD013', fundName: 'FD013 RI KUEA', status: 'Active' },
  { id: 8, fundCode: 'FD014', fundName: 'FD014 Student Accounting Fund Clearing', status: 'Active' },
];

export const costCentersData = [
  { id: 1, costCenterCode: 'CC1001', costCenter: 'CC1001 Chancellor', status: 'Active' },
  { id: 2, costCenterCode: 'CC1016', costCenter: 'CC1016 SOM KC Executive Dean', status: 'Active' },
  { id: 3, costCenterCode: 'CC1046', costCenter: 'CC1046 SOM KC Child Health and Development (CCHD)', status: 'Active' },
  { id: 4, costCenterCode: 'CC1048', costCenter: 'CC1048 SOM KC Kidney Institute (KI)', status: 'Active' },
  { id: 5, costCenterCode: 'CC1050', costCenter: 'CC1050 SOM KC The Liver Center', status: 'Active' },
  { id: 6, costCenterCode: 'CC1055', costCenter: 'CC1055 SOM KC Cancer Center Clinical Trials', status: 'Active' },
  { id: 7, costCenterCode: 'CC1074', costCenter: 'CC1074 SOM KC Cancer Biology', status: 'Active' },
  { id: 8, costCenterCode: 'CC1548', costCenter: 'CC1548 SOM KC Neurology - Huntington Disease', status: 'Active' },
  { id: 9, costCenterCode: 'CC1032', costCenter: 'CC1032 DNU SOM Wichita School of Medicine (inactive)', status: 'Inactive' },
];

export const functionsData = [
  { id: 1, functionCode: '42004', functionName: '42004 Didactic teaching', functionDescription: 'Didactic teaching', status: 'Active' },
  { id: 2, functionCode: '42005', functionName: '42005 Clinical teaching', functionDescription: 'Clinical teaching', status: 'Active' },
  { id: 3, functionCode: '43001', functionName: '43001 Academic Administration', functionDescription: 'Academic Administration', status: 'Active' },
  { id: 4, functionCode: '45001', functionName: '45001 Research Supplies', functionDescription: 'Research Supplies', status: 'Active' },
  { id: 5, functionCode: '45002', functionName: '45002 Research Labs and Clinics', functionDescription: 'Research Labs and Clinics', status: 'Active' },
  { id: 6, functionCode: '45003', functionName: '45003 Community Outreach (Research)', functionDescription: 'Community Outreach (Research)', status: 'Active' },
  { id: 7, functionCode: '45011', functionName: '45011 Clinical Trials', functionDescription: 'Clinical Trials', status: 'Active' },
  { id: 8, functionCode: '45012', functionName: '45012 Department Research', functionDescription: 'Department Research', status: 'Active' },
  { id: 9, functionCode: '45013', functionName: '45013 General Administration', functionDescription: 'General Administration', status: 'Active' },
  { id: 10, functionCode: '45014', functionName: '45014 Instruction', functionDescription: 'Instruction', status: 'Active' },
  { id: 11, functionCode: '45016', functionName: '45016 Other Institutional Activity', functionDescription: 'Other Institutional Activity', status: 'Active' },
  { id: 12, functionCode: '45018', functionName: '45018 Organized Research', functionDescription: 'Organized Research', status: 'Active' },
  { id: 13, functionCode: '45019', functionName: '45019 Other Sponsored Activity', functionDescription: 'Other Sponsored Activity', status: 'Active' },
  { id: 14, functionCode: '46001', functionName: '46001 Community Services', functionDescription: 'Community Services', status: 'Active' },
  { id: 15, functionCode: '46002', functionName: '46002 Patient Care/Clinical', functionDescription: 'Patient Care/Clinical', status: 'Active' },
  { id: 16, functionCode: '46004', functionName: '46004 CMN Clinical/Research', functionDescription: 'CMN Clinical/Research', status: 'Active' },
];

export function Funding() {
  const [activeSection, setActiveSection] = useState<'grants' | 'awards' | 'funds' | 'costcenters' | 'functions'>('grants');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showKPIs, setShowKPIs] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  
  // Grants state
  const [showAddGrant, setShowAddGrant] = useState(false);
  const [editingGrant, setEditingGrant] = useState<any>(null);
  const [viewingGrant, setViewingGrant] = useState<any>(null);

  // Awards state
  const [showAddAward, setShowAddAward] = useState(false);
  const [editingAward, setEditingAward] = useState<any>(null);
  const [viewingAward, setViewingAward] = useState<any>(null);

  // Funds state
  const [showAddFund, setShowAddFund] = useState(false);
  const [editingFund, setEditingFund] = useState<any>(null);
  const [viewingFund, setViewingFund] = useState<any>(null);

  // Cost Centers state
  const [showAddCostCenter, setShowAddCostCenter] = useState(false);
  const [editingCostCenter, setEditingCostCenter] = useState<any>(null);
  const [viewingCostCenter, setViewingCostCenter] = useState<any>(null);

  // Functions state
  const [showAddFunction, setShowAddFunction] = useState(false);
  const [editingFunction, setEditingFunction] = useState<any>(null);
  const [viewingFunction, setViewingFunction] = useState<any>(null);

  // Use exported data
  const grants = grantsData;
  const awards = awardsData;
  const funds = fundsData;
  const costCenters = costCentersData;
  const functions = functionsData;

  const filteredGrants = grants.filter(grant => {
    const matchesSearch = grant.referenceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grant.grantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grant.award.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grant.costCenterDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || grant.status === filterStatus;
    return matchesSearch && matchesStatus;
  });



  const filteredAwards = awards.filter(award => {
    const matchesSearch = award.awardId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         award.awardName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         award.awardGroup.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || award.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredFunds = funds.filter(fund => {
    const matchesSearch = fund.fundCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fund.fundName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || fund.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredCostCenters = costCenters.filter(cc => {
    const matchesSearch = cc.costCenterCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cc.costCenter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || cc.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredFunctions = functions.filter(func => {
    const matchesSearch = func.functionCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         func.functionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         func.functionDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || func.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleClosePanel = () => {
    setShowAddGrant(false);
    setEditingGrant(null);
    setViewingGrant(null);
    setShowAddAward(false);
    setEditingAward(null);
    setViewingAward(null);
    setShowAddFund(false);
    setEditingFund(null);
    setViewingFund(null);
    setShowAddCostCenter(false);
    setEditingCostCenter(null);
    setViewingCostCenter(null);
    setShowAddFunction(false);
    setEditingFunction(null);
    setViewingFunction(null);
  };

  const showGrantPanel = showAddGrant || editingGrant || viewingGrant;
  const showAwardPanel = showAddAward || editingAward || viewingAward;
  const showFundPanel = showAddFund || editingFund || viewingFund;
  const showCostCenterPanel = showAddCostCenter || editingCostCenter || viewingCostCenter;
  const showFunctionPanel = showAddFunction || editingFunction || viewingFunction;
  
  const isGrantEditMode = editingGrant !== null;
  const isGrantViewMode = viewingGrant !== null && editingGrant === null;
  const isAwardEditMode = editingAward !== null;
  const isAwardViewMode = viewingAward !== null && editingAward === null;
  const isFundEditMode = editingFund !== null;
  const isFundViewMode = viewingFund !== null && editingFund === null;
  const isCostCenterEditMode = editingCostCenter !== null;
  const isCostCenterViewMode = viewingCostCenter !== null && editingCostCenter === null;
  const isFunctionEditMode = editingFunction !== null;
  const isFunctionViewMode = viewingFunction !== null && editingFunction === null;

  return (
    <div className="space-y-6">
      {/* Section Header with Action Buttons */}
      <div className="bg-white border-l-4 border-ku-blue rounded-lg shadow-sm p-5 flex items-center justify-between">
        {/* Left Side - Icon and Title */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-ku-blue rounded-lg flex items-center justify-center shadow-sm">
            <Building2 className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl text-gray-800 font-semibold">Funding and Grants</h2>
            <p className="text-gray-600 text-sm">Manage grants, awards, funds, cost centers, and functions</p>
          </div>
        </div>

        {/* Right Side - Action Buttons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowKPIs(!showKPIs)}
            className="p-2.5 text-gray-600 hover:bg-white hover:text-blue-600 rounded-lg transition-all shadow-sm"
            title={showKPIs ? 'Hide Statistics' : 'Show Statistics'}
          >
            {showKPIs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="p-2.5 text-gray-600 hover:bg-white hover:text-blue-600 rounded-lg transition-all shadow-sm"
            title="Upload Data"
          >
            <Upload size={20} />
          </button>
          <button 
            onClick={() => setShowExportModal(true)}
            className="p-2.5 text-gray-600 hover:bg-white hover:text-blue-600 rounded-lg transition-all shadow-sm"
            title="Export to Excel"
          >
            <FileSpreadsheet size={20} />
          </button>
          <button 
            onClick={() => {
              if (activeSection === 'grants') {
                setShowAddGrant(true);
              } else if (activeSection === 'awards') {
                setShowAddAward(true);
              } else if (activeSection === 'funds') {
                setShowAddFund(true);
              } else if (activeSection === 'costcenters') {
                setShowAddCostCenter(true);
              } else {
                setShowAddFunction(true);
              }
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-all"
            title={
              activeSection === 'grants' ? 'Add New Grant' : 
              activeSection === 'awards' ? 'Add New Award' :
              activeSection === 'funds' ? 'Add New Fund' :
              activeSection === 'costcenters' ? 'Add New Cost Center' :
              'Add New Function'
            }
          >
            <Plus size={20} />
            {activeSection === 'grants' ? 'Add Grant' : 
             activeSection === 'awards' ? 'Add Award' :
             activeSection === 'funds' ? 'Add Fund' :
             activeSection === 'costcenters' ? 'Add Cost Center' :
             'Add Function'}
          </button>
        </div>
      </div>

      {/* Collapsible Statistics */}
      {showKPIs && (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Grants</p>
              <Building2 className="text-blue-500" size={24} />
            </div>
            <p className="text-3xl">{grants.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Awards</p>
              <DollarSign className="text-green-500" size={24} />
            </div>
            <p className="text-3xl">{awards.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Funds</p>
              <FileSpreadsheet className="text-orange-500" size={24} />
            </div>
            <p className="text-3xl">{funds.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Cost Centers</p>
              <Building2 className="text-purple-500" size={24} />
            </div>
            <p className="text-3xl">{costCenters.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Functions</p>
              <FileSpreadsheet className="text-indigo-500" size={24} />
            </div>
            <p className="text-3xl">{functions.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Active Items</p>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-3xl">
              {grants.filter(g => g.status === 'Active').length + 
               awards.filter(a => a.status === 'Active').length +
               funds.filter(f => f.status === 'Active').length +
               costCenters.filter(cc => cc.status === 'Active').length +
               functions.filter(fn => fn.status === 'Active').length}
            </p>
          </div>
        </div>
      )}

      {/* Section Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <div className="flex gap-1 px-6">
            <button
              onClick={() => {
                setActiveSection('grants');
                setSearchTerm('');
              }}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
                activeSection === 'grants'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <Building2 size={18} />
              Grants
              {grants.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold">
                  {grants.length}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setActiveSection('awards');
                setSearchTerm('');
              }}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
                activeSection === 'awards'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <Award size={18} />
              Awards
              {awards.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full font-semibold">
                  {awards.length}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setActiveSection('funds');
                setSearchTerm('');
              }}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
                activeSection === 'funds'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <Wallet size={18} />
              Funds
              {funds.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full font-semibold">
                  {funds.length}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setActiveSection('costcenters');
                setSearchTerm('');
              }}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
                activeSection === 'costcenters'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <Briefcase size={18} />
              Cost Centers
              {costCenters.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-800 text-xs rounded-full font-semibold">
                  {costCenters.length}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setActiveSection('functions');
                setSearchTerm('');
              }}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
                activeSection === 'functions'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <BarChart3 size={18} />
              Functions
              {functions.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-teal-100 text-teal-800 text-xs rounded-full font-semibold">
                  {functions.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={
                  activeSection === 'grants' ? 'Search grants by reference ID, name, award, or cost center...' : 
                  activeSection === 'awards' ? 'Search awards by reference ID, name, award, or cost center...' : 
                  activeSection === 'funds' ? 'Search funds by code or name...' :
                  activeSection === 'costcenters' ? 'Search cost centers by code or description...' :
                  'Search functions by code or description...'
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grants Table */}
        {activeSection === 'grants' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-600">Reference ID</th>
                  <th className="px-6 py-3 text-left text-gray-600">Grant Name</th>
                  <th className="px-6 py-3 text-left text-gray-600">Award</th>
                  <th className="px-6 py-3 text-left text-gray-600">Cost Center</th>
                  <th className="px-6 py-3 text-left text-gray-600">Function</th>
                  <th className="px-6 py-3 text-left text-gray-600">HSC Number</th>
                  <th className="px-6 py-3 text-left text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredGrants.map((grant) => (
                  <tr key={grant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{grant.referenceId}</td>
                    <td className="px-6 py-4 text-sm">
                      <button 
                        onClick={() => setViewingGrant(grant)}
                        className="text-blue-600 hover:underline text-left max-w-xs truncate block"
                        title={grant.grantName}
                      >
                        {grant.grantName}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={grant.award}>
                      {grant.award}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div>{grant.costCenterCode}</div>
                      <div className="text-xs text-gray-500 max-w-xs truncate" title={grant.costCenterDescription}>
                        {grant.costCenterDescription}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div>{grant.functionCode}</div>
                      <div className="text-xs text-gray-500">{grant.functionDescription}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{grant.hscNumber || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        grant.status === 'Active' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {grant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setViewingGrant(grant)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded" 
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => setEditingGrant(grant)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded" 
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredGrants.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="mx-auto text-gray-400 mb-3" size={48} />
                <p className="text-gray-500">No grants found</p>
              </div>
            )}
          </div>
        )}



        {/* Awards Table */}
        {activeSection === 'awards' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-600">Award ID</th>
                  <th className="px-6 py-3 text-left text-gray-600">Award Name</th>
                  <th className="px-6 py-3 text-left text-gray-600">Start Date</th>
                  <th className="px-6 py-3 text-left text-gray-600">Version</th>
                  <th className="px-6 py-3 text-left text-gray-600">Award Group</th>
                  <th className="px-6 py-3 text-left text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredAwards.map((award) => (
                  <tr key={award.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{award.awardId}</td>
                    <td className="px-6 py-4 text-sm">
                      <button 
                        onClick={() => setViewingAward(award)}
                        className="text-blue-600 hover:underline text-left"
                      >
                        {award.awardName}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{award.startDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{award.version}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{award.awardGroup}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        award.status === 'Active' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {award.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setViewingAward(award)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded" 
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => setEditingAward(award)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded" 
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredAwards.length === 0 && (
              <div className="text-center py-12">
                <DollarSign className="mx-auto text-gray-400 mb-3" size={48} />
                <p className="text-gray-500">No awards found</p>
              </div>
            )}
          </div>
        )}

        {/* Funds Table */}
        {activeSection === 'funds' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-600">Fund Code</th>
                  <th className="px-6 py-3 text-left text-gray-600">Fund Name</th>
                  <th className="px-6 py-3 text-left text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredFunds.map((fund) => (
                  <tr key={fund.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{fund.fundCode}</td>
                    <td className="px-6 py-4 text-sm">
                      <button 
                        onClick={() => setViewingFund(fund)}
                        className="text-blue-600 hover:underline text-left"
                      >
                        {fund.fundName}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        fund.status === 'Active' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {fund.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setViewingFund(fund)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded" 
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => setEditingFund(fund)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded" 
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredFunds.length === 0 && (
              <div className="text-center py-12">
                <FileSpreadsheet className="mx-auto text-gray-400 mb-3" size={48} />
                <p className="text-gray-500">No funds found</p>
              </div>
            )}
          </div>
        )}

        {/* Cost Centers Table */}
        {activeSection === 'costcenters' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-600">Cost Center Code</th>
                  <th className="px-6 py-3 text-left text-gray-600">Cost Center</th>
                  <th className="px-6 py-3 text-left text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredCostCenters.map((cc) => (
                  <tr key={cc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{cc.costCenterCode}</td>
                    <td className="px-6 py-4 text-sm">
                      <button 
                        onClick={() => setViewingCostCenter(cc)}
                        className="text-blue-600 hover:underline text-left"
                      >
                        {cc.costCenter}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        cc.status === 'Active' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {cc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setViewingCostCenter(cc)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded" 
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => setEditingCostCenter(cc)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded" 
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredCostCenters.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="mx-auto text-gray-400 mb-3" size={48} />
                <p className="text-gray-500">No cost centers found</p>
              </div>
            )}
          </div>
        )}

        {/* Functions Table */}
        {activeSection === 'functions' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-600">Function Code</th>
                  <th className="px-6 py-3 text-left text-gray-600">Function Name</th>
                  <th className="px-6 py-3 text-left text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredFunctions.map((func) => (
                  <tr key={func.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{func.functionCode}</td>
                    <td className="px-6 py-4 text-sm">
                      <button 
                        onClick={() => setViewingFunction(func)}
                        className="text-blue-600 hover:underline text-left"
                      >
                        {func.functionName}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        func.status === 'Active' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {func.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setViewingFunction(func)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded" 
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => setEditingFunction(func)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded" 
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredFunctions.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="mx-auto text-gray-400 mb-3" size={48} />
                <p className="text-gray-500">No functions found</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl">Upload Reference Data</h3>
              <button onClick={() => setShowUploadModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Select Data Type</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="grants">Grants</option>
                  <option value="awards">Awards</option>
                  <option value="funds">Funds</option>
                  <option value="costcenters">Cost Centers</option>
                  <option value="functions">Functions</option>
                </select>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="mx-auto text-gray-400 mb-2" size={48} />
                <p className="text-sm text-gray-600 mb-2">Upload data file</p>
                <p className="text-xs text-gray-500">Excel (.xlsx) or CSV format</p>
                <input 
                  type="file" 
                  accept=".xlsx,.xls,.csv"
                  className="mt-4"
                />
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-h-64 overflow-y-auto">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Expected Columns for Grants:</strong>
                </p>
                <ul className="text-xs text-gray-600 space-y-1 mb-3">
                  <li>• Grant, Reference ID, Award, Fund, Cost Center</li>
                  <li>• NACUBO Function, HSC Number, Award Group</li>
                </ul>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Expected Columns for Awards:</strong>
                </p>
                <ul className="text-xs text-gray-600 space-y-1 mb-3">
                  <li>• Award ID, Award Name, Start Date, Version, Award Group</li>
                </ul>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Expected Columns for Funds:</strong>
                </p>
                <ul className="text-xs text-gray-600 space-y-1 mb-3">
                  <li>• Fund Name, Fund Reference ID</li>
                </ul>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Expected Columns for Cost Centers:</strong>
                </p>
                <ul className="text-xs text-gray-600 space-y-1 mb-3">
                  <li>• Cost Center, Cost Center Code</li>
                </ul>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Expected Columns for Functions:</strong>
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• NACUBO Code Name, NACUBO Code</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    toast.success('Data uploaded successfully');
                    setShowUploadModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl">Export to Excel</h3>
              <button onClick={() => setShowExportModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Export the current {activeSection === 'grants' ? 'Grants' : activeSection === 'awards' ? 'Awards' : activeSection === 'funds' ? 'Funds' : activeSection === 'costcenters' ? 'Cost Centers' : 'Functions'} data to Excel format.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <FileSpreadsheet className="text-blue-600 mt-0.5" size={20} />
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Export Details</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Filtered data: {
                        activeSection === 'grants' ? filteredGrants.length :
                        activeSection === 'awards' ? filteredAwards.length :
                        activeSection === 'funds' ? filteredFunds.length :
                        activeSection === 'costcenters' ? filteredCostCenters.length :
                        filteredFunctions.length
                      } records</li>
                      <li>• Format: Excel (.xlsx)</li>
                      <li>• Includes all visible columns</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setShowExportModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    const sectionName = activeSection === 'grants' ? 'Grants' : 
                                      activeSection === 'awards' ? 'Awards' : 
                                      activeSection === 'funds' ? 'Funds' : 
                                      activeSection === 'costcenters' ? 'Cost Centers' : 
                                      'Functions';
                    toast.success(`${sectionName} exported to Excel successfully`);
                    setShowExportModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <FileSpreadsheet size={18} />
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fund Add/Edit/View Panel */}
      {showFundPanel && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleClosePanel}></div>
          
          <div className="absolute right-0 top-0 h-full w-full lg:w-3/4 xl:w-2/3 bg-white shadow-2xl overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
              <div className="px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl">
                    {isFundViewMode ? 'View Fund' : isFundEditMode ? `Edit Fund (${editingFund?.fundName})` : 'Add New Fund'}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {isFundViewMode ? 'View fund information' : isFundEditMode ? 'Update fund details' : 'Create a new fund'}
                  </p>
                </div>
                <button 
                  onClick={handleClosePanel}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Panel Content */}
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg border-b pb-2 mb-4">Fund Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Fund Code <span className="text-red-500">*</span>
                      </label>
                      {isFundViewMode ? (
                        <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                          {viewingFund?.fundCode}
                        </div>
                      ) : (
                        <input
                          type="text"
                          defaultValue={editingFund?.fundCode || ''}
                          placeholder="e.g., FD001"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Fund Name <span className="text-red-500">*</span>
                      </label>
                      {isFundViewMode ? (
                        <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                          {viewingFund?.fundName}
                        </div>
                      ) : (
                        <input
                          type="text"
                          defaultValue={editingFund?.fundName || ''}
                          placeholder="e.g., FD001 RI Operating"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Status <span className="text-red-500">*</span>
                      </label>
                      {isFundViewMode ? (
                        <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                          {viewingFund?.status}
                        </div>
                      ) : (
                        <select
                          defaultValue={editingFund?.status || 'Active'}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {!isFundViewMode && (
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={handleClosePanel}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        toast.success(isFundEditMode ? 'Fund updated successfully' : 'Fund created successfully');
                        handleClosePanel();
                      }}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {isFundEditMode ? 'Update Fund' : 'Create Fund'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cost Center Add/Edit/View Panel */}
      {showCostCenterPanel && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleClosePanel}></div>
          
          <div className="absolute right-0 top-0 h-full w-full lg:w-3/4 xl:w-2/3 bg-white shadow-2xl overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
              <div className="px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl">
                    {isCostCenterViewMode ? 'View Cost Center' : isCostCenterEditMode ? `Edit Cost Center (${editingCostCenter?.costCenter})` : 'Add New Cost Center'}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {isCostCenterViewMode ? 'View cost center information' : isCostCenterEditMode ? 'Update cost center details' : 'Create a new cost center'}
                  </p>
                </div>
                <button 
                  onClick={handleClosePanel}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Panel Content */}
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg border-b pb-2 mb-4">Cost Center Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Cost Center Code <span className="text-red-500">*</span>
                      </label>
                      {isCostCenterViewMode ? (
                        <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                          {viewingCostCenter?.costCenterCode}
                        </div>
                      ) : (
                        <input
                          type="text"
                          defaultValue={editingCostCenter?.costCenterCode || ''}
                          placeholder="e.g., CC1001"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Cost Center Description <span className="text-red-500">*</span>
                      </label>
                      {isCostCenterViewMode ? (
                        <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                          {viewingCostCenter?.costCenter}
                        </div>
                      ) : (
                        <input
                          type="text"
                          defaultValue={editingCostCenter?.costCenter || ''}
                          placeholder="e.g., CC1001 Chancellor"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Status <span className="text-red-500">*</span>
                      </label>
                      {isCostCenterViewMode ? (
                        <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                          {viewingCostCenter?.status}
                        </div>
                      ) : (
                        <select
                          defaultValue={editingCostCenter?.status || 'Active'}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {!isCostCenterViewMode && (
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={handleClosePanel}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        toast.success(isCostCenterEditMode ? 'Cost center updated successfully' : 'Cost center created successfully');
                        handleClosePanel();
                      }}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {isCostCenterEditMode ? 'Update Cost Center' : 'Create Cost Center'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Function Add/Edit/View Panel */}
      {showFunctionPanel && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleClosePanel}></div>
          
          <div className="absolute right-0 top-0 h-full w-full lg:w-3/4 xl:w-2/3 bg-white shadow-2xl overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
              <div className="px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl">
                    {isFunctionViewMode ? 'View Function' : isFunctionEditMode ? `Edit Function (${editingFunction?.functionName})` : 'Add New Function'}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {isFunctionViewMode ? 'View function information' : isFunctionEditMode ? 'Update function details' : 'Create a new function'}
                  </p>
                </div>
                <button 
                  onClick={handleClosePanel}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Panel Content */}
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg border-b pb-2 mb-4">Function Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Function Code (NACUBO) <span className="text-red-500">*</span>
                      </label>
                      {isFunctionViewMode ? (
                        <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                          {viewingFunction?.functionCode}
                        </div>
                      ) : (
                        <input
                          type="text"
                          defaultValue={editingFunction?.functionCode || ''}
                          placeholder="e.g., 45011"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Function Name <span className="text-red-500">*</span>
                      </label>
                      {isFunctionViewMode ? (
                        <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                          {viewingFunction?.functionName}
                        </div>
                      ) : (
                        <input
                          type="text"
                          defaultValue={editingFunction?.functionName || ''}
                          placeholder="e.g., 45011 Clinical Trials"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Status <span className="text-red-500">*</span>
                      </label>
                      {isFunctionViewMode ? (
                        <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                          {viewingFunction?.status}
                        </div>
                      ) : (
                        <select
                          defaultValue={editingFunction?.status || 'Active'}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {!isFunctionViewMode && (
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={handleClosePanel}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        toast.success(isFunctionEditMode ? 'Function updated successfully' : 'Function created successfully');
                        handleClosePanel();
                      }}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {isFunctionEditMode ? 'Update Function' : 'Create Function'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grant Add/Edit/View Panel */}
      {showGrantPanel && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleClosePanel}></div>
          
          <div className="absolute right-0 top-0 h-full w-full lg:w-3/4 xl:w-2/3 bg-white shadow-2xl overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
              <div className="px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl">
                    {isGrantViewMode ? 'View Grant' : isGrantEditMode ? `Edit Grant (${editingGrant?.grantName})` : 'Add New Grant'}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {isGrantViewMode ? 'View grant information' : isGrantEditMode ? 'Update grant details' : 'Create a new grant'}
                  </p>
                </div>
                <button 
                  onClick={handleClosePanel}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Panel Content */}
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg border-b pb-2 mb-4">Grant Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Grant Name <span className="text-red-500">*</span>
                      </label>
                      {isGrantViewMode ? (
                        <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                          {viewingGrant?.grantName}
                        </div>
                      ) : (
                        <input
                          type="text"
                          defaultValue={editingGrant?.grantName || ''}
                          placeholder="e.g., GR10129 13154 Dubisnky - CHDI Foundation"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Reference ID <span className="text-red-500">*</span>
                      </label>
                      {isGrantViewMode ? (
                        <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                          {viewingGrant?.referenceId}
                        </div>
                      ) : (
                        <input
                          type="text"
                          defaultValue={editingGrant?.referenceId || ''}
                          placeholder="e.g., GR10129"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Award <span className="text-red-500">*</span>
                      </label>
                      {isGrantViewMode ? (
                        <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                          {viewingGrant?.award}
                        </div>
                      ) : (
                        <select
                          defaultValue={editingGrant?.award || ''}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Award</option>
                          {awards.filter(a => a.status === 'Active').map(award => (
                            <option key={award.id} value={`${award.awardId}: ${award.awardName} ${award.startDate} (version ${award.version})`}>
                              {award.awardId}: {award.awardName} {award.startDate} (version {award.version})
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                          Fund Code <span className="text-red-500">*</span>
                        </label>
                        {isGrantViewMode ? (
                          <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                            {viewingGrant?.fundCode}
                          </div>
                        ) : (
                          <select
                            defaultValue={editingGrant?.fundCode || ''}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select Fund</option>
                            {funds.filter(f => f.status === 'Active').map(fund => (
                              <option key={fund.id} value={fund.fundCode}>
                                {fund.fundName}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                          Fund Description
                        </label>
                        {isGrantViewMode ? (
                          <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                            {viewingGrant?.fundDescription}
                          </div>
                        ) : (
                          <input
                            type="text"
                            defaultValue={editingGrant?.fundDescription || ''}
                            placeholder="e.g., RI Clinical Trials"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                          Cost Center Code <span className="text-red-500">*</span>
                        </label>
                        {isGrantViewMode ? (
                          <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                            {viewingGrant?.costCenterCode}
                          </div>
                        ) : (
                          <select
                            defaultValue={editingGrant?.costCenterCode || ''}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select Cost Center</option>
                            {costCenters.filter(cc => cc.status === 'Active').map(cc => (
                              <option key={cc.id} value={cc.costCenterCode}>
                                {cc.costCenter}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                          Cost Center Description
                        </label>
                        {isGrantViewMode ? (
                          <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                            {viewingGrant?.costCenterDescription}
                          </div>
                        ) : (
                          <input
                            type="text"
                            defaultValue={editingGrant?.costCenterDescription || ''}
                            placeholder="e.g., SOM KC Neurology - Huntington Disease"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                          Function Code <span className="text-red-500">*</span>
                        </label>
                        {isGrantViewMode ? (
                          <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                            {viewingGrant?.functionCode}
                          </div>
                        ) : (
                          <select
                            defaultValue={editingGrant?.functionCode || ''}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select Function</option>
                            {functions.filter(fn => fn.status === 'Active').map(func => (
                              <option key={func.id} value={func.functionCode}>
                                {func.functionName}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                          Function Description
                        </label>
                        {isGrantViewMode ? (
                          <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                            {viewingGrant?.functionDescription}
                          </div>
                        ) : (
                          <input
                            type="text"
                            defaultValue={editingGrant?.functionDescription || ''}
                            placeholder="e.g., Clinical Trials"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                          HSC Number
                        </label>
                        {isGrantViewMode ? (
                          <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                            {viewingGrant?.hscNumber || '-'}
                          </div>
                        ) : (
                          <input
                            type="text"
                            defaultValue={editingGrant?.hscNumber || ''}
                            placeholder="e.g., 13154"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                          Award Group
                        </label>
                        {isGrantViewMode ? (
                          <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                            {viewingGrant?.awardGroup}
                          </div>
                        ) : (
                          <input
                            type="text"
                            defaultValue={editingGrant?.awardGroup || ''}
                            placeholder="e.g., Dakoda White"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Status <span className="text-red-500">*</span>
                      </label>
                      {isGrantViewMode ? (
                        <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg">
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            viewingGrant?.status === 'Active' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {viewingGrant?.status}
                          </span>
                        </div>
                      ) : (
                        <select
                          defaultValue={editingGrant?.status || 'Active'}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {!isGrantViewMode && (
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={handleClosePanel}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        toast.success(isGrantEditMode ? 'Grant updated successfully' : 'Grant created successfully');
                        handleClosePanel();
                      }}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {isGrantEditMode ? 'Update Grant' : 'Create Grant'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Award Add/Edit/View Panel */}
      {showAwardPanel && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleClosePanel}></div>
          
          <div className="absolute right-0 top-0 h-full w-full lg:w-3/4 xl:w-2/3 bg-white shadow-2xl overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
              <div className="px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl">
                    {isAwardViewMode ? 'View Award' : isAwardEditMode ? `Edit Award (${editingAward?.awardName})` : 'Add New Award'}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {isAwardViewMode ? 'View award information' : isAwardEditMode ? 'Update award details' : 'Create a new award'}
                  </p>
                </div>
                <button 
                  onClick={handleClosePanel}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Panel Content */}
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg border-b pb-2 mb-4">Award Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Award ID <span className="text-red-500">*</span>
                      </label>
                      {isAwardViewMode ? (
                        <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                          {viewingAward?.awardId}
                        </div>
                      ) : (
                        <input
                          type="text"
                          defaultValue={editingAward?.awardId || ''}
                          placeholder="e.g., AWD-0000073"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Award Name <span className="text-red-500">*</span>
                      </label>
                      {isAwardViewMode ? (
                        <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                          {viewingAward?.awardName}
                        </div>
                      ) : (
                        <input
                          type="text"
                          defaultValue={editingAward?.awardName || ''}
                          placeholder="e.g., Dubisnky - CHDI Foundation"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Start Date <span className="text-red-500">*</span>
                      </label>
                      {isAwardViewMode ? (
                        <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                          {viewingAward?.startDate}
                        </div>
                      ) : (
                        <input
                          type="text"
                          defaultValue={editingAward?.startDate || ''}
                          placeholder="MM/DD/YYYY"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Version
                      </label>
                      {isAwardViewMode ? (
                        <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                          {viewingAward?.version}
                        </div>
                      ) : (
                        <input
                          type="text"
                          defaultValue={editingAward?.version || '0'}
                          placeholder="0"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Award Group <span className="text-red-500">*</span>
                      </label>
                      {isAwardViewMode ? (
                        <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                          {viewingAward?.awardGroup}
                        </div>
                      ) : (
                        <input
                          type="text"
                          defaultValue={editingAward?.awardGroup || ''}
                          placeholder="e.g., Dakoda White"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Status <span className="text-red-500">*</span>
                      </label>
                      {isAwardViewMode ? (
                        <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900">
                          {viewingAward?.status}
                        </div>
                      ) : (
                        <select
                          defaultValue={editingAward?.status || 'Active'}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {!isAwardViewMode && (
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={handleClosePanel}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        toast.success(isAwardEditMode ? 'Award updated successfully' : 'Award created successfully');
                        handleClosePanel();
                      }}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {isAwardEditMode ? 'Update Award' : 'Create Award'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}