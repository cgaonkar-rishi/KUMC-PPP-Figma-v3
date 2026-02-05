import { useState } from 'react';
import { Search, Plus, Edit, Eye, Download, Copy, Users, DollarSign, Trash2, X, ChevronDown, Upload, FileSpreadsheet, GripVertical, Info, Lock, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { LoadingSpinner, TableLoadingState } from './LoadingSpinner';
import { ConfirmDialog } from './ConfirmDialog';
import { toast } from 'sonner@2.0.3';
import { grantsData, fundsData, costCentersData, functionsData, awardsData } from './Funding';
import { 
  UserRole, 
  canCreateStudy, 
  canEditStudy, 
  canDeleteStudy, 
  canUploadData,
  canExportData 
} from '../utils/permissions';
import { STUDY_STATUSES, STUDY_STATUS_OPTIONS, getStudyStatusColor, StudyStatus } from '../utils/studyStatuses';

interface StudiesProps {
  currentUserRole: UserRole;
}

export function Studies({ currentUserRole }: StudiesProps) {
  const currentUser = {
    id: 1,
    kumcUsername: '****',
    firstName: 'John',
    lastName: 'Williams',
    email: '****@kumc.edu',
    department: 'Clinical Research',
    organization: 'KUMC',
    organizationId: 2,
    organizationName: 'University of Kansas Medical Center',
    role: 'Study Coordinator',
    assignedStudies: ['STUDY 001234567B', 'STUDY 008765432'],
    assignedLocations: [
      'University of Kansas Cancer Center',
      'Clinical Research Center',
      'University of Kansas Cancer Center - Overland Park',
      'Other',
      'University of Kansas Medical Center'
    ],
    status: 'Active',
    lastLogin: '2026-01-23 09:15 AM'
  };
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPI, setFilterPI] = useState('all');
  const [sortColumn, setSortColumn] = useState<string>('studyNumber');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSetupPanel, setShowSetupPanel] = useState(false);
  const [editingStudy, setEditingStudy] = useState<any>(null);
  const [deletingStudy, setDeletingStudy] = useState<any>(null);
  const [viewingStudy, setViewingStudy] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('details');
  
  // Form fields
  const [studyType, setStudyType] = useState('Study');
  const [studyNumber, setStudyNumber] = useState('');
  const [protocolNumber, setProtocolNumber] = useState('');
  const [studyTitle, setStudyTitle] = useState('');
  const [principalInvestigator, setPrincipalInvestigator] = useState('');
  const [studyStatus, setStudyStatus] = useState('Active');
  const [startDate, setStartDate] = useState('');
  const [estimatedCompletion, setEstimatedCompletion] = useState('');
  const [description, setDescription] = useState('');
  const [allowTravelReimbursement, setAllowTravelReimbursement] = useState(false);
  const [billToId, setBillToId] = useState('');
  
  // Locations tab
  const [locationSearch, setLocationSearch] = useState('');
  const [assignedLocations, setAssignedLocations] = useState<Array<{name: string; address: string; type: string; status: string}>>([]);
  
  // Participants tab
  const [participantSearch, setParticipantSearch] = useState('');
  const [enrolledParticipants, setEnrolledParticipants] = useState<Array<{id: string; name: string; status: string}>>([]);
  const [selectedParticipant, setSelectedParticipant] = useState('');
  const [studyParticipantId, setStudyParticipantId] = useState('');
  const [waiveSSN, setWaiveSSN] = useState('No');
  const [withholdTaxes, setWithholdTaxes] = useState('No');
  const [participantStatus, setParticipantStatus] = useState('');
  
  // Milestones tab
  const [milestoneSearch, setMilestoneSearch] = useState('');
  const [milestones, setMilestones] = useState<Array<{id: string; name: string; type: string; payment: string}>>([]);
  const [showPriorVersions, setShowPriorVersions] = useState(false);
  const [selectedPriorVersion, setSelectedPriorVersion] = useState('');
  
  // Funding tab
  const [fundingSearch, setFundingSearch] = useState('');
  const [fundingSources, setFundingSources] = useState<any[]>([]);
  const [showAddFunding, setShowAddFunding] = useState(false);
  const [fundingType, setFundingType] = useState('Grant');
  const [selectedGrant, setSelectedGrant] = useState('');
  const [costCenter, setCostCenter] = useState('');
  const [fund, setFund] = useState('');
  const [functionCode, setFunctionCode] = useState('');
  const [award, setAward] = useState('');
  const [hsc, setHsc] = useState('');
  const [act, setAct] = useState('');
  
  // Studies data
  const [studies, setStudies] = useState([
    {
      id: 1,
      type: 'Study',
      studyNumber: 'STUDY 001234567B',
      protocolNumber: '2026-PI-12345',
      title: 'Cardiovascular Health Study 2026',
      pi: 'Rita Schettler',
      status: 'Active',
      participants: 150,
      phase: 'Phase III',
      startDate: '2026-01-15',
      estimatedCompletion: '2027-12-31',
      department: 'Cardiology',
      description: 'A comprehensive study examining the long-term effects of various interventions on cardiovascular health in adults aged 50-75.',
      locations: [
        { name: 'Main Research Center - Building A', address: 'Address not available', type: 'Study Facility', status: 'Active' },
        { name: 'Outpatient Clinic - West Campus', address: 'Address not available', type: 'Study Facility', status: 'Active' }
      ],
      enrolledParticipants: [
        { id: 'P-2026-001', name: 'John Smith', status: 'Registered' },
        { id: 'P-2025-156', name: 'Sarah Johnson', status: 'Registered' },
        { id: 'P-2026-012', name: 'Jennifer Taylor', status: 'Registered' },
        { id: 'P-2025-178', name: 'Linda Martinez', status: 'Registered' }
      ],
      milestones: [
        { id: 'M1', name: 'Screening Milestone', type: 'One-time', payment: '$150' },
        { id: 'M2', name: 'Baseline Assessment', type: 'One-time', payment: '$200' },
        { id: 'M3', name: 'Week 4 Follow-up', type: 'Recurring', payment: '$100' },
        { id: 'M4', name: 'Month 3 Assessment', type: 'One-time', payment: '$150' },
        { id: 'M5', name: 'Month 6 Assessment', type: 'One-time', payment: '$150' },
        { id: 'M6', name: 'Final Milestone', type: 'One-time', payment: '$250' }
      ],
      fundingSources: []
    },
    {
      id: 2,
      type: 'Study',
      studyNumber: 'STUDY 008765432',
      protocolNumber: '2025-PI-67890',
      title: 'Neurological Disorders Research',
      pi: 'Dr. James Anderson',
      status: 'Active',
      participants: 89,
      locations: [],
      enrolledParticipants: [],
      milestones: [],
      fundingSources: []
    },
    {
      id: 3,
      type: 'Study',
      studyNumber: 'STUDY 009876543',
      protocolNumber: '2026-PI-11111',
      title: 'Pediatric Nutrition Study',
      pi: 'Dr. Robert Taylor',
      status: 'Active',
      participants: 67,
      locations: [],
      enrolledParticipants: [],
      milestones: [],
      fundingSources: []
    },
    {
      id: 4,
      type: 'Study',
      studyNumber: 'STUDY 004567890',
      protocolNumber: '2025-PI-22222',
      title: 'Diabetes Prevention Trial',
      pi: 'Dr. Michael Chen',
      status: 'Study Completed',
      participants: 203,
      locations: [],
      enrolledParticipants: [],
      milestones: [],
      fundingSources: []
    },
    {
      id: 5,
      type: 'Program',
      studyNumber: 'Health Rewards',
      protocolNumber: '—',
      title: 'Cancer Immunotherapy Study',
      pi: 'Dr. Lisa Brown',
      status: 'Study Completed',
      participants: 0,
      locations: [],
      enrolledParticipants: [],
      milestones: [],
      fundingSources: []
    },
    {
      id: 6,
      type: 'Study',
      studyNumber: 'STUDY 003344556',
      protocolNumber: '2026-PI-33333',
      title: 'No title',
      pi: 'Dr. Maria Martinez',
      status: 'Study Started',
      participants: 45,
      locations: [],
      enrolledParticipants: [],
      milestones: [],
      fundingSources: []
    },
    {
      id: 7,
      type: 'Other',
      studyNumber: 'Data Safety Monitoring Board',
      protocolNumber: '—',
      title: 'No title',
      pi: 'Dr. David Kim',
      status: 'Cancelled/Withdrawn',
      participants: 0,
      locations: [],
      enrolledParticipants: [],
      milestones: [],
      fundingSources: []
    }
  ]);

  const availableLocations = [
    'Main Research Center - Building A',
    'Main Research Center - Building B',
    'Outpatient Clinic - West Campus',
    'Outpatient Clinic - East Campus',
    'Clinical Research Center',
    'University of Kansas Cancer Center',
    'Other'
  ];

  // Mock data for prior milestone versions
  const priorMilestoneVersions: { [key: string]: { effectiveDate: string; milestones: Array<{id: string; name: string; type: string; payment: string}> } } = {
    '2025-12-31': {
      effectiveDate: 'December 31, 2025',
      milestones: [
        { id: 'M1', name: 'Screening Milestone', type: 'One-time', payment: '$140' },
        { id: 'M2', name: 'Baseline Assessment', type: 'One-time', payment: '$180' },
        { id: 'M3', name: 'Week 4 Follow-up', type: 'Recurring', payment: '$90' },
        { id: 'M4', name: 'Month 3 Assessment', type: 'One-time', payment: '$140' },
        { id: 'M5', name: 'Final Milestone', type: 'One-time', payment: '$230' }
      ]
    },
    '2025-11-15': {
      effectiveDate: 'November 15, 2025',
      milestones: [
        { id: 'M1', name: 'Initial Screening', type: 'One-time', payment: '$130' },
        { id: 'M2', name: 'Baseline', type: 'One-time', payment: '$170' },
        { id: 'M3', name: 'Follow-up Visit', type: 'Recurring', payment: '$85' },
        { id: 'M4', name: 'Final Assessment', type: 'One-time', payment: '$220' }
      ]
    },
    '2025-10-01': {
      effectiveDate: 'October 1, 2025',
      milestones: [
        { id: 'M1', name: 'Screening', type: 'One-time', payment: '$120' },
        { id: 'M2', name: 'Baseline Visit', type: 'One-time', payment: '$160' },
        { id: 'M3', name: 'Follow-up', type: 'Recurring', payment: '$80' },
        { id: 'M4', name: 'Completion', type: 'One-time', payment: '$200' }
      ]
    }
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const filteredStudies = studies.filter(study => {
    const matchesSearch = searchTerm === '' || 
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.studyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.protocolNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.pi.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || study.status === filterStatus;
    const matchesPI = filterPI === 'all' || study.pi === filterPI;
    
    const matchesAssignment = currentUserRole !== 'Study Coordinator' || 
      currentUser.assignedStudies.includes(study.studyNumber);
    
    return matchesSearch && matchesStatus && matchesPI && matchesAssignment;
  }).sort((a, b) => {
    let aValue: any = a[sortColumn as keyof typeof a];
    let bValue: any = b[sortColumn as keyof typeof b];
    
    // Handle null/undefined values
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;
    
    // Convert to string for comparison
    aValue = String(aValue).toLowerCase();
    bValue = String(bValue).toLowerCase();
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const uniquePIs = Array.from(new Set(studies.map(s => s.pi))).sort();

  const handleDeleteStudy = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success(`Study "${deletingStudy?.title}" has been deleted`);
    setIsProcessing(false);
    setDeletingStudy(null);
  };

  const handleSetupStudy = () => {
    setStudyType('Study');
    setStudyNumber('');
    setProtocolNumber('');
    setStudyTitle('');
    setPrincipalInvestigator('');
    setStudyStatus('Active');
    setStartDate('');
    setEstimatedCompletion('');
    setDescription('');
    setAllowTravelReimbursement(false);
    setBillToId('');
    setAssignedLocations([]);
    setEnrolledParticipants([]);
    setMilestones([]);
    setFundingSources([]);
    setActiveTab('details');
    setShowSetupPanel(true);
  };

  const handleEditStudy = (study: any) => {
    setStudyType(study.type);
    setStudyNumber(study.studyNumber);
    setProtocolNumber(study.protocolNumber);
    setStudyTitle(study.title);
    setPrincipalInvestigator(study.pi);
    setStudyStatus(study.status);
    setStartDate(study.startDate);
    setEstimatedCompletion(study.estimatedCompletion);
    setDescription(study.description || '');
    setAllowTravelReimbursement(study.allowTravelReimbursement || false);
    setBillToId(study.billToId || '');
    setAssignedLocations(study.locations || []);
    setEnrolledParticipants(study.enrolledParticipants || []);
    setMilestones(study.milestones || []);
    setFundingSources(study.fundingSources || []);
    setActiveTab('details');
    setEditingStudy(study);
  };

  const handleViewStudy = (study: any) => {
    setStudyType(study.type);
    setStudyNumber(study.studyNumber);
    setProtocolNumber(study.protocolNumber);
    setStudyTitle(study.title);
    setPrincipalInvestigator(study.pi);
    setStudyStatus(study.status);
    setStartDate(study.startDate);
    setEstimatedCompletion(study.estimatedCompletion);
    setDescription(study.description || '');
    setAllowTravelReimbursement(study.allowTravelReimbursement || false);
    setBillToId(study.billToId || '');
    setAssignedLocations(study.locations || []);
    setEnrolledParticipants(study.enrolledParticipants || []);
    setMilestones(study.milestones || []);
    setFundingSources(study.fundingSources || []);
    setActiveTab('details');
    setViewingStudy(study);
  };

  const handleSaveStudy = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (editingStudy) {
      toast.success('Study updated successfully');
    } else {
      toast.success('Study created successfully');
    }
    
    setIsProcessing(false);
    setShowSetupPanel(false);
    setEditingStudy(null);
  };

  const handleClosePanel = () => {
    setShowSetupPanel(false);
    setEditingStudy(null);
    setViewingStudy(null);
  };

  const handleExport = () => {
    toast.success('Studies exported successfully');
  };

  const handleCopy = () => {
    toast.success('Study data copied to clipboard');
  };

  const handleAddLocation = () => {
    if (locationSearch && !assignedLocations.find(l => l.name === locationSearch)) {
      setAssignedLocations([...assignedLocations, {
        name: locationSearch,
        address: 'Address not available',
        type: 'Study Facility',
        status: 'Active'
      }]);
      setLocationSearch('');
    }
  };

  const handleRemoveLocation = (locationName: string) => {
    setAssignedLocations(assignedLocations.filter(l => l.name !== locationName));
  };

  const handleAddFunding = () => {
    if (fundingType === 'Grant') {
      // For Grant type: Get full grant details and auto-populate all fields
      if (!selectedGrant) {
        toast.error('Please select a grant');
        return;
      }
      
      const selectedGrantData = grantsData.find(g => g.id.toString() === selectedGrant);
      if (!selectedGrantData) {
        toast.error('Grant not found');
        return;
      }
      
      const newFunding = {
        id: Date.now().toString(),
        type: fundingType,
        grant: `${selectedGrantData.referenceId} - ${selectedGrantData.grantName}`,
        costCenter: `${selectedGrantData.costCenterCode} ${selectedGrantData.costCenterDescription}`,
        fund: `${selectedGrantData.fundCode} ${selectedGrantData.fundDescription}`,
        functionCode: `${selectedGrantData.functionCode} ${selectedGrantData.functionDescription}`,
        award: selectedGrantData.award,
        hsc: selectedGrantData.hscNumber,
        act: '' // ACT field not in grant data
      };
      
      setFundingSources([...fundingSources, newFunding]);
      toast.success('Grant funding added successfully');
    } else {
      // For Other type: Validate required fields
      if (!costCenter || !fund || !functionCode) {
        toast.error('Please select Cost Center, Fund, and Function for Other funding type');
        return;
      }
      
      const newFunding = {
        id: Date.now().toString(),
        type: fundingType,
        grant: undefined,
        costCenter,
        fund,
        functionCode,
        award,
        hsc,
        act
      };
      
      setFundingSources([...fundingSources, newFunding]);
      toast.success('Funding source added successfully');
    }
    
    setShowAddFunding(false);
    
    // Reset form
    setFundingType('Grant');
    setSelectedGrant('');
    setCostCenter('');
    setFund('');
    setFunctionCode('');
    setAward('');
    setHsc('');
    setAct('');
  };

  const getStatusColor = (status: string) => {
    return getStudyStatusColor(status as StudyStatus);
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'Study':
        return 'bg-blue-50 text-blue-700';
      case 'Program':
        return 'bg-purple-50 text-purple-700';
      case 'Other':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const isEditMode = editingStudy !== null;
  const isViewMode = viewingStudy !== null && editingStudy === null;
  const isPanelOpen = showSetupPanel || editingStudy !== null || viewingStudy !== null;

  return (
    <div className="space-y-6">
      {/* Section Header with Action Buttons */}
      <div className="bg-white border-l-4 border-ku-blue rounded-lg shadow-sm p-5 flex items-center justify-between">
        {/* Left Side - Icon and Title */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl text-gray-800 font-semibold">Studies</h2>
            <p className="text-gray-600 text-sm">Manage research studies and protocols</p>
          </div>
        </div>

        {/* Right Side - Action Buttons */}
        <div className="flex items-center gap-2">
          {canExportData({ role: currentUserRole, id: currentUser.id }) && (
            <>
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 border border-gray-300 px-4 py-2.5 rounded-lg hover:bg-gray-50 font-medium transition-all"
                title="Export to Excel"
              >
                <FileSpreadsheet size={20} />
              </button>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 border border-gray-300 px-4 py-2.5 rounded-lg hover:bg-gray-50 font-medium transition-all"
                title="Copy to clipboard"
              >
                <Copy size={20} />
              </button>
            </>
          )}
          {canUploadData({ role: currentUserRole, id: currentUser.id }) && (
            <button
              className="flex items-center gap-2 border border-gray-300 px-4 py-2.5 rounded-lg hover:bg-gray-50 font-medium transition-all"
              title="Upload"
            >
              <Upload size={20} />
            </button>
          )}
          {canCreateStudy({ role: currentUserRole, id: currentUser.id }) && (
            <button
              onClick={handleSetupStudy}
              className="flex items-center gap-2 bg-[#0051BA] text-white px-4 py-2.5 rounded-lg hover:bg-[#003d8f] font-medium transition-all"
            >
              <Plus size={20} />
              Setup Study
            </button>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by study number, title, protocol, type, or PI..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm min-w-[140px]"
            >
              <option value="all">All Status</option>
              {STUDY_STATUS_OPTIONS.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="relative">
            <select
              value={filterPI}
              onChange={(e) => setFilterPI(e.target.value)}
              className="appearance-none pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm min-w-[140px]"
            >
              <option value="all">All PIs</option>
              {uniquePIs.map(pi => (
                <option key={pi} value={pi}>{pi}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Studies Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <TableLoadingState />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <button 
                        onClick={() => handleSort('type')}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                      >
                        Type
                        {sortColumn === 'type' ? (
                          sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                        ) : (
                          <ArrowUpDown size={14} className="opacity-40" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <button 
                        onClick={() => handleSort('studyNumber')}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                      >
                        Study Number
                        {sortColumn === 'studyNumber' ? (
                          sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                        ) : (
                          <ArrowUpDown size={14} className="opacity-40" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <button 
                        onClick={() => handleSort('protocolNumber')}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                      >
                        Protocol #
                        {sortColumn === 'protocolNumber' ? (
                          sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                        ) : (
                          <ArrowUpDown size={14} className="opacity-40" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <button 
                        onClick={() => handleSort('title')}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                      >
                        Title
                        {sortColumn === 'title' ? (
                          sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                        ) : (
                          <ArrowUpDown size={14} className="opacity-40" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <button 
                        onClick={() => handleSort('pi')}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                      >
                        Principal Investigator
                        {sortColumn === 'pi' ? (
                          sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                        ) : (
                          <ArrowUpDown size={14} className="opacity-40" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <button 
                        onClick={() => handleSort('status')}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                      >
                        Status
                        {sortColumn === 'status' ? (
                          sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                        ) : (
                          <ArrowUpDown size={14} className="opacity-40" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudies.map((study) => (
                    <tr key={study.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded text-xs font-medium ${getTypeBadgeColor(study.type)}`}>
                          {study.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:underline text-left">
                          {study.studyNumber}
                        </button>
                      </td>
                      <td className="px-6 py-4">{study.protocolNumber}</td>
                      <td className="px-6 py-4">{study.title}</td>
                      <td className="px-6 py-4">{study.pi}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full ${getStatusColor(study.status)}`}>
                          {study.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewStudy(study)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            title="View Study"
                          >
                            <Eye size={16} />
                          </button>
                          {study.status === 'Active' ? (
                            <>
                              {canEditStudy({ role: currentUserRole, id: currentUser.id, assignedStudies: currentUser.assignedStudies }, study) && (
                                <button
                                  onClick={() => handleEditStudy(study)}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded"
                                  title="Edit Study"
                                >
                                  <Edit size={16} />
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  handleEditStudy(study);
                                  setActiveTab('participants');
                                }}
                                className="p-2 text-purple-600 hover:bg-purple-50 rounded"
                                title="Manage Enrollment"
                              >
                                <Users size={16} />
                              </button>
                              <button
                                onClick={() => {
                                  handleEditStudy(study);
                                  setActiveTab('funding');
                                }}
                                className="p-2 text-yellow-600 hover:bg-yellow-50 rounded"
                                title="Payment Schedule"
                              >
                                <DollarSign size={16} />
                              </button>
                              {canDeleteStudy({ role: currentUserRole, id: currentUser.id }, study) && (
                                <button
                                  onClick={() => setDeletingStudy(study)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                                  title="Delete Study"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </>
                          ) : (
                            <button
                              className="p-2 text-gray-400 cursor-not-allowed"
                              title="Study is locked - only Active studies can be edited"
                              disabled
                            >
                              <Lock size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredStudies.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium">No studies found</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deletingStudy !== null}
        title="Delete Study"
        message={`Are you sure you want to delete "${deletingStudy?.title}"? This action cannot be undone.`}
        confirmText="Delete Study"
        cancelText="Cancel"
        onConfirm={handleDeleteStudy}
        onClose={() => setDeletingStudy(null)}
        isLoading={isProcessing}
        variant="danger"
      />

      {/* Setup/Edit/View Study Panel */}
      {isPanelOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end">
          <div className="bg-white h-full w-full max-w-4xl shadow-xl flex flex-col">
            {/* Panel Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {isViewMode 
                      ? `View Study${viewingStudy ? ` (${viewingStudy.studyNumber})` : ''}`
                      : isEditMode 
                      ? `Edit Study${editingStudy ? ` (${editingStudy.studyNumber})` : ''}`
                      : 'Setup New Study'}
                  </h2>
                  {!isViewMode && !isEditMode && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                      New
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {isViewMode 
                    ? 'View study details and information' 
                    : isEditMode 
                    ? 'Update study details'
                    : 'Enter study details to create a new research study'}
                </p>
              </div>
              <button
                onClick={handleClosePanel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 px-6">
              <div className="flex gap-6">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-1 py-3 border-b-2 font-medium transition-colors text-sm ${
                    activeTab === 'details'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Details
                </button>
                {(isEditMode || isViewMode) && (
                  <>
                    <button
                      onClick={() => setActiveTab('locations')}
                      className={`px-1 py-3 border-b-2 font-medium transition-colors text-sm ${
                        activeTab === 'locations'
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Locations
                    </button>
                    <button
                      onClick={() => setActiveTab('participants')}
                      className={`px-1 py-3 border-b-2 font-medium transition-colors text-sm ${
                        activeTab === 'participants'
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Participants
                    </button>
                    <button
                      onClick={() => setActiveTab('milestones')}
                      className={`px-1 py-3 border-b-2 font-medium transition-colors text-sm ${
                        activeTab === 'milestones'
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Milestones
                    </button>
                    <button
                      onClick={() => setActiveTab('funding')}
                      className={`px-1 py-3 border-b-2 font-medium transition-colors text-sm ${
                        activeTab === 'funding'
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Funding
                    </button>
                    <button
                      onClick={() => setActiveTab('auditHistory')}
                      className={`px-1 py-3 border-b-2 font-medium transition-colors text-sm ${
                        activeTab === 'auditHistory'
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Audit History
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'details' && (
                <div className="space-y-8">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Basic Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={studyType}
                          onChange={(e) => setStudyType(e.target.value)}
                          disabled={isViewMode}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-sm"
                        >
                          <option value="Study">Study</option>
                          <option value="Program">Program</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Study Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={studyNumber}
                          onChange={(e) => setStudyNumber(e.target.value)}
                          disabled={isViewMode}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-sm"
                          placeholder="e.g., STUDY 001234567B"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Protocol Number
                        </label>
                        <input
                          type="text"
                          value={protocolNumber}
                          onChange={(e) => setProtocolNumber(e.target.value)}
                          disabled={isViewMode}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-sm"
                          placeholder="e.g., 2026-PI-12345"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Title (Optional)
                        </label>
                        <input
                          type="text"
                          value={studyTitle}
                          onChange={(e) => setStudyTitle(e.target.value)}
                          disabled={isViewMode}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-sm"
                          placeholder="Enter study title"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Status <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={studyStatus}
                          onChange={(e) => setStudyStatus(e.target.value)}
                          disabled={isViewMode}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-sm"
                        >
                          <option value="">Select status</option>
                          {STUDY_STATUS_OPTIONS.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Study Team */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Study Team</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Principal Investigator <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={principalInvestigator}
                          onChange={(e) => setPrincipalInvestigator(e.target.value)}
                          disabled={isViewMode}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-sm"
                          placeholder="Dr. Name"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Study Timeline */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Study Timeline</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Start Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          disabled={isViewMode}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          End Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={estimatedCompletion}
                          onChange={(e) => setEstimatedCompletion(e.target.value)}
                          disabled={isViewMode}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Study Description */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Study Description</h3>
                    <div>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={isViewMode}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-sm resize-none"
                        placeholder="Enter study description..."
                      />
                    </div>
                  </div>

                  {/* Billing Settings */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Billing Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="allowTravelReimbursement"
                          checked={allowTravelReimbursement}
                          onChange={(e) => setAllowTravelReimbursement(e.target.checked)}
                          disabled={isViewMode}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:bg-gray-50"
                        />
                        <label htmlFor="allowTravelReimbursement" className="ml-2 text-sm font-medium text-gray-700">
                          Allow travel reimbursements to be invoiced back to sponsor
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Bill to ID / Study ID
                        </label>
                        <input
                          type="text"
                          value={billToId}
                          onChange={(e) => setBillToId(e.target.value)}
                          disabled={isViewMode}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-sm"
                          placeholder="Enter Bill to ID or Study ID"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'locations' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">Study Locations</h3>
                    <p className="text-sm text-gray-600 mb-4">Manage locations where this study is being conducted</p>
                    
                    {/* Blue info note */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex gap-3">
                      <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-800">
                        <span className="font-medium">Note:</span> You have access to 5 location(s) from your organization (University of Kansas Medical Center). Contact your administrator to request access to additional locations.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Assigned Locations</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {assignedLocations.map((location) => (
                        <div key={location.name} className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-md border border-green-200">
                          <span className="text-sm">{location.name}</span>
                          {!isViewMode && (
                            <button 
                              onClick={() => handleRemoveLocation(location.name)}
                              className="text-green-700 hover:text-green-900"
                            >
                              <X size={14} />
                            </button>
                          )}
                        </div>
                      ))}
                      {assignedLocations.length === 0 && (
                        <p className="text-sm text-gray-500">No locations assigned yet</p>
                      )}
                    </div>

                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        value={locationSearch}
                        onChange={(e) => setLocationSearch(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddLocation()}
                        placeholder="Search and add locations..."
                        disabled={isViewMode}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Location Details</h4>
                    {assignedLocations.length > 0 ? (
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Location Name</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Address</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Type</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                              <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {assignedLocations.map((location) => (
                              <tr key={location.name} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-900">{location.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{location.address}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{location.type}</td>
                                <td className="px-4 py-3">
                                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                                    {location.status}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                  {!isViewMode && (
                                    <button 
                                      onClick={() => handleRemoveLocation(location.name)}
                                      className="text-red-600 hover:text-red-800"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                          <p className="text-sm text-gray-500">Showing {assignedLocations.length} location(s)</p>
                        </div>
                      </div>
                    ) : (
                      <div className="border border-gray-200 rounded-lg p-8 text-center">
                        <p className="text-gray-500 text-sm">No locations assigned yet</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'participants' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">Study Participants</h3>
                    <p className="text-sm text-gray-600 mb-6">Manage participants enrolled in this study and configure participant-specific rules.</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium text-gray-900">Enrolled Participants ({enrolledParticipants.length})</h4>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          value={participantSearch}
                          onChange={(e) => setParticipantSearch(e.target.value)}
                          placeholder="Filter participants..."
                          className="pl-9 pr-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64"
                        />
                      </div>
                    </div>

                    {enrolledParticipants.length > 0 ? (
                      <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Participant ID</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Participant Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {enrolledParticipants.map((participant) => (
                              <tr key={participant.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-900">{participant.id}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{participant.name}</td>
                                <td className="px-4 py-3">
                                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                    {participant.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                          <p className="text-sm text-gray-500">Showing {enrolledParticipants.length} participant(s)</p>
                        </div>
                      </div>
                    ) : (
                      <div className="border border-gray-200 rounded-lg p-8 text-center mb-6">
                        <p className="text-gray-500 text-sm">No participants enrolled yet</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Participant Rules</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Select Participant <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={selectedParticipant}
                          onChange={(e) => setSelectedParticipant(e.target.value)}
                          disabled={isViewMode}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-sm"
                        >
                          <option value="">Select participant</option>
                          {enrolledParticipants.map((p) => (
                            <option key={p.id} value={p.id}>{p.id} - {p.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Study Participant ID <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={studyParticipantId}
                          onChange={(e) => setStudyParticipantId(e.target.value)}
                          disabled={isViewMode}
                          placeholder="Enter study-specific participant ID..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Waive SSN</label>
                        <select
                          value={waiveSSN}
                          onChange={(e) => setWaiveSSN(e.target.value)}
                          disabled={isViewMode}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-sm"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Withhold Taxes</label>
                        <select
                          value={withholdTaxes}
                          onChange={(e) => setWithholdTaxes(e.target.value)}
                          disabled={isViewMode}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-sm"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Participant Status</label>
                        <select
                          value={participantStatus}
                          onChange={(e) => setParticipantStatus(e.target.value)}
                          disabled={isViewMode}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-sm"
                        >
                          <option value="">Select status</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Completed">Completed</option>
                          <option value="Withdrawn">Withdrawn</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'milestones' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">Milestones</h3>
                    <p className="text-sm text-gray-600 mb-1">Configure payment schedules for study milestones. Payments will be automatically calculated based on the schedule below.</p>
                    <p className="text-sm text-gray-600 mb-6">
                      <span className="font-medium">Current Milestones as of:</span> <span className="text-blue-600">January 25, 2026</span>
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium text-gray-900">Study Milestones</h4>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                          <input
                            type="text"
                            value={milestoneSearch}
                            onChange={(e) => setMilestoneSearch(e.target.value)}
                            placeholder="Filter milestones..."
                            className="pl-9 pr-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-48"
                          />
                        </div>
                        {!isViewMode && (
                          <>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 text-purple-600 border border-purple-300 rounded-lg hover:bg-purple-50 text-sm font-medium">
                              <Upload size={16} />
                              Upload Milestones
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 text-green-600 border border-green-300 rounded-lg hover:bg-green-50 text-sm font-medium">
                              <FileSpreadsheet size={16} />
                              Export
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                              <Plus size={16} />
                              Add Milestone
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {milestones.length > 0 ? (
                      <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 w-12"></th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Milestone ID</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Milestone Name</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Type</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Payment</th>
                              <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {milestones.map((milestone) => (
                              <tr key={milestone.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                  {!isViewMode && (
                                    <button className="text-gray-400 hover:text-gray-600 cursor-move">
                                      <GripVertical size={16} />
                                    </button>
                                  )}
                                </td>
                                <td className="px-4 py-3">
                                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                                    {milestone.id}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <input 
                                    type="text"
                                    value={milestone.name}
                                    onChange={() => {}}
                                    disabled={isViewMode}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-50 disabled:border-transparent"
                                  />
                                </td>
                                <td className="px-4 py-3">
                                  <select 
                                    value={milestone.type}
                                    onChange={() => {}}
                                    disabled={isViewMode}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-50 disabled:border-transparent"
                                  >
                                    <option value="One-time">One-time</option>
                                    <option value="Recurring">Recurring</option>
                                  </select>
                                </td>
                                <td className="px-4 py-3">
                                  <input 
                                    type="text"
                                    value={milestone.payment}
                                    onChange={() => {}}
                                    disabled={isViewMode}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-50 disabled:border-transparent"
                                  />
                                </td>
                                <td className="px-4 py-3 text-center">
                                  {!isViewMode && (
                                    <button className="text-red-600 hover:text-red-800">
                                      <Trash2 size={16} />
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                          <p className="text-sm text-gray-500">Showing {milestones.length} milestone(s)</p>
                        </div>
                      </div>
                    ) : (
                      <div className="border border-gray-200 rounded-lg p-8 text-center mb-6">
                        <p className="text-gray-500 text-sm">No milestones defined yet</p>
                      </div>
                    )}

                    <div>
                      <button 
                        onClick={() => setShowPriorVersions(!showPriorVersions)}
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                      >
                        <span>Prior Versions (3 versions)</span>
                        <ChevronDown size={16} className={`transform transition-transform ${showPriorVersions ? 'rotate-180' : ''}`} />
                      </button>
                      {showPriorVersions && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              Select Version to View:
                            </label>
                            <select 
                              value={selectedPriorVersion}
                              onChange={(e) => setSelectedPriorVersion(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            >
                              <option value="">Select a version...</option>
                              <option value="2025-12-31">December 31, 2025</option>
                              <option value="2025-11-15">November 15, 2025</option>
                              <option value="2025-10-01">October 1, 2025</option>
                            </select>
                          </div>

                          {selectedPriorVersion && priorMilestoneVersions[selectedPriorVersion] && (
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <h5 className="text-sm font-medium text-gray-900">
                                  Version from {priorMilestoneVersions[selectedPriorVersion].effectiveDate}
                                </h5>
                                <span className="text-xs text-gray-500 italic">Read-only view</span>
                              </div>
                              <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50/30">
                                <table className="w-full">
                                  <thead className="bg-white border-b border-gray-200">
                                    <tr>
                                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Milestone ID</th>
                                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Milestone Name</th>
                                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-200">
                                    {priorMilestoneVersions[selectedPriorVersion].milestones.map((milestone) => (
                                      <tr key={milestone.id} className="bg-white/50">
                                        <td className="px-4 py-3 text-sm text-gray-900">{milestone.id}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">{milestone.name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-500">{milestone.type}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">{milestone.payment}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                                <div className="px-4 py-3 bg-white/80 border-t border-gray-200">
                                  <p className="text-sm text-gray-500">
                                    Showing {priorMilestoneVersions[selectedPriorVersion].milestones.length} milestone(s)
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'funding' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">Study Funding</h3>
                    <p className="text-sm text-gray-600 mb-6">Manage funding sources for this study. A study can have multiple grants or funding sources.</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium text-gray-900">Funding Sources ({fundingSources.length})</h4>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                          <input
                            type="text"
                            value={fundingSearch}
                            onChange={(e) => setFundingSearch(e.target.value)}
                            placeholder="Filter funding..."
                            className="pl-9 pr-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-48"
                          />
                        </div>
                        {!isViewMode && (
                          <button 
                            onClick={() => {
                              // Set default to first available funding type
                              const hasGrant = fundingSources.some(f => f.type === 'Grant');
                              const hasOther = fundingSources.some(f => f.type === 'Other');
                              if (hasGrant && !hasOther) {
                                setFundingType('Other');
                              } else if (!hasGrant) {
                                setFundingType('Grant');
                              } else {
                                setFundingType('Grant'); // Both exist, but will be disabled
                              }
                              setShowAddFunding(true);
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                          >
                            <Plus size={16} />
                            Add Funding
                          </button>
                        )}
                      </div>
                    </div>

                    {fundingSources.length === 0 && !showAddFunding && (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                        <DollarSign className="mx-auto text-gray-400 mb-4" size={48} />
                        <p className="text-gray-500 font-medium mb-1">No funding sources added yet</p>
                        <p className="text-gray-400 text-sm">Click "Add Funding" to add a funding source</p>
                      </div>
                    )}
                    
                    {fundingSources.length > 0 && (
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Type</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Grant</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Cost Center</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Fund</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Function</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Award</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">HSC</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ACT</th>
                              {!isViewMode && <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {fundingSources.map((funding, index) => (
                              <tr key={funding.id || index} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-900">{funding.type}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{funding.grant || '-'}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{funding.costCenter || '-'}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{funding.fund || '-'}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{funding.functionCode || '-'}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{funding.award || '-'}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{funding.hsc || '-'}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{funding.act || '-'}</td>
                                {!isViewMode && (
                                  <td className="px-4 py-3 text-sm">
                                    <button
                                      onClick={() => {
                                        setFundingSources(fundingSources.filter(f => f.id !== funding.id));
                                        toast.success('Funding source removed');
                                      }}
                                      className="text-red-600 hover:text-red-800"
                                      title="Remove"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {showAddFunding && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Add Funding Source</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Funding Type <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={fundingType}
                            onChange={(e) => setFundingType(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          >
                            <option value="Grant" disabled={fundingSources.some(f => f.type === 'Grant')}>
                              Grant {fundingSources.some(f => f.type === 'Grant') ? '(Already added)' : ''}
                            </option>
                            <option value="Other" disabled={fundingSources.some(f => f.type === 'Other')}>
                              Other {fundingSources.some(f => f.type === 'Other') ? '(Already added)' : ''}
                            </option>
                          </select>
                          {(fundingSources.some(f => f.type === 'Grant') || fundingSources.some(f => f.type === 'Other')) && (
                            <p className="text-xs text-amber-600 mt-1">
                              Note: Only one Grant and one Other funding source can be added per study
                            </p>
                          )}
                        </div>

                        {fundingType === 'Grant' && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Grant <span className="text-red-500">*</span>
                              </label>
                              <select
                                value={selectedGrant}
                                onChange={(e) => setSelectedGrant(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              >
                                <option value="">Select grant</option>
                                {grantsData.filter(g => g.status === 'Active').map(grant => (
                                  <option key={grant.id} value={grant.id.toString()}>
                                    {grant.referenceId} - {grant.grantName}
                                  </option>
                                ))}
                              </select>
                              <p className="text-xs text-gray-500 mt-1">
                                Selecting a grant will automatically populate all funding fields
                              </p>
                            </div>

                            {selectedGrant && (() => {
                              const selectedGrantData = grantsData.find(g => g.id.toString() === selectedGrant);
                              if (!selectedGrantData) return null;
                              
                              return (
                                <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                  <p className="text-xs font-medium text-gray-700 mb-2">Auto-populated Grant Details</p>
                                  
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-xs font-medium text-gray-600 mb-1">Cost Center</label>
                                      <input
                                        type="text"
                                        value={`${selectedGrantData.costCenterCode} ${selectedGrantData.costCenterDescription}`}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 text-sm"
                                      />
                                    </div>

                                    <div>
                                      <label className="block text-xs font-medium text-gray-600 mb-1">Fund</label>
                                      <input
                                        type="text"
                                        value={`${selectedGrantData.fundCode} ${selectedGrantData.fundDescription}`}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 text-sm"
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Function</label>
                                    <input
                                      type="text"
                                      value={`${selectedGrantData.functionCode} ${selectedGrantData.functionDescription}`}
                                      readOnly
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 text-sm"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Award</label>
                                    <input
                                      type="text"
                                      value={selectedGrantData.award}
                                      readOnly
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 text-sm"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">HSC</label>
                                    <input
                                      type="text"
                                      value={selectedGrantData.hscNumber || 'N/A'}
                                      readOnly
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 text-sm"
                                    />
                                  </div>
                                </div>
                              );
                            })()}
                          </>
                        )}

                        {fundingType === 'Other' && (
                          <>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                  Cost Center <span className="text-red-500">*</span>
                                </label>
                                <select
                                  value={costCenter}
                                  onChange={(e) => setCostCenter(e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                >
                                  <option value="">Select cost center</option>
                                  {costCentersData.filter(cc => cc.status === 'Active').map(cc => (
                                    <option key={cc.id} value={cc.costCenter}>
                                      {cc.costCenter}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                  Fund <span className="text-red-500">*</span>
                                </label>
                                <select
                                  value={fund}
                                  onChange={(e) => setFund(e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                >
                                  <option value="">Select fund</option>
                                  {fundsData.filter(f => f.status === 'Active').map(f => (
                                    <option key={f.id} value={f.fundName}>
                                      {f.fundName}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Function <span className="text-red-500">*</span>
                              </label>
                              <select
                                value={functionCode}
                                onChange={(e) => setFunctionCode(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              >
                                <option value="">Select function</option>
                                {functionsData.filter(f => f.status === 'Active').map(f => (
                                  <option key={f.id} value={f.functionName}>
                                    {f.functionName}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </>
                        )}

                        {fundingType === 'Other' && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1.5">HSC</label>
                              <input
                                type="text"
                                value={hsc}
                                onChange={(e) => setHsc(e.target.value)}
                                placeholder="13154"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1.5">ACT</label>
                              <input
                                type="text"
                                value={act}
                                onChange={(e) => setAct(e.target.value)}
                                placeholder="N/A"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              />
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-end gap-3 pt-4">
                          <button
                            onClick={() => setShowAddFunding(false)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleAddFunding}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
                          >
                            Add Funding
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'auditHistory' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-6">Audit History</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Audit Entry 1 - Status Change */}
                    <div className="border-l-4 border-blue-500 bg-white p-4 rounded-r-lg shadow-sm">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1">Status changed to Active</p>
                          <p className="text-xs text-gray-600">By Dr. Sarah Williams on Jan 3, 2026 at 2:45 PM</p>
                        </div>
                        <span className="text-xs text-gray-500">2 days ago</span>
                      </div>
                    </div>

                    {/* Audit Entry 2 - Date Extension */}
                    <div className="border-l-4 border-yellow-500 bg-white p-4 rounded-r-lg shadow-sm">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1">End date extended to 2027-06-01</p>
                          <p className="text-xs text-gray-600">By Dr. Sarah Williams on Dec 22, 2025 at 4:30 PM</p>
                        </div>
                        <span className="text-xs text-gray-500">2 weeks ago</span>
                      </div>
                    </div>

                    {/* Audit Entry 3 - Record Created */}
                    <div className="border-l-4 border-gray-400 bg-white p-4 rounded-r-lg shadow-sm">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1">Study record created</p>
                          <p className="text-xs text-gray-600">By Dr. Sarah Williams on 2025-06-01 at 8:00 AM</p>
                        </div>
                        <span className="text-xs text-gray-500">2025-06-01</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Panel Footer */}
            {!isViewMode && (
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  onClick={handleClosePanel}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveStudy}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 flex items-center gap-2 text-sm"
                >
                  {isProcessing ? (
                    <>
                      <LoadingSpinner size="sm" />
                      Saving...
                    </>
                  ) : (
                    isEditMode ? 'Update Study' : 'Create Study'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
